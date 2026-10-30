import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/*
 * Talent: four capacities, educators who typically focus on two, and partner
 * educators. Language follows the 2030 Strategy Source of Truth (Oct 2026).
 */

const capacities = [
  {
    name: 'Mentoring',
    gloss: 'Someone who knows you',
    body: 'Guides each student’s pathway, with students and families. Connects short-term choices to long-term plans.',
    top: 'border-t-orange',
    text: 'text-orange-ink',
  },
  {
    name: 'Learning Strategies Coaching',
    gloss: 'Someone who teaches you how you learn',
    body: 'Planning, habits, persistence, and managing attention and devices.',
    top: 'border-t-light-blue',
    text: 'text-light-blue-ink',
  },
  {
    name: 'Content Expertise',
    gloss: 'Someone who teaches you',
    body: 'Small-group lessons and feedback in math, science, reading and writing, scheduled by need.',
    top: 'border-t-indigo',
    text: 'text-indigo',
  },
  {
    name: 'Project Facilitation',
    gloss: 'Someone who challenges you',
    body: 'Complex, student-directed projects and peer critique, with the mentors.',
    top: 'border-t-teal',
    text: 'text-teal-ink',
  },
]

const aiHandles = [
  'Instant feedback on student work',
  'Progress monitoring and data synthesis',
  'Curriculum customization and content selection',
  'Scheduling and resource matching',
]
const adultsDo = [
  'Meaningful dialogue about growth and goals',
  'Metacognition and identity development',
  'Designing rich learning experiences',
  'Supporting motivation and connection',
]

export default function Educators() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-white"
      ref={ref}
      id="educators"
      aria-labelledby="educators-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="educators-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5 leading-tight">
            Four Capacities, and Roles Flexible Enough to Specialize in One or Two
          </h2>
          <p className="text-xl md:text-2xl font-bold text-indigo leading-snug mb-5">
            The right adult, in the right role, at the right moment.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Great educators are the foundation of every Summit school, and our community asked us to
            keep them at the center. Over time, one role has been asked to carry nearly everything.
            Summit is developing expertise along four capacities and creating more flexible roles so
            educators can specialize in one or two. Educators typically focus on two.
          </p>
        </motion.div>

        <ul className="grid sm:grid-cols-2 gap-5 mb-8">
          {capacities.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * (i + 1) }}
              className={`bg-white border border-black/8 border-t-4 ${c.top} rounded-xl p-6`}
            >
              <h3 className={`text-lg font-bold ${c.text}`}>{c.name}</h3>
              <p className="text-sm font-bold italic text-black/75 mb-3">{c.gloss}</p>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">{c.body}</p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl border border-black/8 border-t-4 border-t-brown p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-brown mb-2">Partner Educators</h3>
          <p className="text-sm md:text-base text-black/70 leading-relaxed">
            A named host at every partner organization, from a college instructor to a workplace
            supervisor, teaches and hosts students in their own field, for anything from an hour to a
            full course or internship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-black/[0.03] rounded-xl p-6">
            <h3 className="font-bold text-teal-ink mb-3">AI Handles</h3>
            <ul className="space-y-2 text-sm md:text-base text-black/75">
              {aiHandles.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-teal-ink" aria-hidden="true">-</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-mint rounded-xl p-6">
            <h3 className="font-bold text-teal-ink mb-3">Adults Do More Of</h3>
            <ul className="space-y-2 text-sm md:text-base text-black/75">
              {adultsDo.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-teal-ink" aria-hidden="true">+</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-sm md:text-base text-black/75 leading-relaxed mt-6 max-w-3xl">
          <span className="font-bold text-teal-ink">Live now:</span> mentors anchor community,
          literacy, and goal setting, and workshops pull students by need.
        </p>
      </div>
    </section>
  )
}
