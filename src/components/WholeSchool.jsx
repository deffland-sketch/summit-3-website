import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ELEMENTS } from '../elements'
import { ElementTag } from './ElementTag'

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
// Students in each slot are counted by learning experience, grouped under the
// three model elements and drawn in shades of each element's color (darkest at
// the bottom of each group). Lunch is shown in the schedule in a light neutral but
// is not on the key. Every slot totals 200. Career-connected counts follow the
// partner list for that slot (college courses vs. other field placements);
// "Expedition projects" is independent work in the two project studios.
const experiences = [
  { key: 'di', element: 'academic', label: 'Direct instruction', color: '#4b4b96' },
  { key: 'pf', element: 'academic', label: 'Practice and feedback', color: '#6a6aae' },
  { key: 'dd', element: 'academic', label: 'Discussion and dialogue', color: '#8c8cc4' },
  { key: 'iw', element: 'academic', label: 'Independent work', color: '#b0b0da' },
  { key: 'gr', element: 'mentoring', label: 'Goal setting and reflection', color: '#508278' },
  { key: 'ct', element: 'mentoring', label: 'Community time', color: '#86b0a7' },
  { key: 'ep', element: 'ccl', label: 'Expedition projects', color: '#f6aa40' },
  { key: 'cc', element: 'ccl', label: 'College courses', color: '#f8bd68' },
  { key: 'fi', element: 'ccl', label: 'Internships and Expeditions in the field', color: '#fad08f' },
  { key: 'ex', element: 'ccl', label: 'Exhibitions of learning', color: '#fce3bd' },
  { key: 'lunch', element: 'lunch', label: 'Lunch', color: ELEMENTS.lunch.color },
]
const keyedElements = ['academic', 'mentoring', 'ccl']

