import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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

        {/* Stats — comparison stats with peer contrast */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Salary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-indigo/5 rounded-xl p-6 border border-indigo/10"
          >
            <p className="text-sm text-black/50 font-bold mb-2">Average graduate annual salary</p>
            <div className="flex items-end gap-4">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-indigo">$81.1K</p>
                <p className="text-sm font-bold text-indigo/70 mt-1">Summit graduates</p>
              </div>
              <div className="pb-1">
                <p className="text-2xl md:text-3xl font-bold text-black/20">$70.4K</p>
                <p className="text-xs text-black/30 mt-1">Peer charter graduates</p>
              </div>
            </div>
            {/* Visual bar comparison */}
            <div className="mt-4 space-y-1.5">
              <div className="h-3 bg-indigo rounded-full" style={{ width: '100%' }} />
              <div className="h-3 bg-black/10 rounded-full" style={{ width: '87%' }} />
            </div>
          </motion.div>

          {/* Strong early jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="bg-teal/5 rounded-xl p-6 border border-teal/10"
          >
            <p className="text-sm text-black/50 font-bold mb-2">Graduates in strong early jobs</p>
            <div className="flex items-end gap-4">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-teal">51%</p>
                <p className="text-sm font-bold text-teal/70 mt-1">Summit graduates</p>
              </div>
              <div className="pb-1">
                <p className="text-2xl md:text-3xl font-bold text-black/20">43%</p>
                <p className="text-xs text-black/30 mt-1">Peer charter graduates</p>
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="h-3 bg-teal rounded-full" style={{ width: '100%' }} />
              <div className="h-3 bg-black/10 rounded-full" style={{ width: '84%' }} />
            </div>
          </motion.div>
        </div>

        {/* Single stats row */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {/* Graduates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.26 }}
            className="text-center p-5"
          >
            <p className="text-3xl md:text-4xl font-bold text-indigo mb-1">3,600+</p>
            <p className="text-sm text-black/60 font-bold">Graduates across Summit schools</p>
          </motion.div>

          {/* Summit Learning — hero stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.34 }}
            className="text-center bg-orange/8 rounded-xl p-5 border border-orange/15"
          >
            <p className="text-3xl md:text-4xl font-bold text-indigo mb-1">100K+</p>
            <p className="text-sm text-black/60 font-bold">Students reached via Summit Learning</p>
            <p className="text-orange font-bold text-lg mt-2">400+ schools in 40 states</p>
          </motion.div>

          {/* College acceptance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.42 }}
            className="text-center p-5"
          >
            <p className="text-3xl md:text-4xl font-bold text-indigo mb-1">99%</p>
            <p className="text-sm text-black/60 font-bold">Four-year college acceptance</p>
            <p className="text-xs text-black/35 mt-1">Class of 2025</p>
          </motion.div>
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
