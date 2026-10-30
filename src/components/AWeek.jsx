import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

/*
 * A Week in Summit 3.0: Amara's week, built around her goals, her progress, and her
 * mentor, set against a traditional bell schedule. Adapted from "A Day in Summit 3.0"
 * and the Sierra deck (Oct 2026). Amara is a composite; partner sites are described
 * generically rather than named.
 */

const steps = [
  { when: 'Friday', title: 'She Sets Her Goals', body: 'With her mentor, Amara names two: finish her argument essay, and see how a newsroom actually works.' },
  { when: 'Over the weekend', title: 'Her Week Is Built', body: 'Around her goals, her progress, and which educators, rooms, and partners are open.' },
  { when: 'Monday', title: 'She and Her Mentor Confirm It', body: 'She swaps one block and goes to work. Technology recommends. People decide.' },
]

const traditional = [
  { time: '8:00', label: 'Period 1: English' },
  { time: '8:55', label: 'Period 2: Math' },
  { time: '9:50', label: 'Period 3: Science' },
  { time: '10:45', label: 'Period 4: History' },
  { time: '11:40', label: 'Lunch' },
  { time: '12:20', label: 'Period 5: World language' },
  { time: '1:15', label: 'Period 6: Elective' },
]

// type: academic | independent | community | realworld
const week = [
  {
    day: 'Mon',
    blocks: [
      { time: '8:30', label: 'Community launch', type: 'community' },
      { time: '9:15', label: 'Lesson: linear functions', type: 'academic' },
      { time: '10:15', label: 'Writing conference', type: 'academic' },
      { time: '11:00', label: 'Studio: creek water report', type: 'independent' },
      { time: '1:00', label: 'Science demo: water chemistry', type: 'academic' },
      { time: '3:00', label: 'Reflection', type: 'community' },
    ],
  },
  {
    day: 'Tue',
    blocks: [
      { time: '8:30', label: 'Community launch', type: 'community' },
      { time: '9:15', label: 'Studio: creek report', type: 'independent' },
      { time: '10:30', label: 'Lesson: argument writing', type: 'academic', note: 'Added overnight' },
      { time: '12:30', label: 'Job shadow at a local newsroom', type: 'realworld' },
      { time: '3:00', label: 'Reflection', type: 'community' },
    ],
  },
  {
    day: 'Wed',
    field: true,
    blocks: [
      { time: '8:30', label: 'Virtual check-in', type: 'community' },
      { time: '9:00', label: 'Full day at the newsroom: reporting and drafting', type: 'realworld' },
      { time: '3:00', label: 'Reflection, on site', type: 'community' },
    ],
  },
  {
    day: 'Thu',
    blocks: [
      { time: '8:30', label: 'Community launch', type: 'community' },
      { time: '9:15', label: 'Peer critique: essays', type: 'academic' },
      { time: '10:30', label: 'Skills clinic: citations', type: 'academic' },
      { time: '11:30', label: 'Writing assessment', type: 'academic', note: 'Booked when she was ready' },
      { time: '1:00', label: 'Reading circle', type: 'academic' },
      { time: '3:00', label: 'Goal check with her mentor', type: 'community' },
    ],
  },
  {
    day: 'Fri',
    blocks: [
      { time: '8:30', label: 'Community launch', type: 'community' },
      { time: '9:15', label: 'AI tutor: revision', type: 'independent' },
      { time: '10:30', label: 'Exhibition prep', type: 'independent' },
      { time: '1:00', label: 'Exhibition of learning', type: 'academic' },
      { time: '2:30', label: 'Goal-setting with her mentor', type: 'community' },
    ],
  },
]

const typeStyle = {
  academic: { bar: 'bg-indigo', label: 'Academic core' },
  independent: { bar: 'bg-light-blue', label: 'Independent work' },
  community: { bar: 'bg-orange', label: 'Mentoring and community' },
  realworld: { bar: 'bg-teal', label: 'Real-world learning' },
}

const views = [
  { key: 'amara', label: 'Amara’s Week' },
  { key: 'traditional', label: 'A Traditional Week' },
]

