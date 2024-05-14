chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "getTabUrl") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        sendResponse({ url: tabs[0].url });
      });
      return true; // Needed for asynchronous response
    }
  });
  