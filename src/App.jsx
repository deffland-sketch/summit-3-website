import Hero from './components/Hero'
import StudentStories from './components/StudentStories'
import LearningExperiences from './components/LearningExperiences'
import WholeSchool from './components/WholeSchool'
import Throughline from './components/Throughline'
import Unlocks from './components/Unlocks'
import WhySummit from './components/WhySummit'
import TheBuild from './components/TheBuild'
import Close from './components/Close'

function App() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <StudentStories />
      <LearningExperiences />
      <WholeSchool />
      <Throughline />
      <Unlocks />
      <WhySummit />
      <TheBuild />
      <Close />
    </div>
  )
}

export default App
