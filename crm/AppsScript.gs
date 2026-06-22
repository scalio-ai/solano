/**
 * ============================================================
 * SOLANO AI — DEMO REQUEST CRM (Google Apps Script backend)
 * ============================================================
 *
 * This is the server-side code behind the Solano CRM spreadsheet. It does
 * two things:
 *   1. setupCRM() — run once to build the entire "Leads" sheet: headers,
 *      copper-branded header row, column widths, a Status dropdown, color-
 *      coded conditional formatting, alternating row banding, and a filter.
 *   2. doPost(e) — the Web App endpoint the website calls on every demo
 *      request submission, which appends a new row to that sheet.
 *
 * See CRM_SETUP.md in the repo root for the full step-by-step setup.
 */

const SHEET_NAME = 'Leads';

const HEADERS = [
  'Timestamp', 'Status', 'First Name', 'Last Name', 'Email', 'Phone', 'Role',
  'Company', 'Trade', 'Service Area', 'Current Website', 'Team Size',
  'Biggest Challenge', 'Services Interested In', 'Notes', 'Source'
];

const STATUS_OPTIONS = ['New', 'Contacted', 'Demo Scheduled', 'Won', 'Lost'];

const STATUS_COLORS = [
  { value: 'New',             bg: '#DCE9FB', fg: '#244680' },
  { value: 'Contacted',       bg: '#FCEFD2', fg: '#8A6500' },
  { value: 'Demo Scheduled',  bg: '#F4E4D2', fg: '#A8622A' },
  { value: 'Won',             bg: '#DCF5E3', fg: '#15803D' },
  { value: 'Lost',            bg: '#F1EAE0', fg: '#756C5B' },
];

const MAX_ROWS = 2000; // headroom for formatting/validation/banding

/**
 * Run this ONCE from the Apps Script editor (Run ▶ → setupCRM) to build
 * out the whole sheet. Safe to re-run later — it rebuilds formatting
 * without touching any rows you've already added.
 */
function setupCRM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  // Clean up the default empty "Sheet1" if it's untouched
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && sheet1.getName() !== SHEET_NAME && sheet1.getLastRow() === 0) {
    ss.deleteSheet(sheet1);
  }

  // Headers (only overwrite row 1, never touch existing lead rows)
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setBackground('#C47A3C')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(10)
    .setVerticalAlignment('middle');
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);

  // Column widths tuned per field
  const widths = {
    'Timestamp': 150, 'Status': 120, 'First Name': 100, 'Last Name': 100,
    'Email': 200, 'Phone': 120, 'Role': 90, 'Company': 160, 'Trade': 110,
    'Service Area': 140, 'Current Website': 180, 'Team Size': 90,
    'Biggest Challenge': 220, 'Services Interested In': 220, 'Notes': 260,
    'Source': 120,
  };
  HEADERS.forEach((h, i) => sheet.setColumnWidth(i + 1, widths[h] || 130));

  // Status dropdown
  const statusCol = HEADERS.indexOf('Status') + 1;
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, statusCol, MAX_ROWS - 1, 1).setDataValidation(rule);

  // Color-coded conditional formatting on Status
  const statusRange = sheet.getRange(2, statusCol, MAX_ROWS - 1, 1);
  const rules = STATUS_COLORS.map(r =>
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(r.value)
      .setBackground(r.bg)
      .setFontColor(r.fg)
      .setRanges([statusRange])
      .build()
  );
  sheet.setConditionalFormatRules(rules);

  // Alternating row banding for readability
  const dataRange = sheet.getRange(1, 1, MAX_ROWS, HEADERS.length);
  dataRange.getBandings().forEach(b => b.remove());
  const banding = dataRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
  banding.setHeaderRowColor('#C47A3C');
  banding.setFirstRowColor('#FFFFFF');
  banding.setSecondRowColor('#F5F1E8');

  // Filter on the header row
  const existingFilter = sheet.getFilter();
  if (existingFilter) existingFilter.remove();
  sheet.getRange(1, 1, 1, HEADERS.length).createFilter();

  // Wrap + top-align the long text columns
  sheet.getRange(2, 1, MAX_ROWS - 1, HEADERS.length).setVerticalAlignment('top');
  ['Biggest Challenge', 'Services Interested In', 'Notes', 'Company', 'Current Website']
    .forEach(h => sheet.getRange(2, HEADERS.indexOf(h) + 1, MAX_ROWS - 1, 1).setWrap(true));

  sheet.autoResizeColumn(HEADERS.indexOf('Email') + 1);

  SpreadsheetApp.getUi().alert(
    'CRM sheet is ready.\n\nNext: Deploy → New deployment → Web app, then ' +
    'set CRM_SECRET in Project Settings → Script Properties, and follow ' +
    'CRM_SETUP.md to connect the website.'
  );
}

/**
 * Web App entry point. The website POSTs a JSON body (as text/plain, to
 * dodge a CORS preflight) containing all the form fields plus a shared
 * `secret` that must match the CRM_SECRET script property.
 */
function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('CRM_SECRET');
    const payload = JSON.parse(e.postData.contents);

    if (!secret || payload.secret !== secret) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    const fieldMap = {
      'Timestamp': () => new Date(),
      'Status': () => 'New',
      'Source': () => 'Website Form',
      'First Name': () => payload.firstName || '',
      'Last Name': () => payload.lastName || '',
      'Email': () => payload.email || '',
      'Phone': () => payload.phone || '',
      'Role': () => payload.role || '',
      'Company': () => payload.companyName || '',
      'Trade': () => payload.trade || '',
      'Service Area': () => payload.serviceArea || '',
      'Current Website': () => payload.currentWebsite || '',
      'Team Size': () => payload.teamSize || '',
      'Biggest Challenge': () => payload.biggestChallenge || '',
      'Services Interested In': () => payload.services || '',
      'Notes': () => payload.message || '',
    };

    const row = HEADERS.map(h => (fieldMap[h] ? fieldMap[h]() : ''));
    sheet.appendRow(row);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
