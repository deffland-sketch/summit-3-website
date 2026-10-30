import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Chevron } from './Chevron'

function ExpandableCard({ unlock, color }) {
  const [open, setOpen] = useState(false)

  // White cards with a single brand-color top accent, matching Purpose.
  // `text` uses the -ink variants: raw brand teal and orange fall below the AA
  // contrast floor as text.
  const colorMap = {
    indigo: { bg: 'bg-indigo/10', top: 'border-t-indigo', text: 'text-indigo', icon: 'text-indigo', dot: 'bg-indigo', hoverBg: 'hover:bg-indigo/[0.03]' },
    teal: { bg: 'bg-teal/10', top: 'border-t-teal', text: 'text-teal-ink', icon: 'text-teal-ink', dot: 'bg-teal', hoverBg: 'hover:bg-teal/[0.04]' },
    orange: { bg: 'bg-orange/10', top: 'border-t-orange', text: 'text-orange-ink', icon: 'text-orange-ink', dot: 'bg-orange', hoverBg: 'hover:bg-orange/[0.05]' },
  }
  const c = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-white border border-black/8 border-t-4 ${c.top} rounded-xl overflow-hidden`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left p-6 ${c.hoverBg} transition-colors`}
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0 ${c.icon}`}>
            {unlock.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${c.text} mb-2`}>{unlock.title}</h3>
            <p className="text-sm text-black/70 leading-relaxed">{unlock.summary}</p>
          </div>
          <Chevron open={open} className={`mt-1 ${c.text}`} />
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
    color: 'orange',
    title: 'Flexible Time',
    summary:
      'Time flexes first. Schools have long given every student the same amount of every subject, at the same pace. Summit 3.0 personalizes the academic core by flexing time around each student, so a student who is ready moves on, a student who needs more gets more, and the schedule adjusts as they grow.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    expandedContent: (
      <div className="text-sm text-black/70 space-y-4">
        <p className="leading-relaxed">
          Mentoring and Expeditions are already deeply personal to each student. Flexing time brings
          the same personalization to math, reading, writing, and science: small-group lessons for the
          students ready this week, more practice for the students who need it, and room in the week
          for real-world learning. Time flexes on three timescales.
        </p>
        <ul className="space-y-3">
          <li>
            <span className="font-bold text-orange-ink">Day</span>: small adjustments overnight from the
            day's evidence. A student's draft shows two writing skills within reach, so a 10:30 lesson is
            added to her morning.
          </li>
          <li>
            <span className="font-bold text-orange-ink">Week</span>: the engine builds each student's week
            from Friday goal-setting, their progress, and which educators, spaces, and partner slots are
            open. Student and mentor look it over Monday morning and confirm it.
          </li>
          <li>
            <span className="font-bold text-orange-ink">Season</span>: stretches of the year can be built
            around one experience, with academic work pausing and resuming around it. A student spends two
            weeks full time in a hospital internship, then comes back for a three-week math intensive.
          </li>
        </ul>
        <p className="leading-relaxed">
          How far time flexes depends on a school's grade span and size. The section below shows the
          three forms it takes across Summit.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-black/[0.03] rounded-lg p-4">
            <h4 className="font-bold text-black/50 mb-2 text-xs tracking-wide">Traditional</h4>
            <ul className="space-y-2 text-black/50">
              <li className="flex gap-2">
                <span className="text-tan-grey-ink mt-0.5">-</span>
                Fixed periods, uniform pacing
              </li>
              <li className="flex gap-2">
                <span className="text-tan-grey-ink mt-0.5">-</span>
                Schedule built around adult staffing
              </li>
              <li className="flex gap-2">
                <span className="text-tan-grey-ink mt-0.5">-</span>
                Intervention outside core classes
              </li>
              <li className="flex gap-2">
                <span className="text-tan-grey-ink mt-0.5">-</span>
                Real-world experiences locked into set windows
              </li>
            </ul>
          </div>
          <div className="bg-black/[0.03] rounded-lg p-4 ring-1 ring-orange/20">
            <h4 className="font-bold text-orange-ink mb-2 text-xs tracking-wide">Summit 3.0</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-orange-ink mt-0.5">+</span>
                Students move between experience types based on data
              </li>
              <li className="flex gap-2">
                <span className="text-orange-ink mt-0.5">+</span>
                Schedule built around student learning needs enabled by specialized roles
              </li>
              <li className="flex gap-2">
                <span className="text-orange-ink mt-0.5">+</span>
                Intervention embedded in daily flow
              </li>
              <li className="flex gap-2">
                <span className="text-orange-ink mt-0.5">+</span>
                Career-connected learning integrated throughout
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    color: 'teal',
    title: 'Educator Roles That Evolve With It',
    summary:
      'Great educators are the foundation of every Summit school, and families told us to keep them at the center. Over time, one role has been asked to carry nearly everything. Summit 3.0 organizes the work into four capacities: mentoring, learning strategies coaching, content expertise, and project facilitation. Educators typically focus on two. The network strategy is to develop expertise along the four capacities and create more flexible roles so educators can specialize in one or two, with partner educators teaching and hosting in their own fields.',
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
        <p className="font-bold text-black/80">Four capacities, plus partners. Educators typically focus on two.</p>
        <ul className="space-y-3">
          <li>
            <span className="font-bold text-teal-ink">Mentoring</span>: a long-term mentor who knows each student deeply
            and coaches both their learning and their pathway. Every conversation grounded in data and the
            student's goals and growth.
          </li>
          <li>
            <span className="font-bold text-teal-ink">Learning strategies coaching</span>: helping students understand
            how the brain learns, and building the habits that make learning stick: planning, persistence, and
            managing attention and devices.
          </li>
          <li>
            <span className="font-bold text-teal-ink">Content expertise</span>: targeted instruction in math, science,
            reading and writing, scheduled by need, so students master what they need next and grow faster.
          </li>
          <li>
            <span className="font-bold text-teal-ink">Project facilitation</span>: running complex, student-directed
            Expedition projects and peer critique, designed for real connection and authentic application.
          </li>
          <li>
            <span className="font-bold text-teal-ink">Partner educators</span>: a named host at every partner
            organization, from a college instructor to a workplace supervisor, who teaches or hosts students for
            anything from an hour to a full course or internship.
          </li>
        </ul>

        <div className="mt-4 bg-orange/5 rounded-lg p-3 border border-orange/10">
          <p className="text-sm text-black/70 leading-relaxed">
            <span className="font-bold text-orange-ink">Human-centered guidance is shared.</span> It's a
            system that puts the right adult with each student at the right moment, informed by each
            student's pathway, helping young people situate their learning within the broader human
            experience for themselves, their community, and their world.
          </p>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-black/[0.03] rounded-lg p-4">
            <h4 className="font-bold text-teal-ink mb-3 text-xs tracking-wide">AI Handles</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-teal-ink mt-0.5 shrink-0">-</span>
                Instant feedback on student work
              </li>
              <li className="flex gap-2">
                <span className="text-teal-ink mt-0.5 shrink-0">-</span>
                Progress monitoring and data synthesis
              </li>
              <li className="flex gap-2">
                <span className="text-teal-ink mt-0.5 shrink-0">-</span>
                Curriculum customization and content selection
              </li>
              <li className="flex gap-2">
                <span className="text-teal-ink mt-0.5 shrink-0">-</span>
                Scheduling and resource matching
              </li>
            </ul>
          </div>
          <div className="bg-black/[0.03] rounded-lg p-4 ring-1 ring-teal/20">
            <h4 className="font-bold text-teal-ink mb-3 text-xs tracking-wide">Adults Do More Of</h4>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-teal-ink mt-0.5 shrink-0">+</span>
                Meaningful dialogue about growth and goals
              </li>
              <li className="flex gap-2">
                <span className="text-teal-ink mt-0.5 shrink-0">+</span>
                Metacognition and identity development
              </li>
              <li className="flex gap-2">
                <span className="text-teal-ink mt-0.5 shrink-0">+</span>
                Designing rich learning experiences
              </li>
              <li className="flex gap-2">
                <span className="text-teal-ink mt-0.5 shrink-0">+</span>
                Supporting motivation and connection
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    color: 'indigo',
    title: 'Technology That Builds Each Student\u2019s Schedule',
    summary:
      'A learning platform builds each student\u2019s schedule from their needs and progress, and shows every educator who they\u2019re teaching, where, and why. Technology recommends. People decide.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="2" />
        <circle cx="15" cy="15" r="2" fill="currentColor" />
      </svg>
    ),
    expandedContent: (
      <div className="space-y-5 text-sm text-black/70">
        <div className="bg-black/[0.03] rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Where Technology Fits</h4>
          <p className="leading-relaxed">
            Technology does more of the measuring, connecting, and scheduling so adults can do more
            of the human work. Some of the most important parts of the day have no screen at all:
            community, discussion, real-world experience, and time to eat and talk together. We use
            technology where it makes learning more precise, and we protect the human and community
            time that brings meaning and fulfillment to a student's experience.
          </p>
        </div>

        <p className="font-bold text-black/80">The stack has four layers:</p>

        <div className="bg-black/[0.03] rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Learning Platform</h4>
          <p className="leading-relaxed">
            One front door for everyone. A student opens it to see the week's plan, progress toward
            outcomes, learning resources, and mentor feedback. An educator opens it to see who they're
            teaching, where, and why. Families see a weekly update, and partners see the students they
            host. Every other tool is reached through it.
          </p>
        </div>

        <div className="bg-black/[0.03] rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Connected Tools</h4>
          <p className="leading-relaxed">
            A long-term pathway planning tool, best-in-class AI-powered curricular tools, and the
            college and partner systems that handle credits and placements, all reached through the
            learning platform.
          </p>
        </div>

        <div className="bg-black/[0.03] rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Intelligence Layer</h4>
          <p className="leading-relaxed">
            Guided by a knowledge graph that links every outcome to the experiences and resources that
            build it. From it, the engine builds each student's week from Friday goal-setting, their
            progress, and which educators, spaces, and partner slots are open, then makes small
            adjustments overnight. It groups students by need and flags who is ready for validation. AI
            evaluates work against rubrics and exemplars and drafts feedback for educators to review
            and add to.
          </p>
        </div>

        <div className="bg-black/[0.03] rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">Data Layer</h4>
          <p className="leading-relaxed mb-2">
            <span className="font-bold text-black/80">The program record</span> holds everything the
            program records: plans, check-ins and attendance, every piece of work and its evaluation,
            educator notes, placements, and family communication. Summit holds it under the family's
            data agreement, and it is what the engine and the educators work from.
          </p>
          <p className="leading-relaxed">
            <span className="font-bold text-black/80">The learner profile</span> is the concise,
            portable record a student takes with them: validated competencies, badges, credentials,
            selected work, and their plan for the future. The student owns it and chooses what to share,
            and with whom.
          </p>
        </div>

        <div className="bg-black/[0.03] rounded-lg p-4">
          <h4 className="font-bold text-indigo mb-1">How We Keep Students Safe</h4>
          <p className="leading-relaxed">
            The system runs on student data, so protecting it is part of the design. Families own
            their student's information. The model checks its own recommendations for bias, and a
            human mentor reviews and owns every decision about a student's pathway. Technology
            recommends. People decide.
          </p>
        </div>
      </div>
    ),
  },
]

export default function Unlocks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-peach/10"
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-6">
            How It's Possible
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
            Time is a school's most valuable resource, and 150 years in, we still treat it as static.
            Different students need different amounts of different things to learn, and we are building
            a system where they get that.
          </p>
          <p className="text-black leading-relaxed mb-4">
            Summit 3.0 personalizes the academic core by flexing time around each student. Time flexes
            first. Educator roles and technology evolve to support it. That is what grows students faster.
          </p>
          <p className="text-black leading-relaxed">
            Three levers make it work, in this order:
            <span className="font-bold text-orange-ink"> how we use time</span>,
            <span className="font-bold text-teal-ink"> how we deploy talent</span>, and
            <span className="font-bold text-indigo"> how technology supports both</span>.
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
