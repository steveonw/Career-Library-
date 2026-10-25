# Career Library — Independent Internship Prototype

**Prepared October 25, 2026** · **Portfolio proof of concept; not affiliated with Career Library**

**[View the working student website](https://steveonw.github.io/Career-Library-/)** · **[Inspect source and tests](https://github.com/steveonw/Career-Library-)**

## The opportunity

Career Library helps students discover majors and careers by learning from professional stories. Its staff need a way to manage and publish content without engineering help, while students need an easier experience for finding relevant stories.

## What I built and tested

A lightweight, responsive student website connected to a **Notion-managed demo database** through a secure, read-only publishing pipeline. The public site supports keyword search and filters for major, career field, and experience, plus individual story views.

The key end-to-end test is complete: setting a fictional profile to **Published** in Notion and approving a GitHub Actions synchronization made it appear on the public website (**2 → 3** stories); changing it back to **Draft** and synchronizing again removed it (**3 → 2**). Both deployments succeeded. All demo professionals and journeys are invented. I have not used Career Library's actual interviews or internal content.

## Why this architecture?

**Notion → read-only Notion API → validation & GitHub Actions → static HTML/CSS/JavaScript → GitHub Pages.**

This is a deliberately low-cost, independently verifiable starting point, not a predetermined final architecture. Keeping Notion could let editors continue using tools they already know, while a separate website improves student discovery. The integration isolates the content source, leaving room to migrate to a dedicated CMS later if story volume, roles, media needs, or editorial limitations demand it.

Credentials remain in GitHub Actions secrets rather than frontend JavaScript. Validation rejects incomplete records and drafts, and CI checks the catalog before publication. Sync currently requires explicit approval; the website does not update instantly when Notion changes.

## If selected: a practical delivery sequence

**Discover:** Review the actual content inventory, editorial process, current Notion structure, URLs, consent and video rights, and who approves publication.

**Build:** Agree on the content model and migration strategy; refine a mobile-friendly, accessible directory and real story template; improve crawlable SEO pages and media presentation; add consent-aware analytics.

**Hand over:** Provide documentation, automated tests, rollback guidance, editorial training, and a maintainable roadmap for future AI-assisted discovery features.

I would choose the final CMS and hosting stack **with the founder after a requirements review**—not assume my proof-of-concept choices are already approved.

## Three questions I'd ask first

1. Would Career Library prefer to **keep Notion as the editor** if the student site were separate, or is leaving Notion a firm requirement?
2. What is the **source of truth for professional consent, video hosting, existing URLs, and redirects**?
3. Who will **write, review, approve, and occasionally unpublish** stories after handoff?

**Known limits:** Fictional stories only; client-side story views rather than production SEO URLs; no student accounts, production analytics, real data migration, or instantaneous Notion webhooks. Mobile and accessibility smoke testing is in progress.

This demo emphasizes a functioning editorial workflow, prudent scope, transparent AI-assisted development, and iteration based on observable tests.
