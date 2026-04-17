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
    title: 'A technology stack that sees every student',
    summary:
      'Most education technology tracks compliance and stores materials. Layering AI on top of a compliance-oriented architecture will never produce intelligent resource matching. Summit is building a next-generation LMS with an AI-powered data layer and knowledge graph underneath — giving system architects the tools to see every student, adjust every schedule, and deploy every resource based on real data.',
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
          <h4 className="font-bold text-indigo mb-1">Next-generation LMS</h4>
          <p className="leading-relaxed">
            A purpose-built learning management system designed for flexible, experience-based schools —
            not a traditional LMS with AI bolted on. It manages every learning experience type in a
            single platform: small-group instruction, project studios, field experiences, dual enrollment,
            independent practice, and community circles. System architects use it to view the full school
            in real time, adjust schedules based on the data the AI surfaces, and coordinate educator
            deployment and space allocation. It's the operational layer that makes a school of 400
            personalized pathways actually run.
          </p>
        </div>

        <div className="bg-white/60 rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Data layer</h4>
          <p className="leading-relaxed">
            Multi-dimensional learner profiles capturing academic progress, durable skills, response
            patterns, identity development, experiences, and life context. True personalization requires
            understanding the whole student — including schedule constraints, family responsibilities,
            and support systems. This data feeds directly into the LMS, giving system architects and
            guides a complete picture of every student every day.
          </p>
        </div>

        <div className="bg-white/60 rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Knowledge graph</h4>
          <p className="leading-relaxed">
            A structured representation of educational pathways encoding competencies, experiences,
            credentials, and labor market outcomes. Edge weights learned from alumni trajectories and
            longitudinal research, continuously updated. The AI uses the knowledge graph to recommend
            which experiences each student needs next — and the system architects review those
            recommendations through the LMS before finalizing the schedule.
          </p>
        </div>

        <div className="bg-white/60 rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Resource matching engine</h4>
          <p className="leading-relaxed">
            An optimization layer that takes a student's current profile, traverses the knowledge graph,
            and generates schedule recommendations — accounting for educator availability, space capacity,
            and partner schedules. Produces outputs for students (coherent next steps), guides
            (undermatch alerts, weakening connections), and system architects (resource prioritization
            and schedule adjustments). This is the practical answer to the batch problem — instead of
            giving all students the same resources at the same time, the system continuously matches
            individual students to specific resources.
          </p>
        </div>
      </div>
    ),
  },
  {
    color: 'teal',
    title: 'An evolved talent model',
    summary:
      'The adults in a school are the most important ingredient. Teacher and school leader turnover is at record highs. The current role has become impossible to execute well. Summit\'s model defines four distinct educator capacities so people can become experts at one thing while living balanced and sustainable lives.',
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
            <span className="font-bold text-teal">Guides</span> — know students deeply, walk alongside
            them on their pathway. Every conversation grounded in data and the student's goals and growth.
          </li>
          <li>
            <span className="font-bold text-teal">Academic interventionists</span> — provide targeted
            expert instruction based on data. Intervene with precision to accelerate mastery. Like specialist
            doctors.
          </li>
          <li>
            <span className="font-bold text-teal">Facilitators</span> — orchestrate projects, real-world
            experiences, and community learning. Experts in interpersonal connection and authentic application.
          </li>
          <li>
            <span className="font-bold text-teal">System architects</span> — see how all parts connect.
            Manage complexity, curate partnerships and resources, ensure quality and equity.
          </li>
        </ul>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-black/10">
                <th className="text-left py-2 pr-4 font-bold text-teal">AI handles</th>
                <th className="text-left py-2 font-bold text-teal">Adults do more of</th>
              </tr>
            </thead>
            <tbody className="text-black/60">
              <tr className="border-b border-black/5">
                <td className="py-2 pr-4">Instant feedback, progress monitoring, data synthesis</td>
                <td className="py-2">Meaningful dialogue about growth, goals, metacognition</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Curriculum customization, scheduling, resource matching</td>
                <td className="py-2">Designing rich learning experiences, supporting motivation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    color: 'orange',
    title: 'Flexible time',
    summary:
      'Most schools treat time as fixed. A student who has mastered a concept sits through the same lesson as one who hasn\'t encountered it yet. When the tech stack can recommend what each student needs and specialized educators are organized to deliver it, time becomes a flexible resource rather than a rigid constraint.',
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

        {/* The simple concept of a school */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl border border-black/10 p-8 mb-12 text-left"
        >
          <p className="text-lg text-black/80 leading-relaxed mb-4">
            A school can be most simply thought of as three things: a group of young people,
            a package of outcomes and competencies, and a set of available resources. That's it.
            <span className="font-bold text-indigo"> A school is kids, outcomes, and resources.</span>
          </p>
          <p className="text-black/70 leading-relaxed mb-4">
            All children are different. They need different types, frequencies, and amounts of
            learning resources to develop any given competency. Traditional schooling batches
            resource allocation into groups of 25-35 same-aged students regardless of need. At any
            given moment, most students are not receiving the right resource in the right amount
            at the right time. Time is the only truly scarce resource in education, and the
            traditional model wastes it at scale.
          </p>
          <p className="text-black/70 leading-relaxed">
            Summit sees three levers that unlock innovative design:
            <span className="font-bold text-indigo"> how we use time</span>,
            <span className="font-bold text-teal"> how we deploy talent</span>, and
            <span className="font-bold text-orange"> how technology connects students to the right
            resources at the right time</span>.
          </p>
        </motion.div>

        {/* Three expandable cards */}
        <div className="space-y-4">
          {unlocks.map((unlock) => (
            <ExpandableCard key={unlock.title} unlock={unlock} color={unlock.color} />
          ))}
        </div>

        {/* Connecting flow */}
        <div className="hidden md:flex items-center justify-center mt-10 gap-3 text-sm text-black/40">
          <span className="text-indigo font-bold">Technology</span>
          <span>→</span>
          <span className="text-teal font-bold">Talent evolution</span>
          <span>→</span>
          <span className="text-orange font-bold">Flexible time</span>
          <span>→</span>
          <span className="text-black/60 font-bold">Curated learning</span>
        </div>
      </div>
    </section>
  )
}
