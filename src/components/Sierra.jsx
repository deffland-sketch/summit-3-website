import { motion, useInView } from 'framer-motion'
import { Fragment, useRef } from 'react'
import { brand } from '../palette'

/*
 * Summit Sierra: the first proof point. Sits after the eight experience types and
 * before Amara's week. Copy is from Dan's Nov 2026 spec, drawn from the Sierra 11/9
 * site visit deck. Visuals vary on purpose (stacked bars, a day-shape strip, a
 * progression strip, stat tiles, a three-step loop) so the section does not read
 * as a wall of cards. Every color is paired with a text label.
 */

// The three experience types Sierra starts with, in the same colors as the
// eight-type legend in LearningExperiences.jsx. `text` is the segment label color
// chosen for contrast against the fill.
const types = [
  { key: 'di', label: 'Direct instruction', color: brand.indigo, text: 'text-white' },
  { key: 'pf', label: 'Practice and feedback', color: brand.teal, text: 'text-black' },
  { key: 'dd', label: 'Discussion and dialogue', color: brand.orange, text: 'text-black' },
]

const students = [
  { name: 'Student A', mix: { di: 45, pf: 30, dd: 25 } },
  { name: 'Student B', mix: { di: 20, pf: 55, dd: 25 } },
  { name: 'Student C', mix: { di: 20, pf: 30, dd: 50 } },
]

const progression = ['Structured', 'Guided choice', 'More independence', 'Student ownership']
// Rising indigo intensity carries the progression; each step also has its label.
const progressionStyle = [
  'bg-indigo/10 text-indigo',
  'bg-indigo/25 text-indigo',
  'bg-indigo/40 text-black',
  'bg-indigo text-white',
]

const foundation = [
  {
    label: 'Academics',
    stat: '+10 points',
    body: 'in students meeting the ELA standard, SY25 to SY26. Math proficiency also rose by 4%.',
    top: 'border-t-indigo',
    ink: 'text-indigo',
  },
  {
    label: 'A clear next step',
    stat: '100%',
    body: 'of SY26 graduates graduated and were accepted to at least one college. More than 80% of first-generation graduates have enrolled in college for three straight years.',
    top: 'border-t-teal',
    ink: 'text-teal-ink',
  },
  {
    label: 'Teams',
    stat: null,
    body: 'Students stayed, key teachers stayed, and the team chose and designed this model together.',
    top: 'border-t-orange',
    ink: 'text-orange-ink',
  },
]

const loop = [
  { step: 'Listen', desc: 'Compare what we built with what students experience' },
  { step: 'Adjust', desc: 'Redesign with teachers and students' },
  { step: 'Check again', desc: null },
]

const examples = [
  {
    title: 'Mentoring',
    heard: 'The three daily touchpoints were in place, and students wanted mentor time to focus more on growth and community.',
    changed: 'A morning launch with independent reading, goal setting with one goal per rotation plus a habit goal, and end-of-day community building from a student-chosen menu.',
  },
  {
    title: 'Student-directed learning',
    heard: 'Students valued independent work and asked for predictable time with teachers and peers.',
    changed: 'Afternoon focus blocks became targeted skill and academic workshops, guided practice with teachers, and academic extension workshops.',
  },
]

const measures = [
  { label: 'Academic growth', body: 'Growth on MAP for students who start below grade level' },
  { label: 'Belonging', body: 'Students feel they belong and can name a trusted adult' },
  { label: 'Ownership', body: 'Students identify what they need and choose the right support' },
  { label: 'Teacher time', body: 'More of teachers’ time goes to high-impact work' },
  { label: 'A clear next step', body: 'On-track progress toward high-value credentials, early college credit, and a clear next step before graduation' },
]

