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

Opening `index.html` using file:// is not supported because browsers block module/data fetches there.

## Notion setup — optional, private

Create a new Notion data source containing demo-only profiles. Create properties with these **exact** names and types:

| Property | Type |
| --- | --- |
| Name | Title |
| Role | Rich text |
| Slug | Rich text |
| Major | Multi-select |
| Career Field | Select |
| Experience Level | Select |
| Interests | Multi-select |
| Summary | Rich text |
| Journey | Rich text |
| Advice | Rich text |
| Skills | Multi-select |
| Status | Select (Draft, Published) |

Create a Notion internal integration with read access, share only that demo data source with the integration, and find its data source ID. Set `NOTION_TOKEN` and `NOTION_DATA_SOURCE_ID` as **environment variables** (e.g. load a local ignored `.env`). Then run:

```sh
npm run sync
npm test
```

The importer queries the 2025-09-03 Notion data source API, pages through results, validates required fields, rejects duplicate published slugs, and **refuses to overwrite** the sample snapshot when the result is empty. It does not automatically edit Notion.

**Important:** Running the sync replaces the sample JSON file. The generated output is public website content. Use invented profiles only, and review changes before committing. Never store private notes, emails, consent information, tokens, or unpublished content in the public snapshot. The current mapper handles database properties rather than nested Notion page blocks, file uploads, or media.

## Deployment

This static P0 can run on GitHub Pages (Settings → Pages → Deploy from a branch → main/root). Data is checked into the repository; Notion sync is **manual** until a reviewed GitHub Actions workflow with secrets is configured. No live publishing or automatic revalidation is claimed. This intentionally separates the P0 directory prototype from the later live editorial workflow.

## Scope and next milestone

P0 demonstrates discovery and a safe content adapter, **not** a complete end-to-end publishing system. Next: configure a real demo Notion integration, verify publishing end to end, and add a gated synchronization job. Then consider accessible video links, richer story blocks, SEO-ready static page generation and consent-aware analytics.

## Development decisions

- Keep Notion as a possible familiar editorial system. The `scripts/sync-notion.mjs` adapter is isolated from the UI, so a future CMS migration need not rewrite student components.
- Prefer static output and simple JavaScript over a framework migration before the application deadline.
- Preserve source content integrity and test claims against actual behavior.
- Do not publish the employer's real professionals or interview content without explicit permission.
