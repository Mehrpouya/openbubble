
/*
Author: Hadi Mehrpouya
Date:   07/03/2018
 */
var G_STATUS_LIST = Object.freeze({
    "searching":0,"shopping":1,"socializing":2,"surfing":3
});
//TODO: There's a bug here due to asynchronous. the last engine never gets retrievelinks called. Check
var G_SEARCH_SOURCE = Object.freeze({
    "yahoo":0,"google":1,"duckduckgo":2,"bing":3,"finished":0
});
var G_CURRENT_SEARCH_SOURCE = G_SEARCH_SOURCE.yahoo;
var G_CURRENT_SEARCH_COMPLETE = true;
var G_OPENBUBBLE_SETTING;
var portFromCS;

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
    //TODO: Check logic here if I need to fill the surfing links here or leave it empty and it will get filled via searchig.
    G_OPENBUBBLE_SETTING =
        {
            status:G_STATUS_LIST.searching,//Always start with searching.;
            surfing:{links:[]}
        }
    getWikipedia_Controversial_Topics();//get a random topic from wikipedia
    saveSetting();
    // checkLinks();//Make srue there are some links ready for surfing the internet.
}

function saveSetting(){
    localStorage.setItem('OPENBUBBLE_SETTING', JSON.stringify(G_OPENBUBBLE_SETTING));
}
/*
Check if the state variable has a value, if not try to load it from localstorage. If still no value set it to surfing
 */
function checkState() {
    switch (G_OPENBUBBLE_SETTING.status) {
        case G_STATUS_LIST.searching:
            searchTopic();
            break;
        case G_STATUS_LIST.surfing:
            surfTopic();
            break;
        default:
            break;
    }
}
//This will check whether there is any links in the setting and if there isn't, it will add new links to the setting
function checkLinks(){
    if (G_OPENBUBBLE_SETTING.surfing.links.length<=0){
        setState(G_STATUS_LIST.searching);//change status to searching
        getWikipedia_Controversial_Topics();//get a random topic from wikipedia
        searchTopic();//search and retrieve links
    }
    else
        setState(G_STATUS_LIST.surfing);
}
//Used for changing status of the application. It is a function so in future if changing state becomes more complicated, we can do it in here.
function setState(_state) {
    G_OPENBUBBLE_SETTING.status = _state;
    if(_state===G_STATUS_LIST.searching)
        G_CURRENT_SEARCH_COMPLETE=true; // to make sure we can start the search. This is due to asychronous nature of the code so we need to wait until one search is complete before moving to another search engine.
    saveSetting();
}



//This function will search for the topic in the setting and generates an array of links to look at.
function searchTopic(){
        var gettingActiveTab = browser.tabs.query({currentWindow: true,index:0});
    if(G_CURRENT_SEARCH_COMPLETE) {// if previous search is complete
        //     //How to navigate this new tab and remove it from the list.
        gettingActiveTab.then(doSearch,onError);
    }
}

function doSearch(_tabs) {
    var linkToOpen = "";
    if(G_CURRENT_SEARCH_SOURCE==G_SEARCH_SOURCE.google)
            linkToOpen = generateSearchURL(G_SEARCH_SOURCE.google);
    else if(G_CURRENT_SEARCH_SOURCE==G_SEARCH_SOURCE.duckduckgo)
            linkToOpen = generateSearchURL(G_SEARCH_SOURCE.duckduckgo);
    else if(G_CURRENT_SEARCH_SOURCE==G_SEARCH_SOURCE.bing)
        linkToOpen = generateSearchURL(G_SEARCH_SOURCE.bing);
    else if(G_CURRENT_SEARCH_SOURCE==G_SEARCH_SOURCE.yahoo)
        linkToOpen = generateSearchURL(G_SEARCH_SOURCE.yahoo);
    else{
            removeDuplicates()
            setState(G_STATUS_LIST.surfing);
            G_CURRENT_SEARCH_SOURCE=G_SEARCH_SOURCE.google;
            return;
    }
    var updating = browser.tabs.update(_tabs[0].id, {
        active: false,
        url: linkToOpen
    });
    updating.then(retrieveLinks(_tabs[0].id), onError);
}
// this funciton will generate search URL based on source type which can be google, duckduckgo, yahoo or bing
function generateSearchURL(_source){
    var url = "";
    var topic = getCurrentTopic();
    switch (_source){
        case G_SEARCH_SOURCE.google:
            url = "https://www.google.co.uk/search?q=" + topic;
            break;
        case G_SEARCH_SOURCE.duckduckgo:
            url = "https://duckduckgo.com/?q=" + topic + "&t=h_&ia=web";
            break;
        case G_SEARCH_SOURCE.bing:
            topic = topic.replace(" ", "+");
            url = "    https://www.bing.com/search?q=" + topic;
            break;
        case G_SEARCH_SOURCE.yahoo:
            topic = topic.replace(" ", "+");
            url="https://search.yahoo.com/search?p="+topic;
            break;
        default:
            console.log("in default!!!!");
            break;
    }

    return url;
}

function retrieveLinks(_tabID){
    activateRetrieveURLScript(_tabID);
}

function  activateRetrieveURLScript(_tabID) {
    var executing = browser.tabs.executeScript(
        _tabID, {
            file: "/retrieveURLs.js"
        });
    executing.then(retrievedSuccessfully, onError);
}
function retrievedSuccessfully(result) {
    G_CURRENT_SEARCH_COMPLETE=true;
    G_CURRENT_SEARCH_SOURCE+=1;//use the next search engine
}

function removeDuplicates(){
    var uniqueLinks = Array.from(new Set(G_OPENBUBBLE_SETTING.surfing.links));
    G_OPENBUBBLE_SETTING.surfing.links = uniqueLinks;
    saveSetting();
}

//look at what topic we are exploring, search and find new links.
function findMoreLinks(){

}

function handleActivated(activeInfo) {
    // restartAlarm(activeInfo.tabId);
    checkState();
}
browser.tabs.onActivated.addListener(handleActivated);

function onUpdated(tab) {
}

function updateFirstTab(tabs) {
    var gettingActiveTab = browser.tabs.query({index: 0});
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
//TODO: add error hangling for when recieving null
function loadNewTopic(_status,_response){
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

function onError(error) {
    console.log(`Error: ${error}`);
}

/*This function will surf the web using an array of links to look at. as soon as the array is empty, this can go back into searching to find new links to explore.*/
function surfTopic(){
    var gettingActiveTab = browser.tabs.query({currentWindow: true});
    //     //How to navigate this new tab and remove it from the list.
    gettingActiveTab.then((tabs) => {
        var linkToOpen = getRandomURL();
    var updating = browser.tabs.update(tabs[0].id, {
        active: false,
        url: linkToOpen
    });
    updating.then(browsedANewLink, onError);
});
}
function browsedANewLink(){
}

function getRandomURL(){
    checkLinks();
    var links = G_OPENBUBBLE_SETTING.surfing.links;
    var randomIndex = Math.floor(Math.random()*links.length);
    var url = links[randomIndex];
    G_OPENBUBBLE_SETTING.surfing.links.splice(randomIndex,1);
    saveSetting();
    return url;
}

function handleMessage(request, sender, sendResponse) {
    var linksList = request.results;
    for (var index=0; index<linksList.length;index++)
        G_OPENBUBBLE_SETTING.surfing.links.push(linksList[index].url)
    // setState(G_STATUS_LIST.surfing);//change status to surfing, this function will also automatically save the setting into sessions storage so no need to do it twice.
}

browser.runtime.onMessage.addListener(handleMessage);

