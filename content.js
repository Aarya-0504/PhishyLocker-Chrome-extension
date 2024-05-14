// Send a message to the background script to get the current tab's URL
chrome.runtime.sendMessage({ action: "getTabUrl" }, function (response) {
    const url = response.url;
    // Now you can use the 'url' variable to send the URL to your FastAPI server
  });
      