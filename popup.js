document.getElementById("start").addEventListener("click", () => {
    const time = parseInt(document.getElementById("time").value, 10);
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.runtime.sendMessage(
        { action: "startFocus", duration: time, tabId: tabs[0].id },
        () => {
          document.getElementById("status").textContent = "Status: Focus mode ON";
        }
      );
    });
  });
  
  document.getElementById("stop").addEventListener("click", () => {
    const phrase = prompt("Type this phrase to stop: 'I will stay focused'");
    if (phrase === "I will stay focused") {
      chrome.runtime.sendMessage({ action: "stopFocus" }, () => {
        document.getElementById("status").textContent = "Status: Focus mode OFF";
      });
    } else {
      alert("Incorrect phrase. Keep focusing!");
    }
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "focusEnded") {
      document.getElementById("status").textContent = "Status: Focus mode OFF";
    }
  });
  