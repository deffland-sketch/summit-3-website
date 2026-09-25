// Append-only action log in chrome.storage.local. Every Drive write goes
// through here so any change can be traced and reversed by hand.
//
// Entry: { ts, action, bookmarkId, driveId, before, after, note }
// action: 'create' | 'rename' | 'move' | 'orphan' | 'skip'

const KEY = 'actionLog'

export async function logAction(entry) {
  const { [KEY]: log = [] } = await chrome.storage.local.get(KEY)
  log.push({ ts: new Date().toISOString(), bookmarkId: null, driveId: null, before: null, after: null, ...entry })
  await chrome.storage.local.set({ [KEY]: log })
}

export async function readLog() {
  const { [KEY]: log = [] } = await chrome.storage.local.get(KEY)
  return log
}
