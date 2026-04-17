import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Spark } from './SummitCharacters'

function GridToConstellation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let startTime = null

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const cols = 12
    const rows = 8
    const points = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          gridX: (c + 0.5) / cols,
          gridY: (r + 0.5) / rows,
          orgX: 0.1 + Math.random() * 0.8,
          orgY: 0.1 + Math.random() * 0.8,
          size: 2 + Math.random() * 3,
          hue: Math.random() > 0.5 ? 0 : 1,
          delay: (r * cols + c) * 0.008,
        })
      }
    }

    const draw = (ts) => {
      if (!startTime) startTime = ts
      const t = ts - startTime
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const progress = Math.min(1, t / 3000)
      const ease = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1

      for (const p of points) {
        const e = Math.min(1, Math.max(0, (ease - p.delay) / (1 - p.delay)))
        const x = p.gridX + (p.orgX - p.gridX) * e
        const y = p.gridY + (p.orgY - p.gridY) * e
        const floatX = ease >= 1 ? Math.sin(t / 2000 + p.orgX * 10) * 0.005 : 0
        const floatY = ease >= 1 ? Math.cos(t / 2500 + p.orgY * 10) * 0.005 : 0
        const px = (x + floatX) * w
        const py = (y + floatY) * h
        const alpha = 0.12 + e * 0.4

        ctx.beginPath()
        ctx.arc(px, py, p.size * (0.6 + e * 0.4), 0, Math.PI * 2)
        ctx.fillStyle =
          p.hue === 0
            ? `rgba(150, 210, 220, ${alpha})`
            : `rgba(246, 170, 64, ${alpha})`
        ctx.fill()
      }

      if (ease > 0.5) {
        const lineAlpha = (ease - 0.5) * 0.25
        ctx.strokeStyle = `rgba(255,255,255,${lineAlpha})`
        ctx.lineWidth = 0.5
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const pi = points[i], pj = points[j]
            const ei = Math.min(1, Math.max(0, (ease - pi.delay) / (1 - pi.delay)))
            const ej = Math.min(1, Math.max(0, (ease - pj.delay) / (1 - pj.delay)))
            const xi = (pi.gridX + (pi.orgX - pi.gridX) * ei) * w
            const yi = (pi.gridY + (pi.orgY - pi.gridY) * ei) * h
            const xj = (pj.gridX + (pj.orgX - pj.gridX) * ej) * w
            const yj = (pj.gridY + (pj.orgY - pj.gridY) * ej) * h
            if (Math.hypot(xi - xj, yi - yj) < 80) {
              ctx.beginPath()
              ctx.moveTo(xi, yi)
              ctx.lineTo(xj, yj)
              ctx.stroke()
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #503c2d 0%, #4b4b96 100%)' }}
    >
      <GridToConstellation />

      {/* Summit logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-10">
        <span className="text-white/70 text-sm font-bold tracking-wide">
          Summit Public Schools
        </span>
      </div>

      {/* Spark accent */}
      <div className="absolute top-16 right-12 md:top-20 md:right-20 z-10 opacity-60">
        <svg viewBox="0 0 30 30" width={30} height={30} fill="none">
          <Spark cx={15} cy={15} size={14} color="#f6aa40" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
        >
          Summit 3.0: The future of high school
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
        >
          The traditional bell schedule was designed for a world that no longer exists.
          <br className="hidden md:block" />
          What opens up when we let it go?
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
