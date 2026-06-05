import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function WhyNow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-peach/15" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">The moment</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo">
            Why now
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5 text-base md:text-lg text-black leading-relaxed"
        >
          <p>
            For more than twenty years, Summit has evolved by listening: to students, families,
            educators, and the changing world its graduates step into.
          </p>

          <p>
            In Fall 2025, Summit ran a listening tour across the network: 75 students and
            caregivers in eight schools, in deep conversation about what's working and what needs
            to change. The pattern was clear. Families still value what has always defined Summit:
            strong relationships, dedicated mentors, and rigorous academics. Students, caregivers,
            and educators also pointed to the same new priorities: AI fluency, critical thinking,
            real-world and career-connected learning, and more flexibility in how learning happens.
          </p>

          <p>
            Those signals aren't unique to Summit. They match what families across the country are
            asking for and what employers now expect from graduates.
          </p>

          <p className="border-l-4 border-orange pl-5">
            Two things are arriving together. The demand for this kind of school has never been
            clearer, and for the first time the technology exists to deliver it for every student
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
