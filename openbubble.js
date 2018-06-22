
/*
Author: Hadi Mehrpouya
Date:   07/03/2018
 */

/*
TODO:
- Learn how to send message between content script and background.

Restart alarm for the currently active tab, whenever openbubble.js is run.
Retrieves controversial topics from wikipedia
choose one randomly
*/
var G_DELAY = 100;
var G_STATUS_LIST = Object.freeze({
    "searching":0,"shopping":1,"socializing":2,"surfing":3
});

var G_OPENBUBBLE_SETTING;
InitialiseSetting();
getWikipedia_Controversial_Topics();

//Loads extention setting from Localstorage.
function LoadSetting(){
    console.log("Loading openbubble setting from local storage, if doesn't exist initialise recommended setting");
    var retrievedObject = localStorage.getItem('OPENBUBBLE_SETTING');
    if(retrievedObject)
        G_OPENBUBBLE_SETTING = JSON.parse(retrievedObject);
    else
        InitialiseSetting();
}
// Initialising local storage with extension recommended setting for the first time
function InitialiseSetting(){
    console.log("Initialising local storage with extension's recommended setting for the first time");
    //TODO: Check logic here if I need to fill the surfing links here or leave it empty and it will get filled via searchig.
    G_OPENBUBBLE_SETTING =
        {
            status:G_STATUS_LIST.searching,//Always start with searching.};
            surfing:{links:["http://hadi.link","http://hadi.link/gch_minecraft"]}
        }
    saveSetting();
}

function saveSetting(){
    localStorage.setItem('OPENBUBBLE_SETTING', JSON.stringify(G_OPENBUBBLE_SETTING));
    console.log("saved openbubble_setting to local storage " , localStorage.getItem('OPENBUBBLE_SETTING'));
}
/*
Check if the state variable has a value, if not try to load it from localstorage. If still no value set it to surfing
 */
function checkState(){

}

/*This function will surf the web using an array of links to look at. as soon as the array is empty, this can go back into searching to find new links to explore.*/
function surf(){
    console.log("in surf!!");
    // if(surfSetting.links.length>0){
        var gettingActiveTab = browser.tabs.query({currentWindow: true});
        //     //How to navigate this new tab and remove it from the list.
        gettingActiveTab.then((tabs) => {
            var linkToOpen = getRandomURL();
        var surfSetting = G_OPENBUBBLE_SETTING.surfing;
        var updating = browser.tabs.update(tabs[0].id, {
                active: false,
                url: linkToOpen
            });
        updating.then(onUpdated, onError);
    });
    // }

}

function getRandomURL(){
    var url = "https://www.google.co.uk/search?q=" + getCurrentTopic();
    messageContentParser();
    // G_OPENBUBBLE_SETTING.surfing.links.pop();
    saveSetting();
    return url;
}
//look at what topic we are exploring, search and find new links.
function findMoreLinks(){

}
var DELAY = 0.1;

var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
    restartAlarm(tabs[0].id);
});

/*
Restart alarm for the currently active tab, whenever the user navigates.
*/
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.url) {
    return;
    }
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
        if (tabId == tabs[0].id) {
        restartAlarm(tabId);
    }
    });
});

/*
Restart alarm for the currently active tab, whenever a new tab becomes active.
*/

function handleActivated(activeInfo) {
    console.log("Tab " + activeInfo.tabId +
        " was activated");
    restartAlarm(activeInfo.tabId);
    surf();
}

browser.tabs.onActivated.addListener(handleActivated);

/*
restartAlarm: clear all alarms,
then set a new alarm for the given tab.
*/
function restartAlarm(tabId) {
    browser.pageAction.hide(tabId);
    browser.alarms.clearAll();
    var gettingTab = browser.tabs.get(tabId);
    gettingTab.then((tab) =>{
        if (tab.url) {
        browser.alarms.create("", {delayInMinutes: DELAY});
    }
});
}

/*
On alarm, show the page action.
*/
browser.alarms.onAlarm.addListener((alarm) => {
    var querying = browser.tabs.query({currentWindow:true});
querying.then(surf, onError);
var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
    browser.pageAction.show(tabs[0].id);
});
});


browser.pageAction.onClicked.addListener(() => {
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
        surf();
            // browser.tabs.update(tabs[0].id, {
            // active: true
        });
    });


function onUpdated(tab) {
    console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function updateFirstTab(tabs) {
    var gettingActiveTab = browser.tabs.query({currentWindow: true});
    gettingActiveTab.then((tabs) => {
        var updating = browser.tabs.update(tabs[0].id, {
            active: false,
            url: "https://en.wikipedia.org/wiki/Special:Random/Talk"
        });
        updating.then(onUpdated, onError);
    });
}
function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function getWikipedia_Controversial_Topics() {
    var wikiAPI_RUL = "https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Wikipedia%3AList_of_controversial_issues&prop=links&section=1"; // This is the api address for getting all links on controversial topics.
    getJSON(wikiAPI_RUL,loadNewTopic);
}
function loadNewTopic(_status,_response){
    console.log(_response);
    var links = _response.parse.links;
    var result = 0;
    chooseRandomTopic(links);
}
//get a random number relative to the size of array, find one and add it to the openbubble setting as the topic to explore.
//Adds a topic to the setting which has the date this topic being created and the title of this topic.
function chooseRandomTopic(_topics){
    var randomIndex = Math.floor(Math.random()*_topics.length);
    var topic = _topics[randomIndex];
    G_OPENBUBBLE_SETTING.topic = {"title":topic['*'],"date_created":Date.now()};
    saveSetting();
}
//check if there is no topic in the setting add it. otherwise just return the current one. this should also check if the topic is expired or not.
function getCurrentTopic(){
    var topic = G_OPENBUBBLE_SETTING.topic['title'];
    return topic;
}

function handleResponse(message) {
    console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

function messageContentParser(e) {
    console.log("sending message to content parser!!!!!!");
    var sending = browser.tabs.sendMessage(
        1,
    {
        parsing_type: 1
    });
    sending.then(response => {
        console.log("Message from the content script:");
    console.log(response.response);
}).catch(onError);
}
//
// // sending web requests
//
// function messageContentParser() {
//     console.log("sendong message to content parser");
//     window.postMessage({
//         direction: "from-open-bubble",
//         message: 1 // 1 means a search on google
//     }, "*");
// }
//
// function handleMessage(request, sender, sendResponse) {
//     console.log("Message from the content script: " +
//         request.greeting);
//     sendResponse({response: "Response from background script"});
// }
browser.runtime.onMessage.addListener(handleMessage);