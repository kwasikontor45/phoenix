# phoenix

🚧 **Status: beta** — works, used daily, still finding rough edges. Not "stable" yet on purpose;
see [Status](#status) below for what that means here.

A daily routine tracker, colored by [Circadian Canonical Hours](#circadian-canonical-hours) —
the same design language behind every `kontor.studio` project. Local-first: nothing you check off
ever leaves your own browser.

**Live:** https://phoenix.kontor.studio · **Android (beta):** see [Install](#install)

## What it is

- 11 daily routine blocks, tap to complete, each colored by which circadian phase it falls in
- Streak tracking per block (not just per day) — a `Set` of `${date}:${blockId}` keys in
  `localStorage`, nothing sent anywhere
- A persistent crisis-resources panel (988 / Crisis Text Line / SAMHSA / AA Meeting Finder)

## Circadian Canonical Hours

The four-phase color system shared across this whole project family — `choice` (6–11, cool blue),
`desire` (11–17, amber), `still-pine` (17–21, violet), `nyx` (21–6, rose). `src/lib/cch.js` is the
single source of truth: `phaseForTime('14:30')` → `'desire'`. If you're building another app in
this family, or forking this one, reuse this file rather than re-deriving the palette — that's the
whole point of it being one small, dependency-free module.

## Make it yours

This is the actual customization point, not a setting: **`src/data/routine-blocks.js`**. Edit the
`dailyBlocks` array — title, time, description, emoji — to match your own routine, then
`npm run build`. There's no in-app editor yet (see [Status](#status)); forking the file is the
intended way to make this genuinely yours, not just "installed."

## Install

**Web:** open the live link above, "Add to Home Screen" — works like a native app, no store needed.

**Android APK:** built via [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) (Google's
own PWA-to-TWA tool) — see [`kataleya-android`](https://github.com/kwasikontor45/kataleya-android)
for the reference pattern (this project's own Android wrapper repo is kept private only because an
early commit briefly included the signing keystore; the pattern is identical, this file is the one
that matters: `twa-manifest.json`, pointed at this site's own manifest).

## Run it

```
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
```

Deploy: `arc deploy phoenix` (Cloudflare Pages), or any static host — no backend, no build-time
secrets.

## Status

Beta, not stable, on purpose — semver `0.x.y` the whole way until it earns `1.0.0`. What "stable"
will mean here: an in-app routine editor (so forking isn't required to customize), a real test
suite (currently one build check + one smoke pass), and the local-date bug class fully audited
(one instance already found and fixed — `todayKey()` used to be UTC-based, which could mis-file a
late-night check-off; now uses the real local calendar date).

**Not yet here, on the roadmap:** journal entries, CBT exercises (Thought Record, Urge Surfing
Log), a weekly review, cross-device sync (deliberately still local-only — this can be health data).

## This is not medical or clinical software

phoenix is a personal habit tracker, not a substitute for professional medical, psychiatric, or
therapeutic care. If you're in crisis, use the panel in the app (988 / Crisis Text Line / SAMHSA)
or your local emergency number — don't wait on this app or any software.

## License

MIT — see [`LICENSE`](./LICENSE). Fork it, rename it, ship it as your own; the only requirement is
keeping the copyright notice. The `phoenix` name and `kontor.studio` branding aren't part of that
grant — reskin before you redistribute under a different name if you'd rather it not look like an
official release.
