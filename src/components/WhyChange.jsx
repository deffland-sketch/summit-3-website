import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/*
 * Why Change: the concern, and the time argument that frames the whole site.
 * Language follows the 2030 Strategy Source of Truth and the Sierra deck (Oct 2026).
 */

const constraints = [
  {
    title: 'A Fixed Bell Schedule',
    body: 'Every student gets the same minutes on the same subjects, whatever they already know.',
    top: 'border-t-indigo',
  },
  {
    title: 'The Same Pace for Every Student',
    body: 'Students arrive with different strengths, interests, and unfinished learning. A fixed pace can’t plan for that.',
    top: 'border-t-teal',
  },
  {
    title: 'One Role Asked to Carry Nearly Everything',
    body: 'Teaching, grading, reviewing data, planning, and mentoring, all held by one role, with school leaders stretched thin too.',
    top: 'border-t-orange',
  },
]

export default function WhyChange() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-peach/15"
      ref={ref}
      id="why-change"
      aria-labelledby="why-change-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="why-change-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5 leading-tight">
            Time Is a School&rsquo;s Most Valuable Resource, and 150 Years In, We Still Treat It as Static
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Young people are disengaged from school, and recent graduates are underemployed.
            Unemployment for ages 22 to 27 is at a decade high, excluding pandemic years.
          </p>
        </motion.div>

        <ul className="grid md:grid-cols-3 gap-5 mb-10">
          {constraints.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className={`bg-white border-t-4 ${c.top} rounded-xl p-6`}
            >
              <h3 className="text-lg font-bold text-indigo mb-2 leading-snug">{c.title}</h3>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">{c.body}</p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
        >
          <p className="text-3xl md:text-4xl font-bold text-indigo shrink-0">Fewer than 30%</p>
          <p className="text-sm md:text-base text-black/70 leading-relaxed">
            of high schoolers feel very prepared for life after graduation.
            <span className="block text-xs text-black/60 mt-1">Gallup, Walton Family Foundation, and JFF, 2025</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
