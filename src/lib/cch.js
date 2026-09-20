// Circadian Canonical Hours — the four-phase color system this whole
// kontor.studio family shares. Kept as the single source of truth here
// so every future project (this one included) can import the same values.

export const CCH_PHASES = {
  nyx: { name: 'Nyx', hex: '#ea9a97', startMin: 21 * 60, endMin: 6 * 60 },
  choice: { name: 'Choice', hex: '#5ec8ed', startMin: 6 * 60, endMin: 11 * 60 },
  desire: { name: 'Desire', hex: '#f6c177', startMin: 11 * 60, endMin: 17 * 60 },
  stillPine: { name: 'Still-Pine', hex: '#c4a7e7', startMin: 17 * 60, endMin: 21 * 60 },
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// Returns the CCH phase key ('nyx' | 'choice' | 'desire' | 'stillPine') a
// given "HH:MM" 24-hour time falls into. Nyx wraps midnight.
export function phaseForTime(hhmm) {
  const mins = toMinutes(hhmm)
  if (mins >= CCH_PHASES.nyx.startMin || mins < CCH_PHASES.nyx.endMin) return 'nyx'
  if (mins >= CCH_PHASES.choice.startMin && mins < CCH_PHASES.choice.endMin) return 'choice'
  if (mins >= CCH_PHASES.desire.startMin && mins < CCH_PHASES.desire.endMin) return 'desire'
  return 'stillPine'
}

export function phaseColor(hhmm) {
  return CCH_PHASES[phaseForTime(hhmm)].hex
}
