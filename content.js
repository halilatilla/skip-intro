let skipInterval;
let hasSkipped = false;

function findAndClickSkipButton() {
  if (hasSkipped) {
    clearInterval(skipInterval);
    return;
  }

  const buttons = Array.from(document.getElementsByTagName('button'));
  const skipButton = buttons.find(button => 
    button.textContent && button.textContent.trim().toLowerCase() === 'skip intro'
  );

  if (skipButton) {
    skipButton.click();
    console.log('Intro skipped!');
    hasSkipped = true;
    clearInterval(skipInterval);
  }
}

function startSkipCheck() {
  hasSkipped = false;
  skipInterval = setInterval(findAndClickSkipButton, 1000); // Check every second
}

// Start checking when the video player is loaded
function checkForVideoPlayer() {
  const videoPlayer = document.querySelector('video');
  if (videoPlayer) {
    startSkipCheck();
  } else {
    setTimeout(checkForVideoPlayer, 1000); // Check again after 1 second
  }
}

// Listen for navigation events
let currentUrl = location.href;
const urlObserver = new MutationObserver(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    checkForVideoPlayer();
  }
});

urlObserver.observe(document.body, { childList: true, subtree: true });

// Initial check
checkForVideoPlayer();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkStatus') {
    sendResponse({status: 'ready'});
  }
});

