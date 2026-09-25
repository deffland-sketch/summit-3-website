// Thin wrapper over the Drive v3 REST API. Plain fetch, no client library.
//
// Deliberately missing: any delete, trash, or update-content call. The
// extension never deletes or trashes anything, so the code to do it does not
// exist.

import { getToken, dropToken } from './auth.js'

const API = 'https://www.googleapis.com/drive/v3/files'
export const FOLDER = 'application/vnd.google-apps.folder'
export const SHORTCUT = 'application/vnd.google-apps.shortcut'

export class DriveError extends Error {
  constructor(status, reason, message) {
    super(message || `Drive API error ${status}`)
    this.status = status
    this.reason = reason
  }
}

export function createDrive({ scopes, interactive = false } = {}) {
  async function call(method, url, { query = {}, body, resourceKeys } = {}) {
    const params = new URLSearchParams({ supportsAllDrives: 'true', ...query })
    const full = `${url}?${params}`
    for (let attempt = 0; attempt < 2; attempt++) {
      const token = await getToken({ interactive, scopes })
      const headers = { Authorization: `Bearer ${token}` }
      if (body) headers['Content-Type'] = 'application/json'
      if (resourceKeys) headers['X-Goog-Drive-Resource-Keys'] = resourceKeys
      const res = await fetch(full, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      })
      if (res.status === 401 && attempt === 0) {
        await dropToken(token)
        continue
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const err = data.error || {}
        throw new DriveError(res.status, err.errors?.[0]?.reason || err.status, err.message)
      }
      return data
    }
  }

  const keyHeader = (id, resourceKey) => (resourceKey ? `${id}/${resourceKey}` : undefined)

  return {
    about: () =>
      call('GET', 'https://www.googleapis.com/drive/v3/about', { query: { fields: 'user' } }),

    getFile: (id, { resourceKey, fields = 'id,name,mimeType,ownedByMe,owners(emailAddress,displayName),trashed' } = {}) =>
      call('GET', `${API}/${id}`, { query: { fields }, resourceKeys: keyHeader(id, resourceKey) }),

    // Finds items this extension created, by the private appProperties it
    // stamps on them. appProperties are visible only to this OAuth project, so
    // other apps' files and colleagues' files can never match.
    findByAppProperties: async (props) => {
      const clauses = Object.entries(props).map(
        ([k, v]) => `appProperties has { key='${k}' and value='${String(v).replace(/'/g, "\\'")}' }`,
      )
      const q = [...clauses, 'trashed = false'].join(' and ')
      const data = await call('GET', API, {
        query: {
          q,
          fields: 'files(id,name,mimeType,parents,appProperties)',
          pageSize: '100',
          includeItemsFromAllDrives: 'true',
          corpora: 'allDrives',
        },
      })
      return data.files || []
    },

    createFolder: (name, parentId, appProperties) =>
      call('POST', API, {
        query: { fields: 'id,name,parents,webViewLink' },
        body: { name, mimeType: FOLDER, parents: [parentId], appProperties },
      }),

    createShortcut: (name, parentId, targetId, { resourceKey, appProperties } = {}) =>
      call('POST', API, {
        query: { fields: 'id,name,parents,webViewLink,shortcutDetails' },
        body: {
          name,
          mimeType: SHORTCUT,
          parents: [parentId],
          shortcutDetails: { targetId },
          appProperties,
        },
        resourceKeys: keyHeader(targetId, resourceKey),
      }),
  }
}
