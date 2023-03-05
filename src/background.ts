chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return

  const { origin } = new URL(tab.url)
  const results = await chrome.bookmarks.search({ query: origin })

  if (results.length === 1) {
    await chrome.bookmarks.update(results[0].id, { url: tab.url })
  }
})
