import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Throughline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">The model</p>
          <p className="text-lg md:text-xl text-indigo/70 italic mb-4">
            The future of high school is no longer static courses and seat-time credits.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo">
            Every student has a pathway
          </h2>
        </motion.div>

        {/* DIAGRAM — HTML/Tailwind layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-4xl mx-auto mb-8 relative"
        >
          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* ===== THE PATHWAY — left column ===== */}
            <div className="flex flex-col">
              <div className="bg-indigo text-white text-center font-bold text-lg py-3 rounded-xl mb-3">
                The Pathway
              </div>

              {/* Step 1 */}
              <div className="bg-indigo/5 border border-indigo/12 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-light-blue flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="font-bold text-[13px] text-black/80 leading-snug">Who is the student, and what do they want for their life?</p>
                    <p className="text-[11px] text-black/40 mt-1.5 leading-relaxed">Existing knowledge, interests, lived experience, goals, developmental needs, and aspirations for the life they want to build.</p>
                  </div>
                </div>
                <div className="border-t border-indigo/10 mt-3 pt-2.5 space-y-1.5 ml-11">
                  <div className="flex gap-2 items-baseline">
                    <span className="text-teal font-bold text-[9px] tracking-wide opacity-60 shrink-0 w-16">THE SYSTEM</span>
                    <span className="text-[10px] text-black/35 leading-relaxed">Surfaces data, history, and patterns. Asks the right questions.</span>
                  </div>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-light-blue font-bold text-[9px] tracking-wide opacity-80 shrink-0 w-16">THE STUDENT</span>
                    <span className="text-[10px] text-black/35 leading-relaxed">Brings knowledge, experience, and aspirations the system is built to honor.</span>
                  </div>
                </div>
              </div>

              {/* Arrow 1→2 */}
              <div className="flex justify-center py-1 text-indigo/20">
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M5 0v14M1 11l4 5 4-5" stroke="currentColor" strokeWidth="2" /></svg>
              </div>

              {/* Step 2 */}
              <div className="bg-indigo/5 border border-indigo/12 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="font-bold text-[13px] text-black/80 leading-snug">What outcomes will support their launch into the life they want?</p>
                    <p className="text-[11px] text-black/40 mt-1.5 leading-relaxed">College-ready academic foundations and durable skills like collaboration, communication, and interpersonal awareness.</p>
                  </div>
                </div>
                <div className="border-t border-indigo/10 mt-3 pt-2.5 space-y-1.5 ml-11">
                  <div className="flex gap-2 items-baseline">
                    <span className="text-teal font-bold text-[9px] tracking-wide opacity-60 shrink-0 w-16">THE SYSTEM</span>
                    <span className="text-[10px] text-black/35 leading-relaxed">Maps academic foundations and durable skills to the life the student is building toward.</span>
                  </div>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-light-blue font-bold text-[9px] tracking-wide opacity-80 shrink-0 w-16">THE STUDENT</span>
                    <span className="text-[10px] text-black/35 leading-relaxed">Co-owns the goals. Adjusts them as self-knowledge grows.</span>
                  </div>
                </div>
              </div>

              {/* Arrow 2→3 */}
              <div className="flex justify-center py-1 text-indigo/20">
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M5 0v14M1 11l4 5 4-5" stroke="currentColor" strokeWidth="2" /></svg>
              </div>

              {/* Step 3 */}
              <div className="bg-indigo/5 border border-indigo/12 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="font-bold text-[13px] text-black/80 leading-snug">What experiences will prepare them?</p>
                    <p className="text-[11px] text-black/40 mt-1.5 leading-relaxed">Eight experience types across context, content, and discipline: the right combination for each student.</p>
                  </div>
                </div>
                <div className="border-t border-indigo/10 mt-3 pt-2.5 space-y-1.5 ml-11">
                  <div className="flex gap-2 items-baseline">
                    <span className="text-teal font-bold text-[9px] tracking-wide opacity-60 shrink-0 w-16">THE SYSTEM</span>
                    <span className="text-[10px] text-black/35 leading-relaxed">Sequences experience types based on where the student is and what they need next.</span>
                  </div>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-light-blue font-bold text-[9px] tracking-wide opacity-80 shrink-0 w-16">THE STUDENT</span>
                    <span className="text-[10px] text-black/35 leading-relaxed">Increasingly designs and chooses experiences. Leads the pathway over time.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== HUMAN-CENTERED GUIDANCE — right column ===== */}
            <div className="flex flex-col">
              <div className="bg-orange text-white text-center font-bold text-lg py-3 rounded-xl mb-3">
                Human-Centered Guidance
              </div>

              <div className="bg-orange/5 border border-orange/12 rounded-xl p-5 flex-1 flex flex-col justify-between">
                {/* Central message */}
                <p className="text-center font-bold text-[13px] text-black/70 leading-relaxed mb-6">
                  Helping young people situate their learning within the broader human experience.
                </p>

                {/* Four capacities — stacked */}
                <div className="space-y-2.5 mb-6">
                  <div className="bg-orange/10 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-orange flex items-center justify-center text-white font-bold text-[10px] shrink-0">G</div>
                    <div>
                      <p className="font-bold text-xs text-black/80">Guiding</p>
                      <p className="text-[10px] text-black/40">Via deep relationships and knowing students well</p>
                    </div>
                  </div>
                  <div className="bg-indigo/8 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-indigo flex items-center justify-center text-white font-bold text-[10px] shrink-0">C</div>
                    <div>
                      <p className="font-bold text-xs text-black/80">Providing content expertise</p>
                      <p className="text-[10px] text-black/40">Supporting foundational skills at just the right time</p>
                    </div>
                  </div>
                  <div className="bg-teal/10 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white font-bold text-[10px] shrink-0">F</div>
                    <div>
                      <p className="font-bold text-xs text-black/80">Facilitating</p>
                      <p className="text-[10px] text-black/40">Supporting students through interdisciplinary, interconnected experiences</p>
                    </div>
                  </div>
                  <div className="bg-tan-grey/10 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-tan-grey flex items-center justify-center text-white font-bold text-[10px] shrink-0">S</div>
                    <div>
                      <p className="font-bold text-xs text-black/80">Architecting the system</p>
                      <p className="text-[10px] text-black/40">Seeing, guiding, and managing the complexity of education at scale</p>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-center text-orange font-bold text-[11px] opacity-60 leading-relaxed">
                  The right adult, in the right role, at the right moment.
                </p>
              </div>
            </div>
          </div>

          {/* ===== COMMUNITY FOUNDATION ===== */}
          <div className="flex flex-col items-center mt-6">
            {/* Connecting dashed lines */}
            <div className="flex w-full max-w-xs justify-center mb-1">
              <div className="flex-1 border-r-2 border-dashed border-indigo/15 h-6" />
              <div className="flex-1 border-l-2 border-dashed border-orange/15 h-6" />
            </div>
            {/* Student dot */}
            <div className="w-5 h-5 rounded-full bg-white border-2 border-teal flex items-center justify-center mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal/50" />
            </div>
            {/* Community oval */}
            <div className="w-full max-w-2xl bg-orange/8 rounded-full py-4 px-8 text-center">
              <p className="text-orange font-bold text-lg">Rooted in Community</p>
              <p className="text-black/25 text-xs mt-1">Students belong. Adults share purpose. Families are partners.</p>
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-bold">
            <span className="text-indigo">Pathway-driven.</span>{' '}
            <span className="text-orange">Human-centered.</span>{' '}
            <span className="text-teal">Community-rooted.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
