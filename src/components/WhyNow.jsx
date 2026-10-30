import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function WhyNow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-peach/15"
      ref={ref}
      id="why-now"
      aria-labelledby="why-now-heading"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 id="why-now-heading" className="text-3xl md:text-4xl font-bold text-indigo">
            Why Now
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5 text-base md:text-lg text-black leading-relaxed"
        >
          <p>
            Public education is entering a period of real discontinuity. For a long time, the basic
            operating assumptions of school have stayed remarkably stable: time is fixed, students
            move largely in groups, and teachers are responsible for holding and teaching enormous
            amounts of content. AI is speeding up the change in all three.
          </p>

          <p className="border-l-4 border-orange pl-5">
            That's a bigger question than how schools should use AI. It's: if we were designing a
            learner-centered public school for the world our students are actually going to inherit,
            what would we do differently? And can we prove that model inside the real constraints of
            public education, so it can reach far more students than our own?
          </p>

          <p>
            For more than twenty years, Summit has evolved by listening: to students, families,
            educators, and the changing world its graduates step into.
          </p>

          <p>
            In Fall 2025, Summit held focus groups with students, caregivers and educators across
            every Summit community, in deep conversation about what's working and what comes next.
            They told us what to keep: great educators, deep mentoring and relationships,
            college-ready academic expectations, and real-world, career-connected learning. And they
            told us what to build: more flexibility in how and when learning happens, and AI literacy
            for the world students are entering.
          </p>

          <p>
            Those signals match what families across the country are asking for and what employers now
            expect from graduates. And the need is real: young people are disengaged from school, and
            recent graduates are underemployed. Unemployment for ages 22 to 27 is at a decade high,
            excluding pandemic years.
          </p>

          <p>
            Two things are arriving together. The demand for this kind of school has never been
            clearer, and for the first time the technology exists to make it possible for every student
            at the scale of a real public system. That convergence is what makes this the moment.
          </p>

          <p>
            When the world changes, Summit listens. Then Summit builds, with families and educators
            shaping the work from the start. Summit 3.0 is the next step in that commitment: keeping
            what works and building what students need next.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
