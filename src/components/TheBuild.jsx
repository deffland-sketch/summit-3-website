import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const phases = [
  {
    label: 'Phase 1',
    title: 'Build the foundations',
    body: 'Sierra proves the data-to-schedule engine: an adaptive platform generates real-time learner data within core academics, and teachers begin using that data to differentiate within the existing schedule. Prep / Summit 780 proves the pathway experience: PLP-driven mentoring, student-designed pathway projects, and ASU dual enrollment create a coherent journey for an 11th grade cohort. Pilots across the network test specific elements in different contexts. Network-wide curriculum and platform adoption builds the foundation every school will need.',
  },
  {
    label: 'Phase 2',
    title: 'Cross-pollinate and extend',
    body: 'Sierra begins flexing the schedule based on proven data — students start moving between experience types based on what the system recommends, not just what the bell schedule dictates. Prep extends the redesigned pathway model beyond the initial cohort and integrates the data-driven scheduling logic Sierra has proven. Pilot findings inform what\u2019s codified. Cross-site design sprints merge the two lines of development.',
  },
  {
    label: 'Phase 3',
    title: 'One codified model',
    body: 'Pathway logic drives what each student needs. The scheduling engine delivers the right experience at the right time. Human guidance holds it together. One codified, evidence-backed model operating across the network, documented for scaling. Summit shares what it learns through case studies, publications, and practitioner-facing resources.',
  },
]

const listeningThemes = [
  'The quality and character of the adults in school matter most',
  'Mentoring and relationships are prized by all',
  'AI readiness and critical thinking are essential',
  'Career-connected learning is deeply valued',
  'College-ready academics and real-world readiness are both essential',
  'Greater flexibility for how students learn and adults work',
]

