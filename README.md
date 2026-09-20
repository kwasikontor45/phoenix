# phoenix

Phase 1 of the recovery-app gameplan: the daily routine engine. Working name only — rename freely (subdomain, package name, everything) whenever you land on one.

## What's here

- `src/data/routine-blocks.js` — the 11 daily blocks + the 2 pending VA appointments, mirroring `recovery-routine-6am.ics`. This is hand-authored right now; the honest next step is generating the `.ics` from this file (or vice versa) so they can't drift apart.
- `src/lib/cch.js` — Circadian Canonical Hours as code: `phaseForTime('14:30')` → `'desire'`. Single source of truth for the palette so nothing else has to hardcode hex values.
- `src/lib/progress-store.js` — Athena's `completedLessons`-as-a-`Set` pattern, reused: a Set of `${date}:${blockId}` keys in `localStorage`, streak calculation by walking backward from today.
- `src/App.jsx` — tap-to-complete list, colored by CCH phase, streak badges, today's completion %, upcoming appointments pulled from the same data file, and a persistent crisis-resources panel pinned to the bottom (988 / Crisis Text Line / SAMHSA / AA Meeting Finder) — one tap, no navigation.

Verified: `npm run build` succeeds, and a headless-browser smoke test confirms the 11 blocks render, tap-to-complete toggles the row, and completion survives a reload (localStorage round-trip works).

## Run it

```
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
```

Deploy the same way as Athena: `arc deploy` to Cloudflare Pages, dual-push remote once there's a real git remote for this.

## Explicitly NOT in Phase 1 (see the gameplan for the full breakdown)

- Journal entries (morning/evening prompts, mood slider) — Phase 2
- CBT exercises (Thought Record, Urge Surfing Log, Values Inventory) — Phase 3
- Weekly review auto-summary — Phase 4
- Any AI wiring (Groq fallback chain) — deferred, open decision
- Sync across devices — deferred, currently local-only by design (this is health data)

## Known rough edges

- `todayKey()` uses `Date#toISOString`, which is UTC — fine most of the day, but a block completed very late at night near a UTC date boundary could theoretically log under tomorrow's key. Worth swapping for a real local-date formatter before this leaves scaffold stage.
- No test suite yet — the "verification" so far is a build + one Playwright smoke pass, not real coverage.
- `support-group-meeting` (16:30–18:00) spans two CCH phases (Desire → Still-Pine); it's colored by its start time only, so the color won't visually reflect the phase change partway through. Cosmetic, not a data bug.
