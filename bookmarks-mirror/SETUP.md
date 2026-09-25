# Bookmarks Mirror: Phase 1 setup

About 30 minutes. Do Part A first. It is the two-minute test of whether Summit's Google settings let you do this at all, and if it fails, nothing after it matters yet.

Google renames buttons in Cloud Console now and then. If a label below doesn't match exactly, look for the closest match and keep going.

---

## Part A: The go/no-go test (2 minutes)

1. In Chrome, make sure you're signed in to the Google account you want the mirror to write to (your picture at the top right of Chrome).
2. Go to **console.cloud.google.com**.
3. If Google shows a welcome screen, pick your country, check the Terms of Service box, and click **Agree and continue**.
4. At the top left, next to the "Google Cloud" logo, click the **project picker** (it may say "Select a project").
5. In the window that opens, click **New project** (top right of that window).
6. For **Project name**, type `Bookmarks Mirror`.
7. Check that **Organization** says `summitps.org`. Leave **Location** as is.
8. Click **Create**.

**What you should see:** a notification that the project was created. Keep going to Part B.

**If instead** you see "You don't have permission to create a project," a greyed-out Create button, or a quota message, you've hit block 1. Stop and go to [If Google blocks you](#if-google-blocks-you).

---

## Part B: Turn on the Google Drive API

1. Click the project picker again and click **Bookmarks Mirror** so it's the active project. The top left should now say Bookmarks Mirror.
2. In the search bar at the top of the page, type `Google Drive API` and click the result with that name.
3. Click the blue **Enable** button. Wait until the page changes to show API details.

---

## Part C: Set up the permission screen

This is the screen Google shows when the extension asks for access.

1. In the search bar at the top, type `Google Auth Platform` and click it.
2. If you see "Google Auth Platform not configured yet," click **Get started**.
3. **App name:** type `Bookmarks Mirror`. **User support email:** choose your email from the list. Click **Next**.
4. **Audience:** choose **Internal**. Click **Next**.
   - If **Internal** is missing or greyed out, the project isn't inside Summit's organization. Stop and tell Claude.
5. **Contact information:** type your email. Click **Next**.
6. Check the box agreeing to the Google API Services User Data Policy. Click **Continue**, then **Create**.

---

## Part D: Load the extension in Chrome

You need the extension's ID before you can finish Google's side, so the extension goes in now.

1. Go to **github.com/deffland-sketch/summit-3-website/tree/claude/gallant-archimedes-j0rbdn**.
2. Click the green **Code** button, then **Download ZIP**.
3. Open your Downloads folder and unzip the file (Mac: double-click it. Windows: right-click it, choose **Extract All**, then **Extract**).
4. Inside the unzipped folder, find the folder named **bookmarks-mirror**. Move it to your **Documents** folder.
   - Important: leave it there for good. Chrome ties the extension's ID to where the folder lives. If you move it later, Part E has to be redone.
5. In Chrome's address bar, type `chrome://extensions` and press Enter.
6. At the top right of that page, turn on **Developer mode**.
7. Click **Load unpacked** (top left).
8. Go to Documents, click once on the **bookmarks-mirror** folder, and click **Select** (Mac) or **Select Folder** (Windows).
9. A card named **Bookmarks Mirror** appears. Under the name is an **ID**, a string of 32 lowercase letters. Select it and copy it. You'll paste it in the next part.

---

## Part E: Create the sign-in key (OAuth client)

