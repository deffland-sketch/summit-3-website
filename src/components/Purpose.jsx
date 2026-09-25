import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/*
 * Purpose: the motivational theory underneath every pathway.
 *
 * Added after board feedback that the site explained the pathway engine but not
 * what fuels it. The argument runs: a long-term mentor plus graduated
 * Expeditions build a sense of purpose, purpose makes school feel relevant, and
 * relevance lights intrinsic motivation. Without that trust and exposure, the
 * system has nothing to match a student to.
 *
 * Sources: Summit Sierra and Summit 780 design blueprints (SY27), SXSW EDU 2026
 * Expeditions deck. The two-thirds figure is from the Expeditions program FAQ
 * (confirmed Sept 2026; the same FAQ also cites "over a third" elsewhere).
 */

const arc = [
  { step: 'Expose', desc: 'Try a wide range of fields and see what real work looks like.' },
  { step: 'Explore', desc: 'Go deeper into the ones that pull at you.' },
  { step: 'Pursue', desc: 'Internships, credentials, and college courses in a chosen direction.' },
]

const chain = [
  {
    title: 'A sense of purpose',
    desc: 'Students start to name what they care about and who they want to become.',
  },
  {
    title: 'School feels relevant',
    desc: 'A lab report, a seminar, a set of algebra problems: each one connects to a future the student can picture.',
  },
  {
    title: 'Motivation from within',
    desc: 'Students take on hard work because it moves them toward something that is theirs.',
  },
]

export default function Purpose() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-mint"
      ref={ref}
      id="purpose"
      aria-labelledby="purpose-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <p className="text-teal-ink font-bold text-sm tracking-wide mb-3">What fuels a pathway</p>
          <h2 id="purpose-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5">
            Purpose is what makes a pathway work
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-4">
            A pathway needs something to aim at. Some students walk into 9th grade knowing exactly
            what they care about. Most don't, and a quiet 14-year-old is not going to announce it to
            a room full of new people.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Before a student can choose a direction, they have to trust an adult enough to say what
            they want, and they have to try enough real things to know. Summit's schools are built
            on two experiences that do this work: a long-term mentor and Expeditions.
          </p>
        </motion.div>

        {/* The two experiences */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border-t-4 border-orange p-6"
          >
            <h3 className="text-xl font-bold text-indigo mb-1">A long-term mentor</h3>
            <p className="text-sm font-bold italic text-orange-ink mb-4">Someone who knows you, and stays</p>
            <p className="text-sm text-black/70 leading-relaxed mb-3">
              Every student has a mentor who stays with them as they grow. Mentors are with their
              students every day in community and meet with each of them one-on-one.
            </p>
            <p className="text-sm text-black/70 leading-relaxed">
              Mentors coach the whole student. On the learning side, they set goals with students
              from real data and adjust the plan when something isn't working. On the pathway side,
              they help students notice what lights them up and what it could become. Trust builds
              over time, and a mentor who has known a student for years hears things a new adult
              never would.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border-t-4 border-teal p-6"
          >
            <h3 className="text-xl font-bold text-indigo mb-1">Expeditions</h3>
            <p className="text-sm font-bold italic text-teal-ink mb-4">Real work in the real world</p>
            <p className="text-sm text-black/70 leading-relaxed mb-4">
              Expeditions put students inside real work with community organizations, companies,
              and colleges, woven through the school year. After every Expedition, students step
              back with their mentor and ask what it changed about how they see their future.
              Expeditions are graduated:
            </p>
            <ol className="space-y-2">
              {arc.map((a, i) => (
                <li key={a.step} className="flex gap-3 items-start">
                  <span
                    className="w-6 h-6 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-black/70 leading-relaxed">
                    <span className="font-bold text-teal-ink">{a.step}.</span> {a.desc}
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* Proof point */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-14"
        >
          <p className="text-4xl md:text-5xl font-bold text-indigo shrink-0">2 in 3</p>
          <p className="text-sm md:text-base text-black/70 leading-relaxed">
            More than two-thirds of Summit students name Expeditions as one of the top three
            influences on their plan for after high school.
          </p>
        </motion.div>

        {/* How it becomes motivation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-5">How it becomes motivation</h3>
          <ol className="grid md:grid-cols-3 gap-4">
            {chain.map((c, i) => (
              <li key={c.title} className="relative bg-white rounded-xl p-5 border border-indigo/10">
                <span className="text-xs font-bold text-teal-ink tracking-wide">Step {i + 1}</span>
                <p className="font-bold text-black mt-1 mb-2">{c.title}</p>
                <p className="text-sm text-black/65 leading-relaxed">{c.desc}</p>
                {i < chain.length - 1 && (
                  <span
                    className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange text-white text-sm font-bold items-center justify-center z-10"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="text-sm text-black/60 leading-relaxed mt-4 max-w-3xl">
            Summit already tracks the middle of this chain. Purpose and relevance of school are both
            part of the Habits of Success that students grow in and reflect on with their mentors.
          </p>
        </motion.div>

        {/* Why it is necessary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl border-l-4 border-orange pl-6"
        >
          <h3 className="text-lg font-bold text-indigo mb-3">Why the rest of the model depends on it</h3>
          <p className="text-sm text-black/70 leading-relaxed mb-3">
            The industrial model was built to move whole populations through a fixed sequence, so it
            runs on grades, credits, and seat-time. That works for students who have already found
            their own reasons to engage. For many others, motivation never takes hold. Anderson and
            Winthrop's recent research finds that fewer than 4% of teenagers experience the kind of
            curiosity-driven learning that builds durable skills and real motivation.
          </p>
          <p className="text-sm text-black/70 leading-relaxed">
            Summit 3.0's flexible schedules and technology can match a student to the right
            experience at the right moment, and that only works once someone knows what the student
            cares about. That knowledge comes from trust built with a mentor and from real chances to
            try things. Mentoring and Expeditions are what give every pathway its direction.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
