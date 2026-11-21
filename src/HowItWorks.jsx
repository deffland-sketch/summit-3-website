import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import WholeSchool from './components/WholeSchool'
import Educators from './components/Educators'
import Technology from './components/Technology'
import LearningScience from './components/LearningScience'
import SiteFooter from './components/SiteFooter'

/**
 * The How It Works page (/how-it-works/): the detail behind the main page.
 * The whole school in a day, educators grouped by model element, the technology stack, and the learning
 * science behind each learning experience. A separate Vite entry, so it is a
 * real page with its own URL and no client-side router.
 */
export default function HowItWorks() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="top">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-3 focus:bg-indigo focus:text-white focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <Nav page="how" />
        <div className="overflow-x-clip">
          <main id="main">
            <div className="px-6 pt-14 md:pt-20 pb-4 bg-white">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-indigo leading-tight mb-4">How It Works</h1>
                <p className="text-lg md:text-xl text-black/75 leading-relaxed max-w-3xl">
                  A day across the whole school, and the educators, technology, and learning science
                  behind Summit&rsquo;s next step.
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm font-bold">
                  <li><a href="#whole-school" className="text-indigo underline underline-offset-4">The whole school in a day</a></li>
                  <li><a href="#educators" className="text-indigo underline underline-offset-4">Educators</a></li>
                  <li><a href="#technology" className="text-indigo underline underline-offset-4">Technology</a></li>
                  <li><a href="#learning-science" className="text-indigo underline underline-offset-4">Learning science</a></li>
                </ul>
              </div>
            </div>
            <WholeSchool />
            <Educators />
            <Technology />
            <LearningScience />
          </main>
          <SiteFooter page="how" />
        </div>
      </div>
    </MotionConfig>
  )
}
