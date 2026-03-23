---
role: qa
owner: Gerald
status: active
last-updated: 2026-03-18
---

# Quality Assurance

## Scope
Build verification, cross-browser testing, mobile testing, content accuracy, and regression prevention.

## Decisions
| Date | Decision | Rationale | Linked roles |
|---|---|---|---|
| 2026-03-18 | Build verification via `npx astro build` after each change | No test suite exists. Build success is the minimum gate. | [[dev]] |

## Dead Ends
<!-- APPEND ONLY. Never delete. -->
| Date | What was tried | Why it failed / was rejected |
|---|---|---|

## Lessons

## Open Questions
- [ ] Mobile testing on real iPhone (192.168.0.199) not yet done for back-control module — owner: Gerald — since: 2026-03-18
- [ ] Simulation strategy toggle: does Ride/Freeze/Spiral produce noticeably different outcomes? Needs observation. — owner: Gerald — since: 2026-03-18
- [ ] No emdash audit on current content (feedback: user finds them unnatural) — owner: Gerald — since: 2026-03-18

## Assumptions
- `npx astro build` catching errors is sufficient for now (no unit/integration tests)

## Dependencies
Blocked by: [[dev]]
Feeds into:

## Session Log
<!-- One line per session, newest first -->
2026-03-18 — INIT. Build verified for back-control module. Mobile testing pending.
