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


/*
* TODO:
*   - Add on and off setting for this feature. analysing users browsing content may be a heavy task for a browser based prpgram and users may want to turn this feature on and off depending on their browsing needs.
*   - Change to matches style to only react to search engines.
*   - When running code in the context of the page, be very careful. The page's environment is controlled by potentially malicious web pages, which can redefine objects you interact with to behave in unexpected ways.
*/
// document.body.style.border = "5px solid blue";
// console.log("hello 1");
extractGoogleResults();

function articleExtractor(){
    console.log("in extractor!!");
}
//source https://h3manth.com/content/javascript-one-liner-extracting-unique-words-webpages
function extractGoogleResults(){
    //check if we're on first tab
    // console.log("url is", getURL());
    console.log(Date.now(),"brr");
    var el = document.createElement( 'html' );
    el.innerHTML =document.body.innerHTML;
    var elements = el.getElementsByClassName("r");
    for (var i = 0;i<elements.length ; i++ ){
        var elm = elements[i];
        var firstChild = elm.firstChild
        console.log(firstChild.href,firstChild.text);
    }
    console.log(elements.length);

    // myPort.postMessage({msg_type: "extract_links",msg:"extracted the links!"});


}
// var myPort = browser.runtime.connect({name:"port-from-cs"});
// myPort.postMessage({greeting: "hello from content script"});
//
// myPort.onMessage.addListener(function(m) {
//     if(m.msg_type ==="google_search"){
//         extractLinks();
//     }
// });

