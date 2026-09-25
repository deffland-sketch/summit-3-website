// Service worker. In Phase 1 its only job is opening the auth spike page when
// the toolbar icon is clicked. Bookmark listeners and the daily alarm arrive in
// Phase 3.

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('src/spike/spike.html') })
})
