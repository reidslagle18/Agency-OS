# Agency OS

Open your app: https://agency-os-beryl-sigma.vercel.app

Your source code: https://github.com/reidslagle18/Agency-OS

The application is saved in your existing `C:\Users\reids\OneDrive\OpenAI\Agency-OS` folder and deployed to your personal Vercel workspace.

## Start with Oklahoma

Refresh the website. Nine real Oklahoma research candidates load automatically on first use. Each record links to the business's own source website and identifies the research date. These are candidates to investigate, not verified licensees, qualified buyers, or companies known to need rebranding. No license numbers, contact emails, or opportunity scores were invented.

Open **Companies** to see the list. Open a company to review its source, add research, assess agency fit, and choose a next action. **Pipeline** tracks the sales stage. **Overview** shows due follow-ups and totals from your records.

## What works now

- Company database with add, edit, delete, search, filters, sorting, contact details and notes.
- Sales pipeline, estimated values, follow-up dates and do-not-contact preferences.
- CSV import preview, validation and duplicate checks, plus filtered CSV export.
- Full backup and restore including evidence, analysis and outreach drafts.
- Automatic one-time loading of sourced Oklahoma starter research.
- Additional on-demand New York official public-data discovery.
- Transparent opportunity scoring based on verified evidence and your agency-fit assessment.
- Optional AI analysis with source citations and rejection of unsupported quotations.
- Outreach templates that require human approval before copying. No sending integration.

## What needs the AI connection

Ongoing Oklahoma web discovery and AI brand analysis are implemented but not active without credentials. In your [Vercel environment settings](https://vercel.com/reidslagle18-2846s-projects/agency-os/settings/environment-variables), add:

- `OPENAI_API_KEY`: an OpenAI project API key with API billing enabled.
- `AGENCY_ACCESS_TOKEN`: a random password of at least 24 characters, separate from the API key.
- Optionally `OPENAI_MODEL` and `OPENAI_RESEARCH_MODEL`; both default to `gpt-4.1-mini`.

Redeploy after adding these. Enter only the workspace access token under the app's **Settings & backups**. Never enter the OpenAI key into the app or commit it to GitHub.

Once configured, Oklahoma web search can run when you open the website, at most once per day, or when you choose **Find Oklahoma prospects**. It saves new, sourced candidates automatically to Research. You can disable the opening-time search in Settings. Search and model usage may incur charges. Newly found facts and licensing still need review.

AI analysis sends only the selected company name and verified evidence to OpenAI. Discovery sends the Oklahoma market and up to 100 existing company names to avoid duplicates. The app does not browse company websites directly or inspect packaging images.

## Data and remaining limitations

Records persist in **this browser at this website address**. They are not synchronized across devices. Download a full backup regularly from Settings. Clearing browser data or using a different website address gives you a separate or empty database.

This version has no hosted shared database, account system, or unattended scheduler. Searches do not run while the website is closed. Continuous background prospecting needs hosted storage and scheduling.

Design and creation can be future sections of this same website. They are **not implemented yet**: no logo, packaging, website, or production artwork generation is currently connected.

No website scraping or automatic outreach is implemented. OMMA license verification is linked separately; its current portal is not connected as a bulk data feed.

## Verification

29 automated tests passed. Live browser checks passed for automatic starter loading, company persistence, pipeline changes, CSV validation and export, backups, evidence scoring, outreach approval and do-not-contact blocking, official NY data retrieval, and clear missing-credential responses.

The mechanical interface audit covered 20 view/theme combinations and 1,164 text checks with no detected contrast failures or page overflow. This is not a claim of a full accessibility certification. Paid OpenAI success paths have not been tested against the provider because credentials are not configured.
