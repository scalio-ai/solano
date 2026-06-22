/* ============================================================
   SOLANO AI — Form Email Handler (EmailJS)
   ============================================================

   EMAIL SETUP (EmailJS — free tier: 200 emails/month)
   ─────────────────────────────────────────────────────────────
   1. Go to https://www.emailjs.com and sign up (free)
   2. Connect a Gmail service → copy the Service ID
   3. Create TWO email templates in the EmailJS dashboard:

      Template A — client confirmation
        To Email:  {{to_email}}
        Subject:   We received your demo request — Solano AI
        Body type: HTML
        Body:      {{{message_html}}}

      Template B — owner notification
        To Email:  solano.ai.solutions@gmail.com  (hardcode in dashboard)
        Subject:   New Demo Request — {{company_name}}
        Body type: HTML
        Body:      {{{message_html}}}

      IMPORTANT: Use triple braces {{{message_html}}} so EmailJS
      renders the HTML without escaping it.

   4. Copy your Public Key from Account → API Keys
   5. Fill in the four config values below.
   ============================================================ */

const EMAILJS_CONFIG = {
  publicKey:         'EyK413UtkpdYKFHzw',
  serviceId:         'service_l220jnt',
  clientTemplateId:  'template_tvrbq3i',
  ownerTemplateId:   'template_927yi2a',
};

// ─── Init ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
});

// ─── Email Builders ──────────────────────────────────────────

