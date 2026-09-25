// Run with: node --test bookmarks-mirror/test/*.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseDriveUrl } from '../src/lib/driveUrl.js'

const ID = '1AbCdEfGhIjKlMnOpQrStUvWxYz_0123456789-ab'

const cases = [
  [`https://docs.google.com/document/d/${ID}/edit`, 'doc'],
  [`https://docs.google.com/document/u/1/d/${ID}/edit?usp=sharing`, 'doc'],
  [`https://docs.google.com/spreadsheets/d/${ID}/edit#gid=0`, 'sheet'],
  [`https://docs.google.com/presentation/d/${ID}/edit#slide=id.p`, 'slides'],
  [`https://docs.google.com/forms/d/${ID}/edit`, 'form'],
  [`https://docs.google.com/a/summitps.org/document/d/${ID}/edit`, 'doc'],
  [`https://docs.google.com/open?id=${ID}`, 'file'],
  [`https://drive.google.com/file/d/${ID}/view?usp=drive_link`, 'file'],
  [`https://drive.google.com/file/u/2/d/${ID}/view`, 'file'],
  [`https://drive.google.com/drive/folders/${ID}`, 'folder'],
  [`https://drive.google.com/drive/u/0/folders/${ID}?usp=sharing`, 'folder'],
  [`https://drive.google.com/drive/mobile/folders/${ID}`, 'folder'],
  [`https://drive.google.com/open?id=${ID}`, 'file'],
  [`https://script.google.com/d/${ID}/edit`, 'script'],
  [`https://script.google.com/home/projects/${ID}/edit`, 'script'],
]

for (const [url, kind] of cases) {
  test(`parses ${url}`, () => {
    const r = parseDriveUrl(url)
    assert.equal(r.ok, true)
    assert.equal(r.id, ID)
    assert.equal(r.kind, kind)
  })
}

test('keeps resourcekey', () => {
  const r = parseDriveUrl(`https://drive.google.com/drive/folders/${ID}?resourcekey=0-AbC_d-123`)
  assert.equal(r.resourceKey, '0-AbC_d-123')
  const r2 = parseDriveUrl(`https://docs.google.com/document/d/${ID}/edit?usp=sharing&resourcekey=0-xyz`)
  assert.equal(r2.resourceKey, '0-xyz')
})

test('non-Drive links are not Drive', () => {
  for (const u of ['https://example.com', 'https://sites.google.com/view/x', 'https://mail.google.com/mail/u/0', 'not a url', 'chrome://settings']) {
    assert.equal(parseDriveUrl(u).drive, false, u)
  }
})

test('Drive links without an item are skipped with a reason', () => {
  for (const u of [
    'https://drive.google.com/drive/my-drive',
    'https://drive.google.com/drive/u/1/shared-with-me',
    'https://docs.google.com/forms/d/e/1FAIpQLSf_long_published_id/viewform',
    'https://docs.google.com/document/d/short/edit',
    'https://docs.google.com/document/',
  ]) {
    const r = parseDriveUrl(u)
    assert.equal(r.drive, true, u)
    assert.equal(r.ok, false, u)
    assert.ok(r.reason, u)
  }
})
