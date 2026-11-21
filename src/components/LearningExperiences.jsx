import { motion } from 'framer-motion'
import { ELEMENTS, ELEMENT_KEYS } from '../elements'
import { learningExperiences } from '../learningExperiences'
import { ElementTag } from './ElementTag'

/*
 * Learning Experiences, embedded in the next-step section: a few learning
 * experiences under each of the three model elements, one column per element.
 * The learning-science notes for each experience live on the How It Works page.
 */
export function LearningExperiences() {
  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="mb-8 max-w-3xl"
      >
        <h3 className="text-xl md:text-2xl font-bold text-indigo mb-3">Learning Experiences</h3>
        <p className="text-base md:text-lg text-black/80 leading-relaxed">
          Under each element sit a few learning experiences, in the mix each student needs that week.
          Some learning experiences show up in more than one element: independent work happens in the
          academic core and in Expedition projects, and a partner expert can teach a lesson during an
          internship.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5">
        {ELEMENT_KEYS.map((k, col) => {
          const el = ELEMENTS[k]
          return (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: col * 0.08 }}
              className={`bg-white rounded-xl border border-black/8 border-t-4 ${el.topBorder} p-5 md:p-6`}
            >
              <h4 className="mb-4">
                <ElementTag element={k} size="base" />
              </h4>
              <ul className="space-y-4">
                {learningExperiences[k].map((x) => (
                  <li key={x.name} className="border-l-2 pl-3" style={{ borderColor: el.color }}>
                    <p className="font-bold text-black leading-snug">{x.name}</p>
                    <p className="text-sm text-black/75 leading-relaxed mt-1">{x.description}</p>
                    <p className="text-xs font-bold mt-1.5" style={{ color: el.ink }}>{x.eg}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
