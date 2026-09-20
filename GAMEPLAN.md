# phoenix — GAMEPLAN

Session ID below is a placeholder — this scaffold was built outside your local `arc sop` tooling, so there's no real session ID to log against yet. Reconcile with `arc sop ack` the first time you open this locally, per your usual SOP.

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
