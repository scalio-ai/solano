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
        `<span style="display:inline-block;background:#1a2240;border:1px solid #2a3560;border-radius:4px;padding:3px 10px;font-size:12px;color:#4E7CC9;margin:3px 3px 0 0;">${s}</span>`
      ).join('')
    : '<span style="color:#848090;font-size:13px;">Not specified</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#060912;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060912;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d1120;border-radius:8px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.5);">

        <!-- Header -->
        <tr><td style="background:#090c14;padding:36px 40px;text-align:center;border-bottom:1px solid #1a2240;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#4E7CC9;">Solano AI</p>
          <p style="margin:0;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#383550;">Demo Request Received</p>
        </td></tr>

        <!-- Blue accent bar -->
        <tr><td style="height:2px;background:linear-gradient(90deg,#2a3a6e,#4E7CC9,#2a3a6e);"></td></tr>

        <!-- Greeting -->
        <tr><td style="padding:44px 40px 28px;text-align:center;">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#4E7CC9;">You're in.</p>
          <h1 style="margin:0 0 16px;font-size:26px;font-weight:600;color:#f0ede8;line-height:1.3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">We got your request, ${data.firstName}.</h1>
          <p style="margin:0;font-size:15px;color:#848090;line-height:1.7;max-width:440px;margin-left:auto;margin-right:auto;">We'll reach out within 4 business hours to confirm your consultation and answer any questions before your demo.</p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#1a2240;"></div></td></tr>

        <!-- What to expect -->
        <tr><td style="padding:32px 40px;">
          <p style="margin:0 0 20px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#4E7CC9;">What Happens Next</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #1a2240;vertical-align:top;width:28px;">
                <div style="width:22px;height:22px;border-radius:50%;background:#1a2240;border:1px solid #2a3560;display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:#4E7CC9;font-weight:700;">1</div>
              </td>
              <td style="padding:12px 0 12px 14px;border-bottom:1px solid #1a2240;">
                <p style="margin:0;font-size:13px;font-weight:600;color:#f0ede8;">We review your request</p>
                <p style="margin:4px 0 0;font-size:12px;color:#848090;line-height:1.6;">Our team looks at your business type, service area, and goals so we can prep a custom demo.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #1a2240;vertical-align:top;">
                <div style="width:22px;height:22px;border-radius:50%;background:#1a2240;border:1px solid #2a3560;display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:#4E7CC9;font-weight:700;">2</div>
              </td>
              <td style="padding:12px 0 12px 14px;border-bottom:1px solid #1a2240;">
                <p style="margin:0;font-size:13px;font-weight:600;color:#f0ede8;">We reach out to schedule</p>
                <p style="margin:4px 0 0;font-size:12px;color:#848090;line-height:1.6;">Expect a call or email within 4 business hours to lock in a time that works for you.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;vertical-align:top;">
                <div style="width:22px;height:22px;border-radius:50%;background:#1a2240;border:1px solid #2a3560;display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:#4E7CC9;font-weight:700;">3</div>
              </td>
              <td style="padding:12px 0 12px 14px;">
                <p style="margin:0;font-size:13px;font-weight:600;color:#f0ede8;">Your personalized demo</p>
                <p style="margin:4px 0 0;font-size:12px;color:#848090;line-height:1.6;">30 minutes. We show you exactly how Solano AI works for your trade and your service area.</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#1a2240;"></div></td></tr>

        <!-- Submission summary -->
        <tr><td style="padding:32px 40px;">
          <p style="margin:0 0 20px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#4E7CC9;">Your Submission</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;width:42%;vertical-align:top;">Company</td>
              <td style="padding:10px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;font-weight:600;">${data.companyName || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;vertical-align:top;">Trade</td>
              <td style="padding:10px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;">${data.trade || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;vertical-align:top;">Service Area</td>
              <td style="padding:10px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;">${data.serviceArea || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;vertical-align:top;">Biggest Challenge</td>
              <td style="padding:10px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;">${data.biggestChallenge || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:12px;color:#848090;vertical-align:top;">Services of Interest</td>
              <td style="padding:10px 0;">${servicesHtml}</td>
            </tr>
          </table>
        </td></tr>

        ${data.message && data.message !== 'None' ? `
        <!-- Notes -->
        <tr><td style="padding:0 40px 32px;">
          <div style="background:#090c14;border-left:2px solid #4E7CC9;padding:16px 20px;border-radius:0 6px 6px 0;">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#4E7CC9;">Your Notes</p>
            <p style="margin:0;font-size:13px;color:#848090;line-height:1.6;">${data.message}</p>
          </div>
        </td></tr>` : ''}

        <!-- CTA box -->
        <tr><td style="padding:0 40px 40px;">
          <div style="background:#090c14;border:1px solid #1a2240;border-radius:6px;padding:28px;text-align:center;">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#4E7CC9;">Questions in the meantime?</p>
            <p style="margin:0 0 18px;font-size:13px;color:#848090;">Reply to this email and we'll get back to you fast.</p>
            <a href="mailto:solano.ai.solutions@gmail.com" style="display:inline-block;background:#4E7CC9;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;padding:12px 28px;border-radius:4px;">Email Us Directly</a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#090c14;padding:22px 40px;text-align:center;border-top:1px solid #1a2240;">
          <p style="margin:0;font-size:11px;color:#383550;">© ${new Date().getFullYear()} Solano AI &nbsp;·&nbsp; solano.ai.solutions@gmail.com</p>
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
        `<span style="display:inline-block;background:#1a2240;border:1px solid #2a3560;border-radius:4px;padding:3px 10px;font-size:12px;color:#4E7CC9;margin:3px 3px 0 0;">${s}</span>`
      ).join('')
    : '<span style="color:#848090;font-size:13px;">Not specified</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#060912;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060912;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d1120;border-radius:8px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.5);">

        <!-- Header -->
        <tr><td style="background:#090c14;padding:28px 40px;text-align:center;border-bottom:1px solid #1a2240;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#4E7CC9;">Solano AI — New Demo Request</p>
          <p style="margin:0;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#383550;">Owner Notification</p>
        </td></tr>
        <tr><td style="height:2px;background:linear-gradient(90deg,#2a3a6e,#4E7CC9,#2a3a6e);"></td></tr>

        <!-- Summary -->
        <tr><td style="padding:36px 40px 24px;text-align:center;">
          <h1 style="margin:0 0 6px;font-size:22px;font-weight:600;color:#f0ede8;">${data.firstName} ${data.lastName}</h1>
          <p style="margin:0;font-size:15px;color:#4E7CC9;font-weight:600;">${data.companyName || 'No company'} &nbsp;·&nbsp; ${data.trade || 'Trade not specified'}</p>
        </td></tr>

        <tr><td style="padding:0 40px;"><div style="height:1px;background:#1a2240;"></div></td></tr>

        <!-- Contact details -->
        <tr><td style="padding:28px 40px 0;">
          <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#4E7CC9;">Contact Info</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;width:38%;vertical-align:top;">Name</td>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;font-weight:600;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;vertical-align:top;">Email</td>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:13px;"><a href="mailto:${data.email}" style="color:#4E7CC9;text-decoration:none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;vertical-align:top;">Phone</td>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:13px;"><a href="tel:${data.phone}" style="color:#4E7CC9;text-decoration:none;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding:9px 0;font-size:12px;color:#848090;vertical-align:top;">Role</td>
              <td style="padding:9px 0;font-size:13px;color:#f0ede8;">${data.role || '—'}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Business details -->
        <tr><td style="padding:28px 40px 0;">
          <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#4E7CC9;">Business Info</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;width:38%;vertical-align:top;">Company</td>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;font-weight:600;">${data.companyName || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;vertical-align:top;">Trade</td>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;">${data.trade || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;vertical-align:top;">Service Area</td>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;">${data.serviceArea || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;vertical-align:top;">Team Size</td>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;">${data.teamSize || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;font-size:12px;color:#848090;vertical-align:top;">Current Website</td>
              <td style="padding:9px 0;font-size:13px;">
                ${data.currentWebsite && data.currentWebsite !== 'None'
                  ? `<a href="${data.currentWebsite}" style="color:#4E7CC9;text-decoration:none;">${data.currentWebsite}</a>`
                  : '<span style="color:#848090;">None</span>'}
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Goals -->
        <tr><td style="padding:28px 40px;">
          <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#4E7CC9;">Goals &amp; Interests</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:12px;color:#848090;width:38%;vertical-align:top;">Biggest Challenge</td>
              <td style="padding:9px 0;border-bottom:1px solid #1a2240;font-size:13px;color:#f0ede8;">${data.biggestChallenge || '—'}</td>
            </tr>
            <tr>
              <td style="padding:9px 0;font-size:12px;color:#848090;vertical-align:top;">Services Interested In</td>
              <td style="padding:9px 0;">${servicesHtml}</td>
            </tr>
          </table>
        </td></tr>

        ${data.message && data.message !== 'None' ? `
        <!-- Notes -->
        <tr><td style="padding:0 40px 28px;">
          <div style="background:#090c14;border-left:2px solid #4E7CC9;padding:14px 18px;border-radius:0 6px 6px 0;">
            <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#4E7CC9;">Additional Notes</p>
            <p style="margin:0;font-size:13px;color:#848090;line-height:1.6;">${data.message}</p>
          </div>
        </td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="background:#090c14;padding:20px 40px;text-align:center;border-top:1px solid #1a2240;">
          <p style="margin:0;font-size:11px;color:#383550;">Solano AI &nbsp;·&nbsp; solano.ai.solutions@gmail.com</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Send Both Emails ────────────────────────────────────────

window.sendSolanoEmails = function(formData) {
  if (!window.emailjs || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.info('[Solano AI] EmailJS not configured — skipping email send. Fill in EMAILJS_CONFIG in js/form.js.');
    return;
  }

  const services = formData.getAll('services').join(', ') || 'Not specified';
  const data = {
    firstName:       formData.get('first_name')       || '',
    lastName:        formData.get('last_name')         || '',
    email:           formData.get('email')             || '',
    phone:           formData.get('phone')             || '',
    role:            formData.get('role')              || '',
    companyName:     formData.get('company_name')      || '',
    trade:           formData.get('trade')             || '',
    serviceArea:     formData.get('service_area')      || '',
    currentWebsite:  formData.get('current_website')   || 'None',
    teamSize:        formData.get('team_size')         || '',
    biggestChallenge:formData.get('biggest_challenge') || '',
    services,
    message:         formData.get('message')           || 'None',
  };

  const baseParams = {
    to_name:          `${data.firstName} ${data.lastName}`,
    to_email:         data.email,
    company_name:     data.companyName,
    trade:            data.trade,
    service_area:     data.serviceArea,
    biggest_challenge:data.biggestChallenge,
    services_interest:data.services,
  };

  // Client confirmation
  emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.clientTemplateId, {
    ...baseParams,
    message_html: buildClientEmailHtml(data),
  })
    .then(() => console.info('[Solano AI] Client confirmation email sent.'))
    .catch(err => console.error('[Solano AI] Client email error:', err));

  // Owner notification
  emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.ownerTemplateId, {
    ...baseParams,
    to_email:     'solano.ai.solutions@gmail.com',
    message_html: buildOwnerEmailHtml(data),
  })
    .then(() => console.info('[Solano AI] Owner notification email sent.'))
    .catch(err => console.error('[Solano AI] Owner email error:', err));
};
