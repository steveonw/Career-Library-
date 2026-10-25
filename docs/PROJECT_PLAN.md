# Career Library — Updated Project Plan

**Last verified:** October 25, 2026 (EDT)  
**Status:** P0 completed; P1 expanded to 8 fictional published stories across 8 career fields, 40/40 Playwright checks passing on local and live sites; manual screen-reader/zoom checks and application submission remain  
**Application target:** Submit by October 28, before the October 29 deadline (confirm the exact time zone on the listing).

> **Independent proof of concept.** This is an unsolicited student internship prototype, **not** the official Career Library website. All professionals and stories in the demo are fictional. Never use a real interview or someone's personal information without permission.

## 1. Mission and product boundary

Prove the essential Career Library workflow: a nontechnical editor writes a Career Story in Notion, marks it **Published**, and students can find it on a separate, responsive website by search, major, career field, or experience level. Returning the story to **Draft** removes it at the next authorized sync.

**Strategic decision:** Keep Notion as the editorial tool for now. Do not migrate to a different CMS merely to follow a framework trend. A standalone website can serve a validated, cached snapshot of Notion content. Revisit Sanity or a custom CMS only if the founder's needs and real content limitations justify migration.

**Architecture:** Notion database → read-only Notion API integration → GitHub Actions validation/snapshot → public `data/profiles.json` → static HTML/CSS/JavaScript website → GitHub Pages.

## 2. Verified P0 achievements

| Capability | Status | Evidence / caveat |
| --- | --- | --- |
| Public student directory | **Done** | https://steveonw.github.io/Career-Library-/ |
| Search and combined major/field/experience filters | **Done** | Implemented in `lib/catalog.js`; manual keyword search demonstrated |
| Individual career-story views | **Done** | Client-side story view at `?story=slug`; not SEO-specific static pages |
| Notion database, schema, read-only integration | **Done** | Live API schema and query checked through GitHub Actions |
| Draft exclusion and input validation | **Done** | Importer filters Published records and rejects invalid public output |
| Notion publish: two stories → three | **Done** | Approved Lena Park and saw her appear on public Pages site |
| Notion unpublish: three → two | **Done** | Returned Lena to Draft; public data and deployment reverted to two |
| GitHub Pages build/deploy | **Done** | Last successful publish/unpublish run: https://github.com/steveonw/Career-Library-/actions/runs/40170996392 |
| Automated catalog/API mock tests and build | **Done** | `npm run check` in GitHub Actions |
| Browser/device accessibility QA | **Pending deeper review** | CSS has responsive rules; real mobile and keyboard/screen-reader checks remain |
| Real Career Library content / permissions / migration | **Not in P0** | No access or approval to republish real professional stories |

**Current published fictional data (verified):** Amina Okafor (Occupational Therapist), Cass Morgan (Science Communicator), Elena Torres (Urban Planner), Jordan Rivera (Environmental Scientist), Maya Chen (Software Engineer), Priya Shah (Product Designer), Rowan Ellis (Financial Analyst), Theo Bennett (Civil Engineer). Lena Park remains **Draft** and is excluded from `data/profiles.json`. All content is invented.

## P1 expansion completed — verified October 25, 2026

- Reviewed six fictional Draft profiles for name/slug uniqueness, complete Name/Role/Major/Career Field/Summary/Status properties, plausible journeys, student advice, skills, interests and experience labels.
- Marked exactly those six profiles Published; left Lena Park as Draft. Notion → GitHub → Pages deployment passed with eight unique public stories and no Draft stories: https://github.com/steveonw/Career-Library-/actions/runs/40173656688
- Improved browser tests now check each of eight published career fields, every story page, search, combined filters, keyboard navigation, responsive layouts and Draft exclusions.
- **40/40 Playwright checks passed** (10 scenarios × Chromium/Firefox × local built site/live GitHub Pages): https://github.com/steveonw/Career-Library-/actions/runs/40173739847
- [Content-review evidence](P1_CONTENT_REVIEW.md). Remaining P1 priorities are screen-reader/200%-zoom human QA, the application and optional walkthrough.

## P1 browser QA — verified October 25, 2026

