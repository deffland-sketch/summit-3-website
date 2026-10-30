import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/*
 * One Model, Three Forms: how flexible time takes shape by grade span and size.
 * Language follows the 2030 Strategy Source of Truth (Oct 2026). No school names here.
 */

const forms = [
  {
    title: 'Middle Grades',
    top: 'border-t-indigo',
    body: 'Still classes, with more structure and predictability. Double blocks stack so some students get more math and some more English. Expeditions still run in rounds, and the time a student is scheduled into them follows need.',
  },
  {
    title: 'Small High Schools',
    top: 'border-t-teal',
    body: 'Collaborative mornings, flexible afternoons built from learning data, and mentoring through the day.',
  },
  {
    title: 'Large High Schools',
    top: 'border-t-orange',
    body: 'We are designing this form now with school leaders.',
  },
]

export default function AcrossSummit() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-white"
      ref={ref}
      id="across-summit"
      aria-labelledby="across-summit-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 id="across-summit-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            One Model, Three Forms
          </h2>
          <p className="text-lg text-black/75 max-w-2xl mx-auto leading-relaxed">
            How far time flexes depends on a school's grade span and size.
          </p>
        </motion.div>

        <ul className="grid md:grid-cols-3 gap-5">
          {forms.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className={`bg-white border border-black/8 border-t-4 ${f.top} rounded-xl p-6`}
            >
              <h3 className="text-xl font-bold text-indigo mb-3">{f.title}</h3>
              <p className="text-base text-black/70 leading-relaxed">{f.body}</p>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-base md:text-lg text-black/80 mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          Every Summit school is moving toward flexible time at the pace its size allows.
        </motion.p>
      </div>
    </section>
  )
}
