import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #503c2d 0%, #4b4b96 100%)' }}
    >
      {/* Summit logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-10">
        <span className="text-white/70 text-sm font-bold tracking-wide">
          Summit Public Schools
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Summit 3.0
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/70 font-medium leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)' }}
        >
          <span className="block">The future of high school is no longer static courses and seat-time credits.</span>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
