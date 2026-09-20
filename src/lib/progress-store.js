// Progress engine — same shape as Athena's: a Set of completed keys,
// persisted locally. Recovery data stays on-device by default (no sync
// in v1 — see the gameplan's open decisions).

const STORAGE_KEY = 'phoenix:completed-blocks'

function loadCompletedSet() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function saveCompletedSet(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)))
  } catch {
    // best-effort — storage may be unavailable (private mode, quota, etc.)
  }
}

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10) // YYYY-MM-DD, local-ish is fine for a habit tracker
}

function entryKey(dateKey, blockId) {
  return `${dateKey}:${blockId}`
}

export function isBlockComplete(completedBlocks, dateKey, blockId) {
  return completedBlocks.has(entryKey(dateKey, blockId))
}

export function toggleBlock(completedBlocks, dateKey, blockId) {
  const next = new Set(completedBlocks)
  const key = entryKey(dateKey, blockId)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  saveCompletedSet(next)
  return next
}

// Consecutive-day streak ending today (or yesterday, if today isn't done yet)
// for a given block. Walks backward until it finds a gap.
export function streakForBlock(completedBlocks, blockId, today = new Date()) {
  let streak = 0
  const cursor = new Date(today)
  const todayDone = completedBlocks.has(entryKey(todayKey(cursor), blockId))
  if (!todayDone) cursor.setDate(cursor.getDate() - 1)

  while (completedBlocks.has(entryKey(todayKey(cursor), blockId))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function completionPct(completedBlocks, dateKey, blockIds) {
  if (blockIds.length === 0) return 0
  const done = blockIds.filter((id) => isBlockComplete(completedBlocks, dateKey, id)).length
  return Math.round((done / blockIds.length) * 100)
}

export { loadCompletedSet }