1. Go back to the Cloud Console tab. In the left menu of Google Auth Platform, click **Clients**.
2. Click **Create client** (or **+ Create client**).
3. **Application type:** choose **Chrome extension**.
4. **Name:** type `Bookmarks Mirror extension`.
5. **Item ID:** paste the ID you copied in Part D, step 9.
6. Click **Create**.
7. A window shows your **Client ID**, a long string ending in `.apps.googleusercontent.com`. Copy it. (If the window closes, click the client's name in the Clients list to see it again.)

---

## Part F: Give the extension its Client ID

Two ways to do this. Pick one.

**Option 1: do it yourself (3 minutes)**

1. Open Documents, then the **bookmarks-mirror** folder.
2. Open **manifest.json** in a plain text editor.
   - Mac: right-click it, choose **Open With**, then **TextEdit**.
   - Windows: right-click it, choose **Open with**, then **Notepad**.
3. Find this line:
   `"client_id": "PASTE_YOUR_CLIENT_ID_HERE.apps.googleusercontent.com",`
4. Select only `PASTE_YOUR_CLIENT_ID_HERE.apps.googleusercontent.com` (everything between the two quote marks) and paste your Client ID over it. Don't type any quote marks yourself; TextEdit swaps in curly quotes that break the file.
5. Save (Mac: Command-S. Windows: Ctrl-S) and close the file.

**Option 2: have Claude do it**

1. Paste the Client ID into the chat. It isn't a password; Chrome extension client IDs are designed to be public.
2. Claude commits it. Then download the ZIP again (Part D, steps 1 to 3) and replace the files inside your existing Documents/bookmarks-mirror folder. Keep the folder itself where it is.

**Then, either way:**

6. Go to `chrome://extensions`, find the Bookmarks Mirror card, and click its **circular reload arrow**.

---

## Part G: Run the test

1. In Chrome's toolbar, click the **puzzle-piece icon**, then the **pin** next to Bookmarks Mirror so its icon stays visible.
2. Click the **Bookmarks Mirror icon**. A page titled "Bookmarks Mirror: Phase 1 test" opens.
3. **Step 1:** click **Connect**. A Google window opens.
   - Good: it names Bookmarks Mirror and asks to "see information about your Google Drive files" and "see, edit, create, and delete only the specific Google Drive files you use with this app." Click **Allow**. (The word "delete" is Google's standard wording for that permission. The extension contains no delete code.)
   - Blocked: it says "Access blocked," "This app is blocked," or "admin_policy_enforced." That's block 2. Take a screenshot and go to [If Google blocks you](#if-google-blocks-you).
4. **Step 2:** click **Create folder**. Click the "Bookmarks mirror" link that appears to see it in Drive.
5. **Step 3:** open a Google Doc a colleague owns and has shared with you. Copy its address from the top of Chrome, paste it into the **Doc link** box, and click **Create shortcut**.
   - If a button appears saying **Try again with full Drive permission**, click it and approve the second Google window. That tells us the narrow permission isn't enough, which is exactly what this test is for.
6. Open "Bookmarks mirror" in Drive. You should see the shortcut (a Doc icon with a small arrow). The colleague's Doc is untouched; its "Last edit" line won't have changed.
7. Click **Copy report** at the bottom of the test page and paste it into the chat, along with your answers to the Phase 1 questions.

---

## If Google blocks you

There are three places Summit's settings can stop this:

| Where it stopped | What it means |
|---|---|
| Part A, step 8: can't create a project | Summit limits who can create Google Cloud projects |
| Part G, step 3: "Access blocked" or "admin_policy_enforced" | Summit blocks apps that IT hasn't approved from reaching Drive |
| Chrome won't let you sign in to the browser | Summit has turned off Chrome sign-in, which this sign-in method needs |

**What to ask IT.** Copy this whole message, delete the numbered items that don't apply, and fill in the Client ID if you have it:

```
Hi [name],

I'm building a small personal Chrome extension that keeps a copy of my bookmark folders in my own Google Drive, as folders and shortcuts. It runs only in my browser and will never be published. Google limits it to editing files it creates itself, it can see the names of files I already have access to, and it has no ability to delete anything.

I got stuck on a Summit setting while setting it up. Could you help with the item below?

1. Google Cloud project: either give me the Project Creator role in the summitps.org organization, or create a project called "Bookmarks Mirror" and make me Owner.
2. Third-party app access: in Admin console > Security > Access and data control > API controls > Manage Third-Party App Access, add OAuth client ID [paste Client ID] and set it to Trusted. It requests two Drive scopes: drive.file and drive.metadata.readonly.
3. Chrome sign-in: allow browser sign-in for my account so a Chrome extension can use it.

Happy to jump on the phone if that's easier. Thanks!

Dan
```

**Fallbacks if IT says no or it will take a while:**

| Option | How it works | Trade-off |
|---|---|---|
| A. Personal Cloud project, Summit Drive (recommended if only block 1) | Create the project in Part A with a personal Gmail account, choose **External** in Part C, add your Summit email as a test user | Google shows an "unverified app" warning once, and in Testing mode asks you to re-approve every 7 days until the app is switched to "In production." Does not help with block 2. |
| B. Apps Script version | The extension hands your bookmark tree to a small Apps Script that runs inside your Summit account and does the Drive work | Often allowed when outside apps aren't, but not guaranteed; it's a rebuild of the Drive half, so Claude would test it before building |
| C. Personal Drive | Run everything on a personal Google account | Shortcuts only work for files shared with that personal account, which rules out most Summit files |
