# Solano AI — Pre-Launch Audit

_Created May 13, 2026 — pre-outreach audit of the marketing site and starting-out advice._

This document is a punch-list, not a redesign. Items are ordered by what would hurt the most if cold outreach started tomorrow. Nothing in the live site has been changed yet — work through items here, mark them off as they ship.

---

## CRITICAL — Fix before any outreach

### 1. The lead form does not actually send anything
- **File:** `js/main.js`, lines 206–221 (and `book.html` form markup)
- **Problem:** Submit handler waits 1.2s, swaps in a "You're on the list" success state, and discards everything. Zero leads are captured.
- **Fix options (cheapest → most flexible):**
  1. **Formspree / Basin / Web3Forms / Formcarry** — paste an action URL, free tier covers early volume.
  2. **Netlify Forms** — if hosted on Netlify, add `data-netlify="true"` and you're done.
  3. **Cloudflare / Vercel / Netlify Function** — 20-line serverless endpoint that emails you + posts to Slack + writes to Airtable/Sheets/CRM.
- **Must-have on submit:** email to you + acknowledgement email to lead + write to a CRM or Sheet so nothing is lost.

### 2. Vapi API key hardcoded in public HTML
- **File:** `index.html` line 527 (`API_KEY` and `ASST_ID`)
- **Action:** Confirm in the Vapi dashboard that the exposed key is the **public web token**, not the private server key. If it's the secret key, rotate immediately.
- **Hardening:** In Vapi, restrict the assistant to `allowed_origins` matching your real domain only. Set monthly usage caps so a malicious actor can't run up the bill.

### 3. Fabricated testimonials and metrics
- **Files:** `index.html` (Mike R., Danny S., Tony L. testimonials, "+38%", "3×", "60%/78%" stats), `nerve-center.html` ("Avg. 22% of unbooked leads convert"), `digital-services.html` (142 calls / 89 jobs / $12 CPL / 6× ROAS panel).
- **Problem:** Zero clients = zero real proof. FTC Endorsement Guides treat fabricated endorsements as illegal (per-violation fines). Any prospect who Googles "Valley Comfort HVAC Burbank" will discover the deception.
- **Fix:** Replace all named testimonials with "Case study coming soon." Replace specific outcome stats with industry-source benchmarks (cite the source) or remove. Consider adding a small "*Illustrative example*" disclaimer on the demo mockups.
- **Long term:** Run 1–2 free or discounted pilots so real names + real numbers can replace placeholders inside 4–6 weeks.

### 4. Placeholder phone number
- **File:** `book.html` line 138 — `(310) 555-0192`
- **Problem:** 555-prefixed numbers are universally fake. Signals "not a real business."
- **Fix:** Get a real Twilio number routed to Vapi so the published number IS the live AI demo. Two birds.

### 5. Domain, email, social, legal pages
- **Verify:** Is `solano.ai` actually owned and is `hello@solano.ai` set up to forward somewhere you read?
- **Footer placeholders:** `href="#"` on Instagram and LinkedIn — link to real accounts or remove icons entirely.
- **Privacy Policy + Terms of Service** are plain text in the footer. Both must be live pages before processing any client lead data. A Data Processing Agreement template will be needed for clients whose customer data flows through your AI.

---

## IMPORTANT — Fix soon

### 6. Pricing pages contradict each other
- Nerve Center: Starter $800 (chat only), Full Nerve Center $1,800 (chat + call + follow-up).
- Digital Services: Foundation $500 (website only), Growth $2,000 (website + ads + chat + call), Full Stack $3,500.
- Math doesn't reconcile — Growth ($2,000) appears to include Nerve Center ($1,800) + website ($500) + ads, which adds up to >$2,300. Pick one consistent pricing model.

### 7. Stat / process inconsistencies
- "48h Demo site turnaround" (homepage stat) vs. "Live in 3 Weeks" (How It Works) vs. "live in as little as 2 weeks" (Digital Services).
- Hero shows "3×" and "+38%" in the same fold — pick one.

### 8. Geo positioning is mixed
- "LA-based team" + "UCLA Alumni" vs. "serving clients nationwide" + "Phoenix to Dallas to Chicago."
- The local angle is your strongest early differentiator. Either lead hyper-local LA-only and expand later, or commit to nationwide and drop the LA framing. Doing both dilutes both.

