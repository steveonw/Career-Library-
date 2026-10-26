# Career Library Internship — Job Requirements vs. Working Demo

**Reference:** Complete “AI-Native Web Development Intern — Project-Based” job description supplied by the applicant, October 26, 2026.  
**Goal:** Show what the independent prototype *actually demonstrates*, what remains to deliver during the internship, and how to discuss the differences without overstating experience.

> The prototype is **independent and unaffiliated**. All eight professionals and their journeys are fictional. The employer's live Notion workspace and real interviews have **not** been migrated or used.

## What the role actually asks for

Career Library needs a **scalable content platform**, not only a visual redesign or a one-time export from Notion. A nontechnical editor must be able to create, edit, categorize, review and publish Career Stories reliably. Students must discover genuine professional journeys through search, filters and mobile-friendly, indexable story pages. Staff also need analytics, documentation, and an architecture that can support later AI features.

## Honest traceability matrix

| Advertised requirement | Evidence already in the demo | What still needs to be built / agreed |
| --- | --- | --- |
| Design technical architecture | **Proven small-scale architecture**: Notion → private read-only API importer → validated JSON snapshot → vanilla JS student UI → GitHub Actions → Pages | Production architecture decisions, scaling thresholds, editorial roles, real hosting and costs |
| Structured content database/model | **Working schema** includes role, major(s), career field, experience, interests, summary, journey, advice, skills, slug and publication status | Production story/professional relationships, media consent and provenance, taxonomy governance, durable editorial history |
| Simple CMS, nontechnical staff add/edit/categorize/publish | **Working proof** in Notion: status-based review and published-only export, successful publish and unpublish | Founder-approved workflow, role/permission controls, intuitive preview, potentially dedicated CMS; the current GitHub sync requires a deliberate separate run |
| Student-facing website | **Working:** [8 fictional careers](https://steveonw.github.io/Career-Library-/), search, cards, story details | Real interview content, navigation/information architecture with actual users |
| Initial Notion migration | **Working technical import** from a separate fictional demo database; no need to edit website code for new content | Real Notion inventory, permission and rights review, migration dry-run, field audits, redirects and approvals; **none of the employer's content migrated** |
| Filter by Major / Career Field / Experience / Interests | **Working controls** for major, field, experience; keyword search includes interests and skills | A separate **Interests filter** and multi-select student discovery UX, validated against real taxonomy |
| Scalable individual Career Story pages | **Working client-side story views** through `?story=slug` | Crawlable standalone URLs, pre-rendering/SSR, canonical tags, metadata, video embeds, share previews and sitemap |
| Mobile-friendly / SEO-ready | **Responsive behavior demonstrated**; 40/40 automated browser checks on 375/768/1440px local and live pages | Production SEO is **not implemented**; current fictional demo intentionally sets `noindex, nofollow`. Human screen-reader/contrast/zoom QA pending |
| GA4 + UTM measurement | **Not implemented**, intentionally no student tracking in fictional demo | Event plan (search, filter, story open, media interaction, outbound click), UTM capture, consent/privacy review especially for student audience |
| Foundation for future AI features | **Reusable structured fields and validated JSON snapshot** offer useful inputs | API/search architecture and source provenance, human-reviewed recommendations, evaluation/safety rules; **no AI end-user feature has been built** |
| Document so staff can manage independently | **Repo documentation**: [README](../README.md), [Notion setup](NOTION_SETUP.md), [plan](PROJECT_PLAN.md), [AI handoff](AI_HANDOFF.md), [QA evidence](P1_QA_CHECKLIST.md) | Founder-specific editor training, production handover, incident/rollback playbook |
| AI-native development and judgement | **Demonstrated workflow:** AI-assisted implementation and debugging, user-driven screenshots and Notion configuration, GitHub Actions troubleshooting, Playwright checks | Explain honestly who did what, code review ability, trade-offs, how to challenge/refine generated output rather than equating prompting with engineering |

### Verified evidence

- **[Live independent demo](https://steveonw.github.io/Career-Library-/)** — eight invented professionals, eight career fields.
- **[Approved Notion import + Pages deployment](https://github.com/steveonw/Career-Library-/actions/runs/40173656688)** — publishes the approved fictional rows, excludes Draft.
- **[Successful publish/unpublish experiment](https://github.com/steveonw/Career-Library-/actions/runs/40170996392)** — editing Notion status affects public content after approved sync.
- **[40/40 browser checks](https://github.com/steveonw/Career-Library-/actions/runs/40173739847)** — ten scenarios in Chromium and Firefox against local build and public Pages, including each career field and story page.
- All eight are fictional; no public analytics code or real interviews were included.

## Recommended production direction — proposal, not implementation

**Default architecture to discuss:** TypeScript and Next.js for accessible, crawlable, SEO-friendly student pages; **Sanity Studio** (or another founder-approved headless CMS) as a friendly editor, with a structured Story schema; managed deployment and content-triggered static regeneration/revalidation. This is a **reasoned starting point**, not proof that these specific technologies were used in the demo or the founder chose them.

**Structured Story document example (proposed)**

```ts
type CareerStory = {
  slug: string;
  professional: { displayName: string; consentStatus: "approved" | "pending" };
  title: string;
  majors: string[];
  careerFields: string[];
  experienceLevel: string;
  interests: string[];
  summary: string;
  journey: string;
  advice: string;
  skills: string[];
  videos?: { url: string; rightsConfirmed: boolean }[];
  status: "draft" | "review" | "published";
  originalNotionId?: string;
  originalUrl?: string;
  publishedAt?: string;
};
```

**Suggested phased implementation**, conditional on requirements and a part-time internship window:

1. **Founder discovery and consent-aware inventory:** Confirm whether leaving Notion is mandatory, expected story count, content ownership, taxonomy, publishing approval chain, user journeys, existing URLs, videos, budget and student privacy constraints.
2. **CMS and migration design:** Prototype an editor's Draft → Review → Published workflow; define field validation and access controls; export Notion content in reviewable batches with stable IDs and redirects. Keep private source material private.
3. **Public site:** Deliver responsive directory and separate crawlable story routes with metadata, sitemap, accessible media embeds, search and filters including interests. Validate actual traffic/performance rather than over-engineering.
4. **Measurement, tests and handoff:** Add GA4/UTM events after privacy review; CI and Playwright regression checks; editorial documentation, training and rollback guidance. Provide an AI-ready structured interface for later reviewed guidance features.

**Alternative decision:** If Career Library prefers retaining Notion as the editor and its role/review limitations are acceptable, a scaled read-only publishing layer may meet the requirements with less migration cost. Do **not** present that as guaranteed alignment with a job ad that explicitly asks for a purpose-built platform and initial content migration.

## Application eligibility / logistics (from the supplied advertisement)

- Internship, part-time, remote from the U.S., **$30–40/hour**, listed October 15–December 15, 2026.
- **U.S. work authorization required**. The applicant must assess and answer this accurately; no assumption is made here.
- They request **resume or LinkedIn, GitHub/portfolio if available, 1–2 built examples, brief AI-coding workflow description, and the exact short architecture question**.
- This document is **a plan to help apply**, not a completed employer project. The dates in the supplied ad describe the internship; confirm actual remaining term and application closing details directly with Career Library.

## Interview positioning

Say: “I built a small, verifiable slice of the content-publishing workflow with fictional stories before applying. The result convinced me that editor usability and safe publication are central. I would not ship the demo as the final platform; first I'd confirm the real content inventory and whether they want a dedicated CMS, then build proper story URLs, interests discovery, analytics and operational handover.”

Avoid claiming the demo is “scalable production-ready,” that real interviews were migrated, that Next.js/Sanity/GA4 are already implemented, or that automation proves full WCAG compliance.
