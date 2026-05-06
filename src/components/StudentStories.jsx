import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { StudentAvatar } from './SummitCharacters'

const students = [
  {
    name: 'Marco',
    preset: 2,
    subtitle: 'Junior. Environmental biotech pathway. Has dyslexia.',
    blocks: [
      {
        time: '8:00',
        title: 'Wellbeing and community: Morning community circle',
        description: 'Guide reviews Summit\'s PLP (personalized learning plan) milestones, connects Marco to a biotech researcher whose profile matches his environmental interests.',
        annotation: 'Morning starts with connection because Marco\'s pathway depends on the relationships that surface his interests.',
        type: 'community',
      },
      {
        time: '9:00',
        title: 'Direct instruction: Small-group lesson with a science content expert',
        description: 'Four students working on targeted scientific vocabulary — terms they need for the lab analysis coming up next block.',
        annotation: null,
        type: 'academic',
      },
      {
        time: '10:00',
        title: 'Practice and feedback: Collaborative lab analysis',
        description: 'Applies the vocabulary from the morning session with two classmates, analyzing water quality data sets and getting real-time feedback from the content expert.',
        annotation: null,
        type: 'academic',
      },
      {
        time: '11:00',
        title: 'Independent work and creation: AI-supported reading practice',
        description: 'AI tutor guides him through a complex EPA report at his reading edge. Content selected because it connects directly to his environmental biotech pathway.',
        annotation: null,
        type: 'independent',
      },
      {
        time: '12:00',
        title: 'Reflection and goal-setting: Midday check-in',
        description: 'Marco reviews his morning with his guide using the PLP. They tag what\'s working, what\'s not, and what he\'ll bring to this afternoon\'s field work.',
        annotation: null,
        type: 'community',
      },
      {
        time: '1:00',
        title: 'Real-world experience: Field work with an environmental nonprofit',
        description: 'Collecting water samples and logging real data with a local watershed organization, three blocks from school. Real science, real stakes.',
        aside: 'This is the part of Marco\'s week he talks about most. The connection between his pathway and real science in the field is what pulls him through the harder academic work.',
        type: 'realworld',
      },
    ],
  },
  {
    name: 'Amara',
    preset: 3,
    subtitle: 'Sophomore. Strong writer, exploring interests, undecided direction.',
    blocks: [
      {
        time: '8:00',
        title: 'Wellbeing and community: Morning community circle',
        description: 'Guide connects last week\'s documentary screening to an emerging interest in housing policy, updating her PLP to reflect the pattern.',
        annotation: null,
        type: 'community',
      },
      {
        time: '9:00',
        title: 'Discussion and dialogue: Seminar on long-form journalism',
        description: 'Eight students discuss a housing policy investigation published in a national magazine. Deep engagement with complex text and competing perspectives.',
        annotation: null,
        type: 'academic',
      },
      {
        time: '10:00',
        title: 'Independent work and creation: Documentary project studio',
        description: 'Week 3 of 5 on her mini-documentary about local housing. Facilitator pushes back on her framing — she revises her central argument.',
        annotation: 'Sustained creation time is how Amara\'s developing voice sharpens into argument.',
        type: 'independent',
      },
      {
        time: '11:30',
        title: 'Direct instruction: Algebra with a math content expert',
        description: 'Modeling with linear functions. Six students, instruction targeted to where each one is. Real housing data used as the context for practice problems.',
        annotation: null,
        type: 'academic',
      },
      {
        time: '1:00',
        title: 'Reflection and goal-setting: One-on-one guide check-in',
        description: 'Guide helps her see three converging interests — writing, policy, documentary — forming a pattern that could shape her pathway.',
        aside: 'This is the conversation that changed Amara\'s relationship to school — the moment she saw her interests forming a pattern and realized the pathway was hers.',
        type: 'community',
      },
      {
        time: '2:00',
        title: 'Practice and feedback: Writing conference with AI feedback tools',
        description: 'AI writing feedback on her documentary script. Revises the introduction three times, each draft sharper than the last.',
        annotation: null,
        type: 'academic',
      },
    ],
  },
  {
    name: 'David',
    preset: 5,
    subtitle: 'Senior. Nursing pathway. Works afternoons.',
    blocks: [
      {
        time: '8:00',
        title: 'Independent work and creation: Dual enrollment anatomy course',
        description: 'Anatomy & physiology through the community college, asynchronous with guide support. Three weeks ahead of pace.',
        aside: null,
        type: 'independent',
      },
      {
        time: '9:30',
        title: 'Direct instruction: Statistics with a math content expert',
        description: 'Clinical data interpretation connected to his nursing pathway. Using real hospital data sets to learn statistical reasoning.',
        annotation: null,
        type: 'academic',
      },
      {
        time: '10:30',
        title: 'Reflection and goal-setting: Pathway milestone review',
        description: 'Guide checks PLP milestones. CNA certification on track. Clinical rotation application due next month — they map out next steps together.',
        annotation: null,
        type: 'community',
      },
      {
        time: '11:30',
        title: 'Presentation and performance: Peer teaching session',
        description: 'Leads a biology review for two juniors. Data-matched — David demonstrated mastery last semester and teaching deepens his own understanding.',
        annotation: 'Teaching biology to juniors builds on the mastery he\'s already demonstrated. The data showed he was ready for this role.',
        type: 'community',
      },
      {
        time: '12:30',
        title: 'Practice and feedback: Adaptive vocabulary practice',
        description: 'Adaptive academic and medical vocabulary work. Wraps his school day before his afternoon CNA shift at the clinic.',
        annotation: null,
        type: 'academic',
      },
    ],
  },
]

