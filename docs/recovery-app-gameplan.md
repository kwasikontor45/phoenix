# recovery-app — GAMEPLAN

**Reimagining the Recovery Workbook as a recurring task/habit app**
**Style:** kontor.studio family · Circadian Canonical Hours · Athena-proven stack

---

## 1. The core idea

The workbook is already 90% of a product spec — it just needs to stop being a PDF you have to remember to open. Three things move from paper to app:

- **Your Daily Structure** (12 fixed blocks, wake → sleep) → a recurring checklist that resets itself every day, like the routine `.ics` I just built you.
- **Daily Journal** (morning/evening prompts, mood 1–10, non-negotiables) → structured entries, not free text you lose track of.
- **CBT Workbook Exercises + Weekly Review** → guided, repeatable forms with history you can actually look back on.

Nothing here needs to be invented — it needs to be *worn in*, the way Athena already is. Inevitable, not magic.

## 2. The signature hook: Circadian Canonical Hours *is* the day

This is the part that makes it "yours" instead of a Google Tasks clone. Your CCH palette almost perfectly overlays the 6 AM-anchored routine:

| CCH phase | Window | What lands here |
|---|---|---|
| **Choice** `#5ec8ed` | 06:00–11:00 | Wake, hydrate, stretch, breakfast, morning journal, most of the treatment block |
| **Desire** `#f6c177` | 11:00–17:00 | Lunch + walk, the open focus window, start of the meeting |
| **Still-Pine** `#c4a7e7` | 17:00–21:00 | Dinner, evening journal, wind-down |
| **Nyx** `#ea9a97` | 21:00–06:00 | Sleep |

So the UI doesn't need a generic "categories" system — each block is colored by *when* it happens, using a palette you already own. The whole day reads as a gradient from Choice → Desire → Still-Pine → Nyx and back. That's the "our design, our style, signature" part: nobody else's recovery app looks like this because nobody else has this palette.

## 3. Feature map (workbook section → app feature)

- **Daily Structure** → `daily-routine` — a fixed, re-orderable list of recurring blocks (time, duration, CCH phase, summary/description carried straight from the `.ics`). Each block has a single tap-to-complete checkbox. Streak counter per block, not just per day.
- **Morning / Evening Check-In** → `journal-entry` — structured form: mood slider (1–10), 3–4 prompts (same ones from the workbook), a "non-negotiables" checklist that mirrors the day's routine completion. One entry per day per session (morning/evening).
- **Treatment Block rotation** → `treatment-log` — the block itself just needs a "what did you do today" picker (CBT workbook / sobriety app check-in / recovery reading / telehealth / skill-building), so the weekly review can later tell you what you've been neglecting.
- **CBT Exercises** (Thought Record, Urge Surfing Log, Values Inventory) → `exercise/*` — each is its own guided multi-step form, not a wall of text. Urge Surfing Log in particular should be one tap away — it's the one you'll reach for mid-urge, so it can't be buried three menus deep.
- **Weekly Review (Sunday Reset)** → `weekly-review` — mostly auto-filled: pulls completion % per block, mood trend from the two daily check-ins, sobriety-day counter, and only asks you the three open questions the workbook already has (hardest moment / strongest moment / one thing to adjust).
- **Crisis resources (988, SAMHSA, Crisis Text Line, AA Meeting Finder)** → a persistent, always-visible panel — not a settings page. One tap, no navigation, from anywhere in the app.

## 4. Data model sketch (Athena-pattern)

Athena's progress engine already solved "did the user do the thing" with a `Set` of completed IDs — reuse the shape:

```
completedBlocks: Set<`${date}:${blockId}`>      // e.g. "2026-09-16:wake-hydrate-stretch"
journalEntries: { date, period: 'morning'|'evening', mood, prompts[], nonNegotiables[] }[]
exerciseEntries: { date, type: 'thought-record'|'urge-surfing'|'values-inventory', ...fields }[]
sobrietyDay: number   // derived from a stored start date, not re-entered
streaks: derived per blockId, not stored — compute from completedBlocks on read
```

Recurrence definitions can be lifted almost directly from the `.ics` I just gave you (`FREQ=DAILY`, `FREQ=WEEKLY;BYDAY=SU`) — no need to reinvent an RRULE engine; a tiny subset (daily / weekly-on-day) covers 100% of this workbook.

## 5. Stack — reuse what already works

No new infrastructure decisions needed; Athena already proved the path:

- React 19 + Vite 8
- Cloudflare Pages hosting, `arc deploy`
- Dual-push git remote
- Local-first storage first (IndexedDB) — this is recovery/health data, so it stays on-device by default; sync is a later, opt-in phase, not a v1 requirement
- AI fallback chain (Groq → OpenRouter → offline responses) is optional here — useful later for e.g. reframing-assistance on the Thought Record exercise, not needed for v1

Naming: kebab-case for files/dirs/routes (`daily-routine.jsx`, `urge-surfing-log.jsx`), camelCase in code (`completedBlocks`, `sobrietyDay`), matching your existing conventions exactly.

## 6. Build phases

- **Phase 1 — Routine engine:** render the 12 daily blocks + 2 appointments from a data file (can literally start from the `.ics` I sent you), tap-to-complete, CCH phase coloring, streaks.
- **Phase 2 — Journal:** morning/evening structured check-ins, mood slider, non-negotiables tied to Phase 1's completion state.
- **Phase 3 — Exercises:** Thought Record, Urge Surfing Log, Values Inventory as guided forms; Urge Surfing gets a persistent quick-launch.
- **Phase 4 — Weekly Review:** auto-summarized Sunday reset, pulling from Phases 1–3.
- **Phase 5 — Crisis panel + polish:** persistent crisis resources, offline support, full CCH theming pass, deploy to a `*.kontor.studio` subdomain.

## 7. Open decisions (yours to make, not guesses I baked in)

- **Name/subdomain** — something in the kontor.studio family. Given the recovery framing, `phoenix.kontor.studio` would tie back to the "phoenix-home-stretch" milestone already on your calendar, but that's your call, not mine to assume.
- **Sync** — stays local-only, or do you want it reachable from more than one device eventually?
- **AI assist** — do you want the Groq fallback chain wired into the Thought Record exercise (e.g. helping draft "a more balanced thought"), or should v1 stay fully manual/offline?

Nothing above is committed — say the word on Phase 1 and naming, and it's buildable this session.
