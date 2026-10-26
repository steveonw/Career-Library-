# Career Library — Independent P1 working prototype

An **independent, not affiliated** concept prototype for the AI-Native Web Intern opportunity. Every bundled professional story is **fictional**, and the example content is explicitly labeled as such. Do not represent this as a Career Library production site.

## Current checkpoint and continuation

**As of October 25, 2026, P0 is verified and P1's content expansion is deployed.** Eight fictional career stories span eight career fields and eight majors. Notion is the editor, GitHub Actions validates and deploys, and the public website allows students to explore the stories. **Lena Park remains Draft and is not public.**

- **[Updated project plan](docs/PROJECT_PLAN.md)** — P0 evidence, P1 steps for the October 29 application, definitions of done, and P2 production ideas.
- **[AI handoff sheet](docs/AI_HANDOFF.md)** — ready-to-paste next-agent prompt, exact files/commands, safe publishing, workflows, risks and debugging lessons.
- **[P1 content-review log](docs/P1_CONTENT_REVIEW.md)** — eight fictional profiles, review criteria, publishing evidence, remaining caveats.
- **[Full internship requirement comparison](docs/JOB_REQUIREMENTS_MAPPING.md)** — what the demo proves and what the employer would still need built.
- **[Application-ready packet](docs/APPLICATION_PACKET.md)** — short founder note, required architecture answer, AI workflow description, demo walkthrough, and submission checklist.
- **[AI coding agent instructions](AGENTS.md)** — tiny entry point for code agents and new development sessions.

**Public demo:** https://steveonw.github.io/Career-Library-/  
**Verified content expansion and deployment:** https://github.com/steveonw/Career-Library-/actions/runs/40173656688

## P1 enhancements underway

