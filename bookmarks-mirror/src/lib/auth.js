// OAuth via chrome.identity.getAuthToken. Chrome holds the refresh token and
// hands back a fresh access token silently, which is what lets the daily
// reconcile run with nobody at the keyboard.

// Narrow: the extension can create and edit only files it created itself
// (drive.file), and can read the names and types of everything else
// (metadata.readonly). Google enforces this, so the extension cannot modify a
// colleague's file even if the code had a bug.
export const SCOPES_NARROW = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
]

// Broad: full Drive access. Only used if the spike proves the narrow set cannot
// create shortcuts to files owned by other people.
export const SCOPES_BROAD = ['https://www.googleapis.com/auth/drive']

export async function getToken({ interactive = false, scopes = SCOPES_NARROW } = {}) {
  const result = await chrome.identity.getAuthToken({ interactive, scopes })
  // Chrome 105+ resolves to { token, grantedScopes }; older builds to a string.
  const token = typeof result === 'string' ? result : result?.token
  if (!token) throw new Error('No token returned')
  return token
}

export async function dropToken(token) {
  await chrome.identity.removeCachedAuthToken({ token })
}
