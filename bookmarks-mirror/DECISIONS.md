# Decisions

One line per technical choice. Newest phase at the bottom.

## Phase 1

- **Where the code lives:** `bookmarks-mirror/` in this repo, because it is the only repo this session can push to; it shares no code with the website and can move to its own repo any time.
- **Manifest version:** Manifest V3, the only version Chrome still loads.
- **Build and libraries:** none. Plain JavaScript modules, no npm packages, no bundler, so what you load is exactly what is in the folder.
- **Sign-in method:** `chrome.identity.getAuthToken` with a "Chrome extension" OAuth client, because Chrome refreshes the token silently and that lets the daily reconcile run unattended.
- **Consequence of that:** the mirror writes to whichever Google account the Chrome profile is signed in to; writing to a different account would need a switch to `launchWebAuthFlow` and a weekly re-approval.
- **OAuth scopes:** `drive.file` plus `drive.metadata.readonly`. Google itself then blocks the extension from editing any file it did not create, which enforces the "only touch our own items" rule below the code.
- **Scope fallback:** full `drive` scope only if the spike proves the narrow pair cannot create shortcuts to colleagues' files; the spike page tests narrow first and offers broad as a second button.
- **Consent screen audience:** Internal (Summit accounts only), which skips Google verification and the 7-day token expiry that External "Testing" apps get.
- **Extension ID:** derived by Chrome from the folder's location on disk, because generating a pinned key was blocked in the build sandbox; do not move the folder after setup, or the OAuth client needs the new ID.
- **Client ID placement:** in `manifest.json`, because `getAuthToken` only reads it there; a Chrome extension client ID is not a secret.
- **Drive access:** Drive REST API v3 through `fetch`, with `supportsAllDrives=true` so shared-drive targets work, and the `X-Goog-Drive-Resource-Keys` header for links that carry a resource key.
- **No destructive code:** the Drive wrapper has no delete, trash, or content-update function at all, so no bug can call one.
- **Identifying our own items:** private `appProperties` on each Drive item (`bmRole`, and later `bmId` and `bmTarget`); only this OAuth project can read or match them.
- **`bmRole` values:** `root` for "Bookmarks mirror" and `spike` for Phase 1 test shortcuts; later phases add `folder`, `shortcut`, and `orphans`, and reconcile will ignore `spike` items.
- **Local storage:** `chrome.storage.local`, not `storage.sync`, because the bookmark-to-Drive mapping and the log exceed sync quotas and belong to one machine.
- **Action log:** append-only array in `chrome.storage.local` with timestamp, action, bookmark ID, Drive ID, before, after; Phase 1 writes to it already.
- **URL parsing:** recognizes docs.google.com, drive.google.com, and script.google.com; strips `/u/N/` and `/a/domain/` segments; keeps `resourcekey`.
- **Published Form links** (`/forms/d/e/...`): skipped with a reason, because that ID is a public respondent ID with no Drive file behind it.
- **Drive "view" links** (My Drive, Shared with me, search): counted as skipped Drive links with a reason, separate from non-Drive bookmarks.
- **Tests:** Node's built-in test runner (`node --test bookmarks-mirror/test/*.test.mjs`), no framework.
- **Lint:** the repo's ESLint config, with a block adding the `chrome` global for this folder.
- **Spike report:** carries outcomes and your account's domain only, never file names or colleagues' emails, so it is safe to paste into chat.
- **Toolbar button in Phase 1:** opens the test page in a tab; it becomes the real popup in Phase 2.
- **Icons:** Chrome's default letter icon until Phase 4.
- **Styling:** Summit palette values copied from the website's `src/palette.js`, Arimo with Arial fallback, no web font download.
