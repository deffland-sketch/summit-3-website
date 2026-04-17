import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { StudentAvatar } from './SummitCharacters'

const students = [
  {
    name: 'Marco',
    preset: 2,
    subtitle: 'Junior. Environmental biotech. Has dyslexia.',
    blocks: [
      { time: '8:15', title: 'Community circle', description: 'Guide reviews his pathway, connects him to a biotech researcher whose profile matches his interests.', type: 'community' },
      { time: '9:00', title: 'Small-group expert instruction', description: 'Four students with an interventionist. Targeted scientific vocabulary — terms they need for the lab analysis next.', type: 'academic' },
      { time: '10:00', title: 'Peer collaboration', description: 'Lab analysis with two classmates, applying the vocabulary from the morning session.', type: 'academic' },
      { time: '11:15', title: 'Independent practice', description: 'AI tutor on a complex EPA report at his reading edge. Content selected because it connects to his pathway.', type: 'independent' },
      { time: '1:00', title: 'Field experience', description: 'Water samples with an environmental nonprofit. Real science, real data, three blocks from school.', type: 'realworld' },
    ],
  },
  {
    name: 'Amara',
    preset: 3,
    subtitle: 'Sophomore. Exploring interests, strong writer, undecided.',
    blocks: [
      { time: '8:15', title: 'Community circle', description: 'Guide connects last week\'s documentary to an emerging interest in housing policy.', type: 'community' },
      { time: '9:00', title: 'Discussion circle', description: 'Long-form journalism on housing policy. Deep engagement with complex text.', type: 'academic' },
      { time: '10:15', title: 'Project studio', description: 'Mini-documentary, week 3 of 5. Facilitator pushes back on her framing.', type: 'realworld' },
      { time: '11:30', title: 'Expert instruction', description: 'Algebra — modeling with linear functions. Six students, targeted to where they are.', type: 'academic' },
      { time: '1:00', title: 'Reflection and planning', description: 'Guide helps her see three converging interests forming a pattern.', type: 'community' },
      { time: '1:45', title: 'Independent practice', description: 'AI writing feedback on her documentary script. Revises the introduction.', type: 'independent' },
    ],
  },
  {
    name: 'David',
    preset: 5,
    subtitle: 'Senior. Nursing pathway. Works afternoons.',
    blocks: [
      { time: '8:00', title: 'Dual enrollment', description: 'Anatomy & physiology, community college, asynchronous with guide support. Three weeks ahead.', type: 'independent' },
      { time: '9:15', title: 'Expert instruction', description: 'Statistics — clinical data interpretation connected to his nursing pathway. Real hospital data sets.', type: 'academic' },
      { time: '10:30', title: 'Community circle', description: 'Guide checks pathway milestones. CNA certification on track. Clinical rotation application due next month.', type: 'community' },
      { time: '11:15', title: 'Peer tutoring', description: 'Leads biology review for two juniors. Data-matched — David demonstrated mastery last semester.', type: 'academic' },
      { time: '12:15', title: 'Independent practice', description: 'Adaptive academic vocabulary. Wraps his school day before his afternoon shift.', type: 'independent' },
    ],
  },
]

const typeColors = {
  academic: { bg: 'bg-indigo', label: 'Academic' },
  realworld: { bg: 'bg-teal', label: 'Real-world' },
  community: { bg: 'bg-orange', label: 'Community' },
  independent: { bg: 'bg-light-blue', label: 'Independent' },
}

function StudentCard({ student, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-black/8 p-5 md:p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <StudentAvatar preset={student.preset} size={40} />
        <div>
          <h3 className="text-lg font-bold text-black leading-tight">{student.name}</h3>
          <p className="text-xs text-black/50">{student.subtitle}</p>
        </div>
      </div>

      {/* Color bar timeline */}
      <div className="flex gap-0.5 mb-4">
        {student.blocks.map((block, i) => (
          <div key={i} className={`${typeColors[block.type].bg} rounded-sm h-2 flex-1 opacity-70`} />
        ))}
      </div>

      {/* Compact block list */}
      <div className="space-y-2">
        {student.blocks.map((block, i) => {
          const tc = typeColors[block.type]
          return (
            <div key={i} className="flex gap-3 text-sm">
              <span className="text-black/30 font-bold w-11 shrink-0 text-right tabular-nums">{block.time}</span>
              <div className={`w-1.5 shrink-0 rounded-full ${tc.bg} opacity-60`} />
              <div className="min-w-0">
                <span className="font-bold text-black">{block.title}</span>
                <span className="text-black/50"> — {block.description}</span>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function StudentStories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-peach/15" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">Meet three students</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            What school feels like
          </h2>
          <p className="text-lg text-black/70 max-w-2xl">
            Three students. Three different pathways. Each schedule built around where they
            are and where they're headed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {students.map((student, i) => (
            <StudentCard key={student.name} student={student} index={i} />
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-xl border border-orange/20 p-5 text-center"
        >
          <p className="text-black/60 text-sm leading-relaxed">
            Every one of these schedules was built based on where each student is on their pathway,
            what they need next, and who's available. When the data shows progress or a new need,
            the schedule adjusts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
