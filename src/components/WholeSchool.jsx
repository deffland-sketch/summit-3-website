import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

/*
 * School resource model:
 *   Staff: 24 educational personnel, 2 system architects, 4 admin/ops = 30 total
 *   Educational personnel break into capacities:
 *     6 guides, 8 academic content experts, 6 facilitators, 4 flexible (shift by need)
 *   Facilities: 12 classrooms, 2 large spaces, 6 small collaboration rooms, 3 lab spaces = 23 spaces
 *   Partners: specific community and industry orgs
 */

// Matches the 8 learning experience types
const experienceTypes = [
  { name: 'Direct instruction', color: '#4b4b96' },
  { name: 'Practice and feedback', color: '#508278' },
  { name: 'Discussion and dialogue', color: '#f6aa40' },
  { name: 'Independent work and creation', color: '#96d2dc' },
  { name: 'Presentation and performance', color: '#e6553c' },
  { name: 'Reflection and goal-setting', color: '#ffd2b4' },
  { name: 'Real-world experience', color: '#503c2d' },
  { name: 'Wellbeing and community', color: '#96a0ab' },
]

// Each time slot: students, adults deployed, spaces in use, partner activity, operational note
const timeSlots = [
  {
    time: '8:00 am',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [0,     0,       0,      0,     0,      0,      0,    400],
    adults: { guides: 6, contentExperts: 0, facilitators: 0, flex: 0, architects: 2, ops: 4 },
    spaces: { classrooms: 6, large: 2, collab: 0, labs: 0 },
    partners: [],
    note: 'All 400 students in community circles with their 6 guides. Each guide leads ~67 students across 3 mentor groups, meeting in classrooms and both large spaces. System architects review overnight data and finalize the day\'s schedule adjustments. Admin/ops team manages arrivals and logistics.',
  },
  {
    time: '9:00 am',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [75,    60,      28,     103,   0,      50,     12,   72],
    adults: { guides: 3, contentExperts: 8, facilitators: 5, flex: 4, architects: 2, ops: 2 },
    spaces: { classrooms: 10, large: 2, collab: 6, labs: 3 },
    partners: [
      'Peninsula Open Space Trust (Redwood City) — 4 students collecting water samples at creek site',
      'Bay Area Community Health (El Cerrito) — 3 students in weekly shadowing placement',
      'Mithun Architecture (Seattle) — 5 students on a site visit for their urban design project',
    ],
    note: '8 content experts run 10 concurrent small-group sessions across 10 classrooms — each group is 4-6 students with a targeted skill focus. 83 students in peer collaboration fill both large spaces and all 6 collab rooms. 3 facilitators coach project studios in the labs. 3 guides are running reflection sessions. 4 flex educators float between independent practice and peer tutoring support. 4 students at career-connected learning sites, 8 at internship/shadowing placements with 3 partner organizations. 38 students work on dual enrollment courses in 2 classrooms, supervised by 2 flex educators with AI tutor support.',
  },
  {
    time: '10:00 am',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [85,    72,      35,     95,    12,     40,     18,   43],
    adults: { guides: 2, contentExperts: 8, facilitators: 6, flex: 4, architects: 2, ops: 2 },
    spaces: { classrooms: 11, large: 2, collab: 6, labs: 3 },
    partners: [
      'Peninsula Open Space Trust (Redwood City) — 4 students (continued)',
      'Children\'s Hospital (Seattle) — 6 students in clinical internship placement',
      'East Bay Housing Alliance (El Cerrito) — 8 students conducting housing policy interviews',
      'Mithun Architecture (Seattle) — 5 students (continued site visit)',
    ],
    note: '95 students in peer collaboration — nearly a quarter of the school. Content experts are running 12 concurrent targeted sessions; the system architect shifted 2 groups based on yesterday\'s assessment data showing unexpected vocabulary gaps in 10th grade biology. 6 facilitators now active across project studios and discussion circles. 18 students at field sites with 4 partner orgs.',
  },
  {
    time: '11:00 am',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [60,    68,      45,     72,    18,     50,     35,   52],
    adults: { guides: 3, contentExperts: 6, facilitators: 6, flex: 4, architects: 2, ops: 3 },
    spaces: { classrooms: 9, large: 2, collab: 6, labs: 3 },
    partners: [
      'Fred Hutchinson Cancer Research Center (Seattle) — 6 students in lab internship',
      'Redwood City Public Library — 5 students co-facilitating a youth book club',
      'Bay Area Community Health (El Cerrito) — 3 students (continued)',
      'AC Transit (El Cerrito) — 4 students analyzing ridership data for a civic design project',
      'Pacific Science Center (Seattle) — 7 students assisting with exhibit prototyping',
      'East Bay Housing Alliance — 8 students (continued interviews)',
      'Local restaurant group (Redwood City) — 2 students in weekly operations shadowing',
    ],
    note: 'Off-site experiences peak: 22 students in career-connected learning and 13 at internship/shadowing placements across 7 partner sites. 68 students in project studios using all 3 labs and both large spaces — teams are building tangible artifacts. 6 content experts run smaller, more targeted groups after the morning data was processed. 3 guides hold drop-in reflection sessions in collab rooms for students transitioning between experiences.',
  },
  {
    time: '12:00 pm',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [5,     5,       5,      10,    0,      15,     0,    360],
    adults: { guides: 6, contentExperts: 2, facilitators: 2, flex: 2, architects: 2, ops: 4 },
    spaces: { classrooms: 6, large: 2, collab: 2, labs: 0 },
    partners: [],
    note: 'Midday community time. Guides lead lunch circles — a chance for students and adults to reconnect. System architects use this window to review the morning\'s data and adjust afternoon placements. A few students continue independent work or wrap up dual enrollment assignments. Ops coordinates afternoon field site transportation.',
  },
  {
    time: '1:00 pm',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [50,    55,      25,     80,    20,     40,     55,   75],
    adults: { guides: 3, contentExperts: 5, facilitators: 6, flex: 4, architects: 2, ops: 4 },
    spaces: { classrooms: 8, large: 2, collab: 6, labs: 3 },
    partners: [
      'Fred Hutch (Seattle) — 6 students (afternoon session)',
      'Pacific Science Center (Seattle) — 7 students (continued)',
      'Habitat for Humanity (Redwood City) — 10 students on a build site',
      'Contra Costa Legal Services (El Cerrito) — 4 students observing proceedings',
      'Genentech (Redwood City) — 5 students touring labs',
      'City of Redwood City Office of Sustainability — 8 students presenting a water quality report',
      'LifeLong Medical Care (El Cerrito) — 5 students (afternoon shift)',
      'AC Transit (El Cerrito) — 4 students (continued)',
      'Seattle Art Museum — 6 students documenting an exhibit for a media project',
    ],
    note: '85 students in project studios — the afternoon peak. 35 in career-connected learning and 20 at internship/shadowing placements across 9 sites. This is the most distributed moment of the day: students are at hospitals, government offices, construction sites, museums, and labs. 5 content experts run targeted afternoon sessions for students whose morning data showed they need reinforcement before tomorrow. 4 ops staff coordinate transportation and partner logistics.',
  },
  {
    time: '2:00 pm',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [35,    35,      15,     50,    15,     93,     70,   87],
    adults: { guides: 4, contentExperts: 3, facilitators: 5, flex: 3, architects: 2, ops: 4 },
    spaces: { classrooms: 6, large: 1, collab: 6, labs: 2 },
    partners: [
      'Multiple field sites (9 orgs) — 70 students across the city',
    ],
    note: '45 students in career-connected learning and 25 at internship/shadowing placements — 70 students off-site, more than any single classroom holds. 93 in reflection and planning: guides are running end-of-day pathway conversations in collab rooms and classrooms, helping students process what happened today and connect it to their broader goals. System architects are already building tomorrow\'s schedule based on today\'s data. The building is quieter — much of the school is out in the community.',
  },
  {
    time: '3:00 pm',
    //        Direct Practice Discuss Indep  Present Reflect Real  Wellbeing
    students: [0,     5,       0,      10,    0,      55,     5,    325],
    adults: { guides: 6, contentExperts: 0, facilitators: 2, flex: 0, architects: 2, ops: 4 },
    spaces: { classrooms: 6, large: 2, collab: 2, labs: 0 },
    partners: [],
    note: 'Closing community circles. Guides check in with each student one more time. Field students return and debrief. System architects finalize tomorrow\'s first draft: which students need to be grouped differently, which content experts should shift focus, which spaces to reconfigure. The schedule gets more precise every cycle.',
  },
]

