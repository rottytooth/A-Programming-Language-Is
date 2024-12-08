document.getElementsByTagName("title")[0].innerText = searchstring;

let regex = new RegExp(searchstring.replaceAll(" ","((<([^>]+)>)| )*"), "g");

let marker = 'apl_dont_remove';

document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replaceAll(regex, `<span class='${marker}'>${searchstring}</span>`);

var all = document.getElementsByTagName("*");

for (let i=0; i < all.length; i++) {
    if (all[i] === undefined) {
        continue;
    }
    if (all[i].classList.contains(marker)) {
        continue;
    }
    child = all[i].firstChild;
    while (child) {
        if (child.nodeType == 3) {
            child.nodeValue = "";
        }
        child = child.nextSibling;
    }
}