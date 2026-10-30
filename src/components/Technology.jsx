import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/*
 * Technology: the four-layer stack, the safety block, and how learning is verified.
 * Language follows the 2030 Strategy Source of Truth (Oct 2026) and the operating
 * overview "How Summit 3.0 Works." "Live now" names no schools or vendors.
 */

const layers = [
  {
    name: 'Learning Platform',
    body: 'One front door for everyone. A student opens it to see the week’s plan, progress toward outcomes, learning resources, and mentor feedback. An educator opens it to see who they’re teaching, where, and why. Every other tool is reached through it.',
  },
  {
    name: 'Connected Tools',
    body: 'A long-term pathway planning tool, AI-powered curricular tools for precision practice, a scheduling tool, and the college and partner systems that handle credits and placements.',
  },
  {
    name: 'Intelligence Layer',
    body: 'A knowledge graph links every outcome to the experiences that build it. The engine builds each week, groups students by need, and drafts feedback for educators to review.',
  },
  {
    name: 'Data Layer',
    body: 'The program record Summit holds under the family’s data agreement, and the concise learner profile the student owns and takes with them: validated competencies, badges, credentials, selected work, and their pathway.',
  },
]

export default function Technology() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-peach/10"
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5">
            Technology Recommends. People Decide.
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Technology does the measuring, connecting, and scheduling, so educators spend their time
            on mentoring, content expertise, and facilitation. Some of the most important parts of
            the day have no screen at all: community, discussion, real-world experience, and time to
            eat and talk together.
          </p>
        </motion.div>

        <p className="font-bold text-black/80 mb-4">The stack has four layers.</p>
        <ul className="grid sm:grid-cols-2 gap-5 mb-8">
          {layers.map((l, i) => (
            <motion.li
              key={l.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * (i + 1) }}
              className="bg-white rounded-xl border border-black/8 border-t-4 border-t-indigo p-6"
            >
              <h3 className="text-lg font-bold text-indigo mb-2">{l.name}</h3>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">{l.body}</p>
            </motion.li>
          ))}
        </ul>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-black/8 p-6">
            <h3 className="text-lg font-bold text-indigo mb-2">How We Keep Students Safe</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              The system runs on student data, so protecting it is part of the design. Families own
              their student&rsquo;s information. The model checks its own recommendations for bias, and
              an educator is always in the loop to make the final decision about a student.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-black/8 p-6">
            <h3 className="text-lg font-bold text-indigo mb-2">How Learning Is Verified</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              AI evaluates student work against Summit&rsquo;s rubrics and exemplars, and educators
              review it, add their own feedback, and override when needed. The diploma comes when every
              required competency is validated, on each student&rsquo;s own timeline.
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base text-black/75 leading-relaxed mt-6 max-w-3xl">
          <span className="font-bold text-indigo">Live now:</span> adaptive practice tools, a
          student-facing scheduling tool co-built with a partner, an AI-enabled career exploration
          platform, and an AI literacy program across schools.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-bold text-indigo leading-snug mt-12 max-w-3xl"
        >
          Every Summit school is moving toward flexible time at the pace its size allows.
        </motion.p>
      </div>
    </section>
  )
}
