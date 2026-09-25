import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    q: 'Who is the student, and what do they want for their life?',
    a: 'Their knowledge, interests, experiences, and goals.',
    dot: 'bg-light-blue',
  },
  {
    q: 'What outcomes will support their launch into that life?',
    a: 'Academic foundations and durable skills.',
    dot: 'bg-teal',
  },
  {
    q: 'What experiences will prepare them?',
    a: 'The right mix of eight experience types, with students taking more ownership of their plan over time.',
    dot: 'bg-indigo',
  },
]

const capacities = [
  { name: 'Mentoring', tagline: 'Someone who knows you', top: 'border-t-orange', text: 'text-orange-ink' },
  { name: 'Content expertise', tagline: 'Someone who teaches you', top: 'border-t-indigo', text: 'text-indigo' },
  { name: 'Facilitating', tagline: 'Someone who challenges you', top: 'border-t-teal', text: 'text-teal-ink' },
  { name: 'Architecting the system', tagline: 'Someone who makes sure it all works together', top: 'border-t-brown', text: 'text-brown' },
]

export default function Throughline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-white"
      ref={ref}
      id="the-model"
      aria-labelledby="the-model-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Divider from Hero */}
        <div className="w-16 h-1 bg-orange rounded-full mx-auto mb-12" />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-lg md:text-xl text-indigo/70 italic mb-4">
            The future of high school is no longer static courses and seat-time credits.
          </p>
          <h2 id="the-model-heading" className="text-3xl md:text-4xl font-bold text-indigo">
            Every student has a pathway
          </h2>
        </motion.div>

        {/* What we mean by a pathway */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-4">
            What we mean by a pathway
          </h3>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-4">
            Every student follows a pathway. A pathway is a student's own plan for the life they want
            to build, and it is different for every student. It changes as they grow, as they learn
            more about themselves, and as their goals sharpen.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            A pathway prepares students for the careers and futures they choose, without locking them
            into a track. Two students drawn to health care will move through different experiences,
            at different paces, toward different versions of that future. The pathway follows the
            student. The student is never sorted into it.
          </p>
        </motion.div>

        {/* DIAGRAM: the pathway beside the adults who guide it */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-5">
            {/* The pathway */}
            <div>
              <div className="bg-indigo text-white text-center font-bold text-lg py-3 rounded-xl mb-3">
                The pathway
              </div>
              <ol className="space-y-3">
                {steps.map((step, i) => (
                  <li key={step.q} className="bg-white border border-black/8 border-t-4 border-t-indigo rounded-xl p-5 flex items-start gap-3">
                    <span
                      className={`w-8 h-8 rounded-full ${step.dot} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-[15px] text-black leading-snug">{step.q}</p>
                      <p className="text-sm text-black/65 mt-1 leading-relaxed">{step.a}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Human-centered guidance */}
            <div>
              <div className="bg-orange text-black text-center font-bold text-lg py-3 rounded-xl mb-3">
                Human-centered guidance
              </div>
              <p className="text-sm text-black/70 text-center leading-relaxed mb-3 px-2">
                Four capacities, shared across the adults around each student.
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {capacities.map((c) => (
                  <li key={c.name} className={`bg-white border border-black/8 border-t-4 ${c.top} rounded-xl p-4`}>
                    <p className={`font-bold text-[15px] leading-snug ${c.text}`}>{c.name}</p>
                    <p className="text-sm italic text-black/70 mt-1 leading-snug">{c.tagline}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-2xl md:text-3xl font-bold text-indigo mt-12 leading-snug">
            The right adult, in the right role, at the right moment.
          </p>
        </motion.div>

        {/* Foundation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mt-8 text-center text-base md:text-lg text-black/75 leading-relaxed"
        >
          All of it rests on community. Every student starts the day with the same long-term mentor
          and the same group of peers, and families are partners in the work, so even as each
          student's learning changes to fit what they need, the people who know them stay constant.
        </motion.p>
      </div>
    </section>
  )
}
