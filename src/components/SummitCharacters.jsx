/**
 * Summit-style character illustrations.
 * Geometric shapes: circle/oval heads, trapezoid/bell torsos, thin stick legs.
 * No facial features. 2-3 brand colors per character.
 */

const COLORS = {
  indigo: '#4b4b96',
  teal: '#508278',
  orange: '#f6aa40',
  peach: '#ffd2b4',
  lightBlue: '#96d2dc',
  brown: '#503c2d',
  red: '#e6553c',
  tanGrey: '#96a0ab',
}

// Character presets — each is [headColor, torsoColor, legColor, headShape, torsoShape, height]
const PRESETS = [
  [COLORS.indigo, COLORS.orange, COLORS.brown, 'circle', 'bell', 70],
  [COLORS.teal, COLORS.peach, COLORS.indigo, 'oval', 'rect', 65],
  [COLORS.orange, COLORS.indigo, COLORS.teal, 'circle', 'trapezoid', 72],
  [COLORS.peach, COLORS.teal, COLORS.brown, 'teardrop', 'bell', 60],
  [COLORS.lightBlue, COLORS.brown, COLORS.indigo, 'oval', 'vneck', 68],
  [COLORS.brown, COLORS.lightBlue, COLORS.teal, 'mushroom', 'rect', 66],
  [COLORS.red, COLORS.indigo, COLORS.brown, 'circle', 'trapezoid', 64],
  [COLORS.indigo, COLORS.teal, COLORS.orange, 'oval', 'bell', 70],
  [COLORS.teal, COLORS.orange, COLORS.indigo, 'circle', 'rect', 62],
  [COLORS.orange, COLORS.lightBlue, COLORS.brown, 'teardrop', 'vneck', 67],
]

function Head({ shape, color, cx, cy, size = 10 }) {
  switch (shape) {
    case 'oval':
      return <ellipse cx={cx} cy={cy} rx={size * 0.8} ry={size} fill={color} />
    case 'teardrop':
      return (
        <path
          d={`M${cx} ${cy - size} C${cx + size} ${cy - size * 0.5} ${cx + size * 0.8} ${cy + size * 0.7} ${cx} ${cy + size} C${cx - size * 0.8} ${cy + size * 0.7} ${cx - size} ${cy - size * 0.5} ${cx} ${cy - size}Z`}
          fill={color}
        />
      )
    case 'mushroom':
      return (
        <>
          <ellipse cx={cx} cy={cy - size * 0.2} rx={size * 1.1} ry={size * 0.7} fill={color} />
          <rect x={cx - size * 0.5} y={cy - size * 0.2} width={size} height={size * 0.6} rx={1} fill={color} />
        </>
      )
    default: // circle
      return <circle cx={cx} cy={cy} r={size} fill={color} />
  }
}

function Torso({ shape, color, cx, topY, width = 20, height = 22 }) {
  const halfW = width / 2
  switch (shape) {
    case 'bell':
      return (
        <path
          d={`M${cx - halfW * 0.5} ${topY} C${cx - halfW * 0.5} ${topY + height * 0.3} ${cx - halfW} ${topY + height * 0.7} ${cx - halfW} ${topY + height} L${cx + halfW} ${topY + height} C${cx + halfW} ${topY + height * 0.7} ${cx + halfW * 0.5} ${topY + height * 0.3} ${cx + halfW * 0.5} ${topY}Z`}
          fill={color}
        />
      )
    case 'trapezoid':
      return (
        <path
          d={`M${cx - halfW * 0.6} ${topY} L${cx - halfW} ${topY + height} L${cx + halfW} ${topY + height} L${cx + halfW * 0.6} ${topY}Z`}
          fill={color}
        />
      )
    case 'vneck':
      return (
        <path
          d={`M${cx - halfW * 0.6} ${topY} L${cx} ${topY + height * 0.3} L${cx + halfW * 0.6} ${topY} L${cx + halfW * 0.7} ${topY + height} L${cx - halfW * 0.7} ${topY + height}Z`}
          fill={color}
        />
      )
    default: // rect
      return (
        <rect
          x={cx - halfW * 0.6}
          y={topY}
          width={halfW * 1.2}
          height={height}
          rx={2}
          fill={color}
        />
      )
  }
}

