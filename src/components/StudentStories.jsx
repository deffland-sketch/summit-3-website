import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { StudentAvatar } from './SummitCharacters'
import { Chevron } from './Chevron'

/*
 * Three composite students in the same class, shown at three moments:
 *   traditional — the one schedule all three would likely share
 *   ninth       — spring of 9th grade at Summit: days still closely aligned
 *   eleventh    — 11th grade at Summit: days built around divergent pathways
 *
 * The comparison is the point. The color strip on each card stays visible when
 * collapsed, so switching views shows the schedules converge and pull apart.
 */

const stages = [
  {
    key: 'traditional',
    label: 'Traditional schedule',
    caption:
      'The same six periods in the same order for all three students. Across four years, what changes is mostly the course names.',
  },
  {
    key: 'ninth',
    label: 'Spring of 9th grade',
    caption:
      'At Summit, their days still look a lot alike. All three start in community with their mentor, build core skills in small groups, and sample a wide range of fields through Expeditions. The differences are small, and they matter: each student is starting to notice what they care about.',
  },
  {
    key: 'eleventh',
    label: '11th grade',
    caption:
      'Two years later, their days have pulled apart. Each schedule is built around what the student cares about and needs next, and the mentor who has known them since 9th grade is still at the center.',
  },
]

// One bell schedule, shared by all three students.
const traditionalDay = [
  { time: '8:00', title: 'Period 1: English', description: 'Whole-class lesson with about 30 students.', type: 'traditional' },
  { time: '8:55', title: 'Period 2: Math', description: 'Whole-class lesson, same textbook chapter for everyone.', type: 'traditional' },
  { time: '9:50', title: 'Period 3: Science', description: 'Whole-class lesson and lab.', type: 'traditional' },
  { time: '10:45', title: 'Period 4: History', description: 'Whole-class lesson.', type: 'traditional' },
  { time: '11:40', title: 'Lunch', description: 'Thirty-five minutes.', type: 'traditional' },
  { time: '12:20', title: 'Period 5: World language', description: 'Whole-class lesson.', type: 'traditional' },
  { time: '1:15', title: 'Period 6: Elective', description: 'Assigned from what fits the master schedule.', type: 'traditional' },
]

