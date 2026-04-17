import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

/*
 * School resource model:
 *   Staff: 24 educational personnel, 2 system architects, 4 admin/ops = 30 total
 *   Educational personnel break into capacities:
 *     6 guides, 8 academic interventionists, 6 facilitators, 4 flexible (shift by need)
 *   Facilities: 12 classrooms, 2 large spaces, 6 small collaboration rooms, 3 lab spaces = 23 spaces
 *   Partners: specific community and industry orgs
 */

const experienceTypes = [
  { name: 'Expert instruction', color: '#4b4b96' },
  { name: 'Peer collaboration', color: '#6b6bc0' },
  { name: 'Independent practice', color: '#96d2dc' },
  { name: 'Discussion circles', color: '#508278' },
  { name: 'Project studio', color: '#60a090' },
  { name: 'Community circle', color: '#f6aa40' },
  { name: 'Field experience', color: '#70b8a0' },
  { name: 'Dual enrollment', color: '#96a0ab' },
  { name: 'Reflection/other', color: '#ffd2b4' },
]

// Each time slot: students, adults deployed, spaces in use, partner activity, operational note
const timeSlots = [
  {
    time: '8:00 am',
    students: [0, 0, 0, 0, 0, 400, 0, 0, 0],
    adults: { guides: 6, interventionists: 0, facilitators: 0, flex: 0, architects: 2, ops: 4 },
    spaces: { classrooms: 6, large: 2, collab: 0, labs: 0 },
    partners: [],
    note: 'All 400 students in community circles with their 6 guides. Each guide leads ~67 students across 3 mentor groups, meeting in classrooms and both large spaces. System architects review overnight data and finalize the day\'s schedule adjustments. Admin/ops team manages arrivals and logistics.',
  },
  {
    time: '9:00 am',
    students: [47, 83, 65, 28, 42, 0, 12, 38, 85],
    adults: { guides: 3, interventionists: 8, facilitators: 5, flex: 4, architects: 2, ops: 2 },
    spaces: { classrooms: 10, large: 2, collab: 6, labs: 3 },
    partners: [
      'Watershed Conservation Alliance — 4 students collecting water samples at Duwamish site',
      'Bay Area Community Health — 3 students shadowing intake coordinators',
      'Local Architecture Firm (Mithun) — 5 students on a site visit for their urban design project',
    ],
    note: '8 interventionists run 10 concurrent small-group sessions across 10 classrooms — each group is 4-6 students with a targeted skill focus. 83 students in peer collaboration fill both large spaces and all 6 collab rooms. 3 facilitators coach project studios in the labs. 3 guides are running reflection sessions. 4 flex educators float between independent practice and peer tutoring support. 12 students are at field sites with 3 partner organizations. 38 students work on dual enrollment courses in 2 classrooms, supervised by 2 flex educators with AI tutor support.',
  },
  {
    time: '10:00 am',
    students: [60, 95, 55, 35, 50, 0, 18, 40, 47],
    adults: { guides: 2, interventionists: 8, facilitators: 6, flex: 4, architects: 2, ops: 2 },
    spaces: { classrooms: 11, large: 2, collab: 6, labs: 3 },
    partners: [
      'Watershed Conservation Alliance — 4 students (continued)',
      'Seattle Children\'s Hospital — 6 students observing clinical data workflows',
      'Urban League of Metropolitan Seattle — 8 students conducting housing policy interviews',
      'Mithun Architecture — 5 students (continued site visit)',
    ],
    note: '95 students in peer collaboration — nearly a quarter of the school. Interventionists are running 12 concurrent targeted sessions; the system architect shifted 2 groups based on yesterday\'s assessment data showing unexpected vocabulary gaps in 10th grade biology. 6 facilitators now active across project studios and discussion circles. 18 students at field sites with 4 partner orgs.',
  },
  {
    time: '11:00 am',
    students: [42, 70, 48, 45, 68, 0, 35, 42, 50],
    adults: { guides: 3, interventionists: 6, facilitators: 6, flex: 4, architects: 2, ops: 3 },
    spaces: { classrooms: 9, large: 2, collab: 6, labs: 3 },
    partners: [
      'Fred Hutchinson Cancer Research Center — 6 students in a lab apprenticeship',
      'Seattle Public Library — 5 students co-facilitating a youth book club',
      'Bay Area Community Health — 3 students (continued)',
      'Sound Transit — 4 students analyzing ridership data for a civic design project',
      'Pacific Science Center — 7 students assisting with exhibit prototyping',
      'Urban League — 8 students (continued interviews)',
      'Local restaurant group (Ethan Stowell) — 2 students job-shadowing operations',
    ],
    note: 'Field experiences peak at 35 students across 7 partner sites. 68 students in project studios using all 3 labs and both large spaces — teams are building tangible artifacts. 6 interventionists run smaller, more targeted groups after the morning data was processed. 3 guides hold drop-in reflection sessions in collab rooms for students transitioning between experiences.',
  },
  {
    time: '12:00 pm',
    students: [5, 10, 10, 5, 10, 340, 5, 5, 10],
    adults: { guides: 6, interventionists: 2, facilitators: 2, flex: 2, architects: 2, ops: 4 },
    spaces: { classrooms: 6, large: 2, collab: 2, labs: 0 },
    partners: [],
    note: 'Midday community time. Guides lead lunch circles — a chance for students and adults to reconnect. System architects use this window to review the morning\'s data and adjust afternoon placements. A few students continue independent work or wrap up dual enrollment assignments. Ops coordinates afternoon field site transportation.',
  },
  {
    time: '1:00 pm',
    students: [30, 65, 50, 25, 85, 0, 55, 50, 40],
    adults: { guides: 3, interventionists: 5, facilitators: 6, flex: 4, architects: 2, ops: 4 },
    spaces: { classrooms: 8, large: 2, collab: 6, labs: 3 },
    partners: [
      'Fred Hutch — 6 students (afternoon session)',
      'Pacific Science Center — 7 students (continued)',
      'Habitat for Humanity — 10 students on a build site',
      'King County Public Defender\'s Office — 4 students observing proceedings',
      'Local biotech startup (Sana Biotechnology) — 5 students touring labs',
      'City of Seattle Office of Sustainability — 8 students presenting a water quality report',
      'Community health clinic — 5 students (afternoon shift)',
      'Sound Transit — 4 students (continued)',
      'Seattle Art Museum — 6 students documenting an exhibit for a media project',
    ],
    note: '85 students in project studios — the afternoon peak. 55 students at 9 field sites across the city. This is the most distributed moment of the day: students are at hospitals, government offices, construction sites, museums, and labs. 5 interventionists run targeted afternoon sessions for students whose morning data showed they need reinforcement before tomorrow. 4 ops staff coordinate transportation and partner logistics.',
  },
  {
    time: '2:00 pm',
    students: [20, 45, 35, 15, 72, 0, 70, 50, 93],
    adults: { guides: 4, interventionists: 3, facilitators: 5, flex: 3, architects: 2, ops: 4 },
    spaces: { classrooms: 6, large: 1, collab: 6, labs: 2 },
    partners: [
      'Multiple field sites (9 orgs) — 70 students across the city',
    ],
    note: '70 students at field sites — more than any single classroom holds. 93 students in reflection and planning: guides are running end-of-day pathway conversations in collab rooms and classrooms, helping students process what happened today and connect it to their broader goals. System architects are already building tomorrow\'s schedule based on today\'s data. The building is quieter — much of the school is out in the community.',
  },
  {
    time: '3:00 pm',
    students: [0, 5, 10, 0, 15, 320, 5, 5, 40],
    adults: { guides: 6, interventionists: 0, facilitators: 2, flex: 0, architects: 2, ops: 4 },
    spaces: { classrooms: 6, large: 2, collab: 2, labs: 0 },
    partners: [],
    note: 'Closing community circles. Guides check in with each student one more time. Field students return and debrief. System architects finalize tomorrow\'s first draft: which students need to be grouped differently, which interventionists should shift focus, which spaces to reconfigure. The schedule gets more precise every cycle.',
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
  const rows = [
    { label: 'Guides', count: adults.guides, color: '#f6aa40', desc: 'community circles, reflection, pathway conversations' },
    { label: 'Interventionists', count: adults.interventionists, color: '#4b4b96', desc: 'small-group expert instruction, targeted skills' },
    { label: 'Facilitators', count: adults.facilitators, color: '#508278', desc: 'project studios, discussion circles, field coordination' },
    { label: 'Flex educators', count: adults.flex, color: '#96d2dc', desc: 'independent practice support, peer tutoring, dual enrollment' },
    { label: 'System architects', count: adults.architects, color: '#96a0ab', desc: 'schedule optimization, data review, partner coordination' },
    { label: 'Admin/ops', count: adults.ops, color: '#ffd2b4', desc: 'transportation, logistics, facilities, partner communication' },
  ]
  return (
    <div className="space-y-1.5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
          <span className="text-white font-bold text-sm w-8 text-right">{r.count}</span>
          <span className="text-white/70 text-sm font-bold">{r.label}</span>
          <span className="text-white/30 text-xs hidden md:inline">— {r.desc}</span>
        </div>
      ))}
      <p className="text-white/30 text-xs pt-1">
        {adults.guides + adults.interventionists + adults.facilitators + adults.flex} of 24 educational staff deployed
        + {adults.architects} system architects + {adults.ops} admin/ops
      </p>
    </div>
  )
}

