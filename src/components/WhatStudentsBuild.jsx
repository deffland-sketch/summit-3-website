import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const outcomes = [
  {
    title: 'College-ready academic foundations',
    subtitle: 'Understanding the world through math, science, history, and language.',
    body: 'Reading and writing with depth. Mathematical reasoning. Scientific inquiry. Civic and historical understanding. The disciplinary knowledge and ways of thinking that prepare students for college, careers, and a life of continued learning.',
    top: 'border-indigo',
    accent: 'text-indigo',
  },
  {
    title: 'Durable skills for thriving in life',
    subtitle: 'The transferable capacities that make knowledge usable and life navigable.',
    body: 'Communication, collaboration, problem-solving, and critical thinking. Self-direction, curiosity, resilience, agency, and interpersonal awareness. Digital and AI fluency: working with the tools that increasingly shape every field and every life.',
    top: 'border-teal',
    accent: 'text-teal-ink',
  },
  {
    title: 'A plan for their future and a clear next step',
    subtitle: 'Direction for life after high school, and a real first step toward it.',
    body: 'Every student leaves with a plan for the life they want and a clear next step they are ready to take: college, a credential, a first job, or a high-growth pathway, with the ability to support themselves along the way. The plan grows out of years of mentoring and Expeditions, so students can explain why it fits them.',
    top: 'border-orange',
    accent: 'text-orange-ink',
  },
]

export default function WhatStudentsBuild() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-mint"
      ref={ref}
      id="what-students-build"
      aria-labelledby="what-students-build-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            id="what-students-build-heading"
            className="text-3xl md:text-4xl font-bold text-indigo mb-6"
          >
            What students are building
          </h2>
          <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
            Every Summit student builds the foundations of a fulfilled life: purposeful work,
            financial independence, strong relationships, community, and health. They leave with
            three things: the academics that open doors, the skills that make a life navigable, and
            a plan for what comes next.
          </p>
        </motion.div>

        {/* Three cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className={`bg-white border-t-4 ${o.top} rounded-xl p-6 md:p-7`}
            >
              <h3 className="text-xl font-bold text-indigo mb-2 leading-snug">{o.title}</h3>
              <p className={`text-sm font-bold italic ${o.accent} mb-4`}>{o.subtitle}</p>
              <p className="text-base text-black/70 leading-relaxed">{o.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm italic text-black/60 max-w-2xl mx-auto"
        >
          The eight experience types are how students build these. The pathway is what makes
          the combination right for each student.
        </motion.p>
      </div>
    </section>
  )
}