export default function TheBuild() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-peach/10" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">How we get there</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            Building with our community, across our system
          </h2>
        </motion.div>

        {/* C1 — Main body copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-10"
        >
          {/* Opening callout — B5 */}
          <p className="text-xl font-bold text-indigo mb-4">
            We build with our community, not to it.
          </p>

          <div className="space-y-4 text-sm text-black/60 leading-relaxed">
            <p>
              The cleanest version of this work would be a single school redesigned all at once,
              fully expressing the model from day one. We considered that. We designed something
              different on purpose.
            </p>
            <p>
              Summit built the strongest single-school version of personalized learning the field
              has seen. Summit Learning then reached 400 schools in 40 states — and we learned, in
              detail, what does and doesn't transfer when a fully designed model meets systems that
              haven't built the muscles to receive it. The bright spot is necessary. It is not
              sufficient.
            </p>
            <p>
              Summit 3.0 is being built across our system on purpose. Different parts of the model
              require different conditions to test honestly:
            </p>
          </div>

          {/* Bulleted conditions list */}
          <div className="space-y-4 mt-5">
            <div className="bg-indigo/5 border border-indigo/10 rounded-xl p-5">
              <p className="text-sm text-black/70 leading-relaxed">
                <span className="font-bold text-indigo">Sierra</span> has the conditions to test
                the data-and-scheduling engine. Washington's flexibility with instructional minutes
                lets us flex the schedule. Sierra's small size lets us iterate quickly on adaptive
                curriculum, multi-grade communities, and an evolving teacher role.
              </p>
            </div>
            <div className="bg-teal/5 border border-teal/10 rounded-xl p-5">
              <p className="text-sm text-black/70 leading-relaxed">
                <span className="font-bold text-teal">Prep / Summit 780</span> has the conditions
                to test the pathway and human guidance experience. Prep's mentoring strength, the
                community's appetite for dual enrollment, and California's regulatory context shape
                an 11th grade cohort built around a redesigned PLP, pathway projects, ASU dual
                enrollment, and interdisciplinary collaboration.
              </p>
            </div>
            <div className="bg-orange/5 border border-orange/10 rounded-xl p-5">
              <p className="text-sm text-black/70 leading-relaxed">
                <span className="font-bold text-orange">Pilots at Tahoma, Shasta, Atlas, Tam, and K2</span> test
                specific elements in different contexts — AI literacy at scale, adaptive math
                through Teach to One, durable skills assessment, AI-supported coaching. These
                pilots pressure-test the model in varied conditions and build the network's
                capacity to receive it.
              </p>
            </div>
            <div className="bg-peach/20 border border-orange/10 rounded-xl p-5">
              <p className="text-sm text-black/70 leading-relaxed">
                <span className="font-bold text-brown">Network-wide adoption</span> of
                high-quality curriculum (OpenSciEd, EL, Odell), Teach to One, and shared platforms
                creates the foundation every school will need.
              </p>
            </div>
          </div>

          <p className="text-sm text-black/60 leading-relaxed mt-5">
            Every Summit school is building Summit 3.0. The deepest concentration of the redesign
            happens at Sierra and Prep. The breadth of the build happens across the network. Both
            are necessary.
          </p>

          {/* C2 — Pull-quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="my-8 border-l-4 border-indigo pl-6 py-2"
          >
            <p className="text-xl md:text-2xl font-bold text-indigo leading-snug">
              What's being proven here is bigger than a single school.
            </p>
          </motion.div>

          <p className="text-sm text-black/60 leading-relaxed">
            It is whether a real public school system, with real staff and real families, can make
            the transition from the traditional model to a fundamentally different one — and codify
            the journey so other systems can follow. That is the proof point the field most needs.
          </p>
        </motion.div>

        {/* C4 — Listening tour (preserved, relocated) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-xl border border-black/8 p-6 md:p-8 mb-14"
        >
          <h3 className="text-lg font-bold text-indigo mb-3">Shaped by listening</h3>
          <p className="text-sm text-black/60 leading-relaxed mb-4">
            In Fall 2025, Summit conducted a listening tour across every campus — students at all
            grade levels, caregivers with varied backgrounds, and every teaching team. Six consistent
            themes emerged:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {listeningThemes.map((theme, i) => (
              <div key={i} className="flex gap-2 bg-orange/5 rounded-lg px-3 py-2">
                <span className="text-orange font-bold text-sm mt-0.5">●</span>
                <p className="text-sm text-black/60 leading-snug">{theme}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-black/50 mt-4 leading-relaxed">
            That listening shaped the vision. Now Summit brings its community into the design
            process itself. Students, families, and educators are co-designers — not recipients of
            a finished product. This is deliberate. It takes more time. We believe it produces
            better results.
          </p>
        </motion.div>

        {/* C5 — How the model gets built (phases) */}
        <div className="max-w-2xl mx-auto mb-10">
          <h3 className="text-lg font-bold text-indigo mb-6 text-center">How the model gets built</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-indigo/20" />
            {phases.map((phase, i) => (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className={`relative pl-12 pb-8 last:pb-0 ${i === 2 ? 'bg-indigo/5 rounded-xl p-4 pl-12 border border-indigo/10' : ''}`}
              >
                <div className={`absolute left-0 top-0 w-8 h-8 rounded-full ${i === 2 ? 'bg-indigo ring-2 ring-indigo/30' : 'bg-indigo'} text-white text-xs font-bold flex items-center justify-center`}>
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-indigo text-lg">{phase.label}</p>
                  <p className="text-xs font-semibold text-indigo/60 mb-1">{phase.title}</p>
                  <p className="text-black/60 text-sm leading-relaxed">{phase.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* C6 — Codifying the journey */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-indigo rounded-xl p-6 md:p-8 mb-14"
        >
          <h3 className="text-lg font-bold text-white mb-3">Codifying the journey, not just the destination</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            The field needs bright-spot schools designed from scratch. They demonstrate what's
            possible. But alongside that work, we also need proof that an existing public school
            system can make the transition — that a real school, with real staff and real families,
            can move from the traditional model to a fundamentally different one while maintaining
            stability, keeping community trust, and continuing to serve students every day. Summit
            is building that evidence base.
          </p>
        </motion.div>

        {/* Coalition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-black/50 leading-relaxed text-sm">
            We're not doing this alone. Summit is building in partnership with communities,
            technology partners, and a growing coalition of schools and funders committed to making
            the transition from the traditional model to something fundamentally better — and proving
            it can be done within real public school systems.
          </p>
          <a
            href="#"
            className="inline-block mt-6 text-indigo font-bold border border-indigo/30 rounded-lg px-6 py-3 hover:bg-indigo/5 transition-colors text-sm"
          >
            Read the full concept note
          </a>
        </motion.div>
      </div>
    </section>
  )
}
