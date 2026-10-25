# Instructions for AI coding agents

Start with [docs/AI_HANDOFF.md](docs/AI_HANDOFF.md) and [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md). Recheck the **current** `main` and GitHub Actions results; these docs are a checkpoint, not an immutable truth.

This repository is an **independent, public, fictional Career Library internship demo**. P0 works. Keep the proven simple architecture (Notion read-only importer → validated JSON snapshot → vanilla JS static site → GitHub Pages). Do not migrate to Next.js/Sanity or add paid services without a justified, authorized requirement.

Before delivering a change:
1. Preserve all fictional-content, Draft exclusion, disclosure, secret, and safe-publishing safeguards.
2. Run `npm run check` and inspect any failing step. Confirm the GitHub Pages subpath if deploying.
3. Write small reviewable commits, avoid public content changes unless explicitly authorized, and never reveal `NOTION_TOKEN` or other secrets.
4. Record updated milestones and caveats in the plan/handoff. Do not claim browser tests or production readiness without proof.

**Next priorities:** Responsive/keyboard QA, sample data diversity (fictional only), application brief/demo evidence. See the plan for scope and deadline.
