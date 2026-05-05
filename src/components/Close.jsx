import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Close() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-24 md:py-32 px-6"
      style={{ background: 'linear-gradient(135deg, #4b4b96 0%, #503c2d 100%)' }}
      ref={ref}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          The invitation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-white/90 leading-relaxed mb-12"
        >
          Every student prepared for a fulfilled life — one with purposeful work,
          financial independence, strong relationships, community, and health.
          That's been Summit's vision since 2003. Now we have the tools, the team,
          and the track record to build the school that vision always demanded.
          We're inviting you to invest in the proof point.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="mailto:info@summitps.org"
            className="inline-block bg-orange text-brown font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange/90 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <span className="text-white font-bold text-lg tracking-wide">
            Summit Public Schools
          </span>
        </motion.div>
      </div>
    </section>
  )
}
