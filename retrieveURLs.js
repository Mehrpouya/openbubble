/*
* Author: Hadi Mehrpouya
* Date Created: 16/02/2018
* */

/*
* TODO:
*   - Add on and off setting for this feature. analysing users browsing content may be a heavy task for a browser based prpgram and users may want to turn this feature on and off depending on their browsing needs.
*   - Change to matches style to only react to search engines.
*   - When running code in the context of the page, be very careful. The page's environment is controlled by potentially malicious web pages, which can redefine objects you interact with to behave in unexpected ways.
*/
identifySearchEngine();



function identifySearchEngine() {

    var url = window.location.href;
    console.log("google",url.indexOf("google"),"duck",url.indexOf("duckduckgo"));
    if(url.indexOf("google") !== -1)
        extractGoogleResults();
    else if(url.indexOf("duckduckgo") !== -1)
        extractDuckDuckGoResults();
}
//source https://h3manth.com/content/javascript-one-liner-extracting-unique-words-webpages
var G_RESULTS=[];
function extractGoogleResults() {
    console.log("getting google links");
    //check if we're on first tab
    // console.log("url is", getURL());
    console.log(Date.now(), "brr");
    var el = document.createElement('html');
    el.innerHTML = document.body.innerHTML;
    var elements = el.getElementsByClassName("r");
    var results=[];
    for (var i = 0; i < elements.length; i++) {
        var elm = elements[i];
        var firstChild = elm.firstChild;
        results.push({title:firstChild.text,url:firstChild.href});

    }
    notifyBackgroundPage(results);
}
function extractDuckDuckGoResults() {
    console.log("getting duck links");
    console.log(Date.now(), "brr");
    var el = document.createElement('html');
    el.innerHTML = document.body.innerHTML;
    var elements = el.getElementsByClassName("result__a");
    var results=[];
    for (var i = 0; i < elements.length; i++) {
        var elm = elements[i];
        // var firstChild = elm.firstChild;
        results.push({title:elm.text,url:elm.href});
    }
    notifyBackgroundPage(results);
}

function handleResponse(message) {
    console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

function notifyBackgroundPage(_results) {
    var sending = browser.runtime.sendMessage({
        results: _results
    });
    sending.then(handleResponse, handleError);
}