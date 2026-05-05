import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Spark } from './SummitCharacters'

export default function Throughline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 px-6 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-teal font-bold text-sm tracking-wide mb-3">The model</p>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo">
            Every student has a pathway
          </h2>
        </motion.div>

        {/* LARGE VISUAL DIAGRAM — the centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center mb-8"
        >
          <svg viewBox="0 0 800 680" className="w-full max-w-4xl" fill="none">

            {/* ===== COMMUNITY FOUNDATION ===== */}
            <ellipse cx="400" cy="622" rx="370" ry="44" fill="#f6aa40" opacity="0.1" />
            <ellipse cx="400" cy="622" rx="340" ry="36" fill="#f6aa40" opacity="0.08" />
            <text x="400" y="626" textAnchor="middle" fill="#f6aa40" fontWeight="700" fontSize="18" fontFamily="Arimo, sans-serif">Rooted in Community</text>
            <text x="400" y="648" textAnchor="middle" fill="#000" opacity="0.25" fontSize="12" fontFamily="Arimo, sans-serif">Students belong. Adults share purpose. Families are partners.</text>

            {/* ===== THE PATHWAY — left column ===== */}
            {/* Pathway header bar */}
            <rect x="30" y="30" width="350" height="46" rx="12" fill="#4b4b96" />
            <text x="205" y="58" textAnchor="middle" fill="white" fontWeight="700" fontSize="20" fontFamily="Arimo, sans-serif">The Pathway</text>

            {/* Step 1 */}
            <rect x="30" y="86" width="350" height="136" rx="12" fill="#4b4b96" opacity="0.05" stroke="#4b4b96" strokeWidth="1" opacity="0.12" />
            <circle cx="58" cy="112" r="16" fill="#96d2dc" />
            <text x="58" y="117" textAnchor="middle" fill="white" fontWeight="700" fontSize="14" fontFamily="Arimo, sans-serif">1</text>
            <text x="82" y="112" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.8">Who is the student, and what</text>
            <text x="82" y="128" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.8">do they want for their life?</text>
            <text x="82" y="150" fill="#000" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.4">Data, history, interests, goals, developmental needs</text>
            <text x="82" y="164" fill="#000" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.4">and aspirations for the life they want to build.</text>
            {/* Agency sub-rows */}
            <line x1="50" y1="176" x2="370" y2="176" stroke="#4b4b96" strokeWidth="0.5" opacity="0.1" />
            <text x="50" y="192" fill="#508278" fontWeight="700" fontSize="9" fontFamily="Arimo, sans-serif" opacity="0.6">THE SYSTEM</text>
            <text x="120" y="192" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Surfaces data, history, and patterns. Asks the right questions.</text>
            <text x="50" y="208" fill="#96d2dc" fontWeight="700" fontSize="9" fontFamily="Arimo, sans-serif" opacity="0.8">THE STUDENT</text>
            <text x="126" y="208" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Reflects on who they are and what they want. Shares what matters.</text>

            {/* Arrow 1→2 */}
            <path d="M205 222 L205 240" stroke="#4b4b96" strokeWidth="2" opacity="0.2" />
            <path d="M200 236 L205 244 L210 236" fill="#4b4b96" opacity="0.2" />

            {/* Step 2 */}
            <rect x="30" y="248" width="350" height="136" rx="12" fill="#4b4b96" opacity="0.05" stroke="#4b4b96" strokeWidth="1" opacity="0.12" />
            <circle cx="58" cy="274" r="16" fill="#508278" />
            <text x="58" y="279" textAnchor="middle" fill="white" fontWeight="700" fontSize="14" fontFamily="Arimo, sans-serif">2</text>
            <text x="82" y="274" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.8">What outcomes will support their</text>
            <text x="82" y="290" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.8">launch into the life they want?</text>
            <text x="82" y="312" fill="#000" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.4">College-ready academic foundations and durable</text>
            <text x="82" y="326" fill="#000" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.4">skills like collaboration, communication,</text>
            <text x="82" y="340" fill="#000" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.4">and interpersonal awareness.</text>
            {/* Agency sub-rows */}
            <line x1="50" y1="350" x2="370" y2="350" stroke="#4b4b96" strokeWidth="0.5" opacity="0.1" />
            <text x="50" y="366" fill="#508278" fontWeight="700" fontSize="9" fontFamily="Arimo, sans-serif" opacity="0.6">THE SYSTEM</text>
            <text x="120" y="366" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Maps academic foundations and durable skills to the life the student is building toward.</text>
            <text x="50" y="382" fill="#96d2dc" fontWeight="700" fontSize="9" fontFamily="Arimo, sans-serif" opacity="0.8">THE STUDENT</text>
            <text x="126" y="382" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Co-owns the goals. Adjusts them as self-knowledge grows.</text>

            {/* Arrow 2→3 */}
            <path d="M205 384 L205 402" stroke="#4b4b96" strokeWidth="2" opacity="0.2" />
            <path d="M200 398 L205 406 L210 398" fill="#4b4b96" opacity="0.2" />

            {/* Step 3 */}
            <rect x="30" y="410" width="350" height="136" rx="12" fill="#4b4b96" opacity="0.05" stroke="#4b4b96" strokeWidth="1" opacity="0.12" />
            <circle cx="58" cy="436" r="16" fill="#4b4b96" />
            <text x="58" y="441" textAnchor="middle" fill="white" fontWeight="700" fontSize="14" fontFamily="Arimo, sans-serif">3</text>
            <text x="82" y="436" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.8">What experiences will</text>
            <text x="82" y="452" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.8">prepare them?</text>
            <text x="82" y="474" fill="#000" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.4">Eight experience types across context, content,</text>
            <text x="82" y="488" fill="#000" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.4">and discipline, the right combination for each student.</text>
            {/* Agency sub-rows */}
            <line x1="50" y1="500" x2="370" y2="500" stroke="#4b4b96" strokeWidth="0.5" opacity="0.1" />
            <text x="50" y="516" fill="#508278" fontWeight="700" fontSize="9" fontFamily="Arimo, sans-serif" opacity="0.6">THE SYSTEM</text>
            <text x="120" y="516" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Sequences experience types based on where the student is and what they need next.</text>
            <text x="50" y="532" fill="#96d2dc" fontWeight="700" fontSize="9" fontFamily="Arimo, sans-serif" opacity="0.8">THE STUDENT</text>
            <text x="126" y="532" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Increasingly designs and chooses experiences. Leads the pathway over time.</text>

            {/* ===== HUMAN-CENTERED GUIDANCE — right column ===== */}
            {/* Guidance header bar */}
            <rect x="420" y="30" width="350" height="46" rx="12" fill="#f6aa40" />
            <text x="595" y="58" textAnchor="middle" fill="white" fontWeight="700" fontSize="20" fontFamily="Arimo, sans-serif">Human-Centered Guidance</text>

            {/* Guidance body */}
            <rect x="420" y="86" width="350" height="460" rx="12" fill="#f6aa40" opacity="0.05" stroke="#f6aa40" strokeWidth="1" opacity="0.12" />

            {/* Central message */}
            <text x="595" y="118" textAnchor="middle" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.7">Helping young people situate</text>
            <text x="595" y="134" textAnchor="middle" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.7">their learning within the broader</text>
            <text x="595" y="150" textAnchor="middle" fill="#000" fontWeight="700" fontSize="13" fontFamily="Arimo, sans-serif" opacity="0.7">human experience.</text>

            {/* Four capacities as visual blocks */}
            {/* Guides */}
            <rect x="440" y="172" width="150" height="52" rx="10" fill="#f6aa40" opacity="0.12" />
            <circle cx="464" cy="198" r="12" fill="#f6aa40" opacity="0.5" />
            <text x="464" y="202" textAnchor="middle" fill="white" fontWeight="700" fontSize="10" fontFamily="Arimo, sans-serif">G</text>
            <text x="482" y="193" fill="#000" fontWeight="700" fontSize="12" fontFamily="Arimo, sans-serif" opacity="0.7">Guides</text>
            <text x="482" y="208" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Deep relationships</text>

            {/* Content Experts */}
            <rect x="600" y="172" width="150" height="52" rx="10" fill="#4b4b96" opacity="0.1" />
            <circle cx="624" cy="198" r="12" fill="#4b4b96" opacity="0.5" />
            <text x="624" y="202" textAnchor="middle" fill="white" fontWeight="700" fontSize="10" fontFamily="Arimo, sans-serif">C</text>
            <text x="642" y="193" fill="#000" fontWeight="700" fontSize="12" fontFamily="Arimo, sans-serif" opacity="0.7">Content Experts</text>
            <text x="642" y="208" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Subject-matter depth</text>

            {/* Facilitators */}
            <rect x="440" y="234" width="150" height="52" rx="10" fill="#508278" opacity="0.1" />
            <circle cx="464" cy="260" r="12" fill="#508278" opacity="0.5" />
            <text x="464" y="264" textAnchor="middle" fill="white" fontWeight="700" fontSize="10" fontFamily="Arimo, sans-serif">F</text>
            <text x="482" y="255" fill="#000" fontWeight="700" fontSize="12" fontFamily="Arimo, sans-serif" opacity="0.7">Facilitators</text>
            <text x="482" y="270" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Design experiences</text>

            {/* System Architects */}
            <rect x="600" y="234" width="150" height="52" rx="10" fill="#96a0ab" opacity="0.12" />
            <circle cx="624" cy="260" r="12" fill="#96a0ab" opacity="0.5" />
            <text x="624" y="264" textAnchor="middle" fill="white" fontWeight="700" fontSize="10" fontFamily="Arimo, sans-serif">S</text>
            <text x="642" y="255" fill="#000" fontWeight="700" fontSize="12" fontFamily="Arimo, sans-serif" opacity="0.7">System Architects</text>
            <text x="642" y="270" fill="#000" fontSize="10" fontFamily="Arimo, sans-serif" opacity="0.35">Connect all the parts</text>

            {/* "The right adult, in the right role" */}
            <text x="595" y="316" textAnchor="middle" fill="#f6aa40" fontWeight="700" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.6">The right adult, in the right role,</text>
            <text x="595" y="332" textAnchor="middle" fill="#f6aa40" fontWeight="700" fontSize="11" fontFamily="Arimo, sans-serif" opacity="0.6">at the right moment.</text>

            {/* ===== CONNECTING LINES to community ===== */}
            <path d="M205 546 L205 570 Q205 585 230 590 L360 608" stroke="#4b4b96" strokeWidth="2" opacity="0.15" strokeDasharray="6 4" />
            <path d="M595 546 L595 570 Q595 585 570 590 L440 608" stroke="#f6aa40" strokeWidth="2" opacity="0.15" strokeDasharray="6 4" />

            {/* Student dot at junction */}
            <circle cx="400" cy="595" r="10" fill="white" stroke="#508278" strokeWidth="2" />
            <circle cx="400" cy="592" r="3" fill="#508278" opacity="0.5" />

            {/* Sparks */}
            <Spark cx={18} cy={50} size={8} color="#f6aa40" />
            <Spark cx={782} cy={44} size={7} color="#4b4b96" />
            <Spark cx={400} cy={16} size={5} color="#508278" />
          </svg>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-bold">
            <span className="text-indigo">Pathway-driven.</span>{' '}
            <span className="text-orange">Human-centered.</span>{' '}
            <span className="text-teal">Community-rooted.</span>
          </p>
        </motion.div>

        {/* Why students do the work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-16 max-w-3xl mx-auto border-l-4 border-orange pl-6"
        >
          <h3 className="text-lg font-bold text-indigo mb-3">Why students do the work</h3>
          <p className="text-sm text-black/60 leading-relaxed mb-3">
            The industrial model runs on extrinsic motivation: grades, credits, seat-time,
            consequences. It works for students who are already bought in and fails everyone
            else. Summit 3.0 runs on a different motivational theory.
          </p>
          <p className="text-sm text-black/60 leading-relaxed mb-3">
            When students see why they're doing something, because it connects to a pathway
            they're building toward a life they want, the work becomes worth doing on its own
            terms. When the system matches them to the right experience at their actual level,
            two sources of demotivation disappear: being perpetually lost and being perpetually
            bored. When a human guide helps them see how their experiences connect into a
            coherent story about who they're becoming, ownership takes root.
          </p>
          <p className="text-sm text-black/60 leading-relaxed">
            Relevance through the pathway. Precision that builds competence. Human guidance
            that makes meaning. Three conditions that reinforce each other, and weaken if any
            one is missing. That is why Summit 3.0 builds all three together.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
