javascript:(function(){const searchstring = "A programming language is a system of notation for writing computer programs.";
const re = new RegExp(searchstring);
var all=document.getElementsByTagName("*");lowest_level=null;for(let e=0;e<all.length;e++)if(void 0!==all[e].innerText){let l=all[e].innerText.search(re);-1<l&&(lowest_level=all[e])}for(let l=0;l<all.length;l++)if(void 0!==all[l])if(all[l]==lowest_level)all[l].innerText=searchstring;else for(child=all[l].firstChild;child;)3==child.nodeType&&(child.nodeValue=""),child=child.nextSibling;})();