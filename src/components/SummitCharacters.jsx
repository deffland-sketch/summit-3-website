/**
 * Summit-style character illustrations — matched to the official brand slide deck.
 *
 * Reference: Summit Slide Stuff slides 5-9
 * - Large round heads (solid brand color, no features), ~30% of character height
 * - Simple hair: ponytails, buns, short hair as extra shapes
 * - Wide bell/trapezoid torsos with visual weight
 * - Thin stick legs with small oval feet
 * - Characters interact with objects: whiteboards on wheels, laptops, flip charts, cameras
 * - Organic oval rugs under group scenes, round tables, chairs with backs
 */

const C = {
  indigo: '#4b4b96',
  teal: '#508278',
  orange: '#f6aa40',
  peach: '#ffd2b4',
  lightBlue: '#96d2dc',
  brown: '#503c2d',
  red: '#e6553c',
  grey: '#96a0ab',
}

/**
 * Standalone character — draws a complete person at (x, y) center-bottom.
 * h = total height. Colors and hair vary by preset index.
 */
function Person({ x, y, h = 50, preset = 0 }) {
  const styles = [
    { head: C.indigo,    body: C.orange,   legs: C.brown,  hair: 'ponytail-r', torso: 'bell' },
    { head: C.teal,      body: C.peach,    legs: C.indigo, hair: 'bun',        torso: 'rect' },
    { head: C.orange,    body: C.indigo,   legs: C.teal,   hair: 'short',      torso: 'trap' },
    { head: C.peach,     body: C.teal,     legs: C.brown,  hair: 'ponytail-l', torso: 'bell' },
    { head: C.lightBlue, body: C.brown,    legs: C.indigo, hair: 'none',       torso: 'rect' },
    { head: C.brown,     body: C.lightBlue,legs: C.teal,   hair: 'cap',        torso: 'trap' },
    { head: C.red,       body: C.indigo,   legs: C.brown,  hair: 'short',      torso: 'bell' },
    { head: C.indigo,    body: C.teal,     legs: C.orange, hair: 'bun',        torso: 'rect' },
    { head: C.teal,      body: C.orange,   legs: C.indigo, hair: 'ponytail-r', torso: 'trap' },
    { head: C.orange,    body: C.lightBlue,legs: C.brown,  hair: 'cap',        torso: 'bell' },
  ]
  const s = styles[preset % styles.length]

  // Proportions relative to total height
  const headR = h * 0.18
  const bodyH = h * 0.32
  const bodyW = h * 0.28
  const legH = h * 0.28
  const gap = h * 0.02

  const headY = y - h + headR
  const bodyTop = headY + headR + gap
  const legTop = bodyTop + bodyH
  const footY = legTop + legH

  // Head
  const headEl = <circle cx={x} cy={headY} r={headR} fill={s.head} />

  // Hair
  let hairEl = null
  if (s.hair === 'ponytail-r') {
    hairEl = <path d={`M${x + headR * 0.5} ${headY - headR * 0.2} Q${x + headR * 2} ${headY} ${x + headR * 1.6} ${headY + headR * 0.9}`}
      stroke={s.head} strokeWidth={headR * 0.5} strokeLinecap="round" fill="none" />
  } else if (s.hair === 'ponytail-l') {
    hairEl = <path d={`M${x - headR * 0.5} ${headY - headR * 0.2} Q${x - headR * 2} ${headY} ${x - headR * 1.6} ${headY + headR * 0.9}`}
      stroke={s.head} strokeWidth={headR * 0.5} strokeLinecap="round" fill="none" />
  } else if (s.hair === 'bun') {
    hairEl = <circle cx={x} cy={headY - headR * 0.95} r={headR * 0.38} fill={s.head} />
  } else if (s.hair === 'short') {
    hairEl = <ellipse cx={x} cy={headY - headR * 0.6} rx={headR * 0.7} ry={headR * 0.35} fill={s.head} />
  } else if (s.hair === 'cap') {
    hairEl = <>
      <rect x={x - headR * 0.7} y={headY - headR * 1.05} width={headR * 1.4} height={headR * 0.5} rx={headR * 0.25} fill={s.head} />
      <ellipse cx={x + headR * 0.4} cy={headY - headR * 0.55} rx={headR * 0.7} ry={headR * 0.18} fill={s.head} />
    </>
  }

  // Torso
  const bw = bodyW / 2
  let bodyEl
  if (s.torso === 'bell') {
    bodyEl = <path d={`M${x - bw * 0.6} ${bodyTop} C${x - bw * 0.6} ${bodyTop + bodyH * 0.4} ${x - bw * 1.1} ${bodyTop + bodyH * 0.8} ${x - bw} ${bodyTop + bodyH} L${x + bw} ${bodyTop + bodyH} C${x + bw * 1.1} ${bodyTop + bodyH * 0.8} ${x + bw * 0.6} ${bodyTop + bodyH * 0.4} ${x + bw * 0.6} ${bodyTop}Z`} fill={s.body} />
  } else if (s.torso === 'trap') {
    bodyEl = <path d={`M${x - bw * 0.55} ${bodyTop} L${x - bw} ${bodyTop + bodyH} L${x + bw} ${bodyTop + bodyH} L${x + bw * 0.55} ${bodyTop}Z`} fill={s.body} />
  } else {
    bodyEl = <rect x={x - bw * 0.65} y={bodyTop} width={bw * 1.3} height={bodyH} rx={2} fill={s.body} />
  }

  // Legs + feet
  const legW = h * 0.035
  const footRx = h * 0.04
  const legSpread = bodyW * 0.18

  return (
    <g>
      {hairEl}
      {headEl}
      {bodyEl}
      <line x1={x - legSpread} y1={legTop} x2={x - legSpread - 1} y2={footY} stroke={s.legs} strokeWidth={legW} strokeLinecap="round" />
      <line x1={x + legSpread} y1={legTop} x2={x + legSpread + 1} y2={footY} stroke={s.legs} strokeWidth={legW} strokeLinecap="round" />
      <ellipse cx={x - legSpread - 2} cy={footY + 1} rx={footRx} ry={footRx * 0.45} fill={s.legs} />
      <ellipse cx={x + legSpread + 2} cy={footY + 1} rx={footRx} ry={footRx * 0.45} fill={s.legs} />
    </g>
  )
}

