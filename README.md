# Agency OS

A working single-user cannabis branding prospect workspace. React + TypeScript + Vite, Bootstrap 5.3, Phosphor icons, IndexedDB, and an optional Vercel AI function.

## Access and data

Use the stable Vercel production address provided after deployment. No local server is required. Company records are private to your browser profile and this website origin. The hosting server does not receive CRM records, except the company name and verified excerpts when you explicitly request AI analysis.

**This version has no hosted company database, account system, or cross-device sync.** IndexedDB persists across reloads and browser restarts, but clearing site data deletes records. Private browsing may discard data. Use Settings > Download full backup regularly. A preview URL has a separate database from the production URL. A public website does not expose your browser database to other visitors; each visitor has an empty workspace of their own.

## Implemented

- Dashboard with real database counts, estimated open pipeline value, due follow-ups, and recent activity.
- Persistent company CRUD: contact details, license status, provenance, notes, next actions, date, estimated value, fit, do-not-contact flag.
- Search by name, location, license, contact, and notes; stage/category/state filters; name/date/opportunity sorting.
- Seven-stage CRM pipeline with stage changes and value totals.
- CSV preview, per-row validation, duplicate detection, 5 MB / 5,000-row limits, and filtered export with spreadsheet formula protection.
- Full JSON backup and validated, non-overwriting merge restore including evidence, findings, and drafts.
- On-demand discovery through New York's official OCM public API. Review records and add individually, with license number/status/source/retrieval date. No preloaded or fabricated leads.
- User-supplied source evidence, human verification, and transparent score with area coverage. Evidence can be removed or unverified; changes invalidate analysis and drafts.
- Optional OpenAI analysis with schema validation and exact citation matching; unsupported quotes are rejected. Generated interpretations still require human judgment.
- Evidence-based editable outreach template, approval before copy, and do-not-contact blocking. There is no email sending integration or automatic outreach.
- Light/dark modes, responsive layout, keyboard controls and labels, skip link, error/loading/empty states.

## Discovery source

[Current OCM Licenses, New York Office of Cannabis Management](https://data.ny.gov/Economic-Development/Current-OCM-Licenses/jskf-tt3q/about_data)

API: `https://data.ny.gov/resource/jskf-tt3q.json`. Requests use pages of 100 ordered by the source row ID. A changing dataset can shift page boundaries; duplicate checks prevent repeated licenses from being added. Some records are applicants or provisional statuses. Verify current license and operational status at the regulator before qualification. Availability and rate limits belong to the provider. Website/contact enrichment is deliberately absent. Other states can be imported from authorized CSV lists with provenance.

## AI configuration (optional)

Core functions, discovery, scoring, and outreach templates need no paid API credentials.

In Vercel project Settings > Environment Variables add:

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Your paid OpenAI project key, server only |
| `OPENAI_MODEL` | Optional model supporting Responses API structured output; defaults to `gpt-4.1-mini` |
| `AGENCY_ACCESS_TOKEN` | A random workspace password of at least 24 characters |

Redeploy after changing variables. Enter only the workspace access token in the app's Settings. **Never enter an OpenAI API key in the app or commit credentials.** It is held in session storage until that browser tab session ends.

The function fails closed without credentials, validates request size and evidence, requires the workspace token, sets `store: false`, and rejects findings whose quoted text does not match their cited evidence. Only company name and verified excerpts are submitted. The AI function does not browse, scrape, inspect images, or execute source instructions. Model output is rendered as text, not HTML.

The function has a best-effort five-requests-per-minute limit per warm server instance. This is not a durable distributed quota. Keep the workspace token private, configure provider project budgets, and add durable rate limiting plus user authentication before offering AI to multiple users. Do not put credentials in any `VITE_` variable.

Official API documentation: [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create), [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs).

## Score methodology

Only verified evidence contributes. For each of five areas (positioning, website, packaging, photography, catalog), take the highest human-assigned severity 0-5. Average over reviewed areas, divide by 5 and multiply by 60. Add agency fit 0-5 divided by 5 and multiplied by 40. No verified evidence means **Unscored**. Coverage is shown separately. This prioritization rubric is subjective, not validated purchase intent or revenue prediction. Unknown areas are excluded, not deemed deficient.

## Development and deployment

Use Node 22 or newer and pnpm 10 or newer. Install packages with `pnpm install`. Run `pnpm check`, `pnpm test`, and `pnpm build`. The lockfile is committed. The esbuild installation hook is allowed explicitly. On Windows ARM use a matching ARM Node runtime for installation and build, avoiding mismatched native packages.

Deploy with `vercel --yes` after linking, or `vercel --prod --yes` for the stable production address. Test on deployed previews; no local server workflow is used. Keep `.env*`, `.vercel`, and company backups out of version control. The public repository contains source code and fictional test fixtures only.

## Limitations

- Single browser workspace, no cloud database or authenticated team access.
- No automatic discovery outside NY; other regulator/provider records need authorized CSV import.
- Analysis uses provided text and observations, not website screenshots or packaging images.
- Exact quote matching enforces traceability, not the correctness of a model's interpretation.
- Drafts use a transparent template rather than a paid AI writing call. Replace sender placeholders and check contact permission before sending elsewhere.
- No scraping, hidden lead enrichment, automatic sending, or hardcoded secrets.
- Browser storage can fail when blocked or full. Errors are shown; do not clear site data to troubleshoot without a full backup.
- Concurrent editing in several tabs can overwrite the same company's changes. Cross-tab lists refresh, but this is not collaborative editing.

## Validation

25 automated tests cover persistence/CRUD, atomic input validation, duplicate matching, CSV round trips and errors, formula escaping, backups, scoring, outreach blocking, official source mapping, missing/incorrect credentials, and rejection of unsupported AI citations. Live paid AI success requires credentials and billing and is not claimed as tested against the provider.
