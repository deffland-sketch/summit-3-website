import { HOW_IT_WORKS_HREF } from '../links'

/**
 * Slim footer shared by both pages. On the main page it links to How It Works;
 * on How It Works it links back to the main page.
 */
export default function SiteFooter({ page = 'home' }) {
  const onHome = page === 'home'
  return (
    <footer className="bg-white border-t border-black/8 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm font-bold text-black/60">Summit Public Schools</p>
        {onHome ? (
          <a href={HOW_IT_WORKS_HREF} className="text-sm font-bold text-indigo underline underline-offset-4 hover:text-indigo/80">
            How It Works: educators, technology, and the learning science &rarr;
          </a>
        ) : (
          <a href="/" className="text-sm font-bold text-indigo underline underline-offset-4 hover:text-indigo/80">
            &larr; Back to Summit&rsquo;s Next Step
          </a>
        )}
      </div>
    </footer>
  )
}
