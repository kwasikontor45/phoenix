# phoenix — GAMEPLAN

The Phase 1 scaffold was built outside the local `arc sop` tooling (placeholder sid below); the local shipping pass further down carries a real sid. Design doc: `docs/recovery-app-gameplan.md`.

## 2026-09-19 · [claude] · [sid:PENDING-LOCAL-RECONCILE] · [DONE] Phase 1 — routine engine

- 00:00 · [claude] — [STARTING] Scaffold React 19 + Vite 8 project; port the 11 daily blocks + 2 VA appointments from `recovery-routine-6am.ics` into `src/data/routine-blocks.js`; implement CCH phase coloring, tap-to-complete, streaks (Athena `completedLessons`-as-Set pattern), and a persistent crisis panel.
- 00:00 · [claude] — Ran `npm run build` clean; smoke-tested with a headless-browser pass (11 blocks render, toggle persists across reload via localStorage).
- 00:00 · [claude] — [DONE] Phase 1 scaffold complete and verified. Not deployed — no Cloudflare Pages project or git remote set up yet for this one.

## Next up (from the gameplan, unstarted)

- [ ] **Naming** — "phoenix" is a placeholder. Confirm or replace before it goes any further (affects package name, subdomain, repo name).
- [ ] Phase 2 — journal entries (morning/evening prompts, mood slider, non-negotiables)
- [ ] Phase 3 — CBT exercises (Thought Record, Urge Surfing Log, Values Inventory); Urge Surfing Log gets a quick-launch, not buried in navigation
- [ ] Phase 4 — Weekly review auto-summary (Sunday reset)
- [ ] Phase 5 — polish pass, offline support, real deploy to `*.kontor.studio`
- [ ] Open decision: wire the Groq fallback chain into Thought Record, or stay manual/offline for v1?
- [ ] Open decision: local-only stays the default, or is cross-device sync wanted eventually?
- [ ] Fix `todayKey()` — currently UTC-based via `toISOString()`, should be a real local-date formatter (see README "Known rough edges")
- [ ] Set up git remote (dual-push, per convention) once this is worth versioning for real

## 2026-09-19 · claude · [sid:796d3fe7-b78b-4551-9add-97520a1a204e] · [DONE] Local shipping pass (deploy pending go-ahead)

- Imported here (`~/khaos-lab/phoenix`, private repo `kwasikontor45/phoenix`); pristine scaffold is the first commit, changes are the second.
- Fixed the UTC date bug: `todayKey()` now uses the local calendar date (at 9:30 PM Pacific the old code already returned tomorrow's date, which would have mis-filed evening check-offs).
- **Privacy:** dated appointments removed from the bundle (`appointments = []`) -- the deployed site is a public static bundle, so nothing personal may live in `src/`. Appointments stay in the calendar. Checked `dist/` for leaks: none.
- Added `noindex`/`robots.txt`, `_headers` (CSP, no-referrer, frame-deny, nosniff) and a web manifest so it installs to a phone home screen.
- Verified: build clean; headless Chromium renders 11 blocks + crisis panel, phase colour correct (Nyx at night).
- `arc deploy phoenix` added (creates the Pages project on first run). **Not run:** creating a public Pages site was blocked by the permission guard and needs an explicit go-ahead from you.
- Not yet: contingency mirror (create empty private repo `k6-bleedin6ed6e-k6/phoenix`, then `arc wire`); weekly-review block exists in data but is not rendered (Phase 4).
