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
              {school.closingLine && (
                <p className={`text-xs font-bold ${c.text} mt-4 pt-3 border-t border-black/5`}>
                  {school.closingLine}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const schools = [
  {
    name: 'Summit Sierra',
    location: 'Seattle, WA',
    tagline: 'Proving the engine.',
    summary:
      'Sierra is running the Kira Learning platform across all core academics — powering data-driven learning modes with AI tools — and using that foundation to pilot a fully flexible schedule one day per week.',
    details: [
      {
        heading: 'The platform',
        body: 'Every core academic course runs on Kira: combined humanities, Open SciEd science, and Illustrative Mathematics. AI tutoring, auto-grading, real-time cross-subject data, and personalized recommendations. Teachers see how every student is doing across every course, every day.',
      },
      {
        heading: 'Monday through Friday (except Wednesday)',
        body: 'Teachers use Kira\'s data and tools to run the Summit learning model within the block schedule: teacher-led instruction, self-directed work with AI tutor support, and collaborative learning — with the balance driven by data rather than a fixed split.',
      },
      {
        heading: 'Wednesday: the bell schedule dissolves',
        body: 'Students are routed across the school based on what the cross-subject data says they need: targeted intervention with a specific teacher, extended practice, collaborative projects, or enrichment. Wednesday is only possible because of the common data layer Kira provides across all subjects on block schedule days.',
      },
      {
        heading: 'What Sierra is learning',
        body: 'Does the platform power the model? Can data-driven scheduling produce a meaningfully different day for different students? When the platform handles grading, feedback, and learning sequence recommendations, what does the educator capacity shift toward?',
      },
    ],
    closingLine: 'Sierra proves the engine. Summit Prep tests what that engine can power.',
  },
  {
    name: 'Summit Prep',
    location: 'Redwood City, CA',
    tagline: 'Testing the pathway experience.',
    summary:
      'Summit 780 is a cohort-based pilot for Prep\'s 11th grade — building out the pathway experience supported by AI and guided by a human. Redesigned mentoring, student-designed pathway projects, and ASU dual enrollment, all connected through the PLP.',
    details: [
      {
        heading: 'Redesigned mentoring',
        body: 'The PLP becomes a living guide for every mentor-student relationship. Structured step-backs every six weeks, AI-assisted scaffolding to support goal-setting, and mentor conversations anchored in each student\'s long-term goals — not reactive to whatever surfaced that week.',
      },
      {
        heading: 'Pathway projects',
        body: 'Opt-in students design a year-long project connected to their PLP, expedition experiences, and real-world professional relationships. Done in community, not in isolation. The project must produce something tangible — a real artifact students can point to and speak about.',
      },
      {
        heading: 'ASU dual enrollment',
        body: 'Students select one ASU course from a 70+ course catalog, aligned to their PLP and pathway project goals. Asynchronous, with a certified teacher present. Earns real college credit and adds a personalized learning dimension.',
      },
      {
        heading: 'What Prep is testing',
        body: 'Whether PLP-driven mentoring produces meaningfully stronger outcomes. Whether student-designed projects change how students see connections between all parts of their learning. Whether a rising 12th grader can point to something real they built and articulate the skills it required.',
      },
    ],
    closingLine: 'Together, the two focal schools generate the evidence base for network-wide scaling.',
  },
]

const timeline = [
  {
    year: 'SY27',
    focus: 'Community design launches at both focal schools. Rapid iteration. Sierra runs Kira platform-wide, tests flexible Wednesday. Prep launches Summit 780 mentoring redesign + pathway projects.',
  },
  {
    year: 'SY28',
    focus: 'Proven designs into sustained operation. Prep spreads redesigned mentoring to all mentor groups. Sierra extends flexible scheduling. Codification begins.',
  },
  {
    year: 'SY29',
    focus: 'Designs converge into one codified model. Summit 3.0 operational at both schools. Scaling plan ready for the network.',
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
            The build
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Two focal schools, each testing a different layer of the model.
            Together they generate the proof points for network-wide scaling.
          </p>
        </motion.div>

        {/* Two focal schools */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <SchoolCard school={schools[0]} color="indigo" inView={inView} delay={0.1} />
          <SchoolCard school={schools[1]} color="teal" inView={inView} delay={0.2} />
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto mb-14">
          <h3 className="text-lg font-bold text-indigo mb-6 text-center">Three-year arc</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-indigo/20" />
            {timeline.map((step, i) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="relative pl-12 pb-8 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-indigo text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-indigo text-lg">{step.year}</p>
                  <p className="text-black/60 text-sm leading-relaxed">{step.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coalition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-black/50 leading-relaxed text-sm">
            We're not doing this alone. Summit is building in partnership with communities,
            technology partners, and a growing coalition of schools and funders who believe the
            traditional model of school has run its course.
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