const students = [
  {
    name: 'Marco',
    preset: 2,
    about: {
      traditional: 'Loves being outside. Has dyslexia.',
      ninth: 'Loves being outside. Has dyslexia, and reading is where he works hardest.',
      eleventh: 'His pathway is organized around environmental science, a direction that can grow or shift as he does.',
    },
    days: {
      ninth: [
        {
          time: '8:00',
          title: 'Wellbeing and community: Morning circle with his mentor',
          description: 'Same mentor and same group of peers he started the year with. Marco shares the creek cleanup he did over the weekend.',
          type: 'community',
        },
        {
          time: '9:00',
          title: 'Direct instruction: Math small group',
          description: 'Linear functions with a math content expert and five classmates working at the same level.',
          type: 'academic',
        },
        {
          time: '10:00',
          title: 'Discussion and dialogue: Humanities seminar',
          description: 'A seminar on a shared text. Amara and David are in the room too.',
          type: 'academic',
        },
        {
          time: '11:00',
          title: 'Independent work and creation: AI-supported reading practice',
          description: 'Texts pitched at his reading edge, with a tutor that reads alongside him.',
          annotation: 'This is the block where Marco\'s day differs most from his classmates\' this year.',
          type: 'independent',
        },
        {
          time: '1:00',
          title: 'Real-world experience: Expedition, expose stage',
          description: 'A week with a regional parks district. Amara is at a local newsroom and David is at a community hospital.',
          type: 'realworld',
        },
        {
          time: '2:00',
          title: 'Reflection and goal-setting: Mentor check-in',
          description: 'What did he notice this week? His mentor writes one thing down: he lit up talking about water quality.',
          type: 'community',
        },
      ],
      eleventh: [
        {
          time: '8:00',
          title: 'Wellbeing and community: Morning circle with his mentor',
          description: 'The mentor who has known him since 9th grade connects him to a watershed researcher whose work matches his interests.',
          annotation: 'The water quality note from 9th grade became a direction. His mentor was there for both.',
          type: 'community',
        },
        {
          time: '9:00',
          title: 'Direct instruction: Small-group lesson with a science content expert',
          description: 'Four students working on the scientific vocabulary they need for the lab analysis coming up next block.',
          type: 'academic',
        },
        {
          time: '10:00',
          title: 'Practice and feedback: Collaborative lab analysis',
          description: 'Analyzing water quality data sets with two classmates, with real-time feedback from the content expert.',
          type: 'academic',
        },
        {
          time: '11:00',
          title: 'Independent work and creation: AI-supported reading practice',
          description: 'An AI tutor walks him through a complex EPA report at his reading edge, chosen because it connects to his field work.',
          type: 'independent',
        },
        {
          time: '12:00',
          title: 'Reflection and goal-setting: Midday check-in',
          description: 'Marco reviews his morning with his mentor and decides what he\'ll bring to this afternoon\'s field work.',
          type: 'community',
        },
        {
          time: '1:00',
          title: 'Real-world experience: Expedition, pursue stage',
          description: 'Collecting water samples and logging real data with a local watershed organization, three blocks from school.',
          aside: 'This is the part of Marco\'s week he talks about most. Real science in the field is what pulls him through the harder academic work.',
          type: 'realworld',
        },
      ],
    },
  },
  {
    name: 'Amara',
    preset: 3,
    about: {
      traditional: 'Quiet. A strong writer who doesn\'t know it yet.',
      ninth: 'Quiet, and not sure what she wants. A strong writer who doesn\'t know it yet.',
      eleventh: 'Her pathway is organized around writing and housing policy, a direction she found through her Expeditions.',
    },
    days: {
      ninth: [
        {
          time: '8:00',
          title: 'Wellbeing and community: Morning circle with her mentor',
          description: 'She mostly listens. Her mentor notices and gives it time. Trust with a quiet student is built over months.',
          type: 'community',
        },
        {
          time: '9:00',
          title: 'Direct instruction: Math small group',
          description: 'Linear functions with the same content expert as Marco, in a different group of five.',
          type: 'academic',
        },
        {
          time: '10:00',
          title: 'Discussion and dialogue: Humanities seminar',
          description: 'Same seminar as Marco and David. She says little out loud, and her written response is the sharpest in the room.',
          type: 'academic',
        },
        {
          time: '11:00',
          title: 'Independent work and creation: Writing studio',
          description: 'Drafting a personal narrative, with AI feedback on structure between drafts.',
          type: 'independent',
        },
        {
          time: '1:00',
          title: 'Real-world experience: Expedition, expose stage',
          description: 'A week with a local newsroom. She is surprised by how much she likes interviewing people.',
          type: 'realworld',
        },
        {
          time: '2:00',
          title: 'Reflection and goal-setting: One-on-one with her mentor',
          description: 'Her mentor asks about the newsroom. It is the most Amara has said all month.',
          aside: 'This is how a quiet student starts to find a direction: a mentor who has earned her trust, asking the right question right after she has tried something real.',
          type: 'community',
        },
      ],
      eleventh: [
        {
          time: '8:00',
          title: 'Wellbeing and community: Morning circle with her mentor',
          description: 'She co-leads the circle now. Her mentor links last week\'s documentary screening to her growing interest in housing policy.',
          type: 'community',
        },
        {
          time: '9:00',
          title: 'Discussion and dialogue: Seminar on long-form journalism',
          description: 'Eight students discuss a housing investigation published in a national magazine, working through complex text and competing perspectives.',
          type: 'academic',
        },
        {
          time: '10:00',
          title: 'Independent work and creation: Documentary project studio',
          description: 'Week 3 of 5 on her mini-documentary about local housing. A facilitator pushes on her framing, and she revises her central argument.',
          type: 'independent',
        },
        {
          time: '11:30',
          title: 'Direct instruction: Algebra II with a math content expert',
          description: 'Modeling with functions in a group of six, using real local housing data for the practice problems.',
          type: 'academic',
        },
        {
          time: '1:00',
          title: 'Real-world experience: Expedition, explore stage',
          description: 'Interviewing tenants and a city planner for her documentary, alongside a housing nonprofit\'s communications team.',
          type: 'realworld',
        },
        {
          time: '2:30',
          title: 'Reflection and goal-setting: One-on-one with her mentor',
          description: 'They look at how writing, policy, and documentary work keep coming together, and what that could mean after high school.',
          aside: 'Two years ago she barely spoke in circle. Now she can explain her pathway, and why it is hers.',
          type: 'community',
        },
      ],
    },
  },
  {
    name: 'David',
    preset: 5,
    about: {
      traditional: 'Interested in health care. His family counts on him to work later in high school.',
      ninth: 'Interested in health care. His family counts on him to work later in high school.',
      eleventh: 'His pathway is organized around nursing, a direction that can grow or shift as he does. Earns while he learns.',
    },
    days: {
      ninth: [
        {
          time: '8:00',
          title: 'Wellbeing and community: Morning circle with his mentor',
          description: 'Checks in with his mentor and group on the week ahead.',
          type: 'community',
        },
        {
          time: '9:00',
          title: 'Direct instruction: Math small group',
          description: 'One level ahead of Marco and Amara, moving at his own pace with a content expert.',
          type: 'academic',
        },
        {
          time: '10:00',
          title: 'Discussion and dialogue: Humanities seminar',
          description: 'Same seminar as Marco and Amara.',
          type: 'academic',
        },
        {
          time: '11:00',
          title: 'Practice and feedback: Adaptive biology practice',
          description: 'Cell biology practice with feedback on every problem.',
          type: 'academic',
        },
        {
          time: '1:00',
          title: 'Real-world experience: Expedition, expose stage',
          description: 'Shadowing at a community hospital. He came in thinking "doctor" and leaves curious about nursing.',
          type: 'realworld',
        },
        {
          time: '2:00',
          title: 'Reflection and goal-setting: Mentor check-in',
          description: 'His mentor helps him map when he could earn a first health care certification, since he will need to work.',
          type: 'community',
        },
      ],
      eleventh: [
        {
          time: '8:00',
          title: 'Independent work and creation: Dual enrollment anatomy course',
          description: 'Anatomy and physiology through the community college, asynchronous with mentor support. Three weeks ahead of pace.',
          type: 'independent',
        },
        {
          time: '9:30',
          title: 'Direct instruction: Statistics with a math content expert',
          description: 'Learning statistical reasoning with real hospital data sets.',
          type: 'academic',
        },
        {
          time: '10:30',
          title: 'Reflection and goal-setting: Pathway milestone review',
          description: 'With the mentor who has coached him since 9th grade: CNA certification on track, clinical program application due next month.',
          type: 'community',
        },
        {
          time: '11:30',
          title: 'Presentation and performance: Peer teaching session',
          description: 'Leads a biology review for two 9th graders. He showed mastery last year, and teaching deepens his own understanding.',
          type: 'community',
        },
        {
          time: '12:30',
          title: 'Practice and feedback: Adaptive vocabulary practice',
          description: 'Academic and medical vocabulary, pitched to where he is.',
          type: 'academic',
        },
        {
          time: '1:30',
          title: 'Real-world experience: Expedition, pursue stage',
          description: 'CNA clinical hours at a community clinic, where he is also starting paid shifts.',
          aside: 'The hospital shadow in 9th grade gave him the direction. The schedule makes room for him to earn while he learns.',
          type: 'realworld',
        },
      ],
    },
  },
]

