import { useMemo, useState } from 'react'
import './App.css'
import { dailyBlocks, appointments, crisisResources } from './data/routine-blocks.js'
import { phaseForTime, CCH_PHASES } from './lib/cch.js'
import {
  loadCompletedSet,
  todayKey,
  isBlockComplete,
  toggleBlock,
  streakForBlock,
  completionPct,
} from './lib/progress-store.js'

const PHASE_LABELS = {
  nyx: 'Nyx',
  choice: 'Choice',
  desire: 'Desire',
  stillPine: 'Still-Pine',
}

function upcomingAppointments(list) {
  const todayStr = todayKey()
  return list.filter((a) => a.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date))
}

function BlockRow({ block, dateKey, completedBlocks, onToggle }) {
  const done = isBlockComplete(completedBlocks, dateKey, block.id)
  const streak = streakForBlock(completedBlocks, block.id)
  const phase = phaseForTime(block.start)

  return (
    <li className={`block-row phase-${phase} ${done ? 'is-done' : ''}`}>
      <button
        type="button"
        className="block-check"
        aria-pressed={done}
        aria-label={done ? `Mark "${block.title}" not done` : `Mark "${block.title}" done`}
        onClick={() => onToggle(block.id)}
      >
        {done ? '✓' : ''}
      </button>
      <div className="block-body">
        <div className="block-time">{block.start}</div>
        <div className="block-title">
          <span className="block-emoji">{block.emoji}</span> {block.title}
        </div>
        <div className="block-description">{block.description}</div>
      </div>
      {streak > 0 && (
        <div className="block-streak" title={`${streak}-day streak`}>
          🔥 {streak}
        </div>
      )}
    </li>
  )
}

export default function App() {
  const [completedBlocks, setCompletedBlocks] = useState(() => loadCompletedSet())
  const dateKey = todayKey()

  const handleToggle = (blockId) => {
    setCompletedBlocks((prev) => toggleBlock(prev, dateKey, blockId))
  }

  const pct = completionPct(
    completedBlocks,
    dateKey,
    dailyBlocks.map((b) => b.id),
  )

  const upcoming = useMemo(() => upcomingAppointments(appointments), [])

  const nowPhase = useMemo(() => {
    const now = new Date()
    const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    return phaseForTime(hhmm)
  }, [])

  return (
    <div className="app" style={{ '--phase-color': CCH_PHASES[nowPhase].hex }}>
      <header className="app-header">
        <div className="phase-strip" aria-hidden="true">
          {Object.entries(CCH_PHASES).map(([key, phase]) => (
            <span
              key={key}
              className={`phase-swatch ${key === nowPhase ? 'is-current' : ''}`}
              style={{ background: phase.hex }}
              title={`${PHASE_LABELS[key]} ${phase.name === 'Nyx' ? '21:00–06:00' : ''}`}
            />
          ))}
        </div>
        <h1>phoenix</h1>
        <p className="subtitle">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} · currently in{' '}
          <strong style={{ color: CCH_PHASES[nowPhase].hex }}>{PHASE_LABELS[nowPhase]}</strong>
        </p>
        <div className="progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="progress-label">{pct}% of today's routine complete</p>
      </header>

      {upcoming.length > 0 && (
        <section className="appointments">
          <h2>Upcoming appointments</h2>
          <ul>
            {upcoming.slice(0, 3).map((a) => (
              <li key={a.id}>
                <strong>{a.date}</strong> · {a.start}–{a.end} · {a.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      <main>
        <ul className="block-list">
          {dailyBlocks.map((block) => (
            <BlockRow
              key={block.id}
              block={block}
              dateKey={dateKey}
              completedBlocks={completedBlocks}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      </main>

      <footer className="crisis-panel">
        <details>
          <summary>If you're in crisis — tap here</summary>
          <ul>
            {crisisResources.map((r) => (
              <li key={r.label}>
                <a href={r.href}>{r.label}</a> — {r.value}
              </li>
            ))}
          </ul>
        </details>
      </footer>
    </div>
  )
}
