// Translates auth and Drive failures into plain language: what happened and
// what to do next.

export function explainAuthError(err) {
  const msg = String(err?.message || err)
  if (/not signed in|turned off browser signin/i.test(msg)) {
    return 'Chrome itself is not signed in to a Google account, or Chrome sign-in is turned off. Click your profile picture at the top right of Chrome and sign in. If that option is greyed out, Summit IT has disabled Chrome sign-in: see "If Google blocks you" in SETUP.md.'
  }
  if (/bad client id|invalid oauth2 client id|client_id/i.test(msg)) {
    return 'The Client ID in manifest.json is missing or wrong, or the extension ID in Google Cloud does not match. Recheck Parts E and F of SETUP.md.'
  }
  if (/did not approve|user denied|canceled|cancelled/i.test(msg)) {
    return 'The Google permission window closed without approval. If it showed "Access blocked" or "admin_policy_enforced", Summit IT is blocking the app: see "If Google blocks you" in SETUP.md. If you closed it yourself, just try again.'
  }
  if (/not granted or revoked/i.test(msg)) {
    return 'Permission was not granted yet. Click the button again and approve the Google window.'
  }
  return `Unexpected sign-in error: ${msg}`
}

export function explainDriveError(err, context) {
  const status = err?.status
  const reason = err?.reason || ''
  if (/accessNotConfigured|SERVICE_DISABLED/i.test(reason) || /has not been used|is disabled/i.test(err?.message || '')) {
    return 'The Google Drive API is not turned on for your Cloud project. Redo Part B of SETUP.md, wait two minutes, and try again.'
  }
  if ((status === 403 || status === 404) && context === 'shortcut') {
    return 'Your account can see the file, but the extension\'s narrow permission could not point a shortcut at it. Use the "Try again with full Drive permission" button below.'
  }
  if (status === 404 && context === 'target') {
    return 'Drive cannot see that file from your account. Either you no longer have access, the link is broken, or it needs a resource key that the link does not include. Open the link in Chrome to check.'
  }
  if (status === 403 && /domainPolicy|appNotAuthorized|insufficient/i.test(reason + (err?.message || ''))) {
    return 'Google refused on policy or permission grounds. This usually means a Summit admin setting limits third-party apps. See "If Google blocks you" in SETUP.md.'
  }
  return `Drive returned an error (${status || 'no status'} ${reason}): ${err?.message || err}`
}
