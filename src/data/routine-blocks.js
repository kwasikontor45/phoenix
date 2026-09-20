// Source of truth for the daily routine. Mirrors recovery-routine-6am.ics —
// if the schedule changes, update both (or, later, generate the .ics from this file).

export const dailyBlocks = [
  {
    id: 'wake-hydrate-stretch',
    start: '06:00',
    end: '06:15',
    emoji: '🌅',
    title: 'Wake Up — Hydrate & Stretch',
    description: 'Drink a full glass of water before anything else, then 5–10 min gentle stretch or short walk outside.',
  },
  {
    id: 'healthy-breakfast',
    start: '06:30',
    end: '07:00',
    emoji: '🍳',
    title: 'Healthy Breakfast',
    description: "Don't skip it. Protein + complex carbs for blood sugar stability.",
  },
  {
    id: 'morning-journal-meditation',
    start: '07:00',
    end: '07:30',
    emoji: '📓',
    title: 'Morning Journal + Meditation',
    description: 'How am I feeling? What is my intention today? What am I grateful for? Then 10 min meditation.',
  },
  {
    id: 'treatment-block',
    start: '09:00',
    end: '10:30',
    emoji: '🧠',
    title: 'TREATMENT BLOCK (Do Not Cancel)',
    description: 'CBT exercises, sobriety app check-in, recovery reading, telehealth, or skill-building — rotate daily.',
  },
  {
    id: 'lunch-walk-outside',
    start: '11:00',
    end: '12:00',
    emoji: '🚶',
    title: 'Lunch + Walk Outside',
    description: '20–30 min walk. Movement regulates dopamine.',
  },
  {
    id: 'daily-connection-checkin',
    start: '16:00',
    end: '16:30',
    emoji: '📞',
    title: 'Daily Connection Check-In',
    description: 'Peak craving window. Call or text your sponsor, an accountability friend, or family.',
  },
  {
    id: 'support-group-meeting',
    start: '16:30',
    end: '18:00',
    emoji: '🤝',
    title: 'Support Group Meeting',
    description: 'AA / NA / SMART Recovery / Refuge Recovery — many run daily online.',
  },
  {
    id: 'dinner-no-screens',
    start: '18:00',
    end: '18:30',
    emoji: '🍽',
    title: 'Dinner (No Screens)',
    description: 'Eat at the table. Mindful eating supports nervous system regulation.',
  },
  {
    id: 'evening-journal-sobriety-checkin',
    start: '19:30',
    end: '20:00',
    emoji: '🌙',
    title: 'Evening Journal + Sobriety Check-In',
    description: 'Second peak craving window. What went well, where did I struggle, what do I need tomorrow?',
  },
  {
    id: 'screens-off-wind-down',
    start: '20:00',
    end: '20:30',
    emoji: '📵',
    title: 'Screens Off — Wind Down',
    description: 'Read, stretch, quiet music, or prep tomorrow. No screens.',
  },
  {
    id: 'sleep',
    start: '21:00',
    end: '21:30',
    emoji: '😴',
    title: 'Sleep — Same Time Every Night',
    description: 'Lights out. Aim for 7–9 hours. Consistent sleep regulates cortisol and dopamine.',
  },
]

export const weeklyBlocks = [
  {
    id: 'weekly-review-sunday-reset',
    day: 'sunday',
    start: '09:00',
    end: '09:30',
    emoji: '📋',
    title: 'Weekly Review — Sunday Reset',
    description: 'Rate the week 1–10 across sobriety, mood, sleep, exercise, connection. Adjust one thing, not everything.',
  },
]

// One-off, dated commitments — not part of the daily loop, but shown alongside it
// so nothing gets double-booked into the open afternoon window.
export const appointments = [
  {
    id: 'va-appt-2026-09-18',
    date: '2026-09-18',
    start: '14:30',
    end: '15:30',
    title: 'VA Appointment — West Los Angeles Medical Center',
    location: 'on-campus',
  },
  {
    id: 'va-appt-2026-11-19',
    date: '2026-11-19',
    start: '13:30',
    end: '14:30',
    title: 'VA Appointment — West Los Angeles Medical Center',
    location: 'Medical Center Division: WEST LOS ANGELES',
  },
]

export const crisisResources = [
  { label: '988 Suicide & Crisis Lifeline', value: 'Call or text 988', href: 'tel:988' },
  { label: 'Crisis Text Line', value: 'Text HOME to 741741', href: 'sms:741741&body=HOME' },
  { label: 'SAMHSA National Helpline', value: '1-800-662-4357 (24/7)', href: 'tel:18006624357' },
  { label: 'AA Meeting Finder', value: 'aa.org/find-aa', href: 'https://aa.org/find-aa' },
]