const typeColors = {
  academic: { bg: 'bg-indigo', text: 'text-indigo' },
  realworld: { bg: 'bg-teal', text: 'text-teal-ink' },
  community: { bg: 'bg-orange', text: 'text-orange-ink' },
  independent: { bg: 'bg-light-blue', text: 'text-light-blue-ink' },
  traditional: { bg: 'bg-tan-grey', text: 'text-tan-grey-ink' },
}

const legend = [
  { type: 'academic', label: 'Academic' },
  { type: 'independent', label: 'Independent' },
  { type: 'community', label: 'Mentoring and community' },
  { type: 'realworld', label: 'Real-world' },
  { type: 'traditional', label: 'Bell-schedule period' },
]

function StudentCard({ student, stage, isOpen, onToggle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const blocks = stage === 'traditional' ? traditionalDay : student.days[stage]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-black/8 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 md:p-6 hover:bg-black/[0.015] transition-colors"
        aria-expanded={isOpen}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <StudentAvatar preset={student.preset} size={40} />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-black leading-tight">{student.name}</h3>
            <p className="text-xs text-black/55">{student.about[stage]}</p>
          </div>
          <Chevron open={isOpen} className="text-indigo/60" />
        </div>

        {/* Color bar timeline, always visible so the views can be compared at a glance */}
        <div className="flex gap-0.5" aria-hidden="true">
          {blocks.map((block, i) => (
            <div key={i} className={`${typeColors[block.type].bg} rounded-sm h-2 flex-1 opacity-70`} />
          ))}
        </div>

        {!isOpen && (
          <p className="text-xs text-indigo font-bold mt-3">View {student.name}'s day →</p>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1">
              <div className="border-t border-black/8 pt-4 space-y-2">
                {blocks.map((block, i) => {
                  const tc = typeColors[block.type]
                  const [label, ...rest] = block.title.split(':')
                  return (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-black/45 font-bold w-11 shrink-0 text-right tabular-nums">{block.time}</span>
                      <div className={`w-1.5 shrink-0 rounded-full ${tc.bg} opacity-60`} />
                      <div className="min-w-0">
                        {rest.length ? (
                          <>
                            <span className={`font-bold ${tc.text}`}>{label}:</span>
                            <span className="font-bold text-black">{rest.join(':')}</span>
                          </>
                        ) : (
                          <span className="font-bold text-black">{block.title}</span>
                        )}
                        <span className="text-black/60">. {block.description}</span>
                        {block.annotation && (
                          <span className="block mt-1 italic text-black/50 text-xs">{block.annotation}</span>
                        )}
                        {block.aside && (
                          <span className={`block mt-1 italic ${tc.text} text-xs`}>{block.aside}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function StudentStories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [stage, setStage] = useState('traditional')
  const [openIdxs, setOpenIdxs] = useState(new Set())
  const toggle = (i) => {
    const next = new Set(openIdxs)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setOpenIdxs(next)
  }

  const stageKeys = stages.map((s) => s.key)
  const onTabKeyDown = (e, key) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = stageKeys[(stageKeys.indexOf(key) + dir + stageKeys.length) % stageKeys.length]
    setStage(next)
    document.getElementById(`stage-tab-${next}`)?.focus()
  }
  const current = stages.find((s) => s.key === stage)

  return (
    <section
      className="py-20 md:py-28 px-6 bg-peach/15"
      ref={ref}
      id="student-day"
      aria-labelledby="student-day-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-teal-ink font-bold text-sm tracking-wide mb-3">Meet three students</p>
          <h2 id="student-day-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            Same class, three pathways
          </h2>
          <p className="text-lg text-black/70 max-w-2xl">
            Marco, Amara, and David start 9th grade together. In a traditional high school, they
            would likely follow nearly the same schedule for four years. At Summit, their days start
            close together and pull apart as each of them figures out what they care about.
          </p>
          <p className="text-xs text-black/50 mt-3">Marco, Amara, and David are composites drawn from Summit students.</p>
        </motion.div>

        {/* View switcher: WAI-ARIA tabs pattern, matching WholeSchool */}
        <div
          className="inline-flex flex-wrap gap-1 bg-white rounded-lg p-1 border border-black/8 mb-4"
          role="tablist"
          aria-label="Schedule view"
        >
          {stages.map((s) => (
            <button
              key={s.key}
              role="tab"
              id={`stage-tab-${s.key}`}
              aria-selected={stage === s.key}
              aria-controls="stage-tabpanel"
              tabIndex={stage === s.key ? 0 : -1}
              onClick={() => setStage(s.key)}
              onKeyDown={(e) => onTabKeyDown(e, s.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${
                stage === s.key ? 'bg-indigo text-white' : 'text-indigo hover:bg-indigo/5'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="stage-tabpanel"
          aria-labelledby={`stage-tab-${stage}`}
          tabIndex={-1}
        >
          <p className="text-sm text-black/70 leading-relaxed max-w-3xl mb-4 min-h-[3rem]">{current.caption}</p>

          <ul className="flex flex-wrap gap-x-4 gap-y-1 mb-5" aria-label="Legend">
            {legend
              .filter((l) => (stage === 'traditional') === (l.type === 'traditional'))
              .map((l) => (
                <li key={l.type} className="flex items-center gap-1.5 text-xs text-black/60">
                  <span className={`w-3 h-2 rounded-sm ${typeColors[l.type].bg} opacity-70`} aria-hidden="true" />
                  {l.label}
                </li>
              ))}
          </ul>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {students.map((student, i) => (
              <StudentCard
                key={student.name}
                student={student}
                stage={stage}
                isOpen={openIdxs.has(i)}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-xl border-l-4 border-orange p-5"
        >
          <p className="text-black/70 text-sm leading-relaxed mb-3">
            Every Summit schedule here was built around where each student is, what they need next,
            and who's available. When the data shows progress or a new need, the schedule adjusts.
          </p>
          <p className="text-black/70 text-sm leading-relaxed">
            <span className="font-bold text-indigo">What stays constant:</span> the same long-term
            mentor who knows each student, a consistent community, and a daily rhythm students can
            count on. The flexibility is in what students learn and when. The support around them
            holds steady.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
