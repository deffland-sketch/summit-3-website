import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/*
 * From Purpose to Motivation: the logic of the model, placed between what Summit
 * already has and the next step. Mentoring and Expeditions build purpose, flexible
 * time makes academic work relevant to it, and motivation follows. Stats are from the
 * 2030 Strategy Source of Truth (Oct 2026): Transcend, Conversations with Kids (2022),
 * and the Summit SY26 spring student survey.
 */

const steps = [
  {
    title: 'Purpose',
    builtBy: 'Built by a long-term mentor and Expeditions',
    body: 'Students name what they care about and who they want to become, and shape it into a pathway. 83% of Summit students say their mentor helps them plan for life after high school.',
    top: 'border-t-teal',
    label: 'text-teal-ink',
    dot: 'bg-teal',
  },
  {
    title: 'Relevance',
    builtBy: 'Built by flexible time',
    body: 'When time flexes, academic work can sit next to the experiences that give it meaning. A student headed into a clinical internship gets the biology she needs before she goes, and one back from a design internship gets the geometry it called for.',
    top: 'border-t-orange',
    label: 'text-orange-ink',
    dot: 'bg-orange',
  },
  {
    title: 'Motivation',
    builtBy: 'What follows',
    body: 'Students take on hard academic work because it moves them toward something that is theirs, and they keep at it when it gets hard.',
    top: 'border-t-indigo',
    label: 'text-indigo',
    dot: 'bg-indigo',
  },
]

export default function Motivation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-mint"
      ref={ref}
      id="purpose-to-motivation"
      aria-labelledby="purpose-to-motivation-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="purpose-to-motivation-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5 leading-tight">
            Purpose Makes Learning Relevant, and Relevance Builds Motivation
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-4">
            Students work hardest when school connects to a future they can picture. Summit already
            builds that sense of purpose through mentoring and Expeditions.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            The academic core is where the connection is hardest to see. Flexible time is how we
            carry purpose into it, so a student&rsquo;s math, science, reading and writing connect to
            the pathway they are building.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-10"
        >
          <p className="text-3xl md:text-4xl font-bold text-indigo shrink-0">69%</p>
          <p className="text-sm md:text-base text-black/70 leading-relaxed">
            of young people say their learning isn&rsquo;t connected to the real world.
            <span className="block text-xs text-black/60 mt-1">Transcend, Conversations with Kids, 2022</span>
          </p>
        </motion.div>

        <ol className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * (i + 1) }}
              className={`relative bg-white rounded-xl border-t-4 ${s.top} p-6`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-6 h-6 rounded-full ${s.dot} text-white text-xs font-bold flex items-center justify-center shrink-0`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-indigo">{s.title}</h3>
              </div>
              <p className={`text-sm font-bold ${s.label} mb-3`}>{s.builtBy}</p>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">{s.body}</p>
              {i < steps.length - 1 && (
                <span
                  className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange text-white text-sm font-bold items-center justify-center z-10"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