// Re-export as Character for backward compatibility
export function Character({ preset = 0, x = 0, y = 0, scale = 1, seated }) {
  const h = (seated ? 36 : 50) * scale
  return <Person x={x} y={y + h * 0.5} h={h} preset={preset} />
}

export function Rug({ cx, cy, rx, ry, color = C.peach, opacity = 0.4 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} />
}

export function Spark({ cx, cy, size = 12, color = C.orange }) {
  const pts = []
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4
    const r = i % 2 === 0 ? size : size * 0.4
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`)
  }
  return <polygon points={pts.join(' ')} fill={color} />
}

export function StudentGroup({ width = 200, height = 120 }) {
  const cx = width / 2
  const by = height - 6
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" fill="none">
      <Rug cx={cx} cy={by} rx={82} ry={16} color={C.peach} opacity={0.3} />
      <Person x={cx - 48} y={by - 2} h={48} preset={0} />
      <Person x={cx - 20} y={by - 2} h={52} preset={1} />
      <Person x={cx + 10} y={by - 2} h={50} preset={2} />
      <Person x={cx + 38} y={by - 2} h={46} preset={5} />
      <Person x={cx + 64} y={by - 2} h={51} preset={8} />
      <Spark cx={cx + 82} cy={18} size={7} color={C.orange} />
      <Spark cx={cx - 76} cy={22} size={5} color={C.indigo} />
    </svg>
  )
}

export function StudentAvatar({ preset = 0, size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      <Person x={24} y={44} h={38} preset={preset} />
    </svg>
  )
}

/** All experience scene illustrations — each mapped to a specific Summit Slide Stuff reference */
export function ExperienceScene({ type, width = 160, height = 96 }) {
  const cx = width / 2
  const by = height - 4

  const scenes = {

    // 1. DIRECT INSTRUCTION → Small-Group Interventions (Slide Stuff 3)
    // Adult (coral top, navy head w/ bun) standing left holding green book/folder
    // 3 students at round table w/ pencil cups and papers
    'expert-instruction': (
      <>
        <ellipse cx={cx + 8} cy={by - 20} rx={34} ry={9} fill={C.lightBlue} opacity={0.18} stroke={C.grey} strokeWidth={0.8} />
        <rect x={cx - 1} y={by - 30} width={5} height={8} rx={1} fill={C.orange} opacity={0.45} />
        <rect x={cx} y={by - 33} width={1.5} height={4} fill={C.red} opacity={0.35} />
        <rect x={cx + 2} y={by - 34} width={1.5} height={4} fill={C.indigo} opacity={0.3} />
        <rect x={cx + 12} y={by - 28} width={8} height={5} rx={1} fill="white" stroke={C.grey} strokeWidth={0.5} />
        <Person x={20} y={by - 2} h={56} preset={6} />
        <rect x={28} y={by - 36} width={6} height={9} rx={1} fill={C.teal} opacity={0.5} />
        <Person x={cx + 2} y={by + 2} h={30} preset={1} />
        <Person x={cx + 20} y={by + 2} h={28} preset={3} />
        <Person x={cx + 38} y={by + 2} h={29} preset={8} />
      </>
    ),

    // 2. PRACTICE & FEEDBACK → Small-Group Interventions variation (Slide Stuff 3)
    // Adult standing behind/beside round table coaching, students working w/ notebooks
    'peer-tutoring': (
      <>
        <ellipse cx={cx + 2} cy={by - 20} rx={34} ry={9} fill={C.lightBlue} opacity={0.18} stroke={C.grey} strokeWidth={0.8} />
        <rect x={cx - 12} y={by - 28} width={8} height={5} rx={1} fill="white" stroke={C.grey} strokeWidth={0.5} />
        <line x1={cx - 10} y1={by - 25} x2={cx - 6} y2={by - 25} stroke={C.indigo} strokeWidth={0.5} />
        <rect x={cx + 6} y={by - 29} width={8} height={5} rx={1} fill="white" stroke={C.grey} strokeWidth={0.5} />
        <line x1={cx + 8} y1={by - 26} x2={cx + 12} y2={by - 26} stroke={C.teal} strokeWidth={0.5} />
        <rect x={cx + 20} y={by - 27} width={4} height={7} rx={0.5} fill={C.orange} opacity={0.4} />
        <Person x={cx} y={by - 16} h={52} preset={7} />
        <rect x={cx + 6} y={by - 42} width={5} height={7} rx={1} fill={C.teal} opacity={0.45} />
        <Person x={cx - 28} y={by + 2} h={30} preset={2} />
        <Person x={cx + 28} y={by + 2} h={28} preset={9} />
        <Person x={cx + 48} y={by + 2} h={29} preset={4} />
      </>
    ),

    // 3. DISCUSSION & DIALOGUE → Peer-to-Peer Mentoring (Slide Stuff 1)
    // Whiteboard on stand w/ nature drawing, student pointing, kid sitting, 2 standing
    'discussion-circle': (
      <>
        <rect x={14} y={6} width={46} height={34} rx={2} fill="white" stroke={C.brown} strokeWidth={1.5} />
        <path d="M22 32 L34 16 L44 26 L52 18" stroke={C.teal} strokeWidth={1.5} fill="none" opacity={0.4} />
        <circle cx={48} cy={12} r={4} fill={C.orange} opacity={0.3} />
        <path d="M36 26 L42 20" stroke={C.orange} strokeWidth={1.5} strokeLinecap="round" opacity={0.35} />
        <line x1={18} y1={40} x2={16} y2={58} stroke={C.brown} strokeWidth={1.5} opacity={0.3} />
        <line x1={56} y1={40} x2={58} y2={58} stroke={C.brown} strokeWidth={1.5} opacity={0.3} />
        <circle cx={16} cy={59} r={2.5} fill={C.brown} opacity={0.2} />
        <circle cx={58} cy={59} r={2.5} fill={C.brown} opacity={0.2} />
        <Person x={70} y={by - 4} h={48} preset={2} />
        <line x1={64} y1={by - 28} x2={54} y2={28} stroke={C.indigo} strokeWidth={1.8} strokeLinecap="round" opacity={0.45} />
        <Person x={90} y={by - 2} h={24} preset={4} />
        <Person x={114} y={by - 2} h={42} preset={1} />
        <Person x={136} y={by - 2} h={36} preset={3} />
      </>
    ),

    // 4. INDEPENDENT WORK → Self-Direction (Slide Stuff 0)
    // Single student sitting w/ laptop open, green backpack behind, book stack
    'ai-practice': (
      <>
        <Person x={cx + 2} y={by - 2} h={34} preset={4} />
        <rect x={cx - 18} y={by - 24} width={20} height={14} rx={2} fill={C.lightBlue} opacity={0.3} />
        <rect x={cx - 16} y={by - 22} width={16} height={9} rx={1} fill="white" opacity={0.55} />
        <rect x={cx - 19} y={by - 10} width={22} height={3} rx={1} fill={C.grey} opacity={0.3} />
        <rect x={cx + 32} y={by - 18} width={13} height={17} rx={5} fill={C.teal} opacity={0.28} />
        <path d={`M${cx + 35} ${by - 18} Q${cx + 38.5} ${by - 26} ${cx + 42} ${by - 18}`} stroke={C.teal} strokeWidth={2} fill="none" opacity={0.3} />
        <rect x={14} y={by - 8} width={15} height={4} rx={1} fill={C.indigo} opacity={0.22} />
        <rect x={16} y={by - 12} width={12} height={4} rx={1} fill={C.orange} opacity={0.22} />
        <rect x={15} y={by - 16} width={13} height={4} rx={1} fill={C.red} opacity={0.22} />
      </>
    ),

    // 5. PRESENTATION & PERFORMANCE → Project Time (Slide Stuff 2)
    // People around large blue angled work table, one standing/presenting, laptop on table
    'presentation': (
      <>
        <path d={`M${cx - 34} ${by - 16} L${cx - 18} ${by - 28} L${cx + 38} ${by - 28} L${cx + 44} ${by - 16}Z`}
          fill={C.lightBlue} opacity={0.18} stroke={C.teal} strokeWidth={0.8} />
        <rect x={cx - 2} y={by - 40} width={14} height={10} rx={1.5} fill={C.grey} opacity={0.22} />
        <rect x={cx} y={by - 38} width={10} height={6} rx={1} fill="white" opacity={0.5} />
        <rect x={cx + 18} y={by - 34} width={8} height={5} rx={0.5} fill="white" stroke={C.grey} strokeWidth={0.5} />
        <rect x={cx - 16} y={by - 33} width={6} height={4} rx={0.5} fill={C.orange} opacity={0.3} />
        <Person x={16} y={by - 2} h={54} preset={7} />
        <line x1={24} y1={by - 32} x2={cx - 14} y2={by - 32} stroke={C.teal} strokeWidth={1.5} strokeLinecap="round" opacity={0.35} />
        <Person x={cx - 6} y={by + 2} h={30} preset={2} />
        <Person x={cx + 16} y={by + 2} h={28} preset={5} />
        <Person x={cx + 38} y={by + 2} h={30} preset={9} />
      </>
    ),

    // 6. REFLECTION & GOAL-SETTING → Mentoring (Slide Stuff 1)
    // Blue table, GOALS monitor w/ checklist, student + guide in red chairs, gray rug
    'reflection': (
      <>
        <Rug cx={cx + 4} cy={by} rx={58} ry={16} color={C.grey} opacity={0.1} />
        <rect x={cx - 20} y={by - 26} width={48} height={5} rx={2} fill={C.lightBlue} opacity={0.22} />
        <line x1={cx - 16} y1={by - 21} x2={cx - 16} y2={by - 10} stroke={C.lightBlue} strokeWidth={2} opacity={0.18} />
        <line x1={cx + 24} y1={by - 21} x2={cx + 24} y2={by - 10} stroke={C.lightBlue} strokeWidth={2} opacity={0.18} />
        <rect x={cx - 6} y={by - 46} width={22} height={18} rx={2} fill="white" stroke={C.grey} strokeWidth={1} />
        <text x={cx - 2} y={by - 34} fill={C.orange} fontSize={6} fontWeight="700" fontFamily="Arimo, sans-serif">GOALS</text>
        <rect x={cx - 1} y={by - 31} width={3.5} height={3} rx={0.5} fill={C.teal} opacity={0.55} />
        <line x1={cx + 4} y1={by - 29.5} x2={cx + 12} y2={by - 29.5} stroke={C.grey} strokeWidth={0.7} opacity={0.3} />
        <rect x={cx + 26} y={by - 14} width={2} height={9} rx={1} fill={C.red} opacity={0.3} />
        <rect x={cx + 22} y={by - 5} width={10} height={2} rx={1} fill={C.red} opacity={0.2} />
        <rect x={cx - 22} y={by - 14} width={2} height={9} rx={1} fill={C.red} opacity={0.3} />
        <rect x={cx - 24} y={by - 5} width={10} height={2} rx={1} fill={C.red} opacity={0.2} />
        <Person x={cx - 18} y={by + 2} h={32} preset={5} />
        <Person x={cx + 26} y={by + 2} h={34} preset={0} />
        <Spark cx={cx + 50} cy={14} size={5} color={C.orange} />
      </>
    ),

    // 7. REAL-WORLD → Expeditions v2 (Slide Stuff 0)
    // Single person standing, green hat, peach torso, holding camera UP to face
    'field-experience': (
      <>
        <Person x={cx} y={by - 2} h={58} preset={5} />
        <rect x={cx - 10} y={by - 50} width={18} height={12} rx={3} fill={C.brown} opacity={0.5} />
        <circle cx={cx - 1} cy={by - 44} r={4} fill={C.grey} opacity={0.4} />
        <circle cx={cx - 1} cy={by - 44} r={2} fill={C.brown} opacity={0.3} />
        <rect x={cx + 4} y={by - 51} width={4} height={3} rx={1} fill={C.grey} opacity={0.3} />
        <Spark cx={30} cy={20} size={6} color={C.teal} />
        <Spark cx={width - 28} cy={28} size={4} color={C.orange} />
      </>
    ),

    // 8. WELLBEING & COMMUNITY → Community Time (Slide Stuff 0)
    // 3 characters sitting ON a large oval blue rug, low, facing inward
    'community-circle': (
      <>
        <Rug cx={cx} cy={by - 10} rx={66} ry={24} color={C.lightBlue} opacity={0.22} />
        <Person x={cx - 36} y={by - 6} h={28} preset={9} />
        <Person x={cx} y={by - 4} h={26} preset={7} />
        <Person x={cx + 36} y={by - 6} h={28} preset={4} />
      </>
    ),

    // Legacy keys
    'peer-collaboration': (
      <>
        <ellipse cx={cx} cy={by - 20} rx={32} ry={9} fill={C.teal} opacity={0.1} />
        <Person x={cx - 24} y={by} h={32} preset={2} />
        <Person x={cx} y={by} h={31} preset={5} />
        <Person x={cx + 24} y={by} h={32} preset={8} />
      </>
    ),
    'project-studio': (
      <>
        <rect x={cx - 28} y={by - 24} width={56} height={4} rx={2} fill={C.teal} opacity={0.18} />
        <Person x={cx - 24} y={by} h={32} preset={2} />
        <Person x={cx} y={by} h={31} preset={5} />
        <Person x={cx + 24} y={by} h={32} preset={9} />
      </>
    ),
    'dual-enrollment': (
      <>
        <Person x={cx} y={by} h={34} preset={5} />
        <rect x={cx - 14} y={by - 28} width={18} height={12} rx={2} fill={C.indigo} opacity={0.25} />
        <rect x={cx - 12} y={by - 26} width={14} height={8} rx={1} fill="white" opacity={0.5} />
      </>
    ),
    'internship': (
      <>
        <rect x={cx - 22} y={by - 26} width={44} height={4} rx={2} fill={C.teal} opacity={0.22} />
        <rect x={cx + 4} y={by - 40} width={14} height={12} rx={2} fill={C.teal} opacity={0.25} />
        <rect x={cx + 6} y={by - 38} width={10} height={8} rx={1} fill="white" opacity={0.5} />
        <Person x={cx - 14} y={by} h={34} preset={3} />
        <Person x={cx + 16} y={by - 2} h={36} preset={7} />
      </>
    ),
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" fill="none">
      {scenes[type] || null}
    </svg>
  )
}

export default { Character, Rug, Spark, StudentGroup, ExperienceScene, StudentAvatar }
