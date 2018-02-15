function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        reddit: document.querySelector("#reddit").value,
        facebook: document.querySelector("#facebook").value,
        pinterest: document.querySelector("#pinterest").value,
        instagram: document.querySelector("#instagram").value,
        twitter: document.querySelector("#twitter").value

    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#reddit").value = result.reddit || "reddit";
        document.querySelector("#facebook").value = result.facebook || "facebook";
        document.querySelector("#twitter").value = result.twitter || "twitter";
        document.querySelector("#instagram").value = result.instagram || "instagram";
        document.querySelector("#pinterest").value = result.pinterest || "pinterest";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("color");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);