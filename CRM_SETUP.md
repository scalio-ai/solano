# Solano CRM — Setup

A Google Sheet that automatically gets a new row every time someone submits
the "Book a Free Demo" form on the website. Free, no third-party CRM
subscription, lives entirely in `solano.ai.solutions@gmail.com`'s Google
account.

## How it works

```
Website form submit
   │
   ├──► EmailJS  → confirmation email to the client
   ├──► EmailJS  → notification email to solano.ai.solutions@gmail.com
   └──► Google Sheet (this setup) → new row in the "Leads" tab
```

The website POSTs the submission to a small Google Apps Script "Web App"
attached to the Sheet, which appends a row. No webhook service, no paid
tier, no API keys to manage beyond one shared secret you make up yourself.

## One-time setup (~10 minutes)

**1. Create the spreadsheet**

- Go to [sheets.google.com](https://sheets.google.com), signed in as
  `solano.ai.solutions@gmail.com`.
- Create a new blank spreadsheet. Name it **"Solano CRM"**.

**2. Add the backend script**

- In the Sheet, go to **Extensions → Apps Script**.
- Delete whatever placeholder code is in `Code.gs`.
- Open [`crm/AppsScript.gs`](crm/AppsScript.gs) from this repo, copy the
  entire file, and paste it into the Apps Script editor.
- Click the **Save** icon (or Ctrl/Cmd+S).

**3. Build the sheet**

- In the Apps Script editor toolbar, pick **setupCRM** from the function
  dropdown (next to the Run button), then click **Run**.
- The first time, Google will ask you to authorize the script — click
  through (it's your own script on your own sheet, the "unverified app"
  warning is expected for personal scripts).
- Switch back to the spreadsheet tab — you should now see a **Leads** tab
  with a copper header row, a Status dropdown, and color-coded formatting
  already built in.

**4. Set the shared secret**

This stops random people from finding your Web App URL and spamming fake
rows into your CRM.

- Back in the Apps Script editor, click the **gear icon** (Project
  Settings) in the left sidebar.
- Scroll to **Script Properties → Add script property**.
- Property: `CRM_SECRET`. Value: any long random string you make up
  (e.g. mash the keyboard for 20+ characters). Save it somewhere — you'll
  need this exact value again in step 6.

**5. Deploy as a Web App**

- Click **Deploy → New deployment**.
- Click the gear next to "Select type" → choose **Web app**.
- Settings:
  - **Execute as:** Me (your Google account)
  - **Who has access:** Anyone
- Click **Deploy**, authorize again if prompted.
- Copy the **Web app URL** it gives you — looks like
  `https://script.google.com/macros/s/AKfycb.../exec`.

**6. Connect the website**

- Open [`js/form.js`](js/form.js) in this repo, find the `CRM_CONFIG` block
  near the top:
  ```js
  const CRM_CONFIG = {
    webhookUrl: 'YOUR_APPS_SCRIPT_WEB_APP_URL',
    secret:     'YOUR_CRM_SECRET',
  };
  ```
- Replace `'YOUR_APPS_SCRIPT_WEB_APP_URL'` with the URL from step 5.
- Replace `'YOUR_CRM_SECRET'` with the exact value from step 4.
- Bump the cache-busting version on `js/form.js?v=4` to `?v=5` in
  `book.html` (so browsers fetch the updated file instead of a cached
  copy), then commit and push.

That's it. Submit a real test through the demo form and you should see a
new row land in the **Leads** tab within a couple seconds.

## Using the CRM day to day

- **Status column** is a dropdown: New → Contacted → Demo Scheduled → Won
  / Lost. Each value is color-coded automatically.
- New leads always come in with Status = "New" — that's your queue.
- Everything you'd want to follow up on is in one row: contact info,
  business details, what they're interested in, and their notes.
- The filter on the header row lets you sort/filter by Status, Trade,
  Service Area, etc. without disturbing anyone else's view.

## If you ever need to change the column layout

Edit the `HEADERS` array and `fieldMap` in `crm/AppsScript.gs`, paste the
updated script back into the Apps Script editor, save, and re-run
`setupCRM` — it only touches formatting/headers, never your existing lead
rows. If you add a new field, you'll also need to add it to the `data`
object built in `js/form.js`'s `sendSolanoEmails` function so it actually
gets sent.

## Re-deploying after script changes

`setupCRM` changes don't need a re-deploy. But if you ever edit `doPost`
(the part that receives submissions), you must create a **new
deployment** (Deploy → Manage deployments → pencil icon → New version) —
Apps Script Web Apps don't pick up code changes on an existing deployment
URL automatically.
