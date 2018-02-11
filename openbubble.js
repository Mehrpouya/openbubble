var DELAY = 0.1;
var CATGIFS = "http://chilloutandwatchsomecatgifs.com/";
// console.log("asasa");
/*
Restart alarm for the currently active tab, whenever openbubble.js is run.
*/
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
browser.tabs.onActivated.addListener((activeInfo) => {
    restartAlarm(activeInfo.tabId);
});

/*
restartAlarm: clear all alarms,
then set a new alarm for the given tab.
*/
function restartAlarm(tabId) {
    browser.pageAction.hide(tabId);
    browser.alarms.clearAll();
    var gettingTab = browser.tabs.get(tabId);
    gettingTab.then((tab) =>{
        if (tab.url != CATGIFS) {
        browser.alarms.create("", {delayInMinutes: DELAY});
    }
});
}

/*
On alarm, show the page action.
*/
browser.alarms.onAlarm.addListener((alarm) => {
    var querying = browser.tabs.query({currentWindow:true});
querying.then(updateFirstTab, onError);
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
    browser.pageAction.show(tabs[0].id);
});
});

/*
On page action click, navigate the corresponding tab to the cat gifs.
*/
browser.pageAction.onClicked.addListener(() => {
    browser.tabs.update({url: CATGIFS});
});


function onUpdated(tab) {
    console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function updateFirstTab(tabs) {
    var updating = browser.tabs.update(tabs[0].id, {
        active: false,
        url: "https://en.wikipedia.org/wiki/Special:Random/Talk"
    });
    updating.then(onUpdated, onError);
}