function SpaceBreakdown({ spaces }) {
  const total = spaces.classrooms + spaces.large + spaces.collab + spaces.labs
  const rows = [
    { label: 'Classrooms', count: spaces.classrooms, of: 12, desc: 'small-group instruction, independent work, dual enrollment' },
    { label: 'Large spaces', count: spaces.large, of: 2, desc: 'peer collaboration, community circles, presentations' },
    { label: 'Collaboration rooms', count: spaces.collab, of: 6, desc: 'discussion circles, reflection, peer tutoring' },
    { label: 'Lab spaces', count: spaces.labs, of: 3, desc: 'project studios, hands-on experiments, maker work' },
  ]
  return (
    <div className="space-y-1.5">
      {rows.map((r) => (
        <div key={r.label} className="bg-white/5 rounded-lg px-3 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/70 text-sm font-bold">{r.label}</span>
            <span className="text-white text-sm font-bold">{r.count} <span className="text-white/30 font-normal">of {r.of}</span></span>
          </div>
          {/* Utilization bar */}
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-orange/70 rounded-full" style={{ width: `${(r.count / r.of) * 100}%` }} />
          </div>
          <p className="text-white/25 text-[10px] mt-0.5">{r.desc}</p>
        </div>
      ))}
      <p className="text-white/30 text-xs pt-1">
        {total} of 23 total spaces active
      </p>
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
            Click any time to see exactly how every resource in the building is deployed.
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

            {/* Operational note */}
            {slot.note && (
              <div className="px-5 pb-5">
                <p className="text-white/45 text-sm leading-relaxed border-t border-white/8 pt-3">
                  {slot.note}
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
          className="text-center text-white/40 mt-10 max-w-2xl mx-auto leading-relaxed text-sm"
        >
          Every morning, the system architects review the data from the previous day — which students
          made progress, which need a different approach, which partner slots are available — and
          adjust the schedule through the platform. The schedule gets more precise every cycle.
        </motion.p>
      </div>
    </section>
  )
}
