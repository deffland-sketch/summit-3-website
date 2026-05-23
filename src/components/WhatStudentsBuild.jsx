import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function WhatStudentsBuild() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-6">
            What students are building
          </h2>
          <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
            Every Summit student builds the foundations of a fulfilled life: purposeful work,
            financial independence, strong relationships, community, and health. Those foundations
            come in two forms. The academic knowledge and disciplinary thinking that opens doors,
            and the durable skills that make a life navigable.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Academic foundations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-indigo/5 border border-indigo/10 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-indigo mb-2">Academic foundations</h3>
            <p className="text-base italic text-black/50 mb-4">
              Understanding the world through math, science, history, and language.
            </p>
            <p className="text-base text-black/70 leading-relaxed">
              Reading and writing with depth. Mathematical reasoning. Scientific inquiry. Civic
              and historical understanding. The disciplinary knowledge and ways of thinking that
              prepare students for college, careers, and a life of continued learning.
            </p>
          </motion.div>

          {/* Durable skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-teal/5 border border-teal/10 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-teal mb-2">Durable skills</h3>
            <p className="text-base italic text-black/50 mb-4">
              The transferable capacities that make knowledge usable and life navigable.
            </p>
            <p className="text-base text-black/70 leading-relaxed">
              Communication, collaboration, problem-solving, and critical thinking.
              Self-direction, curiosity, resilience, agency, and interpersonal awareness.
              Digital and AI fluency: working with the tools that increasingly shape every
              field and every life.
            </p>
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm italic text-black/50 max-w-2xl mx-auto"
        >
          The eight experience types are how students build these. The pathway is what makes
          the combination right for each student.
        </motion.p>
      </div>
    </section>
  )
}
