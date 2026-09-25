// Turns a bookmark URL into a Drive file or folder ID.
//
// Returns one of:
//   { drive: false }                              not a Google Drive link
//   { drive: true, ok: true, id, resourceKey, kind }
//   { drive: true, ok: false, reason }            a Drive link with no usable ID
//
// kind is 'doc' | 'sheet' | 'slides' | 'form' | 'drawing' | 'script' | 'file' | 'folder'.

const ID = '[A-Za-z0-9_-]{10,}'
const DOCS_KINDS = {
  document: 'doc',
  spreadsheets: 'sheet',
  presentation: 'slides',
  forms: 'form',
  drawings: 'drawing',
}

// "/u/1/" and "/a/example.org/" prefixes pick an account or domain. They say
// nothing about the file, so strip them before matching.
function stripAccountSegments(path) {
  return path.replace(/\/u\/\d+(?=\/)/g, '').replace(/\/a\/[^/]+(?=\/)/g, '')
}

function resourceKeyFrom(url) {
  return url.searchParams.get('resourcekey') || url.searchParams.get('resourceKey') || undefined
}

export function parseDriveUrl(raw) {
  let url
  try {
    url = new URL(raw)
  } catch {
    return { drive: false }
  }
  const host = url.hostname.toLowerCase()
  if (!['docs.google.com', 'drive.google.com', 'script.google.com'].includes(host)) {
    return { drive: false }
  }

  const path = stripAccountSegments(url.pathname)
  const resourceKey = resourceKeyFrom(url)
  const ok = (id, kind) => ({ drive: true, ok: true, id, resourceKey, kind })
  const fail = (reason) => ({ drive: true, ok: false, reason })
  let m

  if (host === 'docs.google.com') {
    m = path.match(/^\/(document|spreadsheets|presentation|forms|drawings)\/d\/([^/]+)/)
    if (m) {
      const kind = DOCS_KINDS[m[1]]
      // /forms/d/e/1FAIpQL.../viewform is the published respondent link. That
      // ID is not a Drive file ID, so there is nothing to point a shortcut at.
      if (m[2] === 'e') return fail('Published or respondent link (/d/e/). It has no Drive file ID; bookmark the editor link instead.')
      if (!new RegExp(`^${ID}$`).test(m[2])) return fail('The file ID in this link is malformed.')
      return ok(m[2], kind)
    }
    m = path.match(/^\/open$/)
    if (m && url.searchParams.get('id')) return checkId(url.searchParams.get('id'), 'file')
    return fail('Google Docs page that is not a specific file.')
  }

  if (host === 'script.google.com') {
    m = path.match(/^\/(?:d|home\/projects)\/([^/]+)/)
    if (m) return checkId(m[1], 'script')
    return fail('Apps Script page that is not a specific project.')
  }

  // drive.google.com
  m = path.match(/^\/file\/d\/([^/]+)/)
  if (m) return checkId(m[1], 'file')
  m = path.match(/^\/drive(?:\/mobile)?\/folders\/([^/]+)/)
  if (m) return checkId(m[1], 'folder')
  m = path.match(/^\/(?:open|uc)$/)
  if (m && url.searchParams.get('id')) return checkId(url.searchParams.get('id'), 'file')
  return fail('Drive view (for example My Drive, Shared with me, or search), not a specific file or folder.')

  function checkId(id, kind) {
    return new RegExp(`^${ID}$`).test(id) ? ok(id, kind) : fail('The file ID in this link is malformed.')
  }
}