export function Character({ preset = 0, x = 0, y = 0, scale = 1 }) {
  const p = PRESETS[preset % PRESETS.length]
  const [headColor, torsoColor, legColor, headShape, torsoShape, baseH] = p
  const h = baseH * scale
  const headSize = 8 * scale
  const torsoW = 18 * scale
  const torsoH = 20 * scale
  const legLen = 14 * scale
  const cx = x
  const headCy = y - h / 2 + headSize
  const torsoTop = headCy + headSize + 1 * scale
  const legTop = torsoTop + torsoH

  return (
    <g>
      <Head shape={headShape} color={headColor} cx={cx} cy={headCy} size={headSize} />
      <Torso shape={torsoShape} color={torsoColor} cx={cx} topY={torsoTop} width={torsoW} height={torsoH} />
      {/* Legs */}
      <line x1={cx - 4 * scale} y1={legTop} x2={cx - 5 * scale} y2={legTop + legLen} stroke={legColor} strokeWidth={2.5 * scale} strokeLinecap="round" />
      <line x1={cx + 4 * scale} y1={legTop} x2={cx + 5 * scale} y2={legTop + legLen} stroke={legColor} strokeWidth={2.5 * scale} strokeLinecap="round" />
    </g>
  )
}

/** Organic wobbly rug shape */
export function Rug({ cx, cy, rx, ry, color = COLORS.peach, opacity = 0.5 }) {
  // Slightly irregular ellipse
  return (
    <ellipse
      cx={cx} cy={cy} rx={rx} ry={ry}
      fill={color} opacity={opacity}
      style={{ filter: 'url(#wobble)' }}
    />
  )
}

/** 8-pointed spark/asterisk accent */
export function Spark({ cx, cy, size = 12, color = COLORS.orange }) {
  const pts = []
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4
    const r = i % 2 === 0 ? size : size * 0.4
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return <polygon points={pts.join(' ')} fill={color} />
}

/** Student group illustration — 4-5 characters on a rug */
export function StudentGroup({ width = 200, height = 120 }) {
  const cx = width / 2
  const baseY = height - 10
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" fill="none">
      <defs>
        <filter id="wobble">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="2" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" />
        </filter>
      </defs>
      <Rug cx={cx} cy={baseY - 5} rx={85} ry={18} color={COLORS.peach} opacity={0.4} />
      <Character preset={0} x={cx - 50} y={baseY - 15} scale={0.85} />
      <Character preset={1} x={cx - 20} y={baseY - 20} scale={0.9} />
      <Character preset={2} x={cx + 10} y={baseY - 18} scale={0.88} />
      <Character preset={3} x={cx + 40} y={baseY - 15} scale={0.82} />
      <Character preset={4} x={cx + 65} y={baseY - 22} scale={0.86} />
      <Spark cx={cx + 80} cy={20} size={8} color={COLORS.orange} />
      <Spark cx={cx - 75} cy={25} size={6} color={COLORS.indigo} />
    </svg>
  )
}

