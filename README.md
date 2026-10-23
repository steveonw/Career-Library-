# Career Library — P0 concept demo

An **independent, not affiliated** concept prototype for the AI-Native Web Intern opportunity. All eight professional stories are **fictional**, and the example content is explicitly labeled as such. Do not represent this as a Career Library production site.

## What works

- Mobile-friendly student directory with accessible cards.
- Combined search, major, career field and experience filters.
- URL-persisted filters and direct links to individual sample story pages.
- Published-only catalog selection; drafts and invalid records excluded.
- Server-side Notion data-source importer (optional) that writes the published snapshot to `data/profiles.json`.
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

A **Notion-backed publishing demo** is now prepared. Connect it only to a **practice database containing fictional people**. The instructions are in **[docs/NOTION_SETUP.md](docs/NOTION_SETUP.md)**.

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

**Limitations:** The real Notion integration has not been exercised with credentials yet; the code has mock-API unit tests. Sync is manually triggered, not instant. The output is public JSON, so use fictional text only. Uploaded media, nested Notion blocks and employer-owned profiles are intentionally out of scope for P0.

## Deployment

Static files can be published with **GitHub Pages → Settings → Pages → Deploy from a branch → main / (root)**. The site reads a public JSON snapshot, so a reviewed Notion sync commit updates the deployed content after GitHub Pages rebuilds. A local server needs **Fetch/Pull origin** and a page refresh.

## Remaining P0 verification

- Live Notion demo integration: create/edit a fictional record → preview → publish → student directory updates.
- Change Published back to Draft → resync → student directory excludes it.
- Confirm a mobile viewport and the public GitHub Pages deployment.

## Development decisions

- Keep Notion as a possible familiar editorial system. The `scripts/sync-notion.mjs` adapter is isolated from the UI, so a future CMS migration need not rewrite student components.
- Prefer static output and simple JavaScript over a framework migration before the application deadline.
- Preserve source content integrity and test claims against actual behavior.
- Do not publish the employer's real professionals or interview content without explicit permission.
