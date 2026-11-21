import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ElementTag } from './ElementTag'

/*
 * What Students Get: the three model elements every Summit student gets, and what
 * Summit already has. Merges the earlier "What We Want for Every Student" and
 * "What Summit Already Has" sections: an Academic Core card, the long-term mentor
 * (Mentoring) and Expeditions (Career-Connected Learning), then the durable-skills
 * and pathway outcomes, the 2-in-3 stat, and what the community asked us to keep
 * and build.
 *
 * Sources: 2030 Strategy Source of Truth (Oct 2026); Summit Sierra and Summit 780
 * design blueprints (SY27); SXSW EDU 2026 Expeditions deck. The two-thirds figure is
 * from the Expeditions program FAQ and the source of truth. The 91% and 2,245 figures
 * are from the Sierra 11/9 site visit deck (Nov 2026).
 */

const arc = [
  { step: 'Expose', desc: 'Try a wide range of fields and see what real work looks like.' },
  { step: 'Explore', desc: 'Go deeper into the ones that pull at you.' },
  { step: 'Pursue', desc: 'Internships, credentials, and college courses in a chosen direction.' },
]

// Expeditions placements this year, from SY26-27 verified roster data.
const placements = [
  '404 college course enrollments',
  '369 internships and placements',
  '203 industry credentials',
  '157 in the healthcare pipeline',
]

