document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('enabledCheckbox');

  chrome.storage.sync.get('enabled', (data) => {
    checkbox.checked = data.enabled;
  });

  checkbox.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: checkbox.checked });
  });
});

