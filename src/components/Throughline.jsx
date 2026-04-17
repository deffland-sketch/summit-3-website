import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Spark } from './SummitCharacters'

export default function Throughline() {
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
          <p className="text-teal font-bold text-sm tracking-wide mb-3">What holds it all together</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            Rooted in community
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Two forces — personalized pathways and human guidance — working together,
            grounded in authentic community.
          </p>
        </motion.div>

        {/* Visual: Pathway + Human Guidance sitting on Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-14"
        >
          <svg viewBox="0 0 800 520" className="w-full max-w-4xl" fill="none">
            {/* ===== COMMUNITY FOUNDATION — large, prominent ===== */}
            <ellipse cx="400" cy="440" rx="360" ry="70" fill="#f6aa40" opacity="0.1" />
            <ellipse cx="400" cy="440" rx="330" ry="58" fill="#f6aa40" opacity="0.08" />
            <ellipse cx="400" cy="440" rx="300" ry="46" fill="#f6aa40" opacity="0.06" />

            {/* Community label */}
            <text x="400" y="435" textAnchor="middle" fill="#f6aa40" fontWeight="700" fontSize="22" fontFamily="Arimo, sans-serif">Community</text>
            <text x="400" y="460" textAnchor="middle" fill="#000" opacity="0.3" fontSize="14" fontFamily="Arimo, sans-serif">Every student known. Every adult connected. Shared purpose.</text>

            {/* ===== LEFT PILLAR: Personalized Pathways ===== */}
            <rect x="40" y="60" width="310" height="280" rx="20" fill="#4b4b96" opacity="0.06" />
            <rect x="40" y="60" width="310" height="280" rx="20" stroke="#4b4b96" strokeWidth="2" opacity="0.18" />

            {/* Pathway icon */}
            <circle cx="195" cy="115" r="30" fill="#4b4b96" opacity="0.1" />
            <path d="M180 115l7-7 7 7 7-14 7 7" stroke="#4b4b96" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            <text x="195" y="168" textAnchor="middle" fill="#4b4b96" fontWeight="700" fontSize="20" fontFamily="Arimo, sans-serif">Personalized pathways</text>

            <text x="195" y="195" textAnchor="middle" fill="#000" opacity="0.4" fontSize="14" fontFamily="Arimo, sans-serif">
              <tspan x="195" dy="0">A living scope and sequence for</tspan>
              <tspan x="195" dy="20">every student. ~80% shared,</tspan>
              <tspan x="195" dy="20">~20% customized. Technology</tspan>
              <tspan x="195" dy="20">tracks every student's position</tspan>
              <tspan x="195" dy="20">and generates what comes next.</tspan>
            </text>

            {/* ===== RIGHT PILLAR: Human Guidance ===== */}
            <rect x="450" y="60" width="310" height="280" rx="20" fill="#508278" opacity="0.06" />
            <rect x="450" y="60" width="310" height="280" rx="20" stroke="#508278" strokeWidth="2" opacity="0.18" />

            {/* Guidance icon */}
            <circle cx="605" cy="115" r="30" fill="#508278" opacity="0.1" />
            <circle cx="598" cy="108" r="7" stroke="#508278" strokeWidth="2" />
            <circle cx="612" cy="110" r="6" stroke="#508278" strokeWidth="2" />
            <path d="M592 124c0-3 3-5 6-5s6 2 6 5" stroke="#508278" strokeWidth="2" />

            <text x="605" y="168" textAnchor="middle" fill="#508278" fontWeight="700" fontSize="20" fontFamily="Arimo, sans-serif">Human guidance</text>

            <text x="605" y="195" textAnchor="middle" fill="#000" opacity="0.4" fontSize="14" fontFamily="Arimo, sans-serif">
              <tspan x="605" dy="0">Every student has a guide who</tspan>
              <tspan x="605" dy="20">knows them deeply. Technology</tspan>
              <tspan x="605" dy="20">frees adults from tracking</tspan>
              <tspan x="605" dy="20">hundreds of students — so they</tspan>
              <tspan x="605" dy="20">can coach, connect, and guide.</tspan>
            </text>

            {/* ===== CONNECTING LINES to community ===== */}
            <path d="M195 340 L195 370 Q195 390 220 400 L340 430" stroke="#4b4b96" strokeWidth="2" opacity="0.2" strokeDasharray="6 4" />
            <path d="M605 340 L605 370 Q605 390 580 400 L460 430" stroke="#508278" strokeWidth="2" opacity="0.2" strokeDasharray="6 4" />

            {/* Connecting line between the two pillars */}
            <path d="M350 200 L450 200" stroke="#96a0ab" strokeWidth="1.5" opacity="0.25" strokeDasharray="4 4" />

            {/* ===== STUDENT at center junction ===== */}
            <circle cx="400" cy="390" r="20" fill="white" stroke="#f6aa40" strokeWidth="2" />
            <circle cx="400" cy="384" r="6" fill="#f6aa40" opacity="0.5" />
            <path d="M391 398c0-4 4-7 9-7s9 3 9 7" fill="#f6aa40" opacity="0.3" />

            {/* Sparks */}
            <Spark cx={28} cy={90} size={10} color="#f6aa40" />
            <Spark cx={772} cy={80} size={8} color="#4b4b96" />
            <Spark cx={400} cy={30} size={6} color="#508278" />
          </svg>
        </motion.div>

        {/* Two columns with detail */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-indigo/5 rounded-xl p-5 border border-indigo/10">
              <p className="text-sm text-black/70 leading-relaxed">
                <span className="font-bold text-indigo">The insight:</span> ~80% of what every high
                school student needs is shared — core math, complex texts, foundational science.
                The ~20% that's customized based on each student's interests, goals, and life
                context makes the whole experience feel personalized. A decade ago, Summit tried
                to build this. The technology wasn't there. It is now.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-teal/5 rounded-xl p-5 border border-teal/10">
              <p className="text-sm text-black/70 leading-relaxed italic">
                Every student seen. Every day purposeful. Every adult doing the work that matters
                most. Technology amplifies the human quality of the school — it doesn't replace it.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-2xl md:text-3xl font-bold">
            <span className="text-indigo">Pathway-driven.</span>{' '}
            <span className="text-teal">Human-guided.</span>{' '}
            <span className="text-orange">Community-rooted.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
