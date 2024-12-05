import json

with open('src/wiki_update/sentences.json', 'r', encoding='utf-8') as f:
    sentences = json.load(f)

with open('src/bkmlt/searchstring.js', 'w', encoding='utf-8') as out:
    out.write(f'const searchstring = "{sentences[-1]['content']}";\n')
    out.write("const re = new RegExp(searchstring);\n")