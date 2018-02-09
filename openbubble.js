

browser.runtime.onInstalled.addListener(function() {
    browser.tabs.create({'url': "http://www.duckduckgo.com"});
});
