import { getToken, SCOPES_NARROW, SCOPES_BROAD } from '../lib/auth.js'
import { createDrive } from '../lib/drive.js'
import { parseDriveUrl } from '../lib/driveUrl.js'
import { logAction } from '../lib/log.js'
import { explainAuthError, explainDriveError } from '../lib/diagnose.js'

const $ = (id) => document.getElementById(id)
const ROOT_NAME = 'Bookmarks mirror'

// Only outcomes go in the report, never file names or colleagues' emails.
const report = {
  chrome: navigator.userAgent.match(/Chrome\/[\d.]+/)?.[0],
  extensionId: chrome.runtime.id,
  connect: 'not run',
  accountDomain: null,
  folder: 'not run',
  target: 'not run',
  shortcut: 'not run',
  scopeUsed: null,
}

function renderReport() {
  $('report').value = Object.entries(report).map(([k, v]) => `${k}: ${v}`).join('\n')
}

function show(el, kind, html) {
  el.className = `result ${kind}`
  el.innerHTML = html
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const folderLink = (id) => `https://drive.google.com/drive/folders/${id}`

async function withBusy(button, fn) {
  button.disabled = true
  try {
    await fn()
  } finally {
    button.disabled = false
    renderReport()
  }
}

async function ensureRoot(drive) {
  const existing = await drive.findByAppProperties({ bmRole: 'root' })
  if (existing.length) return { folder: existing[0], created: false }
  const folder = await drive.createFolder(ROOT_NAME, 'root', { bmRole: 'root' })
  await logAction({ action: 'create', driveId: folder.id, after: { name: ROOT_NAME, parent: 'My Drive' }, note: 'Phase 1 test: root folder' })
  return { folder, created: true }
}

$('connect').addEventListener('click', () => withBusy($('connect'), async () => {
  try {
    await getToken({ interactive: true, scopes: SCOPES_NARROW })
  } catch (e) {
    report.connect = `failed: ${e.message}`
    return show($('r1'), 'bad', esc(explainAuthError(e)))
  }
  try {
    const { user } = await createDrive({ scopes: SCOPES_NARROW }).about()
    report.connect = 'ok'
    report.accountDomain = user.emailAddress.split('@')[1]
    show($('r1'), 'good', `Connected as <strong>${esc(user.emailAddress)}</strong>. If that is the wrong account, stop here and tell Claude.`)
  } catch (e) {
    report.connect = `token ok, Drive failed: ${e.status} ${e.reason}`
    show($('r1'), 'bad', esc(explainDriveError(e)))
  }
}))

$('folder').addEventListener('click', () => withBusy($('folder'), async () => {
  try {
    const { folder, created } = await ensureRoot(createDrive({ scopes: SCOPES_NARROW }))
    await chrome.storage.local.set({ rootFolderId: folder.id })
    report.folder = created ? 'created' : 'already existed, reused'
    show($('r2'), 'good', `${created ? 'Created' : 'Found'} <a href="${folderLink(folder.id)}" target="_blank" rel="noopener">${ROOT_NAME}</a> in My Drive.`)
  } catch (e) {
    report.folder = `failed: ${e.status || ''} ${e.reason || e.message}`
    show($('r2'), 'bad', esc(e.status ? explainDriveError(e) : explainAuthError(e)))
  }
}))

async function makeShortcut(scopes) {
  const out = $('r3')
  $('broad').hidden = true
  const parsed = parseDriveUrl($('docUrl').value.trim())
  if (!parsed.drive) return show(out, 'bad', 'That is not a Google Drive link.')
  if (!parsed.ok) return show(out, 'bad', esc(parsed.reason))

  const drive = createDrive({ scopes, interactive: true })
  report.scopeUsed = scopes === SCOPES_BROAD ? 'full drive' : 'narrow (drive.file + metadata.readonly)'

  let target
  try {
    target = await drive.getFile(parsed.id, { resourceKey: parsed.resourceKey })
  } catch (e) {
    report.target = `failed: ${e.status} ${e.reason}`
    await logAction({ action: 'skip', driveId: parsed.id, note: `Phase 1 test: target unreadable (${e.status} ${e.reason})` })
    return show(out, 'bad', esc(e.status ? explainDriveError(e, 'target') : explainAuthError(e)))
  }
  report.target = `readable, ${target.ownedByMe ? 'OWNED BY YOU (pick a colleague\'s Doc for a real test)' : 'owned by someone else'}`

  let root
  try {
    root = (await ensureRoot(drive)).folder
  } catch (e) {
    report.shortcut = `failed at folder: ${e.status} ${e.reason}`
    return show(out, 'bad', esc(explainDriveError(e)))
  }

  const existing = await drive.findByAppProperties({ bmRole: 'spike', bmTarget: parsed.id })
  if (existing.length) {
    report.shortcut = `ok (already existed) with ${report.scopeUsed}`
    return show(out, 'good', `A test shortcut to this file already exists in <a href="${folderLink(root.id)}" target="_blank" rel="noopener">${ROOT_NAME}</a>. Nothing new was created.`)
  }

  const name = `Phase 1 test: ${target.name}`
  try {
    const sc = await drive.createShortcut(name, root.id, parsed.id, {
      resourceKey: parsed.resourceKey,
      appProperties: { bmRole: 'spike', bmTarget: parsed.id },
    })
    await logAction({ action: 'create', driveId: sc.id, after: { name, parent: root.id, targetId: parsed.id }, note: 'Phase 1 test: shortcut' })
    report.shortcut = `ok with ${report.scopeUsed}`
    const owner = target.ownedByMe ? 'you' : esc(target.owners?.[0]?.displayName || 'someone else')
    show(out, 'good', `Created shortcut <strong>${esc(name)}</strong> in <a href="${folderLink(root.id)}" target="_blank" rel="noopener">${ROOT_NAME}</a>. The original is owned by ${owner} and was not changed.`)
  } catch (e) {
    report.shortcut = `failed: ${e.status} ${e.reason} with ${report.scopeUsed}`
    show(out, 'bad', esc(explainDriveError(e, 'shortcut')))
    if (scopes === SCOPES_NARROW && (e.status === 403 || e.status === 404)) $('broad').hidden = false
  }
}

$('shortcut').addEventListener('click', () => withBusy($('shortcut'), () => makeShortcut(SCOPES_NARROW)))
$('broad').addEventListener('click', () => withBusy($('broad'), () => makeShortcut(SCOPES_BROAD)))

$('copy').addEventListener('click', async () => {
  await navigator.clipboard.writeText($('report').value)
  $('copy').textContent = 'Copied'
})

renderReport()
