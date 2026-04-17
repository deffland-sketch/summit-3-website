import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '$81.1K', label: 'Average graduate annual salary', context: 'vs. $70.4K peer charter graduates' },
  { value: '51%', label: 'Graduates in strong early jobs', context: 'vs. 43% for peers' },
  { value: '3,600+', label: 'Graduates across Summit schools', context: null },
  { value: '100K+', label: 'Students reached via Summit Learning', context: '400+ schools in 40 states' },
  { value: '99%', label: 'Four-year college acceptance', context: 'Class of 2025' },
]

export default function WhySummit() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">Built for this</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo">
            Why Summit
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-indigo mb-1">{stat.value}</p>
              <p className="text-sm text-black/70 font-bold">{stat.label}</p>
              {stat.context && (
                <p className="text-xs text-black/40 mt-1">{stat.context}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Framing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-lg text-black/70 leading-relaxed text-center">
            Summit built the strongest version of a post-industrial school model it could a decade
            ago — without the technology to fully realize it. Summit Learning reached 400+ schools
            because the model worked. The core vision has always been: every student on a
            personalized pathway within a strong community. The technology to make that vision fully
            operational exists now. Summit is the organization with the track record, the
            relationships, and the institutional knowledge to build it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