- **Playwright Chromium + Firefox passed 16/16 tests**. GitHub run: https://github.com/steveonw/Career-Library-/actions/runs/40173283873
- Browser widths **375, 768, and 1440px** all passed no horizontal overflow, visible filter controls with minimum 43px height, and responsive card geometry. Captured six full-page screenshots in the `playwright-browser-report` artifact.
- Browser-driven search, URL persistence, combined filters, empty/reset flow, keyboard skip/story navigation, missing story protection, JSON Published-only assertions, and load error monitoring all passed.
- **Real-device screenshots provided:** Firefox Android phone and Opera desktop; they show no obvious clipping in the depicted portions of the page.
- **Not yet done:** native screen reader assessment, zoom/reflow at 200%, contrast audit, mobile gestures, iOS Safari. Automated Chromium/Firefox headless testing does not prove production-wide accessibility.
- Standalone GitHub Pages deploy also passed: https://github.com/steveonw/Career-Library-/actions/runs/40173283888

See [P1_QA_CHECKLIST.md](P1_QA_CHECKLIST.md) for full evidence and remaining checklist.

## P1 progress — October 25, 2026

- **P1 frontend patch committed:** Search now ranks career-title matches ahead of major-only matches and shows a match-reason label; clearer empty results and missing/unpublished story feedback; 44px minimum filter controls, smaller-screen grid safeguards, keyboard focus styling and reduced-motion support. New Node regression cases cover ranking.
- **P1 sample expansion complete:** Six fictional records reviewed and published directly from Notion: Amina Okafor, Theo Bennett, Priya Shah, Elena Torres, Rowan Ellis and Cass Morgan. Combined with existing Jordan and Maya, the public demo contains eight stories; the required importer schema did not change.
- **Content review and publication complete.** GitHub's approved sync and Pages deployment succeeded (eight stories). Lena Park remains Draft and excluded.
- **Further human QA pending:** Automated Chromium/Firefox tests passed locally and against live Pages at 375px, 768px and desktop, including keyboard actions and errors; actual screen-reader output, color contrast, 200% zoom and native-device gestures are not yet certified.
- **P1 application packet pending:** One-page founder brief, polished walkthrough/evidence, and submission. Deadline October 29; aim before October 28.

## 3. P1 — Application-ready demo, timeboxed through October 28

Work in the following order. Protect the existing public publishing/unpublishing pipeline. If time runs out, deliver the earlier items and **do not delay the application** for optional features.

| Priority | Work | Concrete definition of done |
| --- | --- | --- |
| **P1.1 — Essential** | Mobile and accessibility smoke test | Verify 375px, 768px, desktop; use keyboard to open cards and use filters; no clipped controls, blank catalog, or console errors; note limitations |
| **P1.2 — Done** | Richer fictional sample distribution | Add ~4–6 more explicitly fictional profiles in **Notion**, covering different majors, fields, and experience levels. Preview content before public sync; no real names/interviews |
| **P1.3 — Essential** | Evidence and handover | Update README/demo instructions; collect screenshots of Notion statuses, Actions logs, 2→3→2 transition, mobile page; document AI-assisted development and verified tests |
| **P1.4 — Essential** | Application packet | One-page founder-facing brief, concise stack rationale, short answer to employer's CMS-migration question, repo and public-demo links, optional 60–90 sec walkthrough |
| **P1.5 — Done** | Student search clarity | Prioritize career-title matches and clarify matches on majors/skills (e.g., `eng` can match the major English). Add tests for ranking/labels |
| **P1.6 — If time** | Visual polish | Improve typography, spacing, story hierarchy, and a more distinct search empty state, without adding a new framework |
| **Not for this application** | AI chatbot, student accounts, paid services, full migration, real interviews, analytics integration, automatic editing or live webhooks | Revisit after founder discovery |

### Proposed short schedule

- **Oct 25:** Freeze and document verified P0; start P1 mobile/keyboard check.
- **Oct 25 (completed early):** Reviewed and published six fictional Notion stories; verified eight fields, redeployed, and ran 40 browser checks.
- **Oct 27:** Fix any genuine usability defects; prepare a short screen recording and one-page founder brief.
- **Oct 28:** Final smoke test, ensure GitHub Pages is live, submit application; keep full specification for an interview.

These are targets, not guaranteed estimates. If a task runs late, prioritize the application and working proof over decorative features.