const typeColors = {
  academic: { bg: 'bg-indigo', label: 'Academic', text: 'text-indigo' },
  realworld: { bg: 'bg-teal', label: 'Real-world', text: 'text-teal' },
  community: { bg: 'bg-orange', label: 'Community', text: 'text-orange' },
  independent: { bg: 'bg-light-blue', label: 'Independent', text: 'text-light-blue' },
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
                {block.title.includes(':') ? (
                  <>
                    <span className={`font-bold ${tc.text}`}>{block.title.split(':')[0]}:</span>
                    <span className="font-bold text-black">{block.title.split(':').slice(1).join(':')}</span>
                  </>
                ) : (
                  <span className="font-bold text-black">{block.title}</span>
                )}
                <span className="text-black/50"> — {block.description}</span>
                {block.annotation && (
                  <span className="block mt-1 italic text-black/35 text-xs">{block.annotation}</span>
                )}
                {block.aside && (
                  <span className={`block mt-1 italic ${tc.text} opacity-50 text-xs`}>{block.aside}</span>
                )}
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
            Three students. Three different pathways. Each schedule built around what they
            bring and where they're headed.
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

        {/* Why students do the work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-12 max-w-3xl mx-auto border-l-4 border-orange pl-6"
        >
          <h3 className="text-lg font-bold text-indigo mb-3">Why students do the work</h3>
          <p className="text-sm text-black/60 leading-relaxed mb-3">
            Every student arrives with something: knowledge they've built, a domain they're drawn to,
            a life they're already imagining, experiences that have shaped what they value. Summit 3.0
            starts there.
          </p>
          <p className="text-sm text-black/60 leading-relaxed mb-3">
            The industrial model ignores those assets. It runs on extrinsic motivation, grades,
            credits, seat-time, consequences, and works only for students who have already found
            reasons to comply. When the starting point is deficit rather than capacity, most students
            eventually disengage.
          </p>
          <p className="text-sm text-black/60 leading-relaxed">
            Summit 3.0 runs on a different motivational theory. When students see how the work
            connects to the future they want or the kind of person they're becoming, and when they
            have real agency in how they do it, motivation comes from inside, not outside. Matching
            the right resource to the right group of students at the right time treats young people
            as participants, not products. That activates engagement no extrinsic system can match.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
