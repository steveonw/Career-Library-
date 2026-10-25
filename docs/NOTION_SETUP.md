# Connect a fictional Notion career library to the demo

**Purpose:** Prove the editor-to-student publishing workflow without moving the employer's real data. Notion remains the editor. GitHub Actions reads Published records, validates them, and can update the static website after a manual approval step.

**Privacy:** This repository is PUBLIC. Its `data/profiles.json`, including any imported text, is publicly readable. **Use only imaginary people and fictional stories.** Do not connect Career Library's real workspace, paste your token into chat, create public copies of interview videos, or add personal emails/consent notes.

## Step 1 — Make a practice Notion database

1. Open your personal demo Notion workspace and make a page called **Career Library — DEMO**.
2. Inside it, insert a full-page table database called **Career Profiles Demo**.
3. Make sure the title column is called **Name**. Add these properties with these *exact* names (types matter).

| Notion property | Type | Example |
| --- | --- | --- |
| Name | Title | Maya Chen |
| Role | Text | Software Engineer |
| Major | Multi-select | Computer Science |
| Career Field | Select | Technology |
| Summary | Text | Fictional summary of this career |
| Status | Select **or** Status | Draft, Published |

You may also add **Journey** (Text), **Advice** (Text), **Slug** (Text), **Experience Level** (Select), **Skills** (Multi-select) and **Interests** (Multi-select). They are optional for the first proof.

**Important:** In the Status property's options, create an option named exactly **Published** (capital P). Start new stories with **Draft** and switch to **Published** once ready.

Add two fictional rows. For example:
- **Maya Chen** — Software Engineer; Computer Science; Technology; Summary: "Maya builds accessible learning tools. This is a fictional example."; Status: Published
- **Lena Park** — Wildlife Researcher; Biology; Science; Summary: "Lena studies local habitats. This is a fictional example."; Status: Draft

The importer rejects a published record with a missing name, role, major, career field or summary.

## Step 2 — Create a private, READ-ONLY connection

1. In Notion, open **Settings → Connections**. Turn on **Developer Mode** if prompted, then choose **New connection** (or use the developer tools link).
2. Name it **Career Library Demo Reader**. Select your personal demo workspace.
3. Give the connection **Read content** only. No write or user-email permissions are needed.
4. Open your **Career Profiles Demo** database page, choose `•••` → **Connections / Add connections**, and grant this connection access to that database. Some Notion layouts put Connections under Share.
5. Find the connection's **internal token** in your connection settings. Do not put it into source code or share it in chat.

Official Notion help: https://www.notion.com/help/create-integrations-with-the-notion-api

## Step 3 — Add two GitHub Actions secrets

In https://github.com/steveonw/Career-Library-/settings/secrets/actions click **New repository secret**, twice.

| Secret name | Value |
| --- | --- |
| `NOTION_TOKEN` | The private Notion connection token |
| `NOTION_DATABASE_ID` | The URL copied from your **Career Profiles Demo** database, or its 32-character ID |

The importer can resolve a normal database link to its internal Notion data source, even though the API distinguishes those IDs. If Notion has multiple data sources inside one database, additionally set `NOTION_DATA_SOURCE_ID` to the specific one (and ask for help finding it).

GitHub masks configured secrets in workflow logs, but **never intentionally print tokens**.

## Step 4 — Preview without publishing

1. In https://github.com/steveonw/Career-Library-/actions select **Sync fictional stories from Notion** in the workflow list.
2. Select **Run workflow**. Leave **Publish the imported catalog** **unchecked**.
3. Open the completed run. The schema check, import, and tests should all pass.
4. Download the short-lived **notion-preview-catalog** artifact and look at the generated `profiles.json`. Anything there could become public. If it contains anything real or private, **STOP** and remove that data from Notion before proceeding.

The preview does **not** update your repository's website. If the run fails, read the step that failed; no existing stories are overwritten.

## Step 5 — Deploy and verify the public demo

**First, enable Pages once:** Open https://github.com/steveonw/Career-Library-/settings/pages. Under **Build and deployment → Source**, select **GitHub Actions** (not `Deploy from a branch`). This is necessary because commits from GitHub's built-in Actions token do not automatically trigger a branch-based Pages build. The sync workflow now deploys the same validated content it just imported.

1. Open https://github.com/steveonw/Career-Library-/actions/workflows/notion-sync.yml.
2. Select **Run workflow**, this time check **Publish**, and run it.
3. The `sync` job validates, builds an allowlisted static bundle, commits only `data/profiles.json` to `main`, and uploads the public website artifact. The `deploy` job deploys that artifact to GitHub Pages.
4. Once the `deploy` job is green, open **https://steveonw.github.io/Career-Library-/** and verify Maya and Jordan appear. This is a public Internet address; only invented records belong in the demo database.
5. If working locally, click **Fetch origin → Pull origin** in GitHub Desktop and refresh http://localhost:8000/.

**Test editorial publishing and unpublishing:**

1. Change fictional Lena Park's status in Notion from **Draft** to **Published**.
2. Run the same **Publish** workflow and verify the public website shows **3** stories.
3. Change Lena's status back to **Draft**, rerun **Publish**, and verify the website returns to **2** stories. The public JSON snapshot is regenerated each time.
4. Review the workflow logs and website to show that staff can publish and retract fictional content without editing website code.

The website is deployed from a limited allowlist (`index.html`, `app.js`, `styles.css`, `lib/catalog.js`, `data/profiles.json`). No Notion credentials or development configuration files are included. A future automation could schedule synchronization, but this P0 deliberately retains manual review. Source/UI code updates can be deployed by running the same workflow with **Publish** checked.

## Troubleshooting

- **401:** Token invalid/expired; recheck the `NOTION_TOKEN` secret.
- **403/404:** Database not shared with the Notion connection, bad link, or missing capability.
- **"Notion database columns need attention":** Wrong property name/type; use the table above.
- **"No complete Published stories":** Mark at least one valid fictional row Published.
- **"Multiple data sources":** Set the specific `NOTION_DATA_SOURCE_ID`.
- **Git push rejected:** Repo policy or branch protection prevented workflow commits. Nothing is automatically force-pushed.

The source content import currently supports only database properties, not arbitrary nested page body blocks or videos. That limitation is intentional for the application demo.
