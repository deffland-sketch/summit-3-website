import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

function SchoolCard({ school, color, inView, delay }) {
  const [open, setOpen] = useState(false)
  const colorMap = {
    indigo: { bg: 'bg-indigo/5', border: 'border-indigo/15', text: 'text-indigo', accent: 'bg-indigo' },
    teal: { bg: 'bg-teal/5', border: 'border-teal/15', text: 'text-teal', accent: 'bg-teal' },
  }
  const c = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`bg-white rounded-xl border ${c.border} overflow-hidden`}
    >
      <div className="p-6">
        <div className={`w-2 h-2 rounded-full ${c.accent} mb-3`} />
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className={`text-xl font-bold ${c.text}`}>{school.name}</h3>
          <span className="text-sm text-black/40">{school.location}</span>
        </div>
        <p className={`text-sm font-bold ${c.text} mb-3`}>{school.tagline}</p>
        <p className="text-sm text-black/70 leading-relaxed mb-4">{school.summary}</p>

        <button
          onClick={() => setOpen(!open)}
          className={`text-xs font-bold ${c.text} flex items-center gap-1`}
        >
          {open ? 'Show less' : 'What they\'re testing'}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </motion.svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-6 pb-6 pt-2 ${c.bg}`}>
              {school.details.map((detail, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <p className="text-sm font-bold text-black/80 mb-1">{detail.heading}</p>
                  <p className="text-sm text-black/60 leading-relaxed">{detail.body}</p>
                </div>
              ))}
              {school.agency && (
                <div className="mt-4 pt-3 border-t border-black/5">
                  <p className={`text-xs font-bold ${c.text} mb-1`}>How agency grows here</p>
                  <p className="text-xs text-black/55 leading-relaxed">{school.agency}</p>
                </div>
              )}
              {school.closingLine && (
                <p className={`text-xs font-bold ${c.text} mt-4 pt-3 border-t border-black/5`}>
                  {school.closingLine}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {school.convergenceLine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="px-6 pb-5"
        >
          <div className="border-t border-black/5 pt-3">
            <p className={`text-xs ${c.text} leading-relaxed opacity-70`}>
              {school.convergenceLine}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

const schools = [
  {
    name: 'Summit Sierra',
    location: 'Seattle, WA',
    tagline: 'Proving the engine.',
    summary:
      'Sierra is testing an AI-powered adaptive curriculum within core academics, and using that foundation to explore a more flexible schedule and how educator roles evolve under those conditions.',
    details: [
      {
        heading: 'The platform',
        body: 'Core academic courses run on an adaptive platform. Teachers leverage HQIM (high-quality instructional materials) and collaboratively developed interdisciplinary projects, supported by AI tutoring, auto-grading, and real-time cross-subject data.',
      },
      {
        heading: 'Scheduling',
        body: 'Teachers start by using the platform\'s data and tools to run the Summit learning model within the block schedule: teacher-led instruction, self-directed work with AI tutor support, and collaborative learning — with the balance driven by data rather than a fixed split. As the pilot matures, Sierra begins to explore schedule flexibility — using the common data layer across all subjects to route students to the experiences they need most, whether that\'s targeted support, extended practice, or collaborative projects.',
      },
      {
        heading: 'What Sierra is learning',
        body: 'What\'s the impact of AI-powered adaptive learning materials on student outcomes? As the data layer matures, can it drive more differentiated schedules for students? When the platform handles more of the work of scoring, feedback, and differentiation, how does the educator role shift?',
      },
    ],
    closingLine: 'Sierra proves the engine — the academic foundation of the model.',
    convergenceLine: 'Sierra\'s proven data layer and scheduling logic become the engine that Prep\'s pathway model plugs into.',
    agency: 'Students gain agency over how they learn core academics: the pace, the resource, the approach. As the data layer matures and the schedule flexes, students begin choosing between experience types based on what they need next.',
  },
  {
    name: 'Summit Prep',
    location: 'Redwood City, CA',
    tagline: 'Testing the pathway experience.',
    summary:
      'Summit 780 is a cohort-based pilot for Prep\'s 11th grade — developing the infrastructure for human-centered guidance and an interconnected pathway experience. Redesigned mentoring, student-designed pathway projects, and ASU dual enrollment, all connected through Summit\'s PLP (personalized learning plan).',
    details: [
      {
        heading: 'Redesigned mentoring',
        body: 'The PLP becomes a living guide for every mentor-student relationship. Structured step-backs every six weeks, AI-assisted scaffolding to support goal-setting, and mentor conversations anchored in each student\'s long-term goals — not reactive to whatever surfaced that week. Human-centered guidance is at the core: the mentor helps each student see how their academic work, projects, and experiences connect into a coherent pathway.',
      },
      {
        heading: 'Pathway projects',
        body: 'Opt-in students design a year-long project connected to their PLP, expedition experiences, and real-world professional relationships. Done in community, not in isolation. The project must produce something tangible — a real artifact students can point to and speak about. Each project deepens a student\'s pathway, making the connections between learning experiences visible and intentional.',
      },
      {
        heading: 'ASU dual enrollment',
        body: 'Students select one ASU course from a 70+ course catalog, aligned to their PLP and pathway project goals. Asynchronous, with a certified teacher present. Earns real college credit and adds a personalized dimension that extends the pathway beyond the school walls.',
      },
      {
        heading: 'What Prep is learning',
        body: 'Whether PLP-driven mentoring — with a human guide at the center — produces meaningfully stronger outcomes. Whether student-designed projects change how students see connections across all parts of their pathway. Whether the infrastructure for human-centered guidance makes each student\'s journey more coherent, more connected, and more their own.',
      },
    ],
    closingLine: 'Together, the two focal schools generate the evidence base for network-wide scaling.',
    convergenceLine: 'Prep\'s proven pathway and guidance model become the experience layer that Sierra\'s flexible schedule serves.',
    agency: 'Students gain agency over the pathway itself. They co-lead PLP reviews with their guides, design their own pathway projects, and choose the dual enrollment direction that matches where they\'re headed. The 11th-grade cohort is where pathway ownership starts to become real.',
  },
]

const timeline = [
  {
    year: 'SY27',
    title: 'Build the foundations separately',
    focus: 'Sierra proves the data-to-schedule flywheel: an adaptive platform generates real-time learner data within core academics, and teachers begin using that data to differentiate within the block schedule. Prep proves the pathway experience: PLP-driven mentoring, student-designed pathway projects, and dual enrollment create a coherent journey for 11th graders. Both schools generate learning that informs the other. 6-8 system pilots test individual elements at other Summit schools.',
  },
  {
    year: 'SY28',
    title: 'Cross-pollinate and extend',
    focus: 'Sierra begins flexing the schedule based on proven data — students start moving between experience types based on what the system recommends, not just what the bell schedule dictates. Prep spreads the redesigned pathway model to all mentor groups and begins integrating data-driven scheduling logic from Sierra\'s work. Cross-site design sprints merge the two lines of development. Pilot findings from across the network feed into codification.',
  },
  {
    year: 'SY29',
    title: 'One codified model',
    focus: 'Pathway logic drives what each student needs. The scheduling engine delivers the right experience at the right time. Human guidance holds it together. One codified, evidence-backed model operating at both sites, documented for network scaling. Summit shares what it learns through case studies, publications, and practitioner-facing resources.',
  },
]

export default function TheBuild() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-peach/10" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">How we get there</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            Building with our community
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Summit builds alongside its students, families, and educators — because design that is
            durable, owned, and scalable can only come from the community itself. Two focal schools
            anchor this work, each chosen for what it uniquely brings. Sierra operates under
            Washington state's greater flexibility with instructional minutes. The small size of the
            school is well suited to a pilot exploring the intersection of AI, adaptive learning
            resources, and flexibility with time and educator roles. Prep draws on a staff with
            strength in mentoring and a community with a desire for greater dual enrollment and
            pathway-connected learning experiences. Together they support building the full model.
          </p>
        </motion.div>

        {/* Listening tour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border border-black/8 p-6 md:p-8 mb-10"
        >
          <h3 className="text-lg font-bold text-indigo mb-3">Shaped by listening</h3>
          <p className="text-sm text-black/60 leading-relaxed mb-4">
            In Fall 2025, Summit conducted a listening tour across every campus — students at all
            grade levels, caregivers with varied backgrounds, and every teaching team. Six consistent
            themes emerged:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'The quality and character of the adults in school matter most',
              'Mentoring and relationships are prized by all',
              'AI readiness and critical thinking are essential',
              'Career-connected learning is deeply valued',
              'College-ready academics and real-world readiness are both essential',
              'Greater flexibility for how students learn and adults work',
            ].map((theme, i) => (
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

        {/* Two starting points, one model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <h3 className="text-lg font-bold text-indigo mb-3">Two starting points, one model</h3>
          <p className="text-sm text-black/60 leading-relaxed">
            The model we're building requires three things working together: flexible scheduling
            powered by real-time data, a pathway that gives each student's experience coherence,
            and human guidance that holds it all together. You can't build all three simultaneously
            — each depends on the others being partially in place. So each focal school starts with
            the piece it's best positioned to prove. Sierra starts with{' '}
            <span className="text-indigo font-semibold">the engine</span>: can adaptive technology
            and real-time data drive flexible scheduling in core academics? Prep starts with{' '}
            <span className="text-teal font-semibold">the experience</span>: can a redesigned
            pathway with human guidance make every part of a student's learning feel connected and
            coherent? The two lines of work inform each other from Year 1 and{' '}
            <span className="text-indigo font-semibold">converge into one model</span> by Year 3.
          </p>
        </motion.div>

        {/* Two focal schools */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <SchoolCard school={schools[0]} color="indigo" inView={inView} delay={0.1} />
          <SchoolCard school={schools[1]} color="teal" inView={inView} delay={0.2} />
        </div>

        {/* System pilots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-teal/5 rounded-xl border border-teal/10 p-6 md:p-8 mb-14"
        >
          <h3 className="text-lg font-bold text-teal mb-3">System pilots</h3>
          <p className="text-sm text-black/60 leading-relaxed">
            Six to eight targeted pilots per year serve three purposes. First, they pressure-test
            focal school designs in different contexts — does what works at Prep transfer to a school
            with different demographics, staff, and conditions? Second, they build coalition across
            the network — every school that runs a pilot becomes an early adopter when the codified
            model is ready to scale, and the educators who led pilots become the internal champions
            for adoption. Third, a small number of pilots explore emerging possibilities — uses of
            technology or learning configurations that don't yet fit neatly into the model but are
            worth investigating while the tools are rapidly evolving.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto mb-10">
          <h3 className="text-lg font-bold text-indigo mb-6 text-center">Three-year arc</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-indigo/20" />
            {timeline.map((step, i) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className={`relative pl-12 pb-8 last:pb-0 ${i === 2 ? 'bg-indigo/5 rounded-xl p-4 pl-12 border border-indigo/10' : ''}`}
              >
                <div className={`absolute left-0 top-0 w-8 h-8 rounded-full ${i === 2 ? 'bg-indigo ring-2 ring-indigo/30' : 'bg-indigo'} text-white text-xs font-bold flex items-center justify-center`}>
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-indigo text-lg">{step.year}</p>
                  <p className="text-xs font-semibold text-indigo/60 mb-1">{step.title}</p>
                  <p className="text-black/60 text-sm leading-relaxed">{step.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Codifying the journey */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-indigo rounded-xl p-6 md:p-8 mb-14"
        >
          <h3 className="text-lg font-bold text-white mb-3">Codifying the journey, not just the destination</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Most conversations about future-ready school models focus on what the new model looks
            like. Summit is equally focused on how an existing public school system gets there. The
            transition pathway — how a school moves from the traditional model to a fundamentally
            different one while maintaining stability, keeping community trust, and continuing to
            serve students every day — is as important as the model itself. If the only proof points
            are schools that were designed from scratch, the work stays confined to bright spots.
            Summit is building the evidence base for how a real school, with real staff and real
            families, makes the transition. That's what makes this work scalable to the thousands of
            schools that need it.
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