export default function AWeek() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [view, setView] = useState('amara')

  const onTabKeyDown = (e, key) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const keys = views.map((v) => v.key)
    const next = keys[(keys.indexOf(key) + dir + keys.length) % keys.length]
    setView(next)
    document.getElementById(`week-tab-${next}`)?.focus()
  }

  return (
    <section
      className="py-20 md:py-28 px-6 bg-white"
      ref={ref}
      id="a-week"
      aria-labelledby="a-week-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h2 id="a-week-heading" className="text-3xl md:text-4xl font-bold text-indigo mb-5">
            A Week in Summit 3.0
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Amara&rsquo;s week is built around her goals, her progress, and her mentor.
          </p>
        </motion.div>

        {/* How the week takes shape */}
        <ol className="grid md:grid-cols-3 gap-5 mb-12">
          {steps.map((s, i) => (
            <motion.li
              key={s.when}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="bg-mint rounded-xl border-t-4 border-teal p-6"
            >
              <p className="text-sm font-bold text-teal-ink mb-1">{s.when}</p>
              <h3 className="text-lg font-bold text-indigo mb-2">{s.title}</h3>
              <p className="text-sm md:text-base text-black/75 leading-relaxed">{s.body}</p>
            </motion.li>
          ))}
        </ol>

        {/* View switcher: WAI-ARIA tabs */}
        <div
          className="inline-flex flex-wrap gap-1 bg-white rounded-lg p-1 border border-black/10 mb-5"
          role="tablist"
          aria-label="Week view"
        >
          {views.map((v) => (
            <button
              key={v.key}
              role="tab"
              id={`week-tab-${v.key}`}
              aria-selected={view === v.key}
              aria-controls="week-tabpanel"
              tabIndex={view === v.key ? 0 : -1}
              onClick={() => setView(v.key)}
              onKeyDown={(e) => onTabKeyDown(e, v.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${
                view === v.key ? 'bg-indigo text-white' : 'text-indigo hover:bg-indigo/5'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id="week-tabpanel" aria-labelledby={`week-tab-${view}`} tabIndex={-1}>
          {view === 'amara' ? (
            <>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 mb-4" aria-label="Legend">
                {Object.values(typeStyle).map((t) => (
                  <li key={t.label} className="flex items-center gap-1.5 text-xs text-black/65">
                    <span className={`w-3 h-2 rounded-sm ${t.bar}`} aria-hidden="true" />
                    {t.label}
                  </li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {week.map((d) => (
                  <div
                    key={d.day}
                    className={`rounded-xl border p-4 ${d.field ? 'bg-peach/30 border-orange/40' : 'bg-white border-black/10'}`}
                  >
                    <p className="font-bold text-indigo mb-3">
                      {d.day}
                      {d.field && <span className="text-xs font-bold text-orange-ink ml-2">In the field</span>}
                    </p>
                    <ul className="space-y-2">
                      {d.blocks.map((b) => (
                        <li key={b.time + b.label} className="flex gap-2">
                          <span className={`w-1 shrink-0 rounded-full ${typeStyle[b.type].bar}`} aria-hidden="true" />
                          <div>
                            <p className="text-xs text-black/60 tabular-nums">{b.time}</p>
                            <p className="text-sm text-black leading-snug">{b.label}</p>
                            {b.note && <p className="text-xs font-bold text-orange-ink mt-0.5">{b.note}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <p className="text-sm md:text-base text-black/75 leading-relaxed border-l-4 border-orange pl-4">
                  <span className="font-bold text-black">Tuesday, 10:30.</span> Her draft showed two
                  writing skills within reach, so a small-group lesson was added overnight. Her phone
                  showed the change that morning.
                </p>
                <p className="text-sm md:text-base text-black/75 leading-relaxed border-l-4 border-orange pl-4">
                  <span className="font-bold text-black">Thursday, 11:30.</span> AI scored her essay
                  against the writing rubric, her content expert agreed, and the assessment was booked.
                </p>
              </div>
            </>
          ) : (
            <div className="max-w-md bg-white rounded-xl border border-black/10 p-5">
              <p className="font-bold text-indigo mb-3">Monday through Friday</p>
              <ul className="space-y-2">
                {traditional.map((b) => (
                  <li key={b.time} className="flex gap-3 text-sm">
                    <span className="text-black/60 tabular-nums w-11 shrink-0">{b.time}</span>
                    <span className="text-black">{b.label}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-black/65 leading-relaxed mt-4">
                The same six periods in the same order, every day, for every student.
              </p>
            </div>
          )}
        </div>

        <p className="text-sm text-black/60 leading-relaxed mt-6">
          Every day opens with a community launch and closes with reflection. Amara is a composite
          drawn from Summit students.
        </p>
      </div>
    </section>
  )
}
