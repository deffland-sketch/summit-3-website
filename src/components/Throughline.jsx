import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Throughline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Divider from Hero */}
        <div className="w-16 h-1 bg-orange rounded-full mx-auto mb-12" />

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
          <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-3xl mx-auto mb-6">
            Every Summit student is known deeply, challenged academically, given real-world
            experience, and prepared for what comes next. Summit 3.0 is how we make that real
            for every student, at the scale of a public school system.
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
                    <p className="text-[11px] text-black/40 mt-1.5 leading-relaxed">Academic foundations that prepare students for college and careers, and durable skills like communication, collaboration, self-direction, and interpersonal awareness.</p>
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
                    <span className="text-[10px] text-black/35 leading-relaxed">Takes on real authority over time: choosing experiences, co-authoring their learning plan, and helping build their own schedule, with a guide alongside.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== HUMAN-CENTERED GUIDANCE — right column ===== */}
            <div className="flex flex-col">
              <div className="bg-orange text-white text-center font-bold text-lg py-3 rounded-xl mb-3">
                Human-Centered Guidance
              </div>

              {/* Intro */}
              <div className="text-center mb-3 px-2">
                <p className="font-bold text-[13px] text-black/85 leading-snug mb-1">
                  Being known and being challenged both depend on the adults around a student.
                  Summit 3.0 organizes that work into four specialized capacities, held across
                  the adults around a student.
                </p>
                <p className="text-[11px] text-black/60 leading-relaxed">
                  One person may carry more than one. No one is expected to do all four alone.
                </p>
              </div>

              {/* Four capacity cards — match the pathway question card treatment */}
              <div className="space-y-2 flex-1">
                {/* G — Guiding (orange) */}
                <div className="bg-orange/5 border border-orange/15 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">G</div>
                    <div>
                      <p className="font-bold text-[13px] text-orange leading-snug">Guiding</p>
                      <p className="text-[12px] font-bold italic text-black/80 mt-0.5 leading-snug">Someone who knows you</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-black/55 leading-relaxed ml-11">
                    Builds deep relationships and knows each student well, holding the whole person, present every day.
                  </p>
                </div>

                {/* C — Content expertise (indigo) */}
                <div className="bg-indigo/5 border border-indigo/15 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">C</div>
                    <div>
                      <p className="font-bold text-[13px] text-indigo leading-snug">Providing content expertise</p>
                      <p className="text-[12px] font-bold italic text-black/80 mt-0.5 leading-snug">Someone who teaches you</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-black/55 leading-relaxed ml-11">
                    Delivers targeted instruction at just the right time, when a student hits something hard.
                  </p>
                </div>

                {/* F — Facilitating (teal) */}
                <div className="bg-teal/5 border border-teal/15 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">F</div>
                    <div>
                      <p className="font-bold text-[13px] text-teal leading-snug">Facilitating</p>
                      <p className="text-[12px] font-bold italic text-black/80 mt-0.5 leading-snug">Someone who challenges you</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-black/55 leading-relaxed ml-11">
                    Creates the conditions for students to think together through interdisciplinary, interconnected experiences.
                  </p>
                </div>

                {/* S — Architecting the system (brown) */}
                <div className="bg-brown/5 border border-brown/15 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-brown flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">S</div>
                    <div>
                      <p className="font-bold text-[13px] text-brown leading-snug">Architecting the system</p>
                      <p className="text-[12px] font-bold italic text-black/80 mt-0.5 leading-snug">Someone who makes sure it holds</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-black/55 leading-relaxed ml-11">
                    Sees and manages the complexity of education at scale, so no student falls through.
                  </p>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-center text-orange font-bold text-xs leading-relaxed mt-3">
                The right adult, in the right role, at the right moment.
              </p>
            </div>
          </div>

          {/* ===== FOUNDATION CALLOUT ===== */}
          <div className="mt-5 border-l-4 border-orange bg-peach/40 rounded-r-xl px-5 py-4">
            <p className="text-orange font-bold text-xs tracking-[0.18em] uppercase mb-1">Foundation</p>
            <p className="text-base md:text-lg font-bold text-black leading-snug">Rooted in community.</p>
            <p className="text-sm text-black/70 mt-1 leading-relaxed">
              Students belong. Adults share purpose. Families are partners.
            </p>
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
