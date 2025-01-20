chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('primevideo.com')) {
    chrome.tabs.sendMessage(tabId, { action: 'checkStatus' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (response && response.status === 'ready') {
        console.log('Content script is ready');
      }
    });
  }
});

