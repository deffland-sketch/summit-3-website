import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { brand } from '../palette'

/*
 * School resource model (from "How Summit 3.0 Works", Oct 2026, scaled from a
 * 100-student cohort to 200 at the same ratios):
 *   Leadership and operations, fixed at 1 each: director, program coordinator,
 *     operations and family coordinator
 *   Educators, doubled: 6 specialist mentors (caseload ~33), 6 content experts,
 *     2 learning strategies coaches, 2 projects facilitators = 16
 *   ~50 partner educators: a named host at each partner organization
 *   Home base: 6 small-group rooms, 2 practice commons, 2 seminar rooms,
 *     2 project studios, 2 mentor nooks = 14 spaces; the city is the rest of the campus
 *   Partner organizations are hypothetical examples, labeled as such on the page.
 */
// Matches the 8 learning experience types
const experienceTypes = [
  { name: 'Direct instruction', color: brand.indigo },
  { name: 'Practice and feedback', color: brand.teal },
  { name: 'Discussion and dialogue', color: brand.orange },
  { name: 'Independent work and creation', color: brand.lightBlue },
  { name: 'Presentation and performance', color: brand.red },
  { name: 'Reflection and goal-setting', color: brand.peach },
  // Brand brown would vanish on this brown section, so real-world uses the
  // brand's light brown tint here.
  { name: 'Real-world experience', color: '#e6e6e6' },
  { name: 'Wellbeing and community', color: brand.tanGrey },
]