- Search ranks career-title matches first and explains whether a result matched a title, major, skill, or other field.
- Small-screen layout, keyboard focus outlines, touch target sizes, and empty-state help improved.
- Six additional fictional profiles were reviewed, approved and **published from Notion**, expanding the site from 2 to **8 career stories** without editing the website code. [Approved sync and deployment](https://github.com/steveonw/Career-Library-/actions/runs/40173656688).
- Further mobile/keyboard screen testing and the applicant presentation packet are still pending; see [the current plan](docs/PROJECT_PLAN.md).

### Verified Playwright browser QA

Playwright now tests **both the local build and the deployed public site in Chromium and Firefox**. The expanded eight-story run passed **40/40 browser tests**, including all eight career-field filters, every story page, mobile/tablet/desktop widths, filtering, URL persistence, keyboard navigation, Draft protection, and missing-asset detection.

- **[Successful 40/40 browser-test run](https://github.com/steveonw/Career-Library-/actions/runs/40173739847)** — download `playwright-browser-report` for HTML results and full-page screenshots.
- **[P1 QA checklist and limitations](docs/P1_QA_CHECKLIST.md)** — automatic checks passed; real screen-reader and 200% zoom QA remain.
- **Run optional Playwright locally:** `npm install`, `npx playwright install chromium firefox`, then `npm run test:e2e` (Python 3 required for the local static test server). CI runs these automatically on GitHub.

## What works

- Mobile-friendly student directory with accessible cards.
- Combined search, major, career field and experience filters.
- URL-persisted filters and direct links to individual sample story pages.
- Published-only catalog selection; drafts and invalid records excluded.
- Verified server-side Notion importer that writes the validated Published snapshot to `data/profiles.json`.
- Zero runtime API tokens, no paid services and no front-end dependencies.
- Node unit tests for filtering, publication controls, and slugs.

## Run it locally

Requires Node 20+ and a local HTTP server:

```sh
npm test
python3 -m http.server 8000
# open http://localhost:8000
```

### Windows quick start

Double-click `START_DEMO.bat` in the cloned repository folder. It starts a local Python server in the correct directory and opens `http://localhost:8000/`. Keep the terminal window open while browsing. Python must be installed. If port 8000 is already used, stop any previous server first.

**Do not double-click `index.html`.** Opening it under `file://` makes browsers block the JavaScript module and JSON fetch, leaving the story directory empty. The address bar must start with `http://localhost:8000/`.

## Notion publishing — preview first

A **Notion-backed publishing demo** has been connected, published, unpublished, and verified live. Connect it only to a **practice database containing fictional people**. The instructions are in **[docs/NOTION_SETUP.md](docs/NOTION_SETUP.md)**.

The shortest path is:

1. Create the `Career Profiles Demo` database in Notion using the six required properties in the guide.
2. Make a read-only Notion connection and share that demo database with it.
3. Store `NOTION_TOKEN` and `NOTION_DATABASE_ID` in **GitHub → Settings → Secrets and variables → Actions**, not in a file or chat.
4. Run **Actions → Sync fictional stories from Notion** with **publish unchecked** to preview and inspect the generated public catalog.
5. Only after review, run the workflow again with **publish checked**. Pull the update in GitHub Desktop and refresh the local site.

The workflow uses the Notion 2025-09-03 data-source API and resolves a regular database link automatically. It validates column names/types and required story fields, excludes Draft rows, rejects duplicate slugs, and refuses empty output. No Notion token is sent to browsers.

For developers, a local `NOTION_TOKEN` plus `NOTION_DATABASE_ID` in environment variables allows:

```sh
npm run notion:check    # checks API access and schema, does not read stories
npm run sync            # writes only validated Published stories to data/profiles.json
npm run check           # syntax and unit tests
```

**Verified end to end on October 25, 2026:** A private read-only Notion integration imported fictional records, published Lena Park (3 public stories), then changed her back to Draft and regenerated the public catalog (2 public stories). Both publishing and unpublishing deployments passed on GitHub Actions. **Limitations:** Sync occurs only after an explicit GitHub Actions run or a maintainer's request-marker commit, not instantly upon Notion edits. Output is public JSON, so use fictional text only. Uploaded media, nested Notion blocks and employer-owned profiles remain out of scope for P0.

## Public GitHub Pages demo

The same Notion publishing workflow now builds and deploys the approved **fictional** stories to GitHub Pages. Go to https://github.com/steveonw/Career-Library-/settings/pages and select **GitHub Actions** under **Build and deployment → Source**, then run the **Sync fictional stories from Notion** workflow with **Publish** checked. The sync job creates an allowlisted `dist/` bundle and the deploy job publishes it to https://steveonw.github.io/Career-Library-/.

The public site is accessible only after the GitHub Pages deployment succeeds. Every `Publish` run commits valid Published stories to `data/profiles.json` and updates the public site; preview runs change neither. GitHub Actions `GITHUB_TOKEN` commits don't trigger branch-based Pages builds, hence the explicit deploy job.

Detailed setup and publication/unpublication testing: **[docs/NOTION_SETUP.md](docs/NOTION_SETUP.md)**.

## P0 verification and next checks

- **Verified:** live Notion integration and safe Published-only import (preview + production sync).
- **Verified:** change fictional Lena from Draft to Published, sync and show 3 public stories.
- **Verified:** restore Lena to Draft, sync and show 2 stories on public GitHub Pages.
- **Verified:** public Pages build/deploy and automated Node tests completed successfully.
- **Still pending:** human screen-reader/200%-zoom/contrast review, application submission and optional walkthrough recording. Automated browser QA and the eight-story content expansion are done; the demo is not production-ready.

## Development decisions

- Keep Notion as a possible familiar editorial system. The `scripts/sync-notion.mjs` adapter is isolated from the UI, so a future CMS migration need not rewrite student components.
- Prefer static output and simple JavaScript over a framework migration before the application deadline.
- Preserve source content integrity and test claims against actual behavior.
- Do not publish the employer's real professionals or interview content without explicit permission.
