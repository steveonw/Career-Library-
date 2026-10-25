# P1 Browser QA Checklist — Career Library

**Status:** Automated Chromium/Firefox browser tests passed October 25, 2026. The manual-only checks below are still pending unless explicitly supported by supplied screenshots. See [AI_HANDOFF.md](AI_HANDOFF.md).

**Website:** https://steveonw.github.io/Career-Library-/  
**Test only the fictional demo.** Keep Notion Draft content excluded.

## Automated Playwright browser results — PASSED, October 25, 2026

**[Successful GitHub Actions run](https://github.com/steveonw/Career-Library-/actions/runs/40173283873)** · **[HTML report and screenshots](https://github.com/steveonw/Career-Library-/actions/runs/40173283873)** (download artifact `playwright-browser-report`, retained for 7 days)

- **16/16 browser tests passed, 0 failures**: 8 scenarios in headless Chromium (Chrome for Testing 156) and 8 in headless Firefox (157) on GitHub's Linux runner.
- At **375px / 768px / 1440px** in both engines, no horizontal document overflow was measured; search/select/reset controls stayed inside the viewport with at least 43px measured height; card columns followed responsive breakpoints.
- Browser interactions passed for Approved-only catalog count, search/match reasons, persisted URL filters, combined major/field/experience filters, reset empty-state, keyboard Skip-to-content and Enter-to-open-story, unavailable story URLs, fictional disclosure, Published-only JSON, and no JavaScript page errors or missing frontend assets.
- The runner served a **freshly built local `dist/` bundle**, so these checks validate actual browser behavior against committed static files. The separate [GitHub Pages deployment](https://github.com/steveonw/Career-Library-/actions/runs/40173283888) also passed. The tests did **not** directly browse the live Pages URL, nor emulate native Android Firefox or iOS Safari.
- Playwright attached **six full-page screenshots** (three widths per browser) to the HTML report. Test configuration is [playwright.config.mjs](../playwright.config.mjs) and scenarios are [e2e/catalog.spec.mjs](../e2e/catalog.spec.mjs). No Notion tokens or real professional stories were used.

**User-supplied visual evidence:** Firefox-on-Android phone screenshots show readable hero, filter labels and single-column cards; an Opera desktop screenshot shows the multi-column directory. These do not replace testing the entire page on device.

**Still pending human QA:** 200% zoom, actual screen-reader announcements (Narrator/TalkBack), gesture/touch behavior on real device, color contrast audit, and iOS Safari testing.

## Manual smoke test — desktop, tablet, mobile

In Opera/Chrome DevTools, open **Toggle device toolbar** (`Ctrl+Shift+M`) and test the following widths: **375px**, **768px**, and **1440px**. Test at 100% and 200% zoom where practical. Record the date, browser/version, result, console messages, and screenshots.

- [ ] At 375px, no horizontal page scrolling; all labels, selects, search input, and Clear filters button are visible.
- [ ] At 768px, controls remain usable with no overlapping content; cards display without truncated job titles.
- [ ] At 1440px, directory uses a balanced grid; headings and story descriptions remain readable.
- [ ] Each Published story card links to a usable detail page; Back to all stories returns to the directory.
- [ ] A Draft/invalid slug URL (e.g., `?story=lena-park`) shows an appropriate unavailable message, not unpublished story content.
- [ ] Keyword search matches roles, fields, majors and skills; the match reason is understandable.
- [ ] Search `eng` (with sufficiently varied sample data) ranks Engineering job titles before an English-major-only match.
- [ ] Combine search, major, field and experience; verify filter combinations use AND.
- [ ] Search a nonexistent keyword (`zzzz-not-real`) → helpful empty state → Show all stories restores the catalog.
- [ ] Browser Refresh keeps filters encoded in URL, and Clear filters removes them.
- [ ] DevTools Console has no uncaught exceptions or failed content loads (ignore unrelated extensions).
- [ ] Refresh the published Pages URL `/Career-Library-/` and a story URL on Pages; no 404s.
- [ ] Verify the banner and footer still clearly disclose **independent concept demo / fictional stories**.

## Keyboard/accessibility pass

- [ ] Press `Tab` from page start. **Skip to content** appears and focuses the main content when activated.
- [ ] Search, all filter selects, Clear filters, cards, and detail Back link can be reached and activated via keyboard alone.
- [ ] Focus outline remains visible against light backgrounds.
- [ ] Each search/filter control has a visible and programmatic label.
- [ ] Screen reader (Windows Narrator: `Win+Ctrl+Enter`) announces filter labels, story links, and result counts reasonably.
- [ ] Keyboard users receive an understandable “No matching stories” state and can reset it.
- [ ] Text remains legible at 200% zoom; no meaningful information is conveyed by color alone.
- [ ] Reduced-motion preference removes optional card hover movement.
- [ ] No personal/private information or integration secrets exist in browser Network responses or public `data/profiles.json`.

## How to verify

1. In GitHub Desktop **Fetch/Pull origin** if local. Double-click `START_DEMO.bat` or run `py -m http.server 8000` inside repository; open http://localhost:8000/. Don't open `index.html` under `file://`.
2. Inspect the public GitHub Pages URL separately; local success is not proof of deployment.
3. Run `npm run check` and capture a successful GitHub Actions run.
4. Put actual evidence here in a dated follow-up: browser version, widths, screenshots (no secrets), findings, fixes, and any remaining blockers.

## Regression / acceptance

When doing a code patch, keep these invariant:
- `data/profiles.json` exposes **Published only**.
- GitHub Pages still serves the static asset paths under `/Career-Library-/`.
- Filtered story pages never show Draft or missing records.
- Tests pass and the deployed content matches the currently approved Notion snapshot.

**Next:** Run this checklist in the actual browser, record real findings, and fix only observed issues. Do not declare manual accessibility testing passed until it has been performed.