## 4. Application proof and narrative

The most convincing demonstration is **not** the number of lines written: (1) edit a fictional Story in Notion, (2) choose Published, (3) trigger the approved GitHub Actions import, (4) show the career appears in the student-facing directory and filtering, (5) restore Draft and show the story disappear after another sync.

Be candid that sync is **manual**, content is **fictional**, and story pages are currently **client-side views**, not production SEO routes. A founder can then understand the product benefit and the remaining trade-offs.

### Suggested founder-facing one-page brief structure

1. **Problem:** Notion works for entering stories; it is not an ideal student discovery website.
2. **Working proof:** A live directory controlled by Notion, with documented publish/unpublish demonstration.
3. **Architecture:** Notion → restricted CI import → static Pages; no browser API key.
4. **Next six internship weeks (if hired):** Founder discovery and content permissions, structured migration/audit, improved editorial controls, search/SEO/accessibility and analytics with consent, maintainability documentation.
5. **Open questions:** Is staying on Notion acceptable? Who approves publication? How many stories, media/video rights, and redirect URLs must be preserved?

The founder may specifically want to *leave* Notion. Offer keeping Notion as an evidence-based low-risk option rather than claiming the job posting approves it.

## 5. P2 — Conditional production roadmap (after application / if hired)

These are **proposals, not completed commitments**, and require founder approval:

1. **Discovery and inventory:** Examine the actual Notion export/schema, relationships, profile count, permissions, videos, domains, current links and URL redirects.
2. **Content governance:** Approval roles, revision/audit history, rights checks, editorial style, taxonomy cleanup, safe unpublishing.
3. **Scale/discovery:** Server-prepared content index or searchable static build, high-quality story templates, filtering QA; measure actual performance before adding a database/search provider.
4. **SEO/media:** Individual crawlable routes, accessible video handling, structured metadata, sitemap, redirect management, and appropriate robots policy on an authorized production site.
5. **Analytics/privacy:** Clear event naming and UTM measurement, minimized student data, consent/privacy review before turning on analytics.
6. **Reliability/operations:** Scheduled sync or webhook only after reviewing review/rollback process; CI, incident playbook, monitoring, editor training.
7. **CMS decision checkpoint:** Keep Notion unless demonstrated requirements outweigh retraining and migration cost; otherwise compare dedicated CMS options using real requirements.

## 6. Risk register

| Risk | Mitigation |
| --- | --- |
| Publishing someone else's interview or private Notion content | Maintain a separate **fictional demo** database, read-only connection, review public JSON before publishing; no real content without written approval |
| Token exposure | Tokens belong only in Actions secrets/environment; never commit `.env`, copy into chat, or call Notion directly from browser |
| Replaying stale workflow push | Launch a **new workflow run** from `main` when possible; current sync workflow refreshes `main` and rebases safely |
| GitHub Pages misconfiguration | Settings → Pages → **GitHub Actions**; ensure build and deploy jobs pass |
| Public demo mistaken for employer property | Keep conspicuous “Independent concept demo / Fictional stories” disclosures and `noindex, nofollow` |
| Endless architectural iteration | Maintain P0 freeze, timebox P1, record defects and stop at acceptance criteria |
| Two different Pages workflows racing | Avoid overlapping deployment runs, inspect run logs, verify last deployed data; consolidate later only if operationally necessary |

## 7. Repository pointers and ownership

- **Source:** https://github.com/steveonw/Career-Library- (`main`)
- **Live demo:** https://steveonw.github.io/Career-Library-/
- **Notion setup:** [NOTION_SETUP.md](NOTION_SETUP.md)
- **AI continuation guide:** [AI_HANDOFF.md](AI_HANDOFF.md)
- **Automated workflows:** `.github/workflows/checks.yml`, `notion-sync.yml`, `deploy-pages.yml`
- **Current actual data:** `data/profiles.json` (public)
- **Fuller product specification:** Earlier seven-page technical PDF is an independent planning document; this repo plan is the current implementation checkpoint.

**Update rule:** At the end of each milestone, mark evidence-backed items Done/Pending, add a link to the successful Actions run, and update [AI_HANDOFF.md](AI_HANDOFF.md) with any changed paths, commands, decisions, or known issues. Never claim an untested capability is completed.
