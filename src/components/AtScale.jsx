import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { brand, ink } from '../palette'

// Brand colors are fills; text in a need's color uses its ink variant.
const inkFor = (hex) => ink[Object.keys(brand).find((k) => brand[k] === hex)] ?? hex

const needs = [
  {
    name: 'Competency Verification',
    question: 'How Do We Know Students Are Ready?',
    color: brand.teal,
    industrial: 'Standardized assessments, course grades, and time-based requirements. Aggregate signals that produce a credential everyone recognizes.',
    summit: 'Assessment is continuous and tied to real work: AI evaluates it against Summit’s rubrics and exemplars, and educators review it, add their own feedback, and override when needed. The diploma comes when every required competency is validated, on each student’s own timeline, with badges for habits and durable skills and industry validation where standards exist.',
  },
  {
    name: 'Socialization and Belonging',
    question: 'How Do Young People Learn to Live Together?',
    color: brand.orange,
    industrial: 'Age-based cohorts, shared schedules, extracurriculars. Community emerges from proximity, and it works for many students.',
    summit: 'Every day starts in community with a long-term mentor who knows each student deeply and a core group of peers built across ages and interests. Belonging is designed into the daily experience for every student.',
  },
  {
    name: 'Physical Safety and Structure',
    question: 'Where Are Young People During the Day?',
    color: brand.indigo,
    industrial: 'A building with adults, bells, and defined periods. Students are accounted for at all times. Simple and reliable.',
    summit: 'Students are always within a safe, purposeful structure that flexes to match what each student needs that day. They check in through the learning platform wherever they are, every partner educator is background-checked, and families sign off on off-site placements.',
  },
  {
    name: 'Developmentally Appropriate Progression',
    question: 'How Do We Meet Students Where They Are?',
    color: brand.lightBlue,
    industrial: 'Grade levels based on age. Everyone moves through the same sequence, which gets the aggregate population through the curriculum.',
    summit: 'Time flexes around each student, so a student who is ready moves on and a student who needs more gets more, in the same school. A multilingual learner, a student with an IEP or 504, or a student far ahead in one subject and behind in another each gets a sequence built for where they are.',
  },
  {
    name: 'Meaningful Adult Employment',
    question: 'How Do We Make Teaching Sustainable?',
    color: brand.brown,
    industrial: 'Stable jobs with clear definitions, and generations of educators built their lives around them. Over time, one role has been asked to carry nearly everything.',
    summit: 'Four capacities, mentoring, learning strategies coaching, content expertise, and project facilitation, with educators typically focusing on two so they can build deep expertise. AI handles administrative load, and partner educators teach and host in their own fields.',
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

function NeedCard({ need }) {
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

      <div className="bg-white rounded-xl overflow-hidden border border-black/5">
        {/* Accent bar that fills on scroll */}
        <div className="px-5 pt-4">
          <AccentBar color={need.color} inView={inView} />
        </div>

        <div className="p-5 pt-3">
          {/* Header */}
          <p className="text-sm font-bold mb-1" style={{ color: inkFor(need.color) }}>
            {need.name}
          </p>
          <h3 className="text-base md:text-lg font-bold text-black mb-4">{need.question}</h3>

          {/* Two blocks */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-black/60 mb-1.5">The industrial model</p>
              <p className="text-sm text-black/70 leading-relaxed">{need.industrial}</p>
            </div>
            <div className="rounded-lg p-3 -m-1" style={{ backgroundColor: need.color + '12' }}>
              <p className="text-xs font-bold mb-1.5" style={{ color: inkFor(need.color) }}>Summit 3.0</p>
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
    <section
      className="py-20 md:py-28 px-6 bg-mint"
      ref={ref}
      id="at-scale"
      aria-labelledby="at-scale-heading"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 id="at-scale-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-6">
            How the Industrial Model Succeeded, and Why It's Time to Evolve
          </h2>
          <div className="space-y-4 text-black leading-relaxed max-w-3xl">
            <p>
              The industrial school model is the most successful organizational technology in the
              history of education. For 150 years it has scaled a basic education to millions of
              students by giving every student the same time, and 100 years of rising literacy and
              graduation rates are a real achievement Summit 3.0 builds on.
            </p>
            <p>
              Holding time static is also where it reaches its limit. Different students need
              different amounts of different things to learn, and a system built for the average
              can't see each student. Summit 3.0 keeps that scale and flexes time around each student.
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
            {needs.map((need) => (
              <NeedCard key={need.name} need={need} />
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
