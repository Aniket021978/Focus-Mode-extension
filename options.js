document.getElementById("save").addEventListener("click", () => {
    const phrase = document.getElementById("phrase").value;
    chrome.storage.local.set({ unlockPhrase: phrase }, () => {
      alert("Unlock phrase saved!");
    });
  });
  