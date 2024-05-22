chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ "languageCode": "iten" }, function() {
    console.log("Default language code set to 'iten'");
  });
});

function codeToWord(code) {
    if (code == "iten") return "Italian";
    if (code == "esen") return "Spanish";
    if (code == "fren") return "French";
    return code;
}


chrome.storage.sync.get("languageCode", function(data) {
  var lang = data.languageCode || "iten";
  const language = codeToWord(lang);

  chrome.contextMenus.create({
    id: "wordReferenceSearch",
    title: `Open in WordReference (${language})`,
    contexts: ["selection"]
  });
});

chrome.storage.sync.onChanged.addListener(function(changes, area) {
  if (changes.languageCode) {
    var newLanguageCode = changes.languageCode.newValue;
    chrome.contextMenus.remove("wordReferenceSearch")
    chrome.contextMenus.create({
      id: "wordReferenceSearch",
      title: `Open in WordReference (${language})`,
      contexts: ["selection"]
    });
  }
});


// chrome.contextMenus.create({
//     id: "extensionSettings",
//     title: "Extension Settings",
//     contexts: ["browser_action"]
// });



chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "wordReferenceSearch") {
    chrome.storage.sync.get("languageCode", function(data) {
      var lang = data.languageCode || "iten";
      var selectedWord = info.selectionText;
      chrome.tabs.create({
        url: "https://www.wordreference.com/" + lang + "/" + encodeURIComponent(selectedWord)
      });
    });
  }
});

