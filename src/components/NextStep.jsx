import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ELEMENTS, ELEMENT_KEYS } from '../elements'
import { ElementTag } from './ElementTag'
import { LearningExperiences } from './LearningExperiences'

/*
 * The Next Step: the theory of action, the three model elements (all at every
 * Summit school today; the academic core personalizes next), how time flexes by
 * day, week, and season, and the learning experiences under each element. The
 * "Live now" line points to Sierra (#sierra).
 */

const elementStatus = {
  academic: {
    what: 'Math, science, reading and writing, and history.',
    status: 'Personalizes next, by flexing time around each student',
    next: true,
  },
  mentoring: {
    what: 'A long-term mentor and a constant mentor group.',
    status: 'Already flexes around each student',
  },
  ccl: {
    what: 'Expeditions, internships, college courses, and industry credentials.',
    status: 'Already flexes around each student',
  },
}

const timescales = [
  {
    name: 'Day',
    body: 'Small adjustments overnight from the day’s evidence: a lesson added, a group reshuffled, a student invited to a workshop her data says she is ready for.',
  },
  {
    name: 'Week',
    body: 'Each student’s week is built from goal-setting, progress, and which educators and spaces are open. Student and mentor look it over and confirm it.',
  },
  {
    name: 'Season',
    body: 'Stretches of the year built around one experience, with academic work pausing and resuming around it: an internship, then a math intensive.',
  },
]

export default function NextStep() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-peach/10"
      ref={ref}
      id="next-step"
      aria-labelledby="next-step-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="next-step-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5 leading-tight">
            Personalize the Academic Core by Flexing Time Around Each Student
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-4">
            Different students need different amounts of different things to learn, and we are
            building a system where they get that. When time is flexible in service of each student,
            students grow faster.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Time flexes first. Educator roles and technology evolve to support it. For Summit, this is
            a natural next step.
          </p>
        </motion.div>

        {/* The three elements: all at every school today; the academic core is next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <p className="font-bold text-black/80 mb-4">All three elements exist at every Summit school today.</p>
          <ul className="grid md:grid-cols-3 gap-5">
            {ELEMENT_KEYS.map((k) => {
              const st = elementStatus[k]
              return (
                <li
                  key={k}
                  className={`rounded-xl border-t-4 ${ELEMENTS[k].topBorder} p-6 ${
                    st.next ? 'bg-white ring-2 ring-indigo/30' : 'bg-white border border-black/8'
                  }`}
                >
                  <ElementTag element={k} size="base" />
                  <p className="text-sm md:text-base text-black/70 leading-relaxed mt-2">{st.what}</p>
                  <p className={`mt-4 text-sm font-bold ${st.next ? 'text-indigo' : 'text-black/65'}`}>{st.status}</p>
                </li>
              )
            })}
          </ul>
        </motion.div>

        {/* How time flexes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-3">
            Time Flexes by Day, by Week, and Across the Year
          </h3>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-6 max-w-3xl">
            The academic core is personalized by flexing time, so students get different amounts of
            what they need, when they need it.
          </p>
          <ul className="grid md:grid-cols-3 gap-5">
            {timescales.map((t) => (
              <li key={t.name} className="bg-white rounded-xl border border-black/8 border-t-4 border-t-indigo p-6">
                <h4 className="text-lg font-bold text-indigo mb-2">{t.name}</h4>
                <p className="text-sm md:text-base text-black/70 leading-relaxed">{t.body}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm md:text-base text-black/75 leading-relaxed mt-5 max-w-3xl">
            <span className="font-bold text-indigo">Live now:</span> Summit Sierra in Seattle is
            the first school bringing flexible time to the academic core.{' '}
            <a href="#sierra" className="font-bold text-indigo underline underline-offset-2 hover:text-indigo/80">
              See how below.
            </a>
          </p>
        </motion.div>

        <LearningExperiences />
      </div>
    </section>
  )
}
