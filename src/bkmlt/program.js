
var all = document.getElementsByTagName("*");

lowest_level = null;

for (let i=0; i < all.length; i++) {
    if (all[i].innerText === undefined) {
        continue;
    }
    let loc = all[i].innerText.search(re);
    if (loc > -1) {
        lowest_level = all[i];
    }
}
for (let i=0; i < all.length; i++) {
    if (all[i] === undefined) {
        continue;
    }
    if (all[i] == lowest_level) {
        all[i].innerText = searchstring;
    } else {
        child = all[i].firstChild;
        while (child) {
            if (child.nodeType == 3) {
                child.nodeValue = "";
            }
            child = child.nextSibling;
        }
    }
}
