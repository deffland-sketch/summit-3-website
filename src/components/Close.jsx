import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const founders = [
  {
    name: 'Cady Ching',
    role: 'Chief Executive Officer',
    photo: '/photos/cady-ching.jpg',
    bio: 'Leads Summit Public Schools and the Summit 3.0 build. Brings deep operating experience across public school networks and a long track record of moving systems toward what students actually need.',
  },
  {
    name: 'Dan Effland',
    role: 'Senior Director of Innovation',
    photo: '/photos/dan-effland.jpg',
    bio: 'Leads the product and technology work underneath Summit 3.0: the LMS, data layer, knowledge graph, and resource matching engine that make personalized pathways operational at school scale.',
  },
]

function FounderCard({ founder, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-6 text-left"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-peach/40 shrink-0 relative">
          <img
            src={founder.photo}
            alt={founder.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-indigo/50 font-bold text-sm pointer-events-none">
            {founder.name.split(' ').map((n) => n[0]).join('')}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-indigo leading-tight">{founder.name}</h4>
          <p className="text-sm text-teal font-bold">{founder.role}</p>
        </div>
      </div>
      <p className="text-sm text-black/75 leading-relaxed">{founder.bio}</p>
    </motion.div>
  )
}

export default function Close() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="py-24 md:py-32 px-6 bg-indigo text-white"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-orange font-bold text-sm tracking-[0.18em] uppercase mb-4"
        >
          The invitation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-[1.1]"
        >
          Every student with agency, momentum, and a pathway toward economic mobility.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-5 text-lg text-white/95 leading-relaxed mb-10"
        >
          <p>
            Purposeful work. Financial independence. Strong relationships. Community. Health.
            That's been Summit's vision since 2003, and the data shows students are getting there.
          </p>
          <p className="border-l-4 border-orange pl-5">
            Time, talent, and technology make the model work. The fourth ingredient is investment.
            Building the proof point that can move the system takes partners willing to fund it.
          </p>
          <p className="font-bold">
            The tools exist. The team is in place. The track record is real. We're inviting you to
            invest in the proof point the field has been waiting for.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-16"
        >
          <a
            href="mailto:info@summitps.org"
            className="inline-block bg-orange text-brown font-bold px-8 py-4 rounded-lg text-lg hover:bg-orange/90 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Founder bios */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="border-t border-white/20 pt-10"
        >
          <p className="text-white/70 font-bold text-sm tracking-[0.18em] uppercase mb-5">Who's building it</p>
          <div className="grid md:grid-cols-2 gap-5">
            {founders.map((f, i) => (
              <FounderCard key={f.name} founder={f} delay={0.5 + i * 0.1} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 text-center"
        >
          <span className="text-white font-bold text-lg tracking-wide">
            Summit Public Schools
          </span>
        </motion.div>
      </div>
    </section>
  )
}
