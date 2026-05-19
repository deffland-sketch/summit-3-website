import Hero from './components/Hero'
import StudentStories from './components/StudentStories'
import LearningExperiences from './components/LearningExperiences'
import WholeSchool from './components/WholeSchool'
import Throughline from './components/Throughline'
import Unlocks from './components/Unlocks'
import AtScale from './components/AtScale'
import WhySummit from './components/WhySummit'
import Close from './components/Close'

function App() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Throughline />
      <StudentStories />
      <LearningExperiences />
      <WholeSchool />
      <AtScale />
      <Unlocks />
      <WhySummit />
      <Close />
    </div>
  )
}

export default App
