import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Chevron } from './Chevron'
import { brand, ink } from '../palette'

const experiences = [
  {
    name: 'Direct Instruction',
    color: brand.indigo,
    ink: ink.indigo,
    description: 'A knowledgeable adult teaches something specific. A lesson, a demonstration, a worked example, or a lab walkthrough.',
    eg: 'e.g., small-group lesson, science demo, guest expert',
    why: 'Research on how memory works shows that new concepts stick when an expert breaks them down into manageable pieces, connects them to what students already know, and models their own thinking process. Direct instruction is one of the most well-studied and effective approaches in education, and it works best in smaller groups where the teacher can gauge understanding in real time.',
  },
  {
    name: 'Practice and Feedback',
    color: brand.teal,
    ink: ink.teal,
    description: 'A student practices a specific skill while receiving targeted, timely feedback from someone who can diagnose what\'s working.',
    eg: 'e.g., writing conference, tutoring session, skills clinic',
    why: 'Decades of research show that effective practice happens at the edge of what a student can do: not too easy, not too hard. The critical ingredient is feedback that\'s specific, immediate, and actionable. When practice is spaced across days rather than crammed into one session, retention improves dramatically.',
  },
  {
    name: 'Discussion and Dialogue',
    color: brand.orange,
    ink: ink.orange,
    description: 'Students and adults engage in structured conversation about ideas, texts, or problems. The learning happens in the exchange.',
    eg: 'e.g., Socratic seminar, reading circle, peer critique',
    why: 'When students build on each other\'s reasoning, they reach deeper understanding than any individual study can produce. Research consistently shows that this kind of interactive engagement is the most powerful mode of learning, and it simultaneously builds the communication and collaboration skills that matter beyond school.',
  },
  {
    name: 'Independent Work and Creation',
    color: brand.lightBlue,
    ink: ink.lightBlue,
    description: 'A student works on their own to produce something: writing, research, a model, a solution. The student makes the decisions.',
    eg: 'e.g., essay, research project, prototype build',
    why: 'Producing original work requires students to organize, connect, and apply what they know, which deepens understanding far more than reviewing notes or re-reading. Independent work also develops metacognition: the ability to plan, monitor, and adjust your own learning process, one of the strongest predictors of long-term academic success.',
  },
  {
    name: 'Presentation and Performance',
    color: brand.red,
    ink: ink.red,
    description: 'A student demonstrates learning to an authentic audience. The stakes are real.',
    eg: 'e.g., exhibition of learning, portfolio defense, speech',
    why: 'Presenting under real conditions is one of the most powerful ways to consolidate learning. It requires students to retrieve, organize, and communicate their knowledge without scaffolding. It also builds identity: "I am someone who can do this." Employers consistently rank communication, poise, and adaptability among the skills that matter most.',
  },
  {
    name: 'Reflection and Goal-Setting',
    color: brand.peach,
    ink: ink.peach,
    description: 'A student steps back to examine their own learning: where they are, where they\'re going, what\'s working, what to adjust.',
    eg: 'e.g., PLP check-in, goal-setting session, self-assessment',
    why: 'The ability to think about your own thinking (metacognition) is the single strongest predictor of academic achievement. Without this experience type, a personalized pathway is something done to students. With it, students become co-authors of their own trajectory.',
  },
  {
    name: 'Real-World Experience',
    color: brand.brown,
    ink: ink.brown,
    description: 'A student learns by participating in authentic work alongside professionals or community members, in settings beyond the school building.',
    eg: 'e.g., internship, job shadow, expedition, dual enrollment',
    why: 'Research on how expertise develops shows that mastery comes from participating in real communities of practice. Real-world experiences build the portfolio that employers and colleges value, and they give students concrete answers to the questions driving their pathway.',
  },
  {
    name: 'Wellbeing and Community',
    color: brand.tanGrey,
    ink: ink.tanGrey,
    description: 'Time and structure dedicated to physical health, social connection, play, and emotional regulation. A precondition for learning.',
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
      {/* `color` carries the left border and swatches; `ink` carries text, so the
          lighter half of the palette stays legible on white. */}
      <h4 className="text-base font-bold leading-tight mb-2" style={{ color: experience.ink }}>
        {experience.name}
      </h4>
      <p className="text-sm text-black leading-relaxed mb-3 flex-1">
        {experience.description}
      </p>
      <p className="text-xs font-bold leading-snug" style={{ color: experience.ink }}>
        {experience.eg}
      </p>
    </motion.div>
  )
}

// Embedded in NextStep: the eight experience types are how flexed time gets used.
export function ExperienceTypes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [scienceOpen, setScienceOpen] = useState(false)

  return (
    <div ref={ref} className="mt-16">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-3">
            Eight Experience Types
          </h3>
          <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-3xl">
            Flexed time is spent across eight experience types, in the mix each student needs that
            week. They replace static courses and time-based credits, and they work in any subject.
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
              <p className="text-teal-ink font-bold text-sm mb-1">Learning science</p>
              <p className="text-base font-bold text-black">The Learning Science Behind These</p>
            </div>
            <Chevron open={scienceOpen} className="text-teal-ink" />
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
                      <p className="text-sm font-bold mb-1" style={{ color: exp.ink }}>{exp.name}</p>
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
    </div>
  )
}
