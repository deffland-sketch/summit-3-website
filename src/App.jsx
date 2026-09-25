import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Purpose from './components/Purpose'
import StudentStories from './components/StudentStories'
import LearningExperiences from './components/LearningExperiences'
import WhatStudentsBuild from './components/WhatStudentsBuild'
import WholeSchool from './components/WholeSchool'
import Throughline from './components/Throughline'
import Unlocks from './components/Unlocks'
import AtScale from './components/AtScale'
import WhySummit from './components/WhySummit'
import WhyNow from './components/WhyNow'
import Close from './components/Close'

function App() {
  return (
    // reducedMotion="user" makes every Framer Motion animation on the page
    // respect the visitor's prefers-reduced-motion setting.
    <MotionConfig reducedMotion="user">
      <div id="top">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-3 focus:bg-indigo focus:text-white focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>

        {/* Nav sits outside the overflow wrapper below: an ancestor with
            `overflow-x: hidden` becomes a scrollport that never scrolls, which
            silently stops `position: sticky` from ever sticking. */}
        <Nav />

        {/* `clip` rather than `hidden` — it contains the same horizontal overflow
            from off-canvas section animations without creating a scroll container. */}
        <div className="overflow-x-clip">
          <main id="main">
            <Hero />
            <Throughline />
            <Purpose />
            <StudentStories />
            <LearningExperiences />
            <WhatStudentsBuild />
            <WholeSchool />
            <Unlocks />
            <AtScale />
            <WhySummit />
            <WhyNow />
            <Close />
          </main>
        </div>
      </div>
    </MotionConfig>
  )
}

export default App