// Each time slot: students, adults deployed, spaces in use, partner activity, operational note
const timeSlots = [
  {
    time: '8:30 am',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [0,     0,       0,      0,     0,      0,      0,    200],
    adults: { mentors: 6, contentExperts: 6, coaches: 2, facilitators: 2, partners: 0 },
    spaces: { smallGroup: 6, commons: 2, seminar: 2, studio: 2, nook: 2 },
    partners: [],
    note: 'Students starting in the building gather for a community launch: a shout-out and the day\'s big moments, run this week by a mentor. At 8:45 they break into small groups, each led by an educator, so all 16 educators start the day with a group of their own. Around 30 students starting at a college or partner site join a short virtual check-in from wherever they are. Their mentor and a core group of peers stay the same all year.',
  },
  {
    time: '9:15 am',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [30,    50,      20,     58,    0,      12,     30,   0],
    adults: { mentors: 4, contentExperts: 6, coaches: 2, facilitators: 2, partners: 12 },
    spaces: { smallGroup: 6, commons: 2, seminar: 2, studio: 2, nook: 2 },
    partners: [
      'Local community college: 18 students in morning college courses',
      'Bay Area Community Health: 4 students in a weekly shadowing placement',
      'Mithun Architecture: 4 students in week one of a two-week design internship',
      'Children\'s Hospital: 4 students in a clinical internship',
    ],
    note: 'The home base fills with small groups. Six content experts each teach a lesson to the five students ready for it this week. Nobody sits through a lesson they\'ve already mastered. Fifty students work in the practice commons with AI tutors and skills clinics while the learning strategies coaches help with planning, persistence, and attention. The projects facilitators run peer critique in the seminar rooms, and mentors coach research projects and prototype builds in the studios.',
  },
  {
    time: '10:30 am',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [30,    44,      24,     50,    6,      10,     36,   0],
    adults: { mentors: 4, contentExperts: 6, coaches: 2, facilitators: 2, partners: 16 },
    spaces: { smallGroup: 6, commons: 2, seminar: 2, studio: 2, nook: 2 },
    partners: [
      'Local community college: 18 students (continued)',
      'East Bay Housing Alliance: 8 students conducting housing policy interviews',
      'Children\'s Hospital: 6 students in a clinical internship',
      'Mithun Architecture: 4 students (continued)',
    ],
    note: 'One of these lessons was added overnight. A student\'s draft showed two writing skills within reach, so the engine placed her in a small-group argument-writing lesson and her phone showed the change this morning. Every educator\'s screen shows the same kind of plan: who they\'re teaching, where, and why. Exhibition rehearsals start in one of the studios.',
  },
  {
    time: '11:30 am',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [24,    40,      20,     54,    10,     12,     40,   0],
    adults: { mentors: 5, contentExperts: 5, coaches: 2, facilitators: 2, partners: 18 },
    spaces: { smallGroup: 5, commons: 2, seminar: 2, studio: 2, nook: 2 },
    partners: [
      'Local community college: 18 students (continued)',
      'Children\'s Hospital: 6 students (continued)',
      'Redwood City Public Library: 5 students co-facilitating a youth book club',
      'AC Transit: 4 students analyzing ridership data for a civic design project',
      'Mithun Architecture: 4 students (continued)',
      'Pacific Science Center: 3 students assisting with exhibit prototyping',
    ],
    note: 'Content experts shift to writing conferences and feedback. AI has already scored this morning\'s drafts against Summit\'s rubrics and exemplars; educators review those scores, add feedback of their own, and override when they disagree. Mentors hold pathway check-ins in the mentor nooks.',
  },
  {
    time: '12:30 pm',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [0,     0,       0,      0,     0,      0,      40,   160],
    adults: { mentors: 6, contentExperts: 4, coaches: 1, facilitators: 1, partners: 18 },
    spaces: { smallGroup: 2, commons: 2, seminar: 0, studio: 0, nook: 1 },
    partners: [
      'Local community college: 18 students (continued)',
      'Fred Hutchinson Cancer Research Center: 6 students in a lab internship',
      'Children\'s Hospital: 6 students (continued)',
      'Mithun Architecture: 4 students (continued)',
      'AC Transit: 4 students (continued)',
      'Local restaurant group: 2 students in operations shadowing',
    ],
    note: 'Lunch together at home base, and then the city becomes the campus. The operations and family coordinator handles transit passes and scheduled transport, and every student checks in through the learning platform when they arrive at a site.',
  },
  {
    time: '1:30 pm',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [12,    24,      10,     34,    8,      12,     100,  0],
    adults: { mentors: 4, contentExperts: 4, coaches: 2, facilitators: 2, partners: 30 },
    spaces: { smallGroup: 3, commons: 1, seminar: 1, studio: 2, nook: 1 },
    partners: [
      'Local community college: 24 students in afternoon college courses',
      'Habitat for Humanity: 10 students on a build site',
      'LifeLong Medical Care: 8 students in paid CNA clinical rotations',
      'East Bay Housing Alliance: 8 students (continued interviews)',
      'City of Redwood City Office of Sustainability: 8 students presenting a water quality report',
      'Local employers: 8 students at paid work or apprenticeships',
      'Peninsula Open Space Trust: 6 students on a creek water study',
      'Children\'s Hospital: 6 students (continued)',
      'Fred Hutchinson Cancer Research Center: 6 students (continued)',
      'Genentech: 6 students touring labs',
      'Seattle Art Museum: 6 students documenting an exhibit for a media project',
      'Mithun Architecture: 4 students (continued)',
    ],
    note: 'Half the school is out in the world: water studies, job shadows, a paid clinical rotation, a two-week design internship, college courses. Each site has a named partner educator who hosts or teaches, for an hour or a whole internship. Students on a long placement pick their academic work back up when they return. Back at home base, a smaller group keeps working with content experts and in the studios.',
  },
  {
    time: '3:00 pm',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [0,     0,       0,      0,     0,      150,    30,   20],
    adults: { mentors: 6, contentExperts: 3, coaches: 2, facilitators: 1, partners: 12 },
    spaces: { smallGroup: 2, commons: 2, seminar: 1, studio: 1, nook: 2 },
    partners: [
      'Local employers: 12 students starting paid shifts',
      'Local community college: 10 students in late-afternoon courses',
      'LifeLong Medical Care: 8 students finishing clinical shifts',
    ],
    note: 'The day closes wherever students are. They log what they did in the learning platform and rate their own progress, and educators add observation notes. Each mentor scans a caseload of about 33: most on track, a few who need a nudge, a few ready for validation. Overnight, the engine makes small adjustments to tomorrow. Then it\'s team practice, clubs, or a shift at work.',
  },
]

const tabs = ['students', 'adults', 'spaces', 'partners']
const tabLabels = { students: 'Students', adults: 'Educators', spaces: 'Spaces', partners: 'Partners' }

function StudentBreakdown({ data }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {data.map((count, i) =>
        count > 0 ? (
          <div key={i} className="flex items-center gap-2 bg-white/10 rounded-lg px-2.5 py-2">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: experienceTypes[i].color }} aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight">{count}</p>
              <p className="text-white/80 text-xs leading-tight truncate">{experienceTypes[i].name}</p>
            </div>
          </div>
        ) : null
      )}
    </div>
  )
}