function buildClientEmailHtml(data) {
  const servicesHtml = data.services
    ? data.services.split(', ').map(s =>
        `<span style="display:inline-block;background:#F4E4D2;border:1px solid #E3C39C;border-radius:4px;padding:3px 10px;font-size:12px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#A8622A;font-weight:600;margin:3px 3px 0 0;">${s}</span>`
      ).join('')
    : '<span style="color:#756C5B;font-size:13px;font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Not specified</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#F5F1E8;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1E8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 30px rgba(50,38,18,0.10);">

        <!-- Header -->
        <tr><td style="background:#C47A3C;padding:36px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;color:#ffffff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">Solano AI</p>
          <p style="margin:0;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.75);">Demo Request Received</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:40px 40px 8px;text-align:center;">
          <h1 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#2A2419;line-height:1.3;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">We got your request, ${data.firstName}.</h1>
          <p style="margin:0;font-size:14px;color:#756C5B;line-height:1.6;max-width:440px;margin-left:auto;margin-right:auto;">We'll reach out within 4 business hours to schedule your demo. Here's what you sent us:</p>
        </td></tr>

        <!-- Submission summary -->
        <tr><td style="padding:28px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;width:42%;vertical-align:top;">Company</td>
              <td style="padding:10px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;font-weight:700;">${data.companyName || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Trade</td>
              <td style="padding:10px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;">${data.trade || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Service Area</td>
              <td style="padding:10px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;">${data.serviceArea || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Biggest Challenge</td>
              <td style="padding:10px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;">${data.biggestChallenge || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:12px;color:#756C5B;vertical-align:top;">Services of Interest</td>
              <td style="padding:10px 0;">${servicesHtml}</td>
            </tr>
          </table>
        </td></tr>

        ${data.message && data.message !== 'None' ? `
        <!-- Notes -->
        <tr><td style="padding:0 40px 28px;">
          <div style="background:#FAF6EF;border-left:3px solid #C47A3C;padding:14px 18px;border-radius:0 6px 6px 0;">
            <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#A8622A;font-weight:700;">Your Notes</p>
            <p style="margin:0;font-size:13px;color:#756C5B;line-height:1.6;">${data.message}</p>
          </div>
        </td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="background:#F5F1E8;padding:22px 40px;text-align:center;border-top:1px solid #EDE6D8;">
          <p style="margin:0 0 4px;font-size:12px;color:#756C5B;">Questions? Just reply to this email.</p>
          <p style="margin:0;font-size:11px;color:#B3A890;">© ${new Date().getFullYear()} Solano AI &nbsp;·&nbsp; solano.ai.solutions@gmail.com</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildOwnerEmailHtml(data) {
  const servicesHtml = data.services
    ? data.services.split(', ').map(s =>
        `<span style="display:inline-block;background:#F4E4D2;border:1px solid #E3C39C;border-radius:4px;padding:3px 10px;font-size:12px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#A8622A;font-weight:600;margin:3px 3px 0 0;">${s}</span>`
      ).join('')
    : '<span style="color:#756C5B;font-size:13px;font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Not specified</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#F5F1E8;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1E8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 30px rgba(50,38,18,0.10);">

        <!-- Header -->
        <tr><td style="background:#C47A3C;padding:28px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;color:#ffffff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">Solano AI — New Demo Request</p>
          <p style="margin:0;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.75);">Owner Notification</p>
        </td></tr>

        <!-- Summary -->
        <tr><td style="padding:36px 40px 24px;text-align:center;">
          <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#2A2419;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">${data.firstName} ${data.lastName}</h1>
          <p style="margin:0;font-size:15px;color:#A8622A;font-weight:700;">${data.companyName || 'No company'} &nbsp;·&nbsp; ${data.trade || 'Trade not specified'}</p>
        </td></tr>

        <!-- Details -->
        <tr><td style="padding:28px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;width:38%;vertical-align:top;">Name</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;font-weight:700;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Email</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;"><a href="mailto:${data.email}" style="color:#A8622A;text-decoration:none;font-weight:600;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Phone</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;"><a href="tel:${data.phone}" style="color:#A8622A;text-decoration:none;font-weight:600;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Role</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;">${data.role || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Trade</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;">${data.trade || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Service Area</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;">${data.serviceArea || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Team Size</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;">${data.teamSize || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Current Website</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;">
                ${data.currentWebsite && data.currentWebsite !== 'None'
                  ? `<a href="${data.currentWebsite}" style="color:#A8622A;text-decoration:none;font-weight:600;">${data.currentWebsite}</a>`
                  : '<span style="color:#756C5B;">None</span>'}
              </td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:12px;color:#756C5B;vertical-align:top;">Biggest Challenge</td>
              <td style="padding:9px 0;border-bottom:1px solid #EDE6D8;font-size:13px;color:#2A2419;">${data.biggestChallenge || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;font-size:12px;color:#756C5B;vertical-align:top;">Services Interested In</td>
              <td style="padding:9px 0;">${servicesHtml}</td>
            </tr>
          </table>
        </td></tr>

        ${data.message && data.message !== 'None' ? `
        <!-- Notes -->
        <tr><td style="padding:0 40px 28px;">
          <div style="background:#FAF6EF;border-left:3px solid #C47A3C;padding:14px 18px;border-radius:0 6px 6px 0;">
            <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#A8622A;font-weight:700;">Additional Notes</p>
            <p style="margin:0;font-size:13px;color:#756C5B;line-height:1.6;">${data.message}</p>
          </div>
        </td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="background:#F5F1E8;padding:20px 40px;text-align:center;border-top:1px solid #EDE6D8;">
          <p style="margin:0;font-size:11px;color:#B3A890;">Solano AI &nbsp;·&nbsp; solano.ai.solutions@gmail.com</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Send Both Emails ────────────────────────────────────────

// Returns a Promise so the form handler can await it
window.sendSolanoEmails = function(formData) {
  if (!window.emailjs || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.info('[Solano AI] EmailJS not configured — skipping email send.');
    return Promise.resolve();
  }

  const services = formData.getAll('services').join(', ') || 'Not specified';
  const data = {
    firstName:        formData.get('first_name')       || '',
    lastName:         formData.get('last_name')        || '',
    email:            formData.get('email')            || '',
    phone:            formData.get('phone')            || '',
    role:             formData.get('role')             || '',
    companyName:      formData.get('company_name')     || '',
    trade:            formData.get('trade')            || '',
    serviceArea:      formData.get('service_area')     || '',
    currentWebsite:   formData.get('current_website')  || 'None',
    teamSize:         formData.get('team_size')        || '',
    biggestChallenge: formData.get('biggest_challenge')|| '',
    services,
    message:          formData.get('message')          || 'None',
  };

  const baseParams = {
    to_name:           `${data.firstName} ${data.lastName}`,
    to_email:          data.email,
    company_name:      data.companyName,
    trade:             data.trade,
    service_area:      data.serviceArea,
    biggest_challenge: data.biggestChallenge,
    services_interest: data.services,
  };

  const clientEmail = emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.clientTemplateId,
    { ...baseParams, message_html: buildClientEmailHtml(data) }
  );

  const ownerEmail = emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.ownerTemplateId,
    { ...baseParams, to_email: 'solano.ai.solutions@gmail.com', message_html: buildOwnerEmailHtml(data) }
  );

  return Promise.all([clientEmail, ownerEmail]);
};
