import { useEffect, useState } from 'react'

/**
 * Sticky section nav.
 *
 * This is a long single-scroll pitch. Without a nav there was no way for a
 * funder to skim, jump back to a section, or reach the ask without scrolling
 * the whole page. Links are hidden on small screens where they would crowd;
 * the "Get in touch" CTA stays visible at every width.
 */
const links = [
  { href: '#the-model', label: 'The model' },
  { href: '#student-day', label: 'A day' },
  { href: '#whole-school', label: 'The school' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#why-summit', label: 'Why Summit' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow ${
        scrolled ? 'shadow-sm border-b border-black/5' : ''
      }`}
    >
      <nav
        aria-label="Section navigation"
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6"
      >
        <a href="#top" className="font-bold text-indigo shrink-0 whitespace-nowrap">
          Summit <span className="text-orange-ink">3.0</span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-black/60 hover:text-indigo font-bold transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#invitation"
          className="shrink-0 bg-indigo text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-indigo/90 transition-colors"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
