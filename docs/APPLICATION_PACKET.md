# Career Library — Application-Ready Packet

**Prepared:** October 25, 2026  
**Role:** AI-Native Web Intern — Career Library  
**Job posting:** https://scecareer.nau.edu/jobs/career-library-ai-native-web-intern/ (listing expires October 29, 2026; confirm the exact closing time in the actual application portal)  
**Recommendation:** Apply October 26–27. The working prototype matters more than adding more features.

> **Important:** The demo is an independent, clearly labeled portfolio prototype with **fictional professional stories**. Career Library has not approved or commissioned it. Everything below is an editable draft, not a submitted application. Verify claims and adapt to your own voice.

## Submission links and evidence

- **Public interactive demo:** https://steveonw.github.io/Career-Library-/
- **Code / portfolio:** https://github.com/steveonw/Career-Library-
- **One-page founder brief:** https://github.com/steveonw/Career-Library-/blob/main/docs/FOUNDER_BRIEF.md
- **Independent content review:** https://github.com/steveonw/Career-Library-/blob/main/docs/P1_CONTENT_REVIEW.md
- **Notion publish and deploy evidence:** https://github.com/steveonw/Career-Library-/actions/runs/40173656688
- **Browser test evidence:** https://github.com/steveonw/Career-Library-/actions/runs/40173739847 — 40/40 checks passed in Chromium and Firefox, across locally built and live Pages sites.

## 1. Short note for the application / founder

I'm applying for the AI-Native Web Intern opportunity because I like the problem Career Library is solving: helping students explore possible careers through people's journeys, while making it simple for your team to manage the stories.

Before applying, I built an **independent, fictional proof of concept** rather than just writing a proposal. It has eight sample career stories in eight fields, search and filters, individual story views, and an editorial workflow controlled through Notion. I demonstrated both publishing and unpublishing through GitHub Actions, then added automated browser tests; **40 of 40 checks passed** against the built and deployed websites.

I used AI-assisted development and iteration to get to a working result, but I treated the browser behavior, source data, and test results—not the AI's confidence—as the evidence.

**Demo:** https://steveonw.github.io/Career-Library-/  
**Source and documentation:** https://github.com/steveonw/Career-Library-

I'd welcome the chance to help shape the actual platform with your team. The prototype uses only invented profiles, and I'd start any real migration with your content requirements, permission checks, and editorial workflow.

## 2. Required short response

**Question: "If you were moving Career Library from Notion to a scalable website, what would you build it with and why?"**

I would separate **the editing experience** from **the student-facing website**. I'd first inventory Career Library's actual stories, taxonomy, images, videos, existing URLs, and approval process, then define a structured Career Story schema that can survive a change of CMS.

For a purpose-built production version, I'd lean toward **Next.js and TypeScript** for accessible, SEO-friendly career pages, search and filtering, with a nontechnical **Sanity Studio** CMS for editing, review and publishing. Hosting on Vercel or another suitable platform would give a straightforward deployment pipeline. I'd migrate Notion content in batches, validate fields, preserve canonical URLs with redirects, add automated tests and monitoring, and implement GA4/UTM measurement after a privacy review.

I wouldn't force a CMS migration before understanding the team's constraints. As a proof, I built a lower-cost **Notion → read-only importer → validated public JSON → static student website** workflow. Editors can publish or unpublish stories without changing site code. That working experiment would help us choose whether to keep Notion temporarily or move to a dedicated CMS, based on actual editorial needs, scale, and maintenance cost.

**Preparation note:** Next.js/Sanity are **proposed choices**, not technologies demonstrated in the existing prototype. The working demo uses HTML, CSS, JavaScript, the Notion API, GitHub Actions and Pages. Don't suggest you've already implemented the production stack.

## 3. Brief account of AI-assisted development

I use AI as an active coding and debugging collaborator. For this demo, I described the intended editor and student workflows, used AI assistance to implement and iterate on the code, and brought back browser screenshots, console errors, GitHub Actions failures, and Notion schema results to guide fixes. I didn't stop when the page merely looked convincing: we tested the actual **publish → deploy → unpublish** sequence, guarded against Draft content appearing publicly, and ran automated Playwright checks in Chromium and Firefox against both a local build and the live website. I also kept a project plan and AI handoff sheet in GitHub so the decisions, known limitations and next steps are reviewable.

