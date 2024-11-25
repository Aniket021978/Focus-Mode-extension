let focusTabId = null;
let timer = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startFocus") {
    focusTabId = message.tabId;
    startFocusTimer(message.duration);
    chrome.action.setBadgeText({ text: "ON" });
  } else if (message.action === "stopFocus") {
    endFocusMode();
  }
  sendResponse({ success: true });
});

function startFocusTimer(duration) {
  if (isNaN(duration) || duration <= 0) {
    return;
  }
  timer = setTimeout(() => {
    endFocusMode();
  }, duration * 60 * 1000);
}

function endFocusMode() {
    focusTabId = null;
    clearTimeout(timer);
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];
        chrome.runtime.sendMessage({ action: "focusEnded" }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn("Message could not be delivered:", chrome.runtime.lastError.message);
          }
        });
      }
    });
  }
  

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (focusTabId && activeInfo.tabId !== focusTabId) {
    attemptTabSwitch(focusTabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === focusTabId) {
    endFocusMode();
  }
});

function attemptTabSwitch(tabId, retries = 3) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (chrome.runtime.lastError || tabs.length === 0) {
      return;
    }

    const activeTab = tabs[0];
    if (activeTab.id !== tabId) {
      chrome.tabs.update(tabId, { active: true }, (tab) => {
        if (chrome.runtime.lastError) {
          if (chrome.runtime.lastError.message.includes("Tabs cannot be edited right now")) {
            if (retries > 0) {
              setTimeout(() => attemptTabSwitch(tabId, retries - 1), 500);
            }
          }
        }
      });
    }
  });
}
