import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ELEMENTS, ELEMENT_KEYS } from '../elements'
import { ElementTag } from './ElementTag'

/*
 * Educators, on the How It Works page: the four capacities and partner educators,
 * grouped by the model element each mainly serves (content expertise with the
 * Academic Core; mentoring and learning strategies coaching with Mentoring;
 * project facilitation and partner educators with Career-Connected Learning).
 */

const capacities = [
  {
    name: 'Content Expertise',
    gloss: 'Someone who teaches you',
    body: 'Small-group lessons and feedback in math, science, reading and writing, scheduled by need.',
    element: 'academic',
  },
  {
    name: 'Mentoring',
    gloss: 'Someone who knows you',
    body: 'Guides each student’s pathway, with students and families. Connects short-term choices to long-term plans.',
    element: 'mentoring',
  },
  {
    name: 'Learning Strategies Coaching',
    gloss: 'Someone who teaches you how you learn',
    body: 'Planning, habits, persistence, and managing attention and devices.',
    element: 'mentoring',
  },
  {
    name: 'Project Facilitation',
    gloss: 'Someone who challenges you',
    body: 'Complex, student-directed projects and peer critique, with the mentors.',
    element: 'ccl',
  },
  {
    name: 'Partner Educators',
    body: 'A named host at every partner organization, from a college instructor to a workplace supervisor, teaches and hosts students in their own field, for anything from an hour to a full course or internship.',
    element: 'ccl',
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
      className="py-16 md:py-24 px-6 bg-white"
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
            Four Capacities, and Roles Flexible Enough to Specialize
          </h2>
          <p className="text-xl md:text-2xl font-bold text-indigo leading-snug mb-5">
            The right adult, in the right role, at the right moment.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Great educators are the foundation of every Summit school, and our community asked us to
            keep them at the center. Over time, one role has been asked to carry nearly everything.
            Summit is developing expertise along four capacities, with roles flexible enough for
            educators to specialize in certain capacities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {ELEMENT_KEYS.map((k, col) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * (col + 1) }}
              className={`bg-white border border-black/8 border-t-4 ${ELEMENTS[k].topBorder} rounded-xl p-6`}
            >
              <ElementTag element={k} size="base" className="mb-4" />
              <ul className="space-y-5">
                {capacities.filter((c) => c.element === k).map((c) => (
                  <li key={c.name}>
                    <h3 className="text-lg font-bold text-indigo">{c.name}</h3>
                    {c.gloss && <p className="text-sm font-bold italic text-black/75 mb-2">{c.gloss}</p>}
                    <p className="text-sm md:text-base text-black/70 leading-relaxed">{c.body}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-black/[0.03] rounded-xl p-6">
            <h3 className="font-bold text-indigo mb-3">AI Handles</h3>
            <ul className="space-y-2 text-sm md:text-base text-black/75">
              {aiHandles.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-black/50" aria-hidden="true">-</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black/[0.03] rounded-xl p-6">
            <h3 className="font-bold text-indigo mb-3">Adults Do More Of</h3>
            <ul className="space-y-2 text-sm md:text-base text-black/75">
              {adultsDo.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-black/50" aria-hidden="true">+</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-sm md:text-base text-black/75 leading-relaxed mt-6 max-w-3xl">
          <span className="font-bold text-indigo">Live now:</span> mentors anchor community,
          literacy, and goal setting, and workshops pull students by need.
        </p>
      </div>
    </section>
  )
}