function Sub({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Sierra() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-20 md:py-28 px-6 bg-mint"
      ref={ref}
      id="sierra"
      aria-labelledby="sierra-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-sm font-bold text-teal-ink mb-2">The first proof point</p>
          <h2 id="sierra-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5 leading-tight">
            Summit Sierra: The First Proof Point of Summit&rsquo;s Next Step
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Summit Sierra in Seattle is the first Summit school bringing flexible time to the academic
            core. Sierra&rsquo;s design team of teachers and students chose this model together, and
            they are building it on a strong foundation.
          </p>
        </motion.div>

        {/* 1. Three of the eight experience types */}
        <Sub className="mb-16">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-indigo mb-3">
                Starting With Three of the Eight Experience Types
              </h3>
              <p className="text-base text-black/80 leading-relaxed">
                The full model has eight experience types. Sierra is starting with three in the
                academic core: direct instruction, practice and feedback, and discussion and dialogue.
                Every student gets all three. What flexes is how much of each.
              </p>
            </div>
            <figure className="bg-white rounded-xl border border-black/8 p-5 md:p-6">
              <figcaption className="text-sm font-bold text-black/70 mb-3">
                Illustrative: one week in the academic core
              </figcaption>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 mb-4" aria-label="Legend">
                {types.map((t) => (
                  <li key={t.key} className="flex items-center gap-1.5 text-xs text-black/75">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.color }} aria-hidden="true" />
                    {t.label}
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {students.map((s) => {
                  const desc = types.map((t) => `${t.label.toLowerCase()} ${s.mix[t.key]}%`).join(', ')
                  return (
                    <li key={s.name} className="grid grid-cols-[4.75rem_1fr] items-center gap-3">
                      <span className="text-sm font-bold text-black/80">{s.name}</span>
                      <div className="flex h-9 rounded-md overflow-hidden" role="img" aria-label={`${s.name}: ${desc}`}>
                        {types.map((t) => (
                          <div
                            key={t.key}
                            className={`flex items-center justify-center text-xs font-bold ${t.text}`}
                            style={{ width: `${s.mix[t.key]}%`, backgroundColor: t.color }}
                            aria-hidden="true"
                          >
                            {s.mix[t.key]}%
                          </div>
                        ))}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </figure>
          </div>
        </Sub>

        {/* 2. A day at Sierra today: the day's shape, then the progression */}
        <Sub className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-5">A Day at Sierra Today</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-white border-t-4 border-orange p-5">
              <p className="text-sm font-bold text-orange-ink">Morning</p>
              <p className="text-lg font-bold text-indigo mt-1">Collaborative learning</p>
              <p className="text-sm text-black/60 mt-0.5">Three 50-minute blocks on an A/B schedule</p>
              <p className="text-sm md:text-base text-black/75 leading-relaxed mt-3">
                Socratic seminars, labs, book talks, and peer collaboration
              </p>
            </div>
            <div className="rounded-xl bg-white border-t-4 border-teal p-5">
              <p className="text-sm font-bold text-teal-ink">Afternoon</p>
              <p className="text-lg font-bold text-indigo mt-1">Student-directed learning</p>
              <p className="text-sm text-black/60 mt-0.5">About a 2.5-hour block</p>
              <p className="text-sm md:text-base text-black/75 leading-relaxed mt-3">
                Focused practice, teacher-led skill workshops, and one-on-one mentor conferences
              </p>
            </div>
            {/* Mentoring spans both halves of the day */}
            <div className="md:col-span-2 rounded-xl bg-indigo text-white px-5 py-4 flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
              <div className="shrink-0">
                <p className="text-sm font-bold text-white/85">All day</p>
                <p className="text-lg font-bold">Mentoring</p>
                <p className="text-sm text-white/85">Three daily touchpoints</p>
              </div>
              <p className="text-sm md:text-base text-white/95 leading-relaxed md:border-l md:border-white/25 md:pl-6 mt-2 md:mt-0">
                Morning launch, midday goal setting, and end-of-day reflection, anchored in each
                student&rsquo;s learning plan
              </p>
            </div>
          </div>

          <ol className="mt-6 flex flex-col sm:flex-row sm:items-stretch gap-2" aria-label="How student ownership grows">
            {progression.map((p, i) => (
              <Fragment key={p}>
                {i > 0 && (
                  <li className="flex items-center justify-center text-indigo font-bold" aria-hidden="true">
                    <span className="rotate-90 sm:rotate-0">→</span>
                  </li>
                )}
                <li className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold text-center ${progressionStyle[i]}`}>
                  {p}
                </li>
              </Fragment>
            ))}
          </ol>
          <p className="text-sm md:text-base text-black/75 mt-3">
            Our aim this spring: students build part of their own weekly schedule.
          </p>
        </Sub>

        {/* 3. The foundation */}
        <Sub className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-5">The Foundation Sierra Is Building On</h3>
          <ul className="grid md:grid-cols-3 gap-5">
            {foundation.map((f) => (
              <li key={f.label} className={`bg-white rounded-xl border-t-4 ${f.top} p-6`}>
                <p className={`text-sm font-bold ${f.ink}`}>{f.label}</p>
                {f.stat && <p className="text-4xl font-bold text-indigo mt-2 mb-2">{f.stat}</p>}
                <p className={`leading-relaxed ${f.stat ? 'text-sm md:text-base text-black/70' : 'text-base md:text-lg text-black/80 mt-3'}`}>
                  {f.body}
                </p>
              </li>
            ))}
          </ul>
        </Sub>

        {/* 4. Learning as we go */}
        <Sub className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-2">Learning As We Go</h3>
          <p className="text-base text-black/80 leading-relaxed mb-6 max-w-3xl">
            Sierra keeps checking what we built against what students experience, and changes course
            with them.
          </p>
          <div className="relative mb-8">
            <ol className="grid sm:grid-cols-3 gap-3" aria-label="A three-step loop that repeats">
              {loop.map((l, i) => (
                <li key={l.step} className="relative flex items-start gap-3 bg-white rounded-xl p-4">
                  <span className="w-8 h-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center shrink-0" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-indigo">{l.step}</p>
                    {l.desc && <p className="text-sm text-black/70 leading-snug mt-0.5">{l.desc}</p>}
                  </div>
                  {i < loop.length - 1 && (
                    <span className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange text-black text-sm font-bold items-center justify-center z-10" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            {/* Return path from step 3 back to step 1, so the steps read as a loop */}
            <svg className="hidden sm:block w-full h-6 mt-1" viewBox="0 0 600 24" preserveAspectRatio="none" aria-hidden="true">
              <path d="M500 2 V14 H100 V4" fill="none" stroke={brand.teal} strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
              <path d="M95 9 L100 2 L105 9" fill="none" stroke={brand.teal} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {examples.map((e) => (
              <article key={e.title} className="bg-white rounded-xl border border-black/8 p-6">
                <h4 className="text-lg font-bold text-indigo mb-4">{e.title}</h4>
                <p className="text-sm font-bold text-teal-ink mb-1">What we heard</p>
                <p className="text-sm md:text-base text-black/75 leading-relaxed mb-4">{e.heard}</p>
                <p className="text-sm font-bold text-orange-ink mb-1">What we changed</p>
                <p className="text-sm md:text-base text-black/75 leading-relaxed">{e.changed}</p>
              </article>
            ))}
          </div>
        </Sub>

        {/* 5. How we'll know it's working */}
        <Sub>
          <h3 className="text-xl md:text-2xl font-bold text-indigo mb-2">How We&rsquo;ll Know It&rsquo;s Working</h3>
          <p className="text-base text-black/80 leading-relaxed mb-6">The first year of evidence looks at five things.</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {measures.map((m, i) => (
              <li key={m.label} className="border-l-2 border-indigo pl-4">
                <p className="text-xs font-bold text-black/60" aria-hidden="true">{i + 1}</p>
                <p className="font-bold text-indigo mb-1">{m.label}</p>
                <p className="text-sm text-black/70 leading-relaxed">{m.body}</p>
              </li>
            ))}
          </ol>
          <div className="bg-white rounded-xl border-l-4 border-orange p-5 md:p-6">
            <h4 className="text-lg font-bold text-indigo mb-2">How Results Set the Pace</h4>
            <p className="text-sm md:text-base text-black/75 leading-relaxed">
              Winter MAP is the early signal. If it shows slower growth than peers, we adjust. If it
              shows faster growth, we build on what&rsquo;s working. The LEAP survey gives us regular
              student feedback along the way.
            </p>
          </div>
        </Sub>
      </div>
    </section>
  )
}

