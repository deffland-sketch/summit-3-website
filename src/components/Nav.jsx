import { useEffect, useState } from 'react'
import { HOW_IT_WORKS_HREF } from '../links'

/**
 * Sticky section nav.
 *
 * This is a long single-scroll pitch. Without a nav there was no way for a
 * funder to skim, jump back to a section, or reach the ask without scrolling
 * the whole page. Links are hidden on small screens where they would crowd;
 * the "Get in touch" CTA stays visible at every width.
 */
// Section links on the main page, in page order. On the How It Works page the same
// links point back to the main page (`/#id`).
const sections = [
  { id: 'why-change', label: 'Why change' },
  { id: 'what-students-get', label: 'What students get' },
  { id: 'next-step', label: 'What’s next' },
  { id: 'a-week', label: 'A week' },
  { id: 'sierra', label: 'Sierra' },
  { id: 'why-summit', label: 'Why Summit' },
]
export default function Nav({ page = 'home' }) {
  const onHome = page === 'home'
  const toSection = (id) => (onHome ? `#${id}` : `/#${id}`)
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
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4 xl:gap-6"
      >
        <a href={onHome ? '#top' : '/'} className="font-bold text-indigo shrink-0 whitespace-nowrap">
          Summit&rsquo;s Next Step
        </a>

        <ul className="hidden lg:flex items-center gap-3 xl:gap-6 text-sm">
          {sections.map((l) => (
            <li key={l.id}>
              <a
                href={toSection(l.id)}
                className="text-black/60 hover:text-indigo font-bold transition-colors whitespace-nowrap"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={HOW_IT_WORKS_HREF}
              aria-current={onHome ? undefined : 'page'}
              className={`font-bold transition-colors whitespace-nowrap ${
                onHome ? 'text-black/60 hover:text-indigo' : 'text-indigo underline underline-offset-4'
              }`}
            >
              How it works
            </a>
          </li>
        </ul>

        <a
          href={toSection('invitation')}
          className="shrink-0 bg-indigo text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-indigo/90 transition-colors"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
