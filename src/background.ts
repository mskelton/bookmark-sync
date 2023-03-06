function findBookmark(tab: chrome.tabs.Tab) {
  if (!tab.url) {
    return []
  }

  const { origin } = new URL(tab.url)
  return chrome.bookmarks.search({ query: origin })
}

async function updateIcon(tabId: number, tab: chrome.tabs.Tab) {
  const results = await findBookmark(tab)
  const icon =
    results?.[0]?.url === tab.url ? "icon-48-active.png" : "icon-48.png"

  await chrome.action.setIcon({ path: `./images/${icon}`, tabId })
}

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  updateIcon(tabId, tab)
})
chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  updateIcon(tabId, tab)
})

chrome.action.onClicked.addListener(async (tab) => {
  const results = await findBookmark(tab)

  if (results.length === 1) {
    await chrome.bookmarks.update(results[0].id, { url: tab.url })
    await chrome.action.setIcon({
      path: `./images/icon-48-active.png`,
      tabId: tab.id,
    })
  }
})
