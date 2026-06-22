import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative bg-white pt-10 md:pt-14 pb-16 md:pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Copy column */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo leading-[1.05] mb-6"
            >
              Every student prepared to build the life they want.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg md:text-xl text-black leading-relaxed mb-6"
            >
              Every Summit student is known deeply, challenged academically, and prepared for what comes next. Summit 3.0 is how we make that real for every student, at the scale of a public school system.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm md:text-base text-black/70 leading-relaxed mb-10 border-l-4 border-orange pl-4"
            >
              Summit graduates earn an average of <span className="font-bold text-black">$81.1K</span> annually,
              vs. $70.4K for peer charter graduates.
            </motion.p>

            {/* Stat callouts */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="grid grid-cols-2 gap-4 md:gap-8"
            >
              <div>
                <p className="text-2xl md:text-3xl font-bold text-indigo">23+</p>
                <p className="text-xs md:text-sm text-black/70 leading-snug mt-1">years of proof</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-teal">100K+</p>
                <p className="text-xs md:text-sm text-black/70 leading-snug mt-1">students impacted</p>
              </div>
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-peach/40">
              <img
                src="/photos/hero-classroom.jpg"
                alt="A Summit classroom in motion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Pull quote */}
            <div className="absolute -bottom-6 -left-4 md:-left-8 max-w-[80%] bg-white border-l-4 border-orange rounded-r-lg shadow-sm px-5 py-4">
              <p className="text-sm md:text-base text-black italic leading-snug">
                "She actually knew where I was headed."
              </p>
              <p className="text-xs text-black/60 font-bold mt-1.5">
                Summit student, Class of 2024
              </p>
            </div>
          </motion.div>
        </div>
    </section>
  )
}