// Outcomes carried over from "What We Want for Every Student". Academics now live
// in the Academic Core card; these two are outcomes, not elements, so they use
// neutral accents.
const outcomes = [
  {
    title: 'Durable Skills for Thriving in Life',
    subtitle: 'The transferable capacities that make knowledge usable and life navigable.',
    body: 'Communication, collaboration, problem-solving, and critical thinking. Self-direction, curiosity, resilience, agency, and interpersonal awareness. Digital and AI fluency: working with the tools that increasingly shape every field and every life.',
  },
  {
    title: 'A Pathway and a Clear Next Step',
    subtitle: 'Direction for life after high school, and a real first step toward it.',
    body: 'Every student leaves with a pathway, their own plan for the life they want, and a clear next step they are ready to take: college, a credential, a first job, or a high-growth career, with the ability to support themselves along the way. The pathway grows out of years of mentoring and career-connected learning through Expeditions, so students can explain why it fits them.',
    note: 'Economic empowerment means a strong first job or credential, earnings that support independence, and real options.',
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

export default function WhatStudentsGet() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-white"
      ref={ref}
      id="what-students-get"
      aria-labelledby="what-students-get-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="what-students-get-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5">
            What Students Get
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-8">
            Every Summit student builds the foundations of a fulfilled life: purposeful work,
            financial independence, strong relationships, community, and health. They leave with
            three things: the academics that open doors, the skills that make a life navigable, and
            a pathway toward what comes next.
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-3">What Summit Already Has</h3>
          <p className="text-base md:text-lg text-black/80 leading-relaxed mb-4">
            Mentoring and career-connected learning are already deeply personal to each student.
            Every Summit student has a mentor from middle school to graduation, takes part in
            career-connected learning through Expeditions three times a year, and builds a
            personalized plan for life after high school.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            That plan is the student&rsquo;s pathway, and it changes as they grow. Before a student
            can choose a direction, they have to trust an adult enough to say what they want, and
            they have to try enough real things to know.
          </p>
        </motion.div>

        {/* The three elements, at every school today */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-white rounded-xl border border-black/8 border-t-4 border-t-indigo p-6 flex flex-col"
          >
            <ElementTag element="academic" size="xs" className="mb-2" />
            <h3 className="text-xl font-bold text-indigo mb-1">College-Ready Academic Core</h3>
            <p className="text-sm font-bold italic text-indigo mb-4">
              Understanding the world through math, science, history, and language.
            </p>
            <p className="text-sm text-black/70 leading-relaxed">
              Reading and writing with depth. Mathematical reasoning. Scientific inquiry. Civic and
              historical understanding. The disciplinary knowledge and ways of thinking that prepare
              students for college, careers, and a life of continued learning.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border border-black/8 border-t-4 border-t-teal p-6 flex flex-col"
          >
            <ElementTag element="mentoring" size="xs" className="mb-2" />
            <h3 className="text-xl font-bold text-indigo mb-1">A Long-Term Mentor</h3>
            <p className="text-sm font-bold italic text-teal-ink mb-4">Someone who knows you, and stays</p>
            <p className="text-sm text-black/70 leading-relaxed mb-3">
              Every student has a mentor who stays with them as they grow. One-on-one check-ins with
              that mentor are a core part of mentoring, along with community time every day. Each
              student&rsquo;s mentor and core group of peers stay constant all year.
            </p>
            <p className="text-sm text-black/70 leading-relaxed">
              Mentors guide each student&rsquo;s pathway with the student and their family, and
              connect short-term choices to long-term plans. Trust builds over time, and a mentor who
              has known a student for years hears things a new adult never would.
            </p>
            <div className="mt-auto pt-5">
              <div className="rounded-lg bg-teal/[0.08] px-4 py-3 flex items-baseline gap-3">
                <p className="text-3xl font-bold text-teal-ink shrink-0">91%</p>
                <p className="text-sm text-black/75 leading-snug">of Summit students trust their mentor</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border border-black/8 border-t-4 border-t-orange p-6 flex flex-col"
          >
            <ElementTag element="ccl" size="xs" className="mb-2" />
            <h3 className="text-xl font-bold text-indigo mb-1">Career-Connected Learning, Through Expeditions</h3>
            <p className="text-sm font-bold italic text-orange-ink mb-4">Real work in the real world</p>
            <p className="text-sm text-black/70 leading-relaxed mb-4">
              Expeditions, Summit&rsquo;s career-connected learning program, put students inside real
              work with community organizations, companies, and colleges. After every Expedition, students step back with their mentor and ask
              what it changed about how they see their future. Expeditions are graduated:
            </p>
            <ol className="space-y-2">
              {arc.map((a, i) => (
                <li key={a.step} className="flex gap-3 items-start">
                  <span
                    className="w-6 h-6 rounded-full bg-orange text-black text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-black/70 leading-relaxed">
                    <span className="font-bold text-orange-ink">{a.step}.</span> {a.desc}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-auto pt-5">
              <div className="rounded-lg bg-orange/10 px-4 py-3">
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-bold text-orange-ink shrink-0">2,245</p>
                  <p className="text-sm text-black/75 leading-snug">
                    personalized placements this year across Summit&rsquo;s seven high schools in college courses,
                    internships, and industry credentials
                  </p>
                </div>
                <ul className="mt-3 pt-3 border-t border-orange/30 flex flex-wrap gap-x-3 gap-y-1 text-xs text-black/70">
                  {placements.map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Outcomes students leave with */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {outcomes.map((o) => (
            <div key={o.title} className="bg-white rounded-xl border border-black/8 border-t-4 border-t-black/15 p-6">
              <h3 className="text-xl font-bold text-indigo mb-1">{o.title}</h3>
              <p className="text-sm font-bold italic text-black/65 mb-4">{o.subtitle}</p>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">{o.body}</p>
              {o.note && <p className="text-sm font-bold text-black/75 leading-relaxed mt-4">{o.note}</p>}
            </div>
          ))}
        </div>

        {/* Proof point */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-mint rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-16"
        >
          <p className="text-4xl md:text-5xl font-bold text-indigo shrink-0">2 in 3</p>
          <p className="text-sm md:text-base text-black/70 leading-relaxed">
            More than two thirds of Summit students name Expeditions as a top influence on
            their plan after high school.
          </p>
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
            <div className="bg-white rounded-xl border border-black/8 border-t-4 border-t-black/15 p-6">
              <h4 className="font-bold text-indigo mb-3">Keep</h4>
              <ul className="space-y-2">
                {keep.map((k) => (
                  <li key={k} className="flex gap-2 text-sm md:text-base text-black/75">
                    <span className="text-black/50 font-bold" aria-hidden="true">•</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-black/8 border-t-4 border-t-black/15 p-6">
              <h4 className="font-bold text-indigo mb-3">Build</h4>
              <ul className="space-y-2">
                {build.map((k) => (
                  <li key={k} className="flex gap-2 text-sm md:text-base text-black/75">
                    <span className="text-black/50 font-bold" aria-hidden="true">•</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-base text-black/75 leading-relaxed mt-5 max-w-3xl">
            These signals match what families across the country are asking for, and what employers
            now expect from graduates. Flexible time brings the same personalization students already
            get from mentoring and career-connected learning to the academic core.
          </p>
        </motion.div>

        <p className="text-xs text-black/60 mt-10">
          Sources: SY26&ndash;27 verified Expeditions roster data; Summit SY25 and SY26 spring student surveys.
        </p>
      </div>
    </section>
  )
}
