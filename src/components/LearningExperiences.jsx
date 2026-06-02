import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const experiences = [
  {
    name: 'Direct instruction',
    color: '#4b4b96',
    description: 'A knowledgeable adult teaches something specific. A lesson, a demonstration, a worked example, or a lab walkthrough.',
    eg: 'e.g., small-group lesson, science demo, guest expert',
    why: 'Research on how memory works shows that new concepts stick when an expert breaks them down into manageable pieces, connects them to what students already know, and models their own thinking process. Direct instruction is one of the most well-studied and effective approaches in education, and it works best in smaller groups where the teacher can gauge understanding in real time.',
  },
  {
    name: 'Practice and feedback',
    color: '#508278',
    description: 'A student practices a specific skill while receiving targeted, timely feedback from someone who can diagnose what\'s working.',
    eg: 'e.g., writing conference, tutoring session, skills clinic',
    why: 'Decades of research show that effective practice happens at the edge of what a student can do: not too easy, not too hard. The critical ingredient is feedback that\'s specific, immediate, and actionable. When practice is spaced across days rather than crammed into one session, retention improves dramatically.',
  },
  {
    name: 'Discussion and dialogue',
    color: '#f6aa40',
    description: 'Students and adults engage in structured conversation about ideas, texts, or problems. The learning happens in the exchange.',
    eg: 'e.g., Socratic seminar, reading circle, peer critique',
    why: 'When students build on each other\'s reasoning (not just take turns talking) they reach deeper understanding than any individual study can produce. Research consistently shows that this kind of interactive engagement is the most powerful mode of learning, and it simultaneously builds the communication and collaboration skills that matter beyond school.',
  },
  {
    name: 'Independent work and creation',
    color: '#96d2dc',
    description: 'A student works on their own to produce something: writing, research, a model, a solution. The student makes the decisions.',
    eg: 'e.g., essay, research project, prototype build',
    why: 'Producing original work requires students to organize, connect, and apply what they know, which deepens understanding far more than reviewing notes or re-reading. Independent work also develops metacognition: the ability to plan, monitor, and adjust your own learning process, one of the strongest predictors of long-term academic success.',
  },
  {
    name: 'Presentation and performance',
    color: '#e6553c',
    description: 'A student demonstrates learning to an authentic audience. The stakes are real.',
    eg: 'e.g., exhibition of learning, portfolio defense, speech',
    why: 'Presenting under real conditions is one of the most powerful ways to consolidate learning. It requires students to retrieve, organize, and communicate their knowledge without scaffolding. It also builds identity: "I am someone who can do this." Employers consistently rank communication, poise, and adaptability among the skills that matter most.',
  },
  {
    name: 'Reflection and goal-setting',
    color: '#ffd2b4',
    description: 'A student steps back to examine their own learning: where they are, where they\'re going, what\'s working, what to adjust.',
    eg: 'e.g., PLP check-in, goal-setting session, self-assessment',
    why: 'The ability to think about your own thinking (metacognition) is the single strongest predictor of academic achievement. Without this experience type, a personalized pathway is something done to students. With it, students become co-authors of their own trajectory.',
  },
  {
    name: 'Real-world experience',
    color: '#503c2d',
    description: 'A student learns by participating in authentic work alongside professionals or community members, in settings beyond the school building.',
    eg: 'e.g., internship, job shadow, expedition, dual enrollment',
    why: 'Research on how expertise develops shows that mastery comes from participating in real communities of practice, not just studying about them. Real-world experiences build the portfolio that employers and colleges value, and they give students concrete answers to the questions driving their pathway.',
  },
  {
    name: 'Wellbeing and community',
    color: '#96a0ab',
    description: 'Time and structure dedicated to physical health, social connection, play, and emotional regulation. A precondition for learning, not a break from it.',
    eg: 'e.g., team sports, eating together, club activities',
    why: 'Cognitive engagement depends on physical and psychological readiness. Students who are hungry, stressed, isolated, or physically restless cannot access the learning in any of the other seven types. Naming this as part of the schedule signals that the model is designed for whole humans.',
  },
]

function ExperienceTile({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="bg-white rounded-xl p-5 border border-black/8 h-full flex flex-col"
      style={{ borderLeftWidth: 4, borderLeftColor: experience.color }}
    >
      <h3 className="text-base font-bold leading-tight mb-2" style={{ color: experience.color }}>
        {experience.name}
      </h3>
      <p className="text-sm text-black leading-relaxed mb-3 flex-1">
        {experience.description}
      </p>
      <p className="text-xs font-bold leading-snug" style={{ color: experience.color, opacity: 0.75 }}>
        {experience.eg}
      </p>
    </motion.div>
  )
}

export default function LearningExperiences() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [scienceOpen, setScienceOpen] = useState(false)

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref} id="learning-experiences">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">What school is made of</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            Every day is made of these
          </h2>
          <p className="text-lg text-black leading-relaxed max-w-3xl">
            To replace static courses and seat-time credits, we built a new taxonomy of eight
            experience types. Content-neutral, they apply across any disciplinary or interdisciplinary
            context. Along every student's pathway, the system assembles the right experiences, in
            the right sequence, in the right context.
          </p>
        </motion.div>

        {/* Clean four-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {experiences.map((exp, i) => (
            <ExperienceTile key={exp.name} experience={exp} index={i} />
          ))}
        </div>

        {/* Single section-level expandable */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 max-w-4xl mx-auto"
        >
          <button
            onClick={() => setScienceOpen(!scienceOpen)}
            className="w-full text-left bg-teal/[0.06] hover:bg-teal/[0.1] border-l-4 border-teal rounded-r-lg px-5 py-4 transition-colors flex items-center justify-between gap-4"
            aria-expanded={scienceOpen}
          >
            <div>
              <p className="text-teal font-bold text-xs tracking-[0.18em] uppercase mb-1">Learning science</p>
              <p className="text-base font-bold text-black">The learning science behind these</p>
            </div>
            <motion.svg
              animate={{ rotate: scienceOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 text-teal shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {scienceOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-teal/15 border-t-0 rounded-b-lg px-5 py-5 space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.name} className="border-l-2 pl-4" style={{ borderColor: exp.color }}>
                      <p className="text-sm font-bold mb-1" style={{ color: exp.color }}>{exp.name}</p>
                      <p className="text-sm text-black/75 leading-relaxed">{exp.why}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Research citation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 max-w-3xl mx-auto text-center text-sm text-black/60 leading-relaxed"
        >
          These eight experience types are grounded in research from the science of learning and
          development: Hendrick & Kirschner, Chi, Kolb, Lave & Wenger, Deci & Ryan, Transcend Education,
          and Deans for Impact. Each one activates the conditions under which learning is most effective:
          spaced practice, immediate feedback, students building on each other's thinking, new knowledge
          connecting to prior experience, and learner agency.
        </motion.p>
      </div>
    </section>
  )
}
