// Function to get selected text on the page
function getSelectedText() {
    return window.getSelection().toString();
  }
  
  // Listen for messages from the popup requesting the selected text
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getText") {
      sendResponse({ text: getSelectedText() });
    }
  });
