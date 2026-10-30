import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/*
 * What Summit Already Has: the foundation Summit 3.0 builds on. A long-term mentor
 * who guides each student's pathway, graduated Expeditions, and what the community
 * asked us to keep and build.
 *
 * Sources: 2030 Strategy Source of Truth (Oct 2026); Summit Sierra and Summit 780
 * design blueprints (SY27); SXSW EDU 2026 Expeditions deck. The two-thirds figure is
 * from the Expeditions program FAQ and the source of truth.
 */

const arc = [
  { step: 'Expose', desc: 'Try a wide range of fields and see what real work looks like.' },
  { step: 'Explore', desc: 'Go deeper into the ones that pull at you.' },
  { step: 'Pursue', desc: 'Internships, credentials, and college courses in a chosen direction.' },
]

const chain = [
  {
    title: 'A Sense of Purpose',
    desc: 'Students start to name what they care about and who they want to become.',
  },
  {
    title: 'School Feels Relevant',
    desc: 'A lab report, a seminar, a set of algebra problems: each one connects to a future the student can picture.',
  },
  {
    title: 'Motivation From Within',
    desc: 'Students take on hard work because it moves them toward something that is theirs.',
  },
]

const keep = [
  'Great educators',
  'Deep mentoring and relationships',
  'College-ready academic expectations',
  'Real-world, career-connected learning',
]
const build = [
  'More flexibility in how and when learning happens',
  'AI literacy for the world students are entering',
]

export default function Purpose() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-white"
      ref={ref}
      id="what-we-have"
      aria-labelledby="what-we-have-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="what-we-have-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5">
            What Summit Already Has
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-4">
            Mentoring and Expeditions are already deeply personal to each student. Every Summit
            student has a mentor from middle school to graduation, takes part in Expeditions
            connected to careers three times a year, and builds a personalized plan for life after
            high school.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            That plan is the student&rsquo;s pathway, and it changes as they grow. Before a student
            can choose a direction, they have to trust an adult enough to say what they want, and
            they have to try enough real things to know.
          </p>
        </motion.div>

        {/* The two experiences */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border border-black/8 border-t-4 border-t-orange p-6"
          >
            <h3 className="text-xl font-bold text-indigo mb-1">A Long-Term Mentor</h3>
            <p className="text-sm font-bold italic text-orange-ink mb-4">Someone who knows you, and stays</p>
            <p className="text-sm text-black/70 leading-relaxed mb-3">
              Every student has a mentor who stays with them as they grow, with them every day in
              community and one-on-one. Each student&rsquo;s mentor and core group of peers stay
              constant all year.
            </p>
            <p className="text-sm text-black/70 leading-relaxed">
              Mentors guide each student&rsquo;s pathway with the student and their family, and
              connect short-term choices to long-term plans. Trust builds over time, and a mentor who
              has known a student for years hears things a new adult never would.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border border-black/8 border-t-4 border-t-teal p-6"
          >
            <h3 className="text-xl font-bold text-indigo mb-1">Expeditions</h3>
            <p className="text-sm font-bold italic text-teal-ink mb-4">Real work in the real world</p>
            <p className="text-sm text-black/70 leading-relaxed mb-4">
              Expeditions put students inside real work with community organizations, companies,
              and colleges. After every Expedition, students step back with their mentor and ask
              what it changed about how they see their future. Expeditions are graduated:
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
          className="bg-mint rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-14"
        >
          <p className="text-4xl md:text-5xl font-bold text-indigo shrink-0">2 in 3</p>
          <p className="text-sm md:text-base text-black/70 leading-relaxed">
            More than two thirds of Summit students name Expeditions as a top-three influence on
            their plan after high school.
          </p>
        </motion.div>

        {/* How it becomes motivation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-5">How It Becomes Motivation</h3>
          <ol className="grid md:grid-cols-3 gap-4">
            {chain.map((c, i) => (
              <li key={c.title} className="relative bg-white rounded-xl p-5 border border-black/8">
                <span className="text-xs font-bold text-teal-ink">Step {i + 1}</span>
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
        </motion.div>

        {/* What our community told us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-2">What Our Community Told Us</h3>
          <p className="text-base text-black/75 leading-relaxed mb-5 max-w-3xl">
            Fall 2025 focus groups with students, caregivers and educators across every Summit
            community asked us to keep what works and build what students need next.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-black/8 border-t-4 border-t-indigo p-6">
              <h4 className="font-bold text-indigo mb-3">Keep</h4>
              <ul className="space-y-2">
                {keep.map((k) => (
                  <li key={k} className="flex gap-2 text-sm md:text-base text-black/75">
                    <span className="text-indigo font-bold" aria-hidden="true">•</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-black/8 border-t-4 border-t-orange p-6">
              <h4 className="font-bold text-orange-ink mb-3">Build</h4>
              <ul className="space-y-2">
                {build.map((k) => (
                  <li key={k} className="flex gap-2 text-sm md:text-base text-black/75">
                    <span className="text-orange-ink font-bold" aria-hidden="true">•</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-base text-black/75 leading-relaxed mt-5 max-w-3xl">
            These signals match what families across the country are asking for, and what employers
            now expect from graduates. Summit 3.0 brings the same personalization students already
            get from mentoring and Expeditions to the academic core.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
