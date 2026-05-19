import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const listeningThemes = [
  'The quality and character of the adults in school matter most.',
  'Mentoring and relationships are prized by all.',
  'AI readiness and critical thinking are essential.',
  'Career-connected learning is deeply valued.',
  'College-ready academics and real-world readiness are both essential.',
  'Greater flexibility for how students learn and adults work.',
]

export default function TheBuild() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Parent heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo">
            How it's built
          </h2>
        </motion.div>

        {/* ——— Sub-section 1: Shaped by listening ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-6">
            Shaped by listening
          </h3>

          <div className="space-y-4 text-base text-black leading-relaxed">
            <p>
              In Fall 2025, Summit conducted a listening tour across the network: 75 students
              and caregivers, eight schools, deep conversations about what's working and what
              needs to change.
            </p>
            <p>
              Six things came back, again and again. They didn't tell us anything we wanted to
              ignore. They told us where to build.
            </p>
          </div>

          {/* Six themes — numbered stanza */}
          <div className="my-8 space-y-3">
            {listeningThemes.map((theme, i) => (
              <div key={i} className="flex gap-3 items-baseline">
                <span className="text-orange font-bold text-lg shrink-0" style={{ minWidth: '1.5rem' }}>
                  {i + 1}.
                </span>
                <p className="text-base text-black leading-relaxed">{theme}</p>
              </div>
            ))}
          </div>

          <p className="text-base text-black leading-relaxed mt-8">
            Summit 3.0 is built around what we've heard from our community.
          </p>
        </motion.div>

        {/* ——— Sub-section 2: Built across our system ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-6">
            Built across our system
          </h3>

          <div className="space-y-4 text-base text-black leading-relaxed">
            <p>
              The cleanest version of this work would be a single school redesigned all at once,
              fully expressing the model from day one. We considered that. We designed something
              different on purpose.
            </p>
            <p>
              Summit built the strongest single-school version of personalized learning the field
              has seen. Summit Learning then reached 400 schools in 40 states, and we learned
              what does and doesn't transfer when a fully designed model meets systems that
              haven't built the muscles to receive it. The bright spot is necessary. It is not
              sufficient.
            </p>
            <p>
              Summit 3.0 is being built across our system on purpose. Different parts of the model
              require different conditions to test honestly:
            </p>
          </div>

          {/* Three site blocks */}
          <div className="space-y-5 mt-6">
            <p className="text-base text-black leading-relaxed">
              <span className="font-bold">Sierra tests the data-and-scheduling engine.</span>{' '}
              Washington's instructional-minute flexibility lets us flex the schedule, and Sierra's
              size lets us iterate quickly on adaptive curriculum, multi-grade communities, and the
              evolving teacher role.
            </p>
            <p className="text-base text-black leading-relaxed">
              <span className="font-bold">Prep / Summit 780 tests the pathway and human guidance experience.</span>{' '}
              Prep's mentoring strength and California's regulatory context shape an 11th grade
              cohort built around a redesigned PLP, pathway projects, ASU dual enrollment, and
              interdisciplinary collaboration.
            </p>
            <p className="text-base text-black leading-relaxed">
              <span className="font-bold">Pilots at Tahoma, Shasta, Atlas, Tam, and K2 test specific elements in different contexts:</span>{' '}
              AI literacy at scale, adaptive math through Teach to One, durable skills assessment,
              AI-supported coaching. These pilots pressure-test the model in varied conditions.
            </p>
          </div>

          <p className="text-base text-black leading-relaxed mt-6">
            Every Summit school is building Summit 3.0. The deepest concentration of the redesign
            happens at Sierra and Prep. The breadth of the build happens across the network. Both
            are necessary.
          </p>
        </motion.div>

        {/* ——— Sub-section 3: Codifying the journey ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-6">
            Codifying the journey
          </h3>

          <div className="space-y-4 text-base text-black leading-relaxed">
            <p>
              What's being proven here is bigger than a single school.
            </p>
            <p>
              It is whether a real public school system, with real staff and real families, can make
              the transition from the traditional model to a fundamentally different one, and codify
              the journey so other systems can follow.
            </p>
            <p className="font-bold">
              That is the proof point the field most needs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
