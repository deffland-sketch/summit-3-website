import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExperienceTypes } from './LearningExperiences'

/*
 * The Next Step: the theory of action, the three levers (today vs. where we are
 * headed), and how time flexes by day, week, and season. Language follows the 2030
 * Strategy Source of Truth (Oct 2026). "Live now" lines name no schools.
 */

const levers = [
  {
    name: 'Time',
    today: 'A fixed bell schedule for everyone.',
    headed: 'Time that flexes around what each student needs, by day, by week, and across the year.',
    color: 'text-orange-ink',
    bar: 'bg-orange',
  },
  {
    name: 'Talent',
    today: 'One role asked to carry nearly everything.',
    headed: 'Educators who build deep expertise in one or two of four capacities, in roles flexible enough to allow it.',
    color: 'text-teal-ink',
    bar: 'bg-teal',
  },
  {
    name: 'Technology',
    today: 'Layered on top of the schedule.',
    headed: 'A learning platform that builds each student’s schedule from their needs and progress. Technology recommends. People decide.',
    color: 'text-indigo',
    bar: 'bg-indigo',
  },
]

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

        {/* Today vs. where we are headed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl border border-black/8 overflow-hidden mb-16"
        >
          <div className="hidden md:grid grid-cols-[9rem_1fr_1.6fr] gap-6 px-6 py-3 bg-black/[0.03] text-sm font-bold text-black/65">
            <span />
            <span>Today</span>
            <span>Where We Are Headed</span>
          </div>
          <ul>
            {levers.map((l) => (
              <li key={l.name} className="grid md:grid-cols-[9rem_1fr_1.6fr] gap-2 md:gap-6 px-6 py-5 border-t border-black/8 first:border-t-0 md:first:border-t">
                <p className={`font-bold text-lg ${l.color} flex items-center gap-2`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${l.bar}`} aria-hidden="true" />
                  {l.name}
                </p>
                <p className="text-sm md:text-base text-black/60 leading-relaxed">
                  <span className="md:hidden font-bold">Today: </span>{l.today}
                </p>
                <p className="text-sm md:text-base text-black/85 leading-relaxed">
                  <span className="md:hidden font-bold">Where we are headed: </span>{l.headed}
                </p>
              </li>
            ))}
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
              <li key={t.name} className="bg-white rounded-xl border border-black/8 border-t-4 border-t-orange p-6">
                <h4 className="text-lg font-bold text-orange-ink mb-2">{t.name}</h4>
                <p className="text-sm md:text-base text-black/70 leading-relaxed">{t.body}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm md:text-base text-black/75 leading-relaxed mt-5 max-w-3xl">
            <span className="font-bold text-orange-ink">Live now:</span> one Summit high school runs
            collaborative mornings and a flexible afternoon built from learning data, whole school, and
            another flexes 11th grade around each student&rsquo;s plan.
          </p>
        </motion.div>

        <ExperienceTypes />
      </div>
    </section>
  )
}
