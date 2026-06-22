import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const needs = [
  {
    name: 'Competency verification',
    question: 'How do we know students are ready?',
    color: '#508278',
    industrial: 'Standardized assessments, course grades, and seat-time requirements. Aggregate signals that produce a credential everyone recognizes.',
    summit: 'A living learner profile tracking academic foundations, durable skills, and real-world competencies. Evidence of readiness comes from multiple sources (assessments, project artifacts, professional feedback), making the credential precise to the student.',
  },
  {
    name: 'Socialization and belonging',
    question: 'How do young people learn to live together?',
    color: '#f6aa40',
    industrial: 'Age-based cohorts, shared schedules, extracurriculars. Community emerges from proximity, and it works for many students.',
    summit: 'Intentional community circles with a human guide who knows each student deeply. Peer groups built across ages and interests. Belonging is designed into the daily experience for every student, not only the ones for whom proximity is enough.',
  },
  {
    name: 'Physical safety and structure',
    question: 'Where are young people during the day?',
    color: '#4b4b96',
    industrial: 'A building with adults, bells, and defined periods. Students are accounted for at all times. Simple and reliable.',
    summit: 'Students are always within a safe, purposeful structure, but that structure flexes to match what each student needs that day. Architecting the system coordinates spaces, adults, and schedules so students move between experiences safely. Safety without rigidity.',
  },
  {
    name: 'Developmentally appropriate progression',
    question: 'How do we meet students where they are?',
    color: '#96d2dc',
    industrial: 'Grade levels based on age. Everyone moves through the same sequence, which gets the aggregate population through the curriculum.',
    summit: 'A personalized pathway builds on what each student already knows, where they are socially, and what real-world experiences they bring. A 9th grader and a 12th grader in the same opportunity type may be doing very different work.',
  },
  {
    name: 'Meaningful adult employment',
    question: 'How do we make teaching sustainable?',
    color: '#503c2d',
    industrial: 'Stable jobs with clear definitions, generations of educators built their lives around them. The role has also broadened to ask one adult to do nearly everything.',
    summit: 'Four specialized capacities (guiding, providing content expertise, facilitating, and architecting the system) so adults can develop deep expertise and live fulfilling, sustainable lives. AI handles administrative load. The work is more engaging because educators do what they\'re best at.',
  },
]

function AccentBar({ color, inView }) {
  return (
    <motion.div
      className="h-1 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ width: '0%' }}
      animate={inView ? { width: '100%' } : { width: '0%' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  )
}

function NeedCard({ need, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="relative pl-8"
    >
      {/* Dot on the vertical line */}
      <div
        className="absolute left-0 top-6 w-4 h-4 rounded-full border-2 border-white z-10"
        style={{ backgroundColor: need.color }}
      />

      <div className="bg-white rounded-xl overflow-hidden shadow-sm"
        style={{ borderLeft: `4px solid ${need.color}` }}
      >
        {/* Accent bar that fills on scroll */}
        <div className="px-5 pt-4">
          <AccentBar color={need.color} inView={inView} />
        </div>

        <div className="p-5 pt-3">
          {/* Header */}
          <p className="text-xs font-bold tracking-wide mb-1" style={{ color: need.color }}>
            {need.name.toUpperCase()}
          </p>
          <h3 className="text-base md:text-lg font-bold text-black mb-4">{need.question}</h3>

          {/* Two blocks */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-black/50 tracking-wide mb-1.5">THE INDUSTRIAL MODEL</p>
              <p className="text-sm text-black/70 leading-relaxed">{need.industrial}</p>
            </div>
            <div className="rounded-lg p-3 -m-1" style={{ backgroundColor: need.color + '12' }}>
              <p className="text-[10px] font-bold tracking-wide mb-1.5" style={{ color: need.color }}>SUMMIT 3.0</p>
              <p className="text-sm text-black leading-relaxed">{need.summit}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AtScale() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#ebf5f0' }} ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-6">
            How the industrial model succeeded, and why it's time to evolve
          </h2>
          <div className="space-y-4 text-black leading-relaxed max-w-3xl">
            <p>
              The industrial school model is the most successful organizational technology in the
              history of education to date. It scaled the idea of a basic education to millions of
              students, and delivered real gains across whole populations. That is a genuine
              achievement, and Summit 3.0 is designed to build off that scale to do what the
              industrial model never was designed for: reaching every young person and maximizing
              their potential. Like population-level medicine, the industrial model is designed to
              work in the aggregate, and we know this with 100 years of rising literacy and
              graduation rates. But a system optimized for the average can't see each student, and
              a system that can't see each student can't develop each student. The talent was
              always there. The model was simply never built to find it, so an enormous amount of
              human potential goes unrealized.
            </p>
            <p>
              The next breakthrough is precision. In medicine, we now match the right treatment to
              the right patient, at the right time, at the right dose. Summit 3.0 does the same for
              learning: the right resource, for the right student, at the right moment, so that
              each student's full potential gets developed and the system's aggregate gains still
              hold. We keep the scale that made the industrial model worth building, and we add
              what it could never do, which is to see and grow every individual.
            </p>
          </div>
        </motion.div>

        {/* Cards with vertical connecting line */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[7px] top-6 bottom-6 w-0.5 bg-black/10 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          <div className="space-y-5">
            {needs.map((need, i) => (
              <NeedCard key={need.name} need={need} index={i} />
            ))}
          </div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-black font-bold mt-12 text-base"
        >
          Summit 3.0 is designed to be as comprehensive as the model it replaces.
          That's what makes it possible to scale.
        </motion.p>
      </div>
    </section>
  )
}
