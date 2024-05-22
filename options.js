document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get("languageCode", function(data) {
    var languageCode = data.languageCode || "iten";
    document.getElementById("languageCode").value = languageCode;
  });

  document.getElementById("optionsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var languageCode = document.getElementById("languageCode").value;
    chrome.storage.sync.set({ "languageCode": languageCode }, function() {
      alert("Language code saved successfully!");
    });
  });
});

