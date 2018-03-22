/*
* Author: Hadi Mehrpouya
* Date Created: 16/02/2018
* */
//This Script will extract important keywords from users browsing and store them for further analysis.
// 1. first find relevant html tags
// 2. Parse the html tags and find relevant text
// 3. Send the text the text to an NLP library for keyword and topic extraction
// 4. Send the result to save functio to store in browser local storage
// 5. Do this process from time to time whenever the extention needs new topics


/* TODO:
* - Add on and off setting for this feature. analysing users browsing content may be a heavy task for a browser based prpgram and users may want to turn this feature on and off depending on their browsing needs.
*
* */
document.body.style.border = "5px solid blue";
console.log("hello 1");
console.log(localStorage.getItem('OPENBUBBLE_SETTING'));
notifyBackgroundPage();
// parser=new DOMParser();
// htmlDoc=parser.parseFromString(document.body.innerHTML, "text/html");
// console.log(htmlDoc);

// extractKeywords();
// test();
extractTitle();
// var extractor = require('article-extractor');

function articleExtractor(){
    console.log("in extractor!!");
}
//source https://h3manth.com/content/javascript-one-liner-extracting-unique-words-webpages
function extractTitle(){
    // var range = document.createRange();
    // range.selectNode(document.body); // required in Safari
    // var fragment = range.createContextualFragment('<h1>html...</h1>');
    // var firstNode = fragment.firstChild;
    // var div=document.createElement("DIV");
    // div.innerHTML = document.body;
    // result = div.childNodes;
    // var el = document.createElement( 'html' );
    // el.innerHTML = document.body.innerHTML;

    console.log(Date.now());
    // var result = HTMLtoDOM(document.body.innerHTML); // Live NodeList of your anchor elements
    docTitle = document.title;
    console.log(docTitle);
}

/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */
(function() {

    // Regular Expressions for parsing tags and attributes
    var startTag = /^<([-A-Za-z0-9_]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
        endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
        attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

    // Empty Elements - HTML 4.01
    var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

    // Block Elements - HTML 4.01
    var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

    // Inline Elements - HTML 4.01
    var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

    // Elements that you can, intentionally, leave open
    // (and which close themselves)
    var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

    // Attributes that have their values filled in disabled="disabled"
    var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

    // Special Elements (can contain anything)
    var special = makeMap("script,style");
});

function handleResponse(message) {
    console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
    var sending = browser.runtime.sendMessage({
        greeting: "Greeting from the content script"
    });
    sending.then(handleResponse, handleError);
}