import { motion } from 'framer-motion'
import { ELEMENTS, ELEMENT_KEYS } from '../elements'
import { learningExperiences, researchCitation } from '../learningExperiences'
import { ElementTag } from './ElementTag'

/*
 * The learning science behind the learning experiences, on the How It Works page:
 * a short note under each experience that has one, grouped by element, and the
 * research citation line.
 */
export default function LearningScience() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white" id="learning-science" aria-labelledby="learning-science-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="learning-science-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5 leading-tight">
            The Learning Science Behind Each Learning Experience
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {ELEMENT_KEYS.map((k) => {
            const el = ELEMENTS[k]
            const withNotes = learningExperiences[k].filter((x) => x.science)
            return (
              <div key={k} className={`rounded-xl border border-black/8 border-t-4 ${el.topBorder} p-5 md:p-6`}>
                <ElementTag element={k} size="base" className="mb-4" />
                <ul className="space-y-5">
                  {withNotes.map((x) => (
                    <li key={x.name} className="border-l-2 pl-3" style={{ borderColor: el.color }}>
                      <p className="font-bold text-black mb-1">{x.name}</p>
                      <p className="text-sm text-black/75 leading-relaxed">{x.science}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <p className="mt-10 max-w-3xl mx-auto text-center text-sm text-black/60 leading-relaxed">{researchCitation}</p>
      </div>
    </section>
  )
}
