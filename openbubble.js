
/*
Author: Hadi Mehrpouya
Date:   07/03/2018
 */

/*
TODO:

CHECK:
you can listen to tabs.onUpdated events to be notified when a URL is set.*/

/*
Restart alarm for the currently active tab, whenever openbubble.js is run.
*/
var G_DELAY = 0.1;
var G_STATUS_LIST = Object.freeze({
    "searching":0,"shopping":1,"socializing":2,"surfing":3
});
var G_TOPICS_LIST = Object.freeze({
    "culture":0,
    "family":1,
    "law":2,
    "cuisine":3,
    "politics":4,
    "food":5,
    "economics":6,
    "business":7,
    "social_sciences":8,
    "social_issues":9,
    "games":10,
    "sports":11,
    "mass_media":12,
    "continents_regions":13, //dictionary of cities
    "humanities":14,
    "arts":15,
    "health":16 // Whether one have a tumour or cancer
});
var G_OPENBUBBLE_SETTING;
console.log("before initialising setting.");
InitialiseSetting();

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
    G_OPENBUBBLE_SETTING =
        {
            status:G_STATUS_LIST.searching,//Always start with searching.};
            surfing:{links:["http://hadi.link","http://hadi.link/gch_minecraft"]}
        }
    localStorage.setItem('OPENBUBBLE_SETTING', JSON.stringify(G_OPENBUBBLE_SETTING));
}
var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
    restartAlarm(tabs[0].id);
});

/*
Check if the state variable has a value, if not try to load it from localstorage. If still no value set it to surfing
 */
function checkState(){

}

/*This function will surf the web using an array of links to look at. as soon as the array is empty, this can go back into searching to find new links to explore.*/
function surf(){
    console.log("in surf!!");
    // var surfSetting = G_OPENBUBBLE_SETTING.surfing;
    // if(surfSetting.links.length>0){
    //     var gettingActiveTab = browser.tabs.query({currentWindow: true});
    //     //How to navigate this new tab and remove it from the list.
    //     gettingActiveTab.then((tabs) => {
    //         var linkToOpen = G_OPENBUBBLE_SETTING.surfing.links[G_OPENBUBBLE_SETTING.surfing.links-1];
    //         G_OPENBUBBLE_SETTING.surfing.links.pop();
    //         var updating = browser.tabs.update(tabs[0].id, {
    //             active: false,
    //             url: linkToOpen
    //         });
    //     updating.then(onUpdated, onError);
    // });
    // }

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
            browser.tabs.update(tabs[0].id, {
            active: true
        });
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