function AdultBreakdown({ adults }) {
  const eduTotal = adults.mentors + adults.contentExperts + adults.coaches + adults.facilitators
  const rows = [
    { label: 'Specialist mentors', count: adults.mentors, max: 6, color: brand.orange, desc: 'caseloads of about 33, pathway guidance with students and families, project coaching' },
    { label: 'Content experts', count: adults.contentExperts, max: 6, color: brand.indigo, desc: 'math, science, reading and writing: small-group lessons and feedback, scheduled by need' },
    { label: 'Learning strategies coaches', count: adults.coaches, max: 2, color: brand.lightBlue, desc: 'planning, habits, persistence, managing attention and devices' },
    { label: 'Projects facilitators', count: adults.facilitators, max: 2, color: brand.teal, desc: 'student-directed Expedition projects and peer critique' },
    { label: 'Partner educators', count: adults.partners, max: 50, color: brand.peach, desc: 'a named host at each partner site, for an hour or a whole internship' },
  ]
  return (
    <div>
      {/* Summary header */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4 pb-3 border-b border-white/15">
        <div>
          <span className="text-3xl font-bold text-white">{eduTotal}</span>
          <span className="text-white/70 text-sm ml-1">of 16 Summit educators</span>
        </div>
        <div>
          <span className="text-xl font-bold text-white">{adults.partners}</span>
          <span className="text-white/70 text-sm ml-1">partner educators</span>
        </div>
        <div>
          <span className="text-xl font-bold text-white">3</span>
          <span className="text-white/70 text-sm ml-1">leading the school: director, program coordinator, operations and family coordinator</span>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} aria-hidden="true" />
                <span className="text-white text-sm font-bold">{r.label}</span>
              </div>
              <span className="text-white font-bold text-lg">{r.count}<span className="text-white/55 text-xs font-normal ml-1">/{r.max === 50 ? '~50' : r.max}</span></span>
            </div>
            {/* Horizontal bar */}
            <div className="h-2.5 bg-white/15 rounded-full overflow-hidden mb-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(r.count / r.max) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: r.color }}
              />
            </div>
            <p className="text-white/75 text-xs">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SpaceBreakdown({ spaces }) {
  const total = spaces.smallGroup + spaces.commons + spaces.seminar + spaces.studio + spaces.nook
  const pct = Math.round((total / 14) * 100)
  const rows = [
    { label: 'Small-group rooms', count: spaces.smallGroup, of: 6, color: brand.indigo, desc: 'lessons for the five students ready this week, writing conferences, demos' },
    { label: 'Practice commons', count: spaces.commons, of: 2, color: brand.teal, desc: 'AI tutors, skills clinics, community launch, lunch' },
    { label: 'Seminar rooms', count: spaces.seminar, of: 2, color: brand.orange, desc: 'peer critique, Socratic seminar, reading circles' },
    { label: 'Project studios', count: spaces.studio, of: 2, color: brand.lightBlue, desc: 'research projects, prototype builds, exhibition prep' },
    { label: 'Mentor nooks', count: spaces.nook, of: 2, color: brand.peach, desc: 'pathway check-ins and goal-setting' },
  ]
  return (
    <div>
      {/* Summary header */}
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-white/15">
        <span className="text-3xl font-bold text-white">{total}</span>
        <span className="text-white/70 text-sm">of 14 home base spaces active</span>
        <span className="text-orange font-bold text-sm ml-auto">{pct}% utilization</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {rows.map((r) => {
          const utilPct = (r.count / r.of) * 100
          return (
            <div key={r.label} className="bg-white/10 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-bold">{r.label}</span>
              </div>
              {/* Visual: filled/empty dots representing each space */}
              <div className="flex gap-1 mb-2">
                {Array.from({ length: r.of }).map((_, j) => (
                  <div
                    key={j}
                    className="h-4 flex-1 rounded-sm transition-all"
                    style={{
                      backgroundColor: j < r.count ? r.color : 'rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-white/75 text-xs">{r.desc}</p>
              </div>
              <p className="text-white font-bold text-lg mt-1">
                {r.count}<span className="text-white/55 text-xs font-normal">/{r.of}</span>
                {utilPct === 100 && <span className="text-orange text-xs font-bold ml-2">Full</span>}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PartnerBreakdown({ partners }) {
  if (partners.length === 0) {
    return <p className="text-white/60 text-sm italic">No field partners active at this time.</p>
  }
  return (
    <div className="space-y-1.5">
      <p className="text-white/70 text-xs italic mb-2">
        Partner organizations shown are hypothetical examples, not current partnerships.
      </p>
      {partners.map((p, i) => (
        <div key={i} className="flex gap-2 bg-white/10 rounded-lg px-3 py-2">
          <span className="text-orange text-sm mt-0.5" aria-hidden="true">●</span>
          <p className="text-white/85 text-sm leading-relaxed">{p}</p>
        </div>
      ))}
    </div>
  )
}

function StackedBar({ data, time, isActive, onClick }) {
  // A real button so the chart is keyboard- and screen-reader-operable, not just
  // clickable. The label spells out the distribution the bar encodes visually.
  const label = data
    .map((count, i) => (count > 0 ? `${count} in ${experienceTypes[i].name}` : null))
    .filter(Boolean)
    .join(', ')

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      title={time}
      aria-label={`${time}: ${label}`}
      className="flex flex-col-reverse h-full w-full cursor-pointer rounded-sm"
    >
      {data.map((value, i) => {
        const pct = (value / 200) * 100
        if (pct < 1) return null
        return (
          <motion.span
            key={i}
            animate={{ height: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ backgroundColor: experienceTypes[i].color }}
            className={`block w-full first:rounded-b-sm last:rounded-t-sm transition-opacity ${isActive ? 'opacity-100' : 'opacity-55'}`}
          />
        )
      })}
    </button>
  )
}

export default function WholeSchool() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIdx, setActiveIdx] = useState(1) // 9:15am
  const [activeTab, setActiveTab] = useState('students')

  const slot = timeSlots[activeIdx]

  // Arrow-key navigation between tabs, per the WAI-ARIA tabs pattern.
  const onTabKeyDown = (e, tab) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = tabs[(tabs.indexOf(tab) + dir + tabs.length) % tabs.length]
    setActiveTab(next)
    document.getElementById(`tab-${next}`)?.focus()
  }

  return (
    <section
      className="py-20 md:py-28 px-6 bg-brown text-white"
      ref={ref}
      id="whole-school"
      aria-labelledby="whole-school-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 id="whole-school-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Whole School in Motion
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            200 students. 16 educators and about 50 partner educators. A home base, with the city as
            the rest of the campus.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
          {experienceTypes.map((type) => (
            <span key={type.name} className="flex items-center gap-1.5 text-xs text-white/85">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: type.color }} aria-hidden="true" />
              {type.name}
            </span>
          ))}
        </div>

        {/* Time controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {timeSlots.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-pressed={activeIdx === i}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeIdx === i
                  ? 'bg-orange text-brown'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {s.time.replace(':00', '').replace(' am', 'a').replace(' pm', 'p')}
            </button>
          ))}
        </div>

        {/* Chart */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          <div className="flex items-end gap-1 md:gap-2" style={{ height: 240 }}>
            {timeSlots.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center" style={{ height: '100%' }}>
                <div className="flex-1 w-full flex items-end">
                  <StackedBar
                    data={s.students}
                    time={s.time}
                    isActive={activeIdx === i}
                    onClick={() => setActiveIdx(i)}
                  />
                </div>
                <p className={`text-[10px] md:text-xs mt-2 whitespace-nowrap transition-colors ${
                  activeIdx === i ? 'text-orange font-bold' : 'text-white/60'
                }`}>
                  {s.time.replace(':00', '').replace(' am', 'a').replace(' pm', 'p')}
                </p>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-white/10 rounded-xl overflow-hidden"
          >
            {/* Panel header + tabs */}
            <div className="px-5 pt-4 pb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-orange font-bold text-lg">{slot.time}</span>
                <span className="text-white/70 text-sm">200 students · 19 Summit staff · ~50 partner educators</span>
              </div>
              <div className="flex gap-1" role="tablist" aria-label="Resource view">
                {tabs.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    id={`tab-${t}`}
                    aria-selected={activeTab === t}
                    aria-controls={`tabpanel-${t}`}
                    tabIndex={activeTab === t ? 0 : -1}
                    onClick={() => setActiveTab(t)}
                    onKeyDown={(e) => onTabKeyDown(e, t)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      activeTab === t
                        ? 'bg-white/25 text-white'
                        : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {tabLabels[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* What is actually happening at this hour. Authored per slot in
                `timeSlots[].note` — this is the operational detail that makes the
                200-student claim concrete. */}
            <div className="px-5 pt-3">
              <p className="text-white/80 text-sm leading-relaxed border-l-2 border-orange/60 pl-3">
                {slot.note}
              </p>
            </div>

            {/* Tab content */}
            <div
              className="p-5"
              role="tabpanel"
              id={`tabpanel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              tabIndex={-1}
            >
              {activeTab === 'students' && <StudentBreakdown data={slot.students} />}
              {activeTab === 'adults' && <AdultBreakdown adults={slot.adults} />}
              {activeTab === 'spaces' && <SpaceBreakdown spaces={slot.spaces} />}
              {activeTab === 'partners' && <PartnerBreakdown partners={slot.partners} />}
            </div>

            {/* Tab hint */}
            {activeTab === 'students' && (
              <div className="px-5 pb-5">
                <p className="text-white/65 text-sm leading-relaxed border-t border-white/15 pt-3">
                  Switch tabs to see how educators are deployed, which spaces are in use, and which community partners are active at this time.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
