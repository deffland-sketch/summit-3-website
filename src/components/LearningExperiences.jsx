import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExperienceScene, StudentGroup } from './SummitCharacters'

const experiences = [
  {
    name: 'Direct instruction',
    color: '#4b4b96',
    colorName: 'indigo',
    scene: 'expert-instruction',
    description: 'A knowledgeable adult teaches something specific. Could be a lesson, a demonstration, a worked example, or a lab walkthrough.',
    eg: 'e.g., small group lesson, science demo, guest expert',
    examples: [
      'Small group math lesson',
      'Science demonstration',
      'Writing mini-lesson',
      'Guest expert presentation',
      'Read-aloud with annotation',
    ],
    why: 'Research on how memory works shows that new concepts stick when an expert breaks them down into manageable pieces, connects them to what students already know, and models their own thinking process. Direct instruction is one of the most well-studied and effective approaches in education, and it works best in smaller groups where the teacher can gauge understanding in real time.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="4" y="4" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="26" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Practice and feedback',
    color: '#508278',
    colorName: 'teal',
    scene: 'peer-tutoring',
    description: 'A student practices a specific skill while receiving targeted, timely feedback from someone who can diagnose what\'s working.',
    eg: 'e.g., writing conference, tutoring session, skills clinic',
    examples: [
      'Writing conference (1:1 with a coach)',
      'Tutoring session',
      'Math problem-solving workshop',
      'Skills clinic',
      'Guided reading group',
    ],
    why: 'Decades of research show that effective practice happens at the edge of what a student can do — not too easy, not too hard. The critical ingredient is feedback that\'s specific, immediate, and actionable. When practice is spaced across days rather than crammed into one session, retention improves dramatically.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M6 16l8 8L26 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 16a10 10 0 11-10-10" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    name: 'Discussion and dialogue',
    color: '#f6aa40',
    colorName: 'orange',
    scene: 'discussion-circle',
    description: 'Students and adults engage in structured conversation about ideas, texts, or problems. The learning happens in the exchange.',
    eg: 'e.g., Socratic seminar, reading circle, peer critique',
    examples: [
      'Socratic seminar',
      'Book discussion circle',
      'Peer critique session',
      'Case study discussion',
      'Community circle',
    ],
    why: 'When students build on each other\'s reasoning — not just take turns talking — they reach deeper understanding than any individual study can produce. Research consistently shows that this kind of interactive engagement is the most powerful mode of learning, and it simultaneously builds the communication and collaboration skills that matter beyond school.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="2" y="6" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="16" y="14" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 16v4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 14v-4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'Independent work and creation',
    color: '#96d2dc',
    colorName: 'light-blue',
    scene: 'ai-practice',
    description: 'A student works on their own to produce something: writing, research, a model, a solution. The student makes the decisions.',
    eg: 'e.g., essay writing, research project, building a prototype',
    examples: [
      'Writing an essay or report',
      'Researching a question',
      'Building a prototype',
      'Conducting an experiment',
      'Coding a project',
      'Solving complex problems',
    ],
    why: 'Producing original work requires students to organize, connect, and apply what they know — which deepens understanding far more than reviewing notes or re-reading. Independent work also develops metacognition: the ability to plan, monitor, and adjust your own learning process, one of the strongest predictors of long-term academic success.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="8" y="4" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="24" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: 'Presentation and performance',
    color: '#e6553c',
    colorName: 'red',
    scene: 'presentation',
    description: 'A student demonstrates learning to an authentic audience. The stakes are real.',
    eg: 'e.g., exhibition of learning, portfolio defense, speech',
    examples: [
      'Exhibition of learning',
      'Portfolio defense',
      'Speech or presentation',
      'Leading a peer workshop',
      'Facilitating a group discussion',
      'Performance (music, theater, debate)',
    ],
    why: 'Presenting under real conditions is one of the most powerful ways to consolidate learning. It requires students to retrieve, organize, and communicate their knowledge without scaffolding. It also builds identity: "I am someone who can do this." Employers consistently rank communication, poise, and adaptability among the skills that matter most.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="4" y="6" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M12 26h8M16 22v4" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'Reflection and goal-setting',
    color: '#ffd2b4',
    colorName: 'peach',
    scene: 'reflection',
    description: 'A student steps back to examine their own learning: where they are, where they\'re going, what\'s working, what to adjust. Reflection is what turns every other experience into learning the student owns. Without it, an internship is an activity, a seminar is a conversation, and a project is just work produced.',
    eg: 'e.g., PLP check-in, goal-setting session, self-assessment',
    examples: [
      'PLP check-in with a mentor',
      'Goal-setting session',
      'Reviewing personal learning data',
      'Self-assessment',
      'Giving feedback to a peer',
      'Journaling or mindfulness practice',
    ],
    why: 'The ability to think about your own thinking — called metacognition in the research — is the single strongest predictor of academic achievement. Without this experience type, a personalized pathway is something done to students. With it, students become co-authors of their own trajectory. This is where self-understanding, agency, and ownership develop.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M16 10v6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Real-world experience',
    color: '#503c2d',
    colorName: 'brown',
    scene: 'field-experience',
    description: 'A student learns by participating in authentic work alongside professionals or community members, in settings beyond the school building.',
    eg: 'e.g., internship, job shadow, expedition, dual enrollment',
    examples: [
      'Internship',
      'Job shadow',
      'Apprenticeship',
      'Expedition (2-week immersive)',
      'Community service project',
      'Informational interview',
      'Dual enrollment college course',
      'Career exploration visit',
    ],
    why: 'Research on how expertise develops shows that mastery comes from participating in real communities of practice, not just studying about them. Real-world experiences build the portfolio that employers and colleges value, and they give students concrete answers to the questions driving their pathway: Who am I? What does the world need? Where do I fit?',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M4 28l12-10 12 10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="10" y="22" width="12" height="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Wellbeing and community',
    color: '#96a0ab',
    colorName: 'tan-grey',
    scene: 'community-circle',
    description: 'Time and structure dedicated to physical health, social connection, play, and emotional regulation. Not a break from learning. A precondition for it.',
    eg: 'e.g., team sports, eating together, club activities',
    examples: [
      'Team sports and athletics',
      'Exercise and movement',
      'Eating together',
      'Free play and recreation',
      'Club activities',
      'Restorative circles',
    ],
    why: 'The science is unambiguous: cognitive engagement depends on physical and psychological readiness. Students who are hungry, stressed, isolated, or physically restless cannot access the learning in any of the other seven types. Including this as a named part of the schedule — not just "recess" or "lunch" — signals that the model is designed for whole humans.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M16 6c-2 0-4 2-4 5s4 7 4 7 4-4 4-7-2-5-4-5z" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="22" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

function ExpandedCard({ experience, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: experience.color + '15', color: experience.color }}>
                {experience.icon}
              </div>
              <h3 className="text-xl font-bold" style={{ color: experience.color }}>{experience.name}</h3>
            </div>
            <button onClick={onClose} className="text-black/30 hover:text-black/60 text-xl leading-none p-1">×</button>
          </div>

          <p className="text-black/70 leading-relaxed mb-6">{experience.description}</p>

          {/* Examples */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-black/50 tracking-wide mb-3">What this looks like</h4>
            <div className="flex flex-wrap gap-2">
              {experience.examples.map((ex) => (
                <span key={ex} className="text-sm px-3 py-1.5 rounded-full bg-black/5 text-black/60">{ex}</span>
              ))}
            </div>
          </div>

          {/* Why it works */}
          <div>
            <h4 className="text-sm font-bold text-black/50 tracking-wide mb-3">Why it works</h4>
            <p className="text-sm text-black/60 leading-relaxed">{experience.why}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ExperienceCard({ experience, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <div className="bg-white rounded-xl p-4 border border-black/8 transition-all duration-200 h-full group-hover:shadow-md group-hover:border-black/15"
        style={{ borderLeftWidth: 4, borderLeftColor: experience.color }}
      >
        {/* Summit character illustration */}
        <div className="w-full h-24 mb-2">
          <ExperienceScene type={experience.scene} width={160} height={96} />
        </div>
        <h3 className="text-sm font-bold leading-tight mb-1" style={{ color: experience.color }}>{experience.name}</h3>
        <p className="text-xs text-black/55 leading-relaxed">{experience.description}</p>
        <p className="text-[11px] font-bold mt-2 leading-snug" style={{ color: experience.color, opacity: 0.7 }}>{experience.eg}</p>
        <p className="text-[10px] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: experience.color }}>
          Click to explore →
        </p>
      </div>
    </motion.div>
  )
}

export default function LearningExperiences() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState(null)

  // Desktop layout: ring arrangement
  // Top row: 3, middle: 2 + center + 2, bottom: 1 centered
  const topRow = experiences.slice(0, 3)
  const midLeft = experiences.slice(3, 4)
  const midRight = experiences.slice(4, 5)
  const botRow = experiences.slice(5, 8)

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref} id="learning-experiences">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">What school is made of</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            Every day is made of these
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            These eight experience types are content-neutral — they apply across any
            disciplinary or interdisciplinary context. Along each student's pathway, the
            system assembles the right experiences, in the right sequence, in the right
            context.
          </p>
        </motion.div>

        <p className="text-center text-sm italic text-black/40 mb-8">
          Click any tile to see examples and its connection to learning science.
        </p>

        {/* Desktop: constellation grid */}
        <div className="hidden md:block">
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {topRow.map((exp, i) => (
              <ExperienceCard key={exp.name} experience={exp} index={i} onClick={() => setSelected(i)} />
            ))}
          </div>

          {/* Middle row: 1 + visual center + 1 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              {midLeft.map((exp, i) => (
                <ExperienceCard key={exp.name} experience={exp} index={3 + i} onClick={() => setSelected(3 + i)} />
              ))}
            </div>

            {/* Center: student group illustration */}
            <div className="flex items-center justify-center">
              <div className="w-48 h-36">
                <StudentGroup width={200} height={140} />
              </div>
            </div>

            <div>
              {midRight.map((exp, i) => (
                <ExperienceCard key={exp.name} experience={exp} index={4 + i} onClick={() => setSelected(4 + i)} />
              ))}
            </div>
          </div>

          {/* Bottom row: 3 cards */}
          <div className="grid grid-cols-3 gap-4">
            {botRow.map((exp, i) => (
              <ExperienceCard key={exp.name} experience={exp} index={5 + i} onClick={() => setSelected(5 + i)} />
            ))}
          </div>
        </div>

        {/* Mobile: student group + stacked cards */}
        <div className="md:hidden">
          <div className="w-44 h-28 mx-auto mb-5">
            <StudentGroup width={180} height={120} />
          </div>
          <div className="space-y-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.name} experience={exp} index={i} onClick={() => setSelected(i)} />
            ))}
          </div>
        </div>

        {/* Bottom framing text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 max-w-3xl mx-auto"
        >
          <p className="text-center text-black/50 leading-relaxed text-sm mb-6">
            These eight experience types are grounded in research from the science of learning and
            development, including work by Carl Hendrick, Paul Kirschner, and Michelene Chi, as
            well as Transcend Education and Deans for Impact. The research identifies specific
            conditions under which learning is most effective: when practice is spaced and feedback
            is immediate, when students build on each other's thinking, when new knowledge connects
            to prior experience, and when learners have agency over their own process. Each
            experience type is designed to activate these conditions.
          </p>
          {/* References */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-black/30">
            <span>Hendrick & Kirschner, <em>How Learning Happens</em></span>
            <span>Chi & Wylie (2014), ICAP Framework</span>
            <span>Kolb (1984), Experiential Learning</span>
            <span>Lave & Wenger (1991), Situated Learning</span>
            <span>Transcend Education, <em>Designing for Learning</em></span>
            <span>Deci & Ryan (1985, 2000), Self-Determination Theory</span>
            <span>Deans for Impact, <em>The Science of Learning</em></span>
          </div>
        </motion.div>
      </div>

      {/* Expanded modal */}
      <AnimatePresence>
        {selected !== null && (
          <ExpandedCard
            experience={experiences[selected]}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