### 9. Too many CTAs
- Counted: "Book a Free Call," "Book a Free Demo," "See Your Free Demo," "Get a Free Audit," "Get a Free Ad Audit," "Hear a Demo Call," "Get Started," "Let's Talk."
- Pick **one** primary verb sitewide. Better tracking, easier A/B testing, less prospect confusion.

### 10. No analytics installed
- Foundation tier sells GA setup, but the site itself has no tag.
- Install **Plausible** (privacy-friendly, simple, ~$9/mo) or **GA4** (free) or **PostHog** (product analytics) — today, before any traffic.

### 11. Open Graph / Twitter Card meta tags missing
- No social preview image when the URL is shared anywhere.
- Add `og:title`, `og:description`, `og:image`, `og:url`, plus `twitter:card`. ~10 minutes per page.

### 12. Missing `sitemap.xml` and `robots.txt`
- Both trivial. Both expected by Google.

### 13. No structured data (JSON-LD)
- You sell Local SEO. Your own site should ship `LocalBusiness`/`ProfessionalService` JSON-LD on every page and `FAQPage` JSON-LD on `book.html`. Walk the walk — prospects who view source will notice.

### 14. Vapi widget duplication
- The Vapi SDK loads its own bottom-right button AND a custom button is rendered. Comment claims to "hide its rendered button via DOM" but no hide logic actually executes.
- Test in incognito — likely two buttons appearing.

### 15. Orphan file `Scalio 2.0.html` at root
- Not linked anywhere but publicly accessible if it ships with the deploy.
- Either delete or move out of the deploy root.

### 16. Copyright year shows 2025
- Replace with `2026` (or use JS to auto-set).

---

## STRATEGIC / BUSINESS

### Walk the walk on every product you sell
- Site sells AI chat agents — install one on the site itself.
- Site sells AI call agents — the published phone number should BE a live demo agent.
- Site sells SEO — implement schema, sitemap, OG tags now.

The product is the demo. Every prospect should be able to experience the service before the first sales call.

### Niche down harder, then expand
- "HVAC + plumbing + electrical, nationwide" = three industries × 50 states.
- Pick **one trade in one metro** for the first 10 clients. Copy, ad creative, vocabulary, and case studies all sharpen dramatically.
- Recommendation: **HVAC in greater LA** for Year 1.

### Get one real case study before paid outreach
- Offer a friend's contractor, a local HVAC shop, or a family connection a free 60-day pilot in exchange for permission to record results and quote them.
- A single real testimonial with name + screenshot beats a beautifully designed page of fabrications every time.

### Booking calendar instead of a form
- A Cal.com or Calendly embed on `book.html` collapses the cycle from "form → email → coordinate" to "click → booked."
- For early agency work this single change can double demo conversion.

### Compliance gotchas you'll hit fast
- **California is a two-party consent state** for call recording — Vapi agent must announce recording at call start.
- **TCPA** governs SMS follow-up sequences — express written consent required, opt-out language mandatory, 10DLC registration for A2P SMS messaging.
- Both create real legal exposure once you have clients.

### Insurance
- E&O / Professional Liability is non-optional for an agency that touches client revenue.
- Hiscox or Next.com — roughly $50–150/mo at low revenue.

### Domain reputation for cold outreach
- Do **not** cold-send from `@solano.ai` directly. Buy a sister domain (e.g. `getsolano.ai`, `try-solano.com`, `solano-outreach.com`), warm it for 4+ weeks, set SPF/DKIM/DMARC, then burn the secondary domain instead of the main brand.

### Trademark check
- "Solano" is a California county and shows up across many brands.
- 20-minute USPTO TESS search before sinking real money into branding.

### LLC reality
- CA LLC = $800/yr franchise tax minimum at zero revenue.
- Wyoming or Delaware is cheaper to maintain if no physical CA nexus is required (though CA may still claim franchise tax if you operate from there).

---

## Working order (suggested)

1. Fix the form (#1) — nothing else matters if you can't capture leads.
2. Lock the Vapi key (#2) — five-minute hardening step.
3. Replace fabricated testimonials/metrics with placeholders (#3) — legal and reputational risk.
4. Stand up real phone + real email + real social (#4, #5).
5. Get analytics + OG tags + sitemap + structured data (#10–13).
6. Reconcile pricing and CTAs (#6, #9).
7. Decide niche and rewrite copy around it (Strategic section).
8. Privacy Policy + Terms + DPA template (#5).
9. Compliance setup: call-recording disclosure + TCPA opt-in flow.
10. Insurance + LLC + trademark check.

Cross items off as they ship. Add new ones as they surface.
