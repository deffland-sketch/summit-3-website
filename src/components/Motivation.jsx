import { motion, useInView } from 'framer-motion'
import { Fragment, useRef } from 'react'

/*
 * Purpose, Relevance, and Competence Build Motivation: the logic of the model, placed
 * right after Amara's week, so the week is the example before the explanation. Mentoring and Expeditions build
 * purpose, flexible time makes academic work relevant to it, self-directed learning
 * skills build competence, and motivation follows (self-determination theory, Ryan and
 * Deci). Framing matches the Sierra 11/9 site visit deck (Nov 2026). Stats are from the
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
    title: 'Competence',
    builtBy: 'Built by self-directed learning skills',
    body: 'Students learn to plan, practice, ask for help, and choose the support they need, with guided autonomy and strong relationships around them.',
    top: 'border-t-light-blue',
    label: 'text-light-blue-ink',
    dot: 'bg-light-blue',
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
      className="py-20 md:py-28 px-6 bg-peach/10"
      ref={ref}
      id="purpose-to-motivation"
      aria-labelledby="purpose-to-motivation-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="purpose-to-motivation-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5 leading-tight">
            Purpose, Relevance, and Competence Build Motivation
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-4">
            Students work hardest when school connects to a future they can picture, and when they
            have the skills to get there. Summit has long built purpose through mentoring and
            Expeditions.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Flexible time carries that purpose into the academic core, so a student&rsquo;s math,
            science, reading and writing connect to the pathway they are building. Our focus now is
            competence: making sure every student builds the skills to direct their own learning.
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

        {/* Purpose + Relevance + Competence = Motivation. Operators sit in their own
            grid columns on wide screens and between stacked cards on narrow ones. */}
        <ol
          className="grid gap-3 lg:gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch"
          aria-label="Purpose plus relevance plus competence equals motivation"
        >
          {steps.map((s, i) => {
            const isResult = i === steps.length - 1
            return (
              <Fragment key={s.title}>
                {i > 0 && (
                  <li className="flex items-center justify-center" aria-hidden="true">
                    <span
                      className={`w-9 h-9 rounded-full text-xl font-bold flex items-center justify-center ${
                        isResult ? 'bg-indigo text-white' : 'bg-white text-indigo border border-indigo/20'
                      }`}
                    >
                      {isResult ? '=' : '+'}
                    </span>
                  </li>
                )}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.12 * (i + 1) }}
                  className={`rounded-xl border-t-4 ${s.top} p-6 ${isResult ? 'bg-indigo/[0.06] ring-1 ring-indigo/15' : 'bg-white'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${s.dot} shrink-0`} aria-hidden="true" />
                    <h3 className="text-xl font-bold text-indigo">{s.title}</h3>
                  </div>
                  <p className={`text-sm font-bold ${s.label} mb-3`}>{s.builtBy}</p>
                  <p className="text-sm md:text-base text-black/70 leading-relaxed">{s.body}</p>
                </motion.li>
              </Fragment>
            )
          })}
        </ol>
        <p className="text-xs text-black/60 mt-6">Source: self-determination theory (Ryan and Deci)</p>
      </div>
    </section>
  )
}