const tabs = ['students', 'adults', 'spaces', 'partners']
const tabLabels = { students: 'Students', adults: 'Educators', spaces: 'Spaces', partners: 'Partners' }

function StudentBreakdown({ data }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {data.map((count, i) =>
        count > 0 ? (
          <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5">
            <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: experienceTypes[i].color }} />
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight">{count}</p>
              <p className="text-white/40 text-[10px] leading-tight truncate">{experienceTypes[i].name}</p>
            </div>
          </div>
        ) : null
      )}
    </div>
  )
}

function AdultBreakdown({ adults }) {
  const eduTotal = adults.guides + adults.contentExperts + adults.facilitators + adults.flex
  const rows = [
    { label: 'Guides', count: adults.guides, max: 6, color: '#f6aa40', desc: 'community circles, reflection, pathway conversations' },
    { label: 'Content Experts', count: adults.contentExperts, max: 8, color: '#4b4b96', desc: 'small-group expert instruction, targeted skills' },
    { label: 'Facilitators', count: adults.facilitators, max: 6, color: '#508278', desc: 'project studios, discussion circles, field coordination' },
    { label: 'Flex educators', count: adults.flex, max: 4, color: '#96d2dc', desc: 'independent practice support, peer tutoring, dual enrollment' },
    { label: 'System architects', count: adults.architects, max: 2, color: '#96a0ab', desc: 'schedule optimization, data review, partner coordination' },
    { label: 'Admin/ops', count: adults.ops, max: 4, color: '#ffd2b4', desc: 'transportation, logistics, facilities, partner communication' },
  ]
  return (
    <div>
      {/* Summary header */}
      <div className="flex items-baseline gap-4 mb-4 pb-3 border-b border-white/10">
        <div>
          <span className="text-3xl font-bold text-white">{eduTotal}</span>
          <span className="text-white/40 text-sm ml-1">of 24 educators</span>
        </div>
        <div>
          <span className="text-xl font-bold text-white/70">{adults.architects}</span>
          <span className="text-white/30 text-sm ml-1">architects</span>
        </div>
        <div>
          <span className="text-xl font-bold text-white/70">{adults.ops}</span>
          <span className="text-white/30 text-sm ml-1">ops</span>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                <span className="text-white/80 text-sm font-bold">{r.label}</span>
              </div>
              <span className="text-white font-bold text-lg">{r.count}<span className="text-white/25 text-xs font-normal ml-1">/{r.max}</span></span>
            </div>
            {/* Horizontal bar */}
            <div className="h-2.5 bg-white/8 rounded-full overflow-hidden mb-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(r.count / r.max) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: r.color, opacity: 0.8 }}
              />
            </div>
            <p className="text-white/25 text-[11px]">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SpaceBreakdown({ spaces }) {
  const total = spaces.classrooms + spaces.large + spaces.collab + spaces.labs
  const pct = Math.round((total / 23) * 100)
  const rows = [
    { label: 'Classrooms', count: spaces.classrooms, of: 12, color: '#4b4b96', icon: '▪', desc: 'small-group instruction, independent work, dual enrollment' },
    { label: 'Large spaces', count: spaces.large, of: 2, color: '#f6aa40', icon: '▪', desc: 'peer collaboration, community circles, presentations' },
    { label: 'Collaboration rooms', count: spaces.collab, of: 6, color: '#508278', icon: '▪', desc: 'discussion circles, reflection, peer tutoring' },
    { label: 'Lab spaces', count: spaces.labs, of: 3, color: '#96d2dc', icon: '▪', desc: 'project studios, hands-on experiments, maker work' },
  ]
  return (
    <div>
      {/* Summary header */}
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-white/10">
        <span className="text-3xl font-bold text-white">{total}</span>
        <span className="text-white/40 text-sm">of 23 spaces active</span>
        <span className="text-orange font-bold text-sm ml-auto">{pct}% utilization</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {rows.map((r) => {
          const utilPct = (r.count / r.of) * 100
          return (
            <div key={r.label} className="bg-white/5 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm font-bold">{r.label}</span>
              </div>
              {/* Visual: filled/empty dots representing each space */}
              <div className="flex gap-1 mb-2">
                {Array.from({ length: r.of }).map((_, j) => (
                  <div
                    key={j}
                    className="h-4 flex-1 rounded-sm transition-all"
                    style={{
                      backgroundColor: j < r.count ? r.color : 'rgba(255,255,255,0.06)',
                      opacity: j < r.count ? 0.8 : 1,
                    }}
                  />
                ))}
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-white/25 text-[11px]">{r.desc}</p>
              </div>
              <p className="text-white font-bold text-lg mt-1">
                {r.count}<span className="text-white/25 text-xs font-normal">/{r.of}</span>
                {utilPct === 100 && <span className="text-orange text-[10px] font-bold ml-2">Full</span>}
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
    return <p className="text-white/30 text-sm italic">No field partners active at this time.</p>
  }
  return (
    <div className="space-y-1.5">
      {partners.map((p, i) => (
        <div key={i} className="flex gap-2 bg-white/5 rounded-lg px-3 py-2">
          <span className="text-teal text-sm mt-0.5">●</span>
          <p className="text-white/60 text-sm leading-relaxed">{p}</p>
        </div>
      ))}
    </div>
  )
}

function StackedBar({ data, isActive, onClick }) {
  return (
    <div className="flex flex-col-reverse h-full w-full cursor-pointer" onClick={onClick}>
      {data.map((value, i) => {
        const pct = (value / 400) * 100
        if (pct < 1) return null
        return (
          <motion.div
            key={i}
            animate={{ height: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ backgroundColor: experienceTypes[i].color }}
            className={`w-full first:rounded-b-sm last:rounded-t-sm transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}
          />
        )
      })}
    </div>
  )
}

export default function WholeSchool() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIdx, setActiveIdx] = useState(1) // 9am
  const [activeTab, setActiveTab] = useState('students')

  const slot = timeSlots[activeIdx]

  return (
    <section className="py-20 md:py-28 px-6 bg-brown text-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-orange font-bold text-sm tracking-wide mb-3">Multiply by 400</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The whole school in motion
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm">
            400 students. 24 educators. 23 spaces. A network of community partners.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
          {experienceTypes.map((type) => (
            <span key={type.name} className="flex items-center gap-1.5 text-[11px] text-white/60">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: type.color }} />
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
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeIdx === i
                  ? 'bg-orange text-brown'
                  : 'bg-white/10 text-white/50 hover:bg-white/20'
              }`}
            >
              {s.time.replace(':00 ', ' ').replace(' am', 'a').replace(' pm', 'p')}
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
                    isActive={activeIdx === i}
                    onClick={() => setActiveIdx(i)}
                  />
                </div>
                <p className={`text-[9px] md:text-[11px] mt-2 whitespace-nowrap transition-colors ${
                  activeIdx === i ? 'text-orange font-bold' : 'text-white/25'
                }`}>
                  {s.time.replace(':00 ', ' ').replace(' am', 'a').replace(' pm', 'p')}
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
            className="mt-6 bg-white/6 backdrop-blur-sm rounded-xl overflow-hidden"
          >
            {/* Panel header + tabs */}
            <div className="px-5 pt-4 pb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-orange font-bold text-lg">{slot.time}</span>
                <span className="text-white/25 text-sm">400 students · 30 staff · 23 spaces</span>
              </div>
              <div className="flex gap-1">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      activeTab === t
                        ? 'bg-white/15 text-white'
                        : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    {tabLabels[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="p-5">
              {activeTab === 'students' && <StudentBreakdown data={slot.students} />}
              {activeTab === 'adults' && <AdultBreakdown adults={slot.adults} />}
              {activeTab === 'spaces' && <SpaceBreakdown spaces={slot.spaces} />}
              {activeTab === 'partners' && <PartnerBreakdown partners={slot.partners} />}
            </div>

            {/* Tab hint */}
            {activeTab === 'students' && (
              <div className="px-5 pb-5">
                <p className="text-white/30 text-sm leading-relaxed border-t border-white/8 pt-3">
                  Switch tabs to see how educators are deployed, which spaces are in use, and which community partners are active at this time.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/50 mt-10 max-w-2xl mx-auto leading-relaxed text-sm font-medium"
        >
          Ten years ago, this required school and system leaders doing heroic manual work to
          produce even a slightly flexible schedule. Now the system handles the matching, and humans
          do what humans do best: guide young people on their journey through expertise and connection.
        </motion.p>
      </div>
    </section>
  )
}
