# P1 Fictional Content Review and Publication Record

**Date:** October 25, 2026 (EDT)  
**Scope:** Independent Career Library internship demonstration only; no real professional interviews or authorized employer data.  
**Review method:** Inspected the connected Notion database's actual row properties, then validated again after publication against public GitHub JSON and browser tests.

## Approved fictional profiles

| Name | Career role | Major | Career field | Experience |
| --- | --- | --- | --- | --- |
| Amina Okafor | Occupational Therapist | Kinesiology | Healthcare | Mid career |
| Theo Bennett | Civil Engineer | Civil Engineering | Engineering | Early career |
| Priya Shah | Product Designer | Graphic Design | Design | Early career |
| Elena Torres | Urban Planner | Geography | Public Service | Mid career |
| Rowan Ellis | Financial Analyst | Economics | Finance | Early career |
| Cass Morgan | Science Communicator | Communications | Communications | Mid career |

Existing Published profiles retained: **Jordan Rivera** (Environmental Scientist / Biology / Science / Mid career) and **Maya Chen** (Software Engineer / Computer Science / Technology / Early career).

Existing **Lena Park** profile was intentionally left **Draft** and must remain excluded from the public JSON until explicitly approved in a future decision.

## Review performed

- [x] All six planned records exist in Notion and were initially Draft before this step.
- [x] Every planned record has Name, Role, Major, Career Field, Summary, Status, Slug and Experience Level.
- [x] All six include a short fictional journey, student advice, skills and interests.
- [x] Slugs and names are distinct across existing named Notion rows; slugs contain safe lowercase letters/numbers/hyphens.
- [x] Careers span six new fields; combined demo covers **8 different fields** and **8 majors**.
- [x] Editorial pass found no links to real interviews, photographs, employer claims, contact information or student records in the six generated demo rows.
- [x] The six were moved from Draft to Published in Notion only after review as part of the user's requested next step.
- [x] The approved GitHub Actions sync validated, committed and deployed exactly **8** Published profiles: https://github.com/steveonw/Career-Library-/actions/runs/40173656688
- [x] Public JSON has eight unique slugs, with Lena Park excluded.
- [x] Automated browser verification: **40/40 passed** (10 scenarios × 2 browser engines × local/live sites): https://github.com/steveonw/Career-Library-/actions/runs/40173739847

**Other workspace hygiene:** One unnamed, empty row exists in the practice Notion database without a Published status; it is not imported. Removing it is optional and was not required for the demonstration.

## Boundaries and caveats

These are **invented teaching examples**, not verified accounts of people's lives, real career interviews, career counseling or credential requirements. A real Career Library production migration would need consent and source-of-truth review before displaying actual professionals or videos. Keep the disclosure and the demo site's noindex/nofollow directive.

The current process is intentionally **manual approval to sync**, not a Notion webhook. Changes in Notion do not instantly update GitHub Pages.

**Next actionable priorities:** Submit internship application using [founder brief](FOUNDER_BRIEF.md), [working site](https://steveonw.github.io/Career-Library-/), and proof links; optional 60–90 second walkthrough. Remaining QA includes native screen readers, 200% zoom, color contrast and user studies, as tracked in [P1_QA_CHECKLIST.md](P1_QA_CHECKLIST.md).
