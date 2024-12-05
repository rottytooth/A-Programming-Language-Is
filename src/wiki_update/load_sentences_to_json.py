import json
import requests
import time
import wikitextparser

requests.urllib3.disable_warnings()


API_URL = "https://en.wikipedia.org/w/api.php"
WEB_URL = "https://en.wikipedia.org/w/index.php"
TITLE = 'Programming_language'

parameters = { 'action': 'query',
           'format': 'json',
           'continue': '',
           'titles': TITLE,
           'prop': 'revisions',
           'rvprop': 'ids|timestamp',
           'rvlimit': 'max'}

wp_call = requests.get(API_URL, params=parameters, verify=False)
response = wp_call.json()

# total_revisions = 0
revisions = []

start_time = time.time()
while True:
    wp_call = requests.get(API_URL, params=parameters, verify=False)
    response = wp_call.json()

    for page_id in response['query']['pages']:
        revisions.extend(response['query']['pages'][page_id]['revisions'])

    if 'continue' in response:
        parameters['continue'] = response['continue']['continue']
        parameters['rvcontinue'] = response['continue']['rvcontinue']

    else:
        break

print(f"LOADED REVISION LIST IN {time.time() - start_time}")

revisions.reverse() # run through the revisions in sequential timestamp order
print(parameters['titles'], len(revisions))
print()

sentences = []

start_time = time.time()

for rev in revisions:
    content = requests.get(f"{WEB_URL}/w/index.php?title={TITLE}&oldid={rev['revid']}&action=raw", verify=False)
    parsed = wikitextparser.parse(content.text)
    if len(parsed.sections) > 0:
        try: # if wikitextparser fails, skip to the next
            plain_text = parsed.sections[0].plain_text()
        except AttributeError:
            continue
        first_sentence_end = plain_text.find('.')
        if first_sentence_end > -1:
            sentence = plain_text[:first_sentence_end + 1].strip()

            if len(sentences) == 0 or sentence != sentences[-1]["content"]:
                # only add sentences when they change
                print(f"Adding to file: \"{sentence}\"")
                sentences.append({"revid": rev['revid'], "timestamp": rev['timestamp'], "content": sentence})

with open('src/wiki_update/sentences.json', 'w', encoding='utf-8') as f:
    json.dump(sentences, f)

print("COMPLETE")
print(f"LOADED SENTENCES IN {time.time() - start_time}")
