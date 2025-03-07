chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ captchaVerified: false });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "verifyCaptcha") {
      chrome.storage.local.set({ captchaVerified: true });
  
      // Notify content script to remove overlay
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: removeOverlay,
          });
        }
      });
  
      sendResponse({ success: true });
    }
  });
  
  function removeOverlay() {
    let overlay = document.getElementById("captchaOverlay");
    if (overlay) {
      overlay.remove();
    }
  }
  