/** Scene illustration for a specific experience type */
export function ExperienceScene({ type, width = 140, height = 100 }) {
  const cx = width / 2
  const baseY = height - 8

  const scenes = {
    'expert-instruction': (
      <>
        <Rug cx={cx} cy={baseY - 3} rx={60} ry={12} color={COLORS.indigo} opacity={0.15} />
        {/* Whiteboard */}
        <rect x={cx - 25} y={8} width={50} height={30} rx={2} fill="white" stroke={COLORS.indigo} strokeWidth={1.5} />
        <line x1={cx - 18} y1={18} x2={cx + 10} y2={18} stroke={COLORS.indigo} strokeWidth={1} />
        <line x1={cx - 18} y1={24} x2={cx + 5} y2={24} stroke={COLORS.indigo} strokeWidth={1} opacity={0.5} />
        {/* Teacher */}
        <Character preset={0} x={cx + 30} y={baseY - 8} scale={0.6} />
        {/* Students */}
        <Character preset={1} x={cx - 30} y={baseY - 2} scale={0.5} />
        <Character preset={3} x={cx - 15} y={baseY - 2} scale={0.48} />
        <Character preset={4} x={cx} y={baseY - 2} scale={0.5} />
        <Character preset={6} x={cx + 12} y={baseY - 2} scale={0.47} />
      </>
    ),
    'peer-collaboration': (
      <>
        {/* Table */}
        <rect x={cx - 28} y={baseY - 30} width={56} height={6} rx={2} fill={COLORS.teal} opacity={0.3} />
        {/* Objects on table */}
        <rect x={cx - 18} y={baseY - 36} width={10} height={6} rx={1} fill={COLORS.indigo} opacity={0.3} />
        <circle cx={cx + 10} cy={baseY - 34} r={4} fill={COLORS.orange} opacity={0.3} />
        <Character preset={1} x={cx - 25} y={baseY - 5} scale={0.52} />
        <Character preset={2} x={cx - 5} y={baseY - 5} scale={0.5} />
        <Character preset={5} x={cx + 15} y={baseY - 5} scale={0.53} />
        <Character preset={8} x={cx + 32} y={baseY - 5} scale={0.48} />
      </>
    ),
    'ai-practice': (
      <>
        {/* Desk + laptop */}
        <rect x={cx - 18} y={baseY - 32} width={36} height={5} rx={2} fill={COLORS.tanGrey} opacity={0.3} />
        <rect x={cx - 10} y={baseY - 44} width={20} height={13} rx={2} fill={COLORS.lightBlue} opacity={0.4} />
        <rect x={cx - 8} y={baseY - 42} width={16} height={8} rx={1} fill="white" opacity={0.6} />
        <Character preset={4} x={cx} y={baseY - 5} scale={0.55} />
        <Spark cx={cx + 30} cy={20} size={5} color={COLORS.lightBlue} />
      </>
    ),
    'discussion-circle': (
      <>
        <Rug cx={cx} cy={baseY - 8} rx={55} ry={16} color={COLORS.teal} opacity={0.15} />
        <Character preset={0} x={cx - 35} y={baseY - 5} scale={0.45} />
        <Character preset={3} x={cx - 15} y={baseY} scale={0.43} />
        <Character preset={5} x={cx + 5} y={baseY} scale={0.45} />
        <Character preset={7} x={cx + 25} y={baseY - 5} scale={0.44} />
        {/* Adult (taller) */}
        <Character preset={8} x={cx + 42} y={baseY - 10} scale={0.55} />
        {/* Book */}
        <rect x={cx - 6} y={baseY - 25} width={12} height={8} rx={1} fill={COLORS.teal} opacity={0.4} transform={`rotate(-10 ${cx} ${baseY - 21})`} />
      </>
    ),
    'project-studio': (
      <>
        {/* Large table */}
        <rect x={cx - 35} y={baseY - 28} width={70} height={6} rx={2} fill={COLORS.teal} opacity={0.25} />
        {/* Materials */}
        <rect x={cx - 20} y={baseY - 38} width={14} height={10} rx={1} fill={COLORS.orange} opacity={0.3} />
        <circle cx={cx + 15} cy={baseY - 34} r={5} fill={COLORS.teal} opacity={0.25} />
        <Character preset={2} x={cx - 25} y={baseY - 3} scale={0.5} />
        <Character preset={5} x={cx - 5} y={baseY - 3} scale={0.52} />
        <Character preset={9} x={cx + 15} y={baseY - 3} scale={0.48} />
        <Character preset={6} x={cx + 33} y={baseY - 3} scale={0.5} />
      </>
    ),
    'community-circle': (
      <>
        <Rug cx={cx} cy={baseY - 5} rx={58} ry={16} color={COLORS.orange} opacity={0.15} />
        {/* Guide standing with clipboard */}
        <Character preset={7} x={cx} y={baseY - 18} scale={0.58} />
        <rect x={cx + 6} y={baseY - 32} width={7} height={10} rx={1} fill={COLORS.orange} opacity={0.5} />
        {/* Seated students in arc */}
        <Character preset={0} x={cx - 40} y={baseY} scale={0.42} />
        <Character preset={3} x={cx - 22} y={baseY + 3} scale={0.43} />
        <Character preset={4} x={cx - 5} y={baseY + 5} scale={0.4} />
        <Character preset={6} x={cx + 15} y={baseY + 3} scale={0.42} />
        <Character preset={9} x={cx + 35} y={baseY} scale={0.44} />
      </>
    ),
    'field-experience': (
      <>
        {/* Outdoor hint — ground line with texture */}
        <line x1={10} y1={baseY + 2} x2={width - 10} y2={baseY + 2} stroke={COLORS.teal} strokeWidth={2} opacity={0.3} />
        <Character preset={2} x={cx - 25} y={baseY - 5} scale={0.5} />
        <Character preset={4} x={cx - 5} y={baseY - 5} scale={0.52} />
        {/* Professional (taller) */}
        <Character preset={7} x={cx + 22} y={baseY - 10} scale={0.6} />
        {/* Equipment */}
        <rect x={cx + 38} y={baseY - 18} width={5} height={20} rx={1} fill={COLORS.teal} opacity={0.4} />
        <Spark cx={20} cy={15} size={5} color={COLORS.teal} />
      </>
    ),
    'dual-enrollment': (
      <>
        {/* Laptop */}
        <rect x={cx - 15} y={baseY - 38} width={30} height={5} rx={2} fill={COLORS.tanGrey} opacity={0.3} />
        <rect x={cx - 12} y={baseY - 50} width={24} height={13} rx={2} fill={COLORS.indigo} opacity={0.3} />
        <rect x={cx - 10} y={baseY - 48} width={20} height={8} rx={1} fill="white" opacity={0.5} />
        {/* Building icon */}
        <rect x={cx + 30} y={12} width={20} height={22} rx={1} fill={COLORS.brown} opacity={0.3} />
        <rect x={cx + 34} y={16} width={4} height={4} rx={0.5} fill="white" opacity={0.5} />
        <rect x={cx + 42} y={16} width={4} height={4} rx={0.5} fill="white" opacity={0.5} />
        <rect x={cx + 34} y={24} width={4} height={4} rx={0.5} fill="white" opacity={0.5} />
        <rect x={cx + 42} y={24} width={4} height={4} rx={0.5} fill="white" opacity={0.5} />
        <Character preset={5} x={cx} y={baseY - 5} scale={0.55} />
      </>
    ),
    'presentation': (
      <>
        {/* Presentation board */}
        <rect x={10} y={10} width={30} height={22} rx={2} fill="white" stroke={COLORS.brown} strokeWidth={1.5} />
        <line x1={16} y1={18} x2={34} y2={18} stroke={COLORS.indigo} strokeWidth={1} />
        <line x1={16} y1={24} x2={28} y2={24} stroke={COLORS.indigo} strokeWidth={1} opacity={0.5} />
        {/* Presenter */}
        <Character preset={6} x={50} y={baseY - 10} scale={0.55} />
        {/* Audience */}
        <Character preset={0} x={cx + 10} y={baseY - 2} scale={0.42} />
        <Character preset={3} x={cx + 25} y={baseY - 2} scale={0.44} />
        <Character preset={7} x={cx + 40} y={baseY - 5} scale={0.48} />
        <Character preset={9} x={cx + 55} y={baseY - 2} scale={0.43} />
      </>
    ),
    'peer-tutoring': (
      <>
        {/* Small whiteboard */}
        <rect x={cx - 20} y={8} width={40} height={28} rx={2} fill="white" stroke={COLORS.lightBlue} strokeWidth={1.5} />
        <line x1={cx - 14} y1={18} x2={cx + 8} y2={18} stroke={COLORS.indigo} strokeWidth={1} />
        <circle cx={cx + 5} cy={28} r={3} fill={COLORS.orange} opacity={0.3} />
        {/* Tutor pointing */}
        <Character preset={8} x={cx - 15} y={baseY - 5} scale={0.55} />
        {/* Learner */}
        <Character preset={3} x={cx + 15} y={baseY - 3} scale={0.52} />
        <Spark cx={cx + 35} cy={15} size={4} color={COLORS.orange} />
      </>
    ),
    'reflection': (
      <>
        {/* Two chairs implied */}
        <Character preset={9} x={cx - 15} y={baseY - 5} scale={0.55} />
        {/* Guide */}
        <Character preset={0} x={cx + 18} y={baseY - 8} scale={0.58} />
        {/* Document / PLP */}
        <rect x={cx - 5} y={baseY - 30} width={12} height={16} rx={1} fill="white" stroke={COLORS.orange} strokeWidth={1} />
        <line x1={cx - 2} y1={baseY - 26} x2={cx + 4} y2={baseY - 26} stroke={COLORS.orange} strokeWidth={0.8} />
        <line x1={cx - 2} y1={baseY - 22} x2={cx + 3} y2={baseY - 22} stroke={COLORS.orange} strokeWidth={0.8} opacity={0.5} />
        <Spark cx={cx + 40} cy={25} size={5} color={COLORS.orange} />
      </>
    ),
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" fill="none">
      <defs>
        <filter id="wobble">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="2" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" />
        </filter>
      </defs>
      {scenes[type] || null}
    </svg>
  )
}

/** Simple character avatar for student story headers */
export function StudentAvatar({ preset = 0, size = 48 }) {
  const half = size / 2
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
      <Character preset={preset} x={half} y={half + 8} scale={size / 110} />
    </svg>
  )
}

export default { Character, Rug, Spark, StudentGroup, ExperienceScene, StudentAvatar }