// Each time slot: students, adults deployed, spaces in use, partner activity, operational note
const timeSlots = [
  {
    time: '8:30 am',
    students: { ct: 200 },
    adults: { mentors: 6, contentExperts: 6, coaches: 2, facilitators: 2, partners: 0 },
    spaces: { smallGroup: 6, commons: 2, seminar: 2, studio: 2, nook: 2 },
    partners: [],
    note: 'Students starting in the building gather for a community launch: a shout-out and the day\'s big moments, run this week by a mentor. At 8:45 they break into small groups, each led by an educator, so all 16 educators start the day with a group of their own. Around 30 students starting at a college or partner site join a short virtual check-in from wherever they are. Their mentor and a core group of peers stay the same all year.',
  },
  {
    time: '9:15 am',
    students: { di: 30, pf: 50, dd: 20, iw: 38, gr: 12, ep: 20, cc: 18, fi: 12 },
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
    students: { di: 30, pf: 44, dd: 24, iw: 30, gr: 10, ep: 20, cc: 18, fi: 18, ex: 6 },
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
    students: { di: 24, pf: 40, dd: 20, iw: 34, gr: 12, ep: 20, cc: 18, fi: 22, ex: 10 },
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
    students: { cc: 18, fi: 22, lunch: 160 },
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
    students: { di: 12, pf: 24, dd: 10, iw: 14, gr: 12, ep: 20, cc: 24, fi: 76, ex: 8 },
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
    note: 'Half the school is out in the world. Amara shadows a reporter, Marco tests creek water on a water study, David starts a paid clinical rotation, and others are in a two-week design internship or college courses. Each site has a named partner educator who hosts or teaches, for an hour or a whole internship. Students on a long placement pick their academic work back up when they return. Back at home base, a smaller group keeps working with content experts and in the studios.',
  },
  {
    time: '3:00 pm',
    students: { gr: 150, ct: 20, cc: 10, fi: 20 },
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
  const groups = [...keyedElements, 'lunch']
    .map((el) => ({ el, rows: experiences.filter((x) => x.element === el && data[x.key] > 0) }))
    .filter((g) => g.rows.length > 0)
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {groups.map(({ el, rows }) => (
        <div key={el} className="bg-black/[0.04] rounded-lg px-3 py-3">
          <div className="flex items-baseline justify-between gap-2 mb-2">
            {el === 'lunch' ? (
              <span className="text-sm font-bold text-black/70">Lunch</span>
            ) : (
              <ElementTag element={el} size="xs" />
            )}
            <span className="text-lg font-bold text-black">{rows.reduce((n, x) => n + data[x.key], 0)}</span>
          </div>
          {el !== 'lunch' && (
            <ul className="space-y-1">
              {rows.map((x) => (
                <li key={x.key} className="flex items-center gap-2 text-xs text-black/80">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: x.color }} aria-hidden="true" />
                  <span className="font-bold text-black w-7 tabular-nums">{data[x.key]}</span>
                  <span className="leading-tight">{x.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

function AdultBreakdown({ adults }) {
  const eduTotal = adults.mentors + adults.contentExperts + adults.coaches + adults.facilitators
  const rows = [
    { label: 'Specialist mentors', count: adults.mentors, max: 6, element: 'mentoring', desc: 'caseloads of about 33, pathway guidance with students and families, project coaching' },
    { label: 'Content experts', count: adults.contentExperts, max: 6, element: 'academic', desc: 'math, science, reading and writing: small-group lessons and feedback, scheduled by need' },
    { label: 'Learning strategies coaches', count: adults.coaches, max: 2, element: 'mentoring', desc: 'planning, habits, persistence, managing attention and devices' },
    { label: 'Projects facilitators', count: adults.facilitators, max: 2, element: 'ccl', desc: 'student-directed Expedition projects and peer critique' },
    { label: 'Partner educators', count: adults.partners, max: 50, element: 'ccl', desc: 'a named host at each partner site, for an hour or a whole internship' },
  ]
  return (
    <div>
      {/* Summary header */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4 pb-3 border-b border-black/10">
        <div>
          <span className="text-3xl font-bold text-black">{eduTotal}</span>
          <span className="text-black/70 text-sm ml-1">of 16 Summit educators</span>
        </div>
        <div>
          <span className="text-xl font-bold text-black">{adults.partners}</span>
          <span className="text-black/70 text-sm ml-1">partner educators</span>
        </div>
        <div>
          <span className="text-xl font-bold text-black">3</span>
          <span className="text-black/70 text-sm ml-1">leading the school: director, program coordinator, operations and family coordinator</span>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                <span className="text-black text-sm font-bold">{r.label}</span>
                <ElementTag element={r.element} size="xs" />
              </div>
              <span className="text-black font-bold text-lg">{r.count}<span className="text-black/60 text-xs font-normal ml-1">/{r.max === 50 ? '~50' : r.max}</span></span>
            </div>
            {/* Horizontal bar */}
            <div className="h-2.5 bg-black/[0.06] rounded-full overflow-hidden mb-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(r.count / r.max) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: ELEMENTS[r.element].color }}
              />
            </div>
            <p className="text-black/75 text-xs">{r.desc}</p>
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
    { label: 'Small-group rooms', count: spaces.smallGroup, of: 6, element: 'academic', desc: 'lessons for the five students ready this week, writing conferences, demos' },
    { label: 'Practice commons', count: spaces.commons, of: 2, element: 'academic', desc: 'AI tutors, skills clinics, community launch, lunch' },
    { label: 'Seminar rooms', count: spaces.seminar, of: 2, element: 'academic', desc: 'peer critique, Socratic seminar, reading circles' },
    { label: 'Project studios', count: spaces.studio, of: 2, element: 'ccl', desc: 'research projects, prototype builds, exhibition prep' },
    { label: 'Mentor nooks', count: spaces.nook, of: 2, element: 'mentoring', desc: 'pathway check-ins and goal-setting' },
  ]
  return (
    <div>
      {/* Summary header */}
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-black/10">
        <span className="text-3xl font-bold text-black">{total}</span>
        <span className="text-black/70 text-sm">of 14 home base spaces active</span>
        <span className="text-black/75 font-bold text-sm ml-auto">{pct}% utilization</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {rows.map((r) => {
          const utilPct = (r.count / r.of) * 100
          return (
            <div key={r.label} className="bg-black/[0.04] rounded-xl p-3">
              <div className="mb-2">
                <span className="block text-black text-sm font-bold">{r.label}</span>
                <ElementTag element={r.element} size="xs" />
              </div>
              {/* Visual: filled/empty dots representing each space */}
              <div className="flex gap-1 mb-2">
                {Array.from({ length: r.of }).map((_, j) => (
                  <div
                    key={j}
                    className="h-4 flex-1 rounded-sm transition-all"
                    style={{
                      backgroundColor: j < r.count ? ELEMENTS[r.element].color : 'rgba(0,0,0,0.08)',
                    }}
                  />
                ))}
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-black/75 text-xs">{r.desc}</p>
              </div>
              <p className="text-black font-bold text-lg mt-1">
                {r.count}<span className="text-black/60 text-xs font-normal">/{r.of}</span>
                {utilPct === 100 && <span className="text-black/70 text-xs font-bold ml-2">Full</span>}
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
    return <p className="text-black/60 text-sm italic">No field partners active at this time.</p>
  }
  return (
    <div className="space-y-1.5">
      <p className="text-black/70 text-xs italic mb-2">
        Partner organizations shown are hypothetical examples, not current partnerships.
      </p>
      {partners.map((p, i) => (
        <div key={i} className="flex gap-2 bg-black/[0.04] rounded-lg px-3 py-2">
          <span className="text-orange-ink text-sm mt-0.5" aria-hidden="true">●</span>
          <p className="text-black/85 text-sm leading-relaxed">{p}</p>
        </div>
      ))}
    </div>
  )
}

function StackedBar({ data, time, isActive, onClick }) {
  // A real button so the chart is keyboard- and screen-reader-operable, not just
  // clickable. The label spells out the distribution the bar encodes visually.
  const label = experiences
    .map((x) => (data[x.key] > 0 ? `${data[x.key]} in ${x.label.toLowerCase()}` : null))
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
      {experiences.map((x) => {
        const pct = ((data[x.key] || 0) / 200) * 100
        if (pct < 1) return null
        return (
          <motion.span
            key={x.key}
            animate={{ height: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ backgroundColor: x.color }}
            className={`block w-full first:rounded-b-sm last:rounded-t-sm transition-opacity ${isActive ? 'opacity-100' : 'opacity-75'}`}
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
      className="py-16 md:py-24 px-6 bg-mint text-black"
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
          <h2 id="whole-school-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            The Whole School in a Day
          </h2>
          <p className="text-black/80 max-w-2xl mx-auto">
            200 students. 16 educators and about 50 partner educators. A home base, with the city as
            the rest of the campus.
          </p>
        </motion.div>

        {/* Legend */}
        {/* Key: learning experiences grouped under each element. Lunch is not on the key. */}
        <div className="grid sm:grid-cols-3 gap-x-6 gap-y-3 max-w-4xl mx-auto mb-6" aria-label="Key">
          {keyedElements.map((el) => (
            <div key={el}>
              <ElementTag element={el} size="xs" className="mb-1.5" />
              <ul className="space-y-1">
                {experiences.filter((x) => x.element === el).map((x) => (
                  <li key={x.key} className="flex items-center gap-1.5 text-xs text-black/80">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: x.color }} aria-hidden="true" />
                    {x.label}
                  </li>
                ))}
              </ul>
            </div>
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
                  ? 'bg-black/80 text-white'
                  : 'bg-black/[0.06] text-black hover:bg-black/10'
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
                  activeIdx === i ? 'text-black font-bold' : 'text-black/60'
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
            className="mt-6 bg-white border border-black/8 rounded-xl overflow-hidden"
          >
            {/* Panel header + tabs */}
            <div className="px-5 pt-4 pb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-black font-bold text-lg">{slot.time}</span>
                <span className="text-black/70 text-sm">200 students · 19 Summit staff · ~50 partner educators</span>
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
                        ? 'bg-black/10 text-black'
                        : 'text-black/60 hover:text-black'
                    }`}
                  >
                    {tabLabels[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* What is actually happening at this hour. Authored per slot in
                `timeSlots[].note`: this is the operational detail that makes the
                200-student claim concrete. */}
            <div className="px-5 pt-3">
              <p className="text-black/80 text-sm leading-relaxed border-l-2 border-black/25 pl-3">
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
                <p className="text-black/60 text-sm leading-relaxed border-t border-black/10 pt-3">
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
