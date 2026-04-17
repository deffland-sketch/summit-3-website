import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { StudentGroup, ExperienceScene } from './SummitCharacters'

const experiences = [
  {
    name: 'Small-group expert instruction',
    description: 'An academic interventionist works with 4-6 students on a targeted skill. Adaptive materials matched to their zone of proximal development.',
    config: '4-6 students, interventionist-led',
    category: 'academic',
    scene: 'expert-instruction',
  },
  {
    name: 'Peer collaboration',
    description: 'Students working together on applied problems, lab analyses, design challenges. Learning from each other.',
    config: 'Small groups, student-driven',
    category: 'academic',
    scene: 'peer-collaboration',
  },
  {
    name: 'AI-supported independent practice',
    description: 'Content selected because it connects to their pathway and sits at exactly the right difficulty. Not busywork.',
    config: 'Individual, adaptive tools',
    category: 'independent',
    scene: 'ai-practice',
  },
  {
    name: 'Book/text discussion circle',
    description: 'A small group of students and an adult reading and discussing together. Deep engagement with complex text.',
    config: '6-10 students, adult-facilitated',
    category: 'academic',
    scene: 'discussion-circle',
  },
  {
    name: 'Project studio',
    description: 'Teams building something tangible over weeks. Connected to pathway goals. Coached by a facilitator who holds a quality bar.',
    config: 'Teams, facilitator-coached, multi-week',
    category: 'realworld',
    scene: 'project-studio',
  },
  {
    name: 'Community circle',
    description: 'Mentor group. Pathway check-ins. Goal-setting. Relationship-building. The human container that holds everything together.',
    config: '12-15 students, guide-led',
    category: 'community',
    scene: 'community-circle',
  },
  {
    name: 'Field experience',
    description: 'Out in the world with a professional or organization. Collecting data, shadowing, contributing to real work.',
    config: 'Off-site, professional-mentored',
    category: 'realworld',
    scene: 'field-experience',
  },
  {
    name: 'Dual enrollment',
    description: 'College-level coursework chosen by the student to align with their pathway. Asynchronous, supported, earning real credit.',
    config: 'Individual, college-level',
    category: 'independent',
    scene: 'dual-enrollment',
  },
  {
    name: 'Presentation and defense',
    description: 'Students showing work to authentic audiences. Professionals, community members, peers. The bar is high.',
    config: 'Individual/team, audience panels',
    category: 'community',
    scene: 'presentation',
  },
  {
    name: 'Peer tutoring',
    description: 'A student who\'s demonstrated mastery teaches another student. Based on real data, not guesswork.',
    config: 'Pairs, data-matched',
    category: 'academic',
    scene: 'peer-tutoring',
  },
  {
    name: 'Reflection and planning',
    description: 'Time with a guide to step back, look at the full pathway, and make decisions about what comes next.',
    config: '1-on-1 or small group, guide-led',
    category: 'community',
    scene: 'reflection',
  },
]

const categoryStyles = {
  academic: { ring: 'ring-indigo/30', bg: 'bg-indigo/5', text: 'text-indigo' },
  realworld: { ring: 'ring-teal/30', bg: 'bg-teal/5', text: 'text-teal' },
  community: { ring: 'ring-orange/30', bg: 'bg-orange/5', text: 'text-orange' },
  independent: { ring: 'ring-light-blue/30', bg: 'bg-light-blue/10', text: 'text-light-blue' },
}

function ExperienceCard({ experience, index, isSelected, onSelect }) {
  const cat = categoryStyles[experience.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="cursor-pointer"
      onClick={() => onSelect(isSelected ? null : index)}
    >
      <div className={`${cat.bg} ring-1 ${cat.ring} rounded-xl p-3 transition-all duration-200 h-full ${
        isSelected ? 'scale-[1.03] shadow-lg ring-2' : 'hover:scale-[1.02]'
      }`}>
        <div className="w-full h-16 mb-2">
          <ExperienceScene type={experience.scene} width={140} height={64} />
        </div>
        <h3 className={`text-xs font-bold ${cat.text} leading-tight`}>{experience.name}</h3>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="mt-2"
          >
            <p className="text-[11px] text-black/60 leading-relaxed">{experience.description}</p>
            <p className={`text-[10px] font-bold ${cat.text} mt-1`}>{experience.config}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function LearningExperiences() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState(null)

  // Split cards into top row (6), center row (illustration), bottom row (5)
  const topRow = experiences.slice(0, 4)
  const midLeft = experiences.slice(4, 6)
  const midRight = experiences.slice(6, 8)
  const bottomRow = experiences.slice(8)

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">What school is made of</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            The learning experiences
          </h2>
        </motion.div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-4 mb-10">
          <span className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-indigo" /> Academic
          </span>
          <span className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-teal" /> Real-world
          </span>
          <span className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-orange" /> Community
          </span>
          <span className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-light-blue" /> Independent
          </span>
        </div>

        {/* Desktop: grid ring layout */}
        <div className="hidden lg:block">
          {/* Top row: 4 cards */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {topRow.map((exp, i) => (
              <ExperienceCard key={exp.name} experience={exp} index={i} isSelected={selected === i} onSelect={setSelected} />
            ))}
          </div>

          {/* Middle row: 2 cards | illustration | 2 cards */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="space-y-4">
              {midLeft.map((exp, i) => {
                const idx = 4 + i
                return <ExperienceCard key={exp.name} experience={exp} index={idx} isSelected={selected === idx} onSelect={setSelected} />
              })}
            </div>

            {/* Center illustration spanning 2 columns */}
            <div className="col-span-2 flex items-center justify-center">
              <div className="w-64 h-48">
                <StudentGroup width={260} height={190} />
              </div>
            </div>

            <div className="space-y-4">
              {midRight.map((exp, i) => {
                const idx = 6 + i
                return <ExperienceCard key={exp.name} experience={exp} index={idx} isSelected={selected === idx} onSelect={setSelected} />
              })}
            </div>
          </div>

          {/* Bottom row: 3 cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-start-1">
              <ExperienceCard experience={bottomRow[0]} index={8} isSelected={selected === 8} onSelect={setSelected} />
            </div>
            <div>
              <ExperienceCard experience={bottomRow[1]} index={9} isSelected={selected === 9} onSelect={setSelected} />
            </div>
            <div>
              <ExperienceCard experience={bottomRow[2]} index={10} isSelected={selected === 10} onSelect={setSelected} />
            </div>
          </div>
        </div>

        {/* Mobile: card grid */}
        <div className="lg:hidden">
          <div className="w-48 h-32 mx-auto mb-6">
            <StudentGroup width={200} height={130} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.name} experience={exp} index={i} isSelected={selected === i} onSelect={setSelected} />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-black/60 mt-12 max-w-2xl mx-auto text-lg italic"
        >
          Instead of a traditional bell schedule, students move through a diverse set of learning
          experiences — curated and sequenced based on where each student is on their pathway.
          No two weeks look the same. The right experiences, in the right combination, at the
          right time.
        </motion.p>
      </div>
    </section>
  )
}