I'm comfortable checking AI output against observed behavior and changing course when the simpler solution is more practical. My goal is to reduce time and tool costs without confusing plausible generated code with verified working software.

**Interview honesty:** Be ready to explain which tasks you personally performed (Notion setup, GitHub secrets/workflow operation, browser/phone checks, design choices) and where the AI coding collaborator implemented or edited code. You don't need to pretend you hand-typed every line; show that you can understand, maintain and verify the work.

## 4. Portfolio example

**Career Library independent demo (October 2026)**  
**Live:** https://steveonw.github.io/Career-Library-/  
**GitHub:** https://github.com/steveonw/Career-Library-

Created and iterated on an eight-story career discovery prototype with a Notion-managed editorial database, privacy-conscious server-side data import, Published/Draft controls, search and filtering, individual career pages, GitHub Pages publishing, and automated browser QA. Verified a real Notion-to-live-site publication and removal sequence; 40 Playwright checks passed across browsers and local/live builds. Content is fictional and the project is unaffiliated with Career Library.

**Optional second project:** Choose one repository you can personally describe confidently. Provide its own URL and one verified sentence about what you did and what works; **do not invent another project's features or results.** The job posting requests 1–2 examples, so this Career Library demo alone meets the example count.

## 5. Optional 60–90-second walkthrough

| Approximate time | Screen | Suggested narration |
| --- | --- | --- |
| 0–12 sec | Public homepage | "I wanted to show a working version of the Career Library idea, not just a plan. This is a fictional, independent demo." |
| 12–32 sec | Filter to a major/field; use search | "Students can narrow a directory by major, field and experience, or search for a particular role." |
| 32–48 sec | Open a story | "Each career has a summary, a journey into the field, advice, and relevant skills." |
| 48–65 sec | Show Notion database status columns | "On the editing side, Notion remains familiar to nontechnical staff. Published and Draft have distinct effects." |
| 65–80 sec | Show successful sync/deployment and test run | "GitHub Actions validates and deploys the approved content. I tested publishing and unpublishing, and 40 browser checks passed." |
| 80–90 sec | Back to demo homepage | "For the real product, I'd first review the content inventory, editing process and whether a separate CMS is needed." |

**Recording tip:** Make it a browser screen recording with visible URL. Don't show GitHub secrets, integration tokens, private workspace information, or personal account details. Do not claim you demonstrate a live Notion sync if the recording only shows past Actions results.

## 6. Submission checklist

- [ ] Add **your resume or LinkedIn**. This is personal information that isn't in the repo; do not invent it.
- [ ] Open the application on the job posting and confirm the actual submission mechanism, email address (if any), and closing time.
- [ ] Include the **demo URL** and GitHub repository URL.
- [ ] Provide at least **one example you built** (the Career Library prototype); optional second project only if you can discuss it.
- [ ] Use the **short architecture answer**, editing language so it reflects what you understand and can defend.
- [ ] Include a brief, candid description of **your AI-assisted workflow**.
- [ ] Optional: attach or link the short [founder brief](FOUNDER_BRIEF.md) rather than the seven-page specification.
- [ ] Optional: record and link a short walkthrough; **do not delay applying** just to polish a video.
- [ ] Before submitting, open the demo on phone/desktop, verify eight fictional stories, and check [GitHub Actions](https://github.com/steveonw/Career-Library-/actions) for unexpected failures.
- [ ] Submit by **October 26–27**, preferably before October 28. The listing says it expires October 29; earlier is safer.
- [ ] Keep a local copy / screenshot of the submitted application and note its confirmation.

## What has not been built

This independent demo is **not** a Career Library production migration. It has **no employer content**, no real interviews or permissions, no custom CMS/editor roles, no production SEO URLs, no GA4 installation, and no instant Notion webhooks. Automated browser checks are meaningful but not equivalent to a full manual accessibility or security audit.

**Next step after submitting:** Prepare for an interview by explaining the content schema, why the Notion token stays server-side, how Draft/Published controls work, how GitHub Actions deploys, why static was chosen, and when you would recommend migration to Sanity or another CMS.
