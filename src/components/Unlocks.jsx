import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

function ExpandableCard({ unlock, color }) {
  const [open, setOpen] = useState(false)

  const colorMap = {
    indigo: { bg: 'bg-indigo/10', border: 'border-indigo/20', text: 'text-indigo', icon: 'text-indigo', dot: 'bg-indigo', hoverBg: 'hover:bg-indigo/15' },
    teal: { bg: 'bg-teal/10', border: 'border-teal/20', text: 'text-teal', icon: 'text-teal', dot: 'bg-teal', hoverBg: 'hover:bg-teal/15' },
    orange: { bg: 'bg-orange/10', border: 'border-orange/20', text: 'text-orange', icon: 'text-orange', dot: 'bg-orange', hoverBg: 'hover:bg-orange/15' },
  }
  const c = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`${c.bg} border ${c.border} rounded-xl overflow-hidden`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left p-6 ${c.hoverBg} transition-colors`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0 ${c.icon}`}>
            {unlock.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${c.text} mb-2`}>{unlock.title}</h3>
            <p className="text-sm text-black/70 leading-relaxed">{unlock.summary}</p>
          </div>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={`w-5 h-5 shrink-0 mt-1 ${c.text}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="border-t border-black/10 pt-4">
                {unlock.expandedContent}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const unlocks = [
  {
    color: 'indigo',
    title: 'Technology that matches the right resources to the right groups of students at the right time',
    summary:
      'Summit is building a stack that customizes learning resources and matches them to the right group of students at the right time. The system sees every student, every educator, every space, and every partner, and produces schedules built around what each student needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="2" />
        <circle cx="15" cy="15" r="2" fill="currentColor" />
      </svg>
    ),
    expandedContent: (
      <div className="space-y-5 text-sm text-black/70">
        <p className="font-bold text-black/80">The tech stack has four key layers:</p>

        <div className="bg-white/60 rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Learning management system (LMS)</h4>
          <p className="leading-relaxed">
            The interface where students and educators interact with digital representations of
            learning experiences. A student might be submitting a final product, uploading a picture
            of their work, taking a quiz, or checking into a new experience. The LMS is where all of
            that happens. It's purpose-built for flexible, experience-based schools, managing every
            learning experience type in a single platform: small-group instruction, project studios,
            field experiences, dual enrollment, independent practice, and community circles.
          </p>
        </div>

        <div className="bg-white/60 rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Data layer</h4>
          <p className="leading-relaxed">
            Multi-dimensional learner profiles capturing academic progress, durable skills, response
            patterns, identity development, experiences, and life context. True personalization requires
            understanding the whole student, including schedule constraints, family responsibilities,
            and support systems. This data feeds directly into the LMS, giving System Architects and
            guides a complete picture of every student every day.
          </p>
        </div>

        <div className="bg-white/60 rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Knowledge graph</h4>
          <p className="leading-relaxed">
            The intelligence layer that powers pathway recommendations. The AI uses it to figure out
            not just what experience to recommend next, but to continually update each student's
            pathway as new data comes in, incorporating competencies, credentials, experiences, and
            labor market outcomes. It learns from alumni trajectories and longitudinal research,
            continuously refining its understanding of what works for different students. System
            architects review the pathway recommendations it surfaces through the LMS before
            finalizing schedules.
          </p>
        </div>

        <div className="bg-white/60 rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Resource matching engine</h4>
          <p className="leading-relaxed">
            The optimization layer that takes pathway recommendations and matches them to available
            resources and experiences. It charts everything dynamically across the complexity of the
            system (educator availability, space capacity, partner schedules, student needs) to
            produce individualized student schedules. Instead of giving all students the same resources
            at the same time, the engine continuously matches groups of students to the resources they need,
            producing outputs for students (coherent next steps), guides (undermatch alerts, weakening
            connections), and System Architects (resource prioritization and schedule adjustments).
          </p>
        </div>

        <div className="mt-2 bg-indigo/5 rounded-lg p-3 border border-indigo/10">
          <p className="text-xs text-black/50 leading-relaxed">
            <span className="font-bold text-indigo/70">The flow:</span> LMS (interface) → Data layer (student profiles) → Knowledge graph (pathway intelligence) → Resource matching (schedule optimization)
          </p>
        </div>
      </div>
    ),
  },
  {
    color: 'teal',
    title: 'An evolved talent model',
    summary:
      'The adults in a school are the most important ingredient, and the current role has become impossible to execute well. Teacher and school leader turnover is at record highs. Summit\u2019s model defines four specialized educator capacities (guiding, providing content expertise, facilitating, and architecting the system) so adults can develop deep expertise and live fulfilling, sustainable lives, the same outcome the model is built to give students. AI handles what AI does well; educators focus on what only humans can do.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="5" cy="17" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="19" cy="17" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="19" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    expandedContent: (
      <div className="space-y-4 text-sm text-black/70">
        <p className="font-bold text-black/80">Four capacities:</p>
        <ul className="space-y-3">
          <li>
            <span className="font-bold text-teal">Guiding</span>: knowing students deeply and walking alongside
            them on their pathway. Every conversation grounded in data and the student's goals and growth.
          </li>
          <li>
            <span className="font-bold text-teal">Providing content expertise</span>: delivering targeted instruction
            based on data. Bringing deep subject-matter knowledge to accelerate mastery where students
            need it most.
          </li>
          <li>
            <span className="font-bold text-teal">Facilitating</span>: orchestrating projects, real-world
            experiences, and community learning. Designing for interpersonal connection and authentic application.
          </li>
          <li>
            <span className="font-bold text-teal">Architecting the system</span>: seeing how all parts connect.
            Managing complexity, curating partnerships and resources, ensuring quality and equity.
          </li>
        </ul>

        <div className="mt-4 bg-orange/5 rounded-lg p-3 border border-orange/10">
          <p className="text-sm text-black/70 leading-relaxed">
            <span className="font-bold text-orange">Human-centered guidance is not one adult's job.</span> It's
            a system that ensures the right adult is doing the right thing at the right moment, informed
            by each student's pathway, helping young people situate all of their learning within the
            broader human experience for themselves, their community, and their world.
          </p>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-lg p-4">
            <h4 className="font-bold text-teal mb-3 text-xs tracking-wide">AI handles</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-teal mt-0.5 shrink-0">-</span>
                Instant feedback on student work
              </li>
              <li className="flex gap-2">
                <span className="text-teal mt-0.5 shrink-0">-</span>
                Progress monitoring and data synthesis
              </li>
              <li className="flex gap-2">
                <span className="text-teal mt-0.5 shrink-0">-</span>
                Curriculum customization and content delivery
              </li>
              <li className="flex gap-2">
                <span className="text-teal mt-0.5 shrink-0">-</span>
                Scheduling and resource matching
              </li>
            </ul>
          </div>
          <div className="bg-white/60 rounded-lg p-4 ring-1 ring-teal/20">
            <h4 className="font-bold text-teal mb-3 text-xs tracking-wide">Adults do more of</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-teal mt-0.5 shrink-0">+</span>
                Meaningful dialogue about growth and goals
              </li>
              <li className="flex gap-2">
                <span className="text-teal mt-0.5 shrink-0">+</span>
                Metacognition and identity development
              </li>
              <li className="flex gap-2">
                <span className="text-teal mt-0.5 shrink-0">+</span>
                Designing rich learning experiences
              </li>
              <li className="flex gap-2">
                <span className="text-teal mt-0.5 shrink-0">+</span>
                Supporting motivation and connection
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    color: 'orange',
    title: 'Flexible time',
    summary:
      'Time is the most valuable resource in a school. Most schools treat it as fixed: every student gets the same amount of every subject, regardless of where they are. Summit 3.0 treats time as the resource we flex around what each student actually needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    expandedContent: (
      <div className="text-sm text-black/70">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-lg p-4">
            <h4 className="font-bold text-black/50 mb-2 text-xs tracking-wide">Traditional</h4>
            <ul className="space-y-2 text-black/50">
              <li className="flex gap-2">
                <span className="text-tan-grey mt-0.5">-</span>
                Fixed periods, uniform pacing
              </li>
              <li className="flex gap-2">
                <span className="text-tan-grey mt-0.5">-</span>
                Schedule built around adult staffing
              </li>
              <li className="flex gap-2">
                <span className="text-tan-grey mt-0.5">-</span>
                Intervention outside core classes
              </li>
              <li className="flex gap-2">
                <span className="text-tan-grey mt-0.5">-</span>
                Real-world experiences locked into set windows
              </li>
            </ul>
          </div>
          <div className="bg-white/60 rounded-lg p-4 ring-1 ring-orange/20">
            <h4 className="font-bold text-orange mb-2 text-xs tracking-wide">Summit 3.0</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-orange mt-0.5">+</span>
                Students move between experience types based on data
              </li>
              <li className="flex gap-2">
                <span className="text-orange mt-0.5">+</span>
                Schedule built around student learning needs enabled by specialized roles
              </li>
              <li className="flex gap-2">
                <span className="text-orange mt-0.5">+</span>
                Intervention embedded in daily flow
              </li>
              <li className="flex gap-2">
                <span className="text-orange mt-0.5">+</span>
                Career-connected learning integrated throughout
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
]

export default function Unlocks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-peach/10" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">The operating system underneath</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-6">
            How it's possible
          </h2>
        </motion.div>

        {/* Bridging from the industrial model section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl border border-black/10 p-8 mb-12 text-left"
        >
          <p className="text-lg text-black leading-relaxed mb-4">
            Evolving the industrial model to maximize every student's potential requires getting
            down to fundamental principles about what a school actually is.
          </p>
          <p className="text-black leading-relaxed mb-4">
            A school can be most simply thought of as three things: a group of young people, a
            package of outcomes and competencies, and a set of available resources. The industrial
            model locks those three elements into a single configuration: same students, same
            outcomes, same resources, same schedule, every day. That uniformity is what made it
            transformative, but it's also now what makes it increasingly ineffective.
          </p>
          <p className="text-black leading-relaxed mb-4">
            Students arrive with different knowledge, experiences, and interests, and need different
            types, frequencies, and amounts of learning resources to build on what they bring. Time
            is the most valuable resource in a school, and Summit 3.0 is designed to maximize this
            finite resource. A redesign this comprehensive starts from these fundamentals and
            builds the operating system that makes something better actually work.
          </p>
          <p className="text-black leading-relaxed">
            The pathway model requires that operating system. Three levers unlock it:
            <span className="font-bold text-indigo"> how technology connects students to the right
            resources at the right time</span>,
            <span className="font-bold text-teal"> how we deploy talent</span>, and
            <span className="font-bold text-orange"> how we use time</span>.
          </p>
        </motion.div>

        {/* Three expandable cards */}
        <div className="space-y-4">
          {unlocks.map((unlock) => (
            <ExpandableCard key={unlock.title} unlock={unlock} color={unlock.color} />
          ))}
        </div>
      </div>
    </section>
  )
}
