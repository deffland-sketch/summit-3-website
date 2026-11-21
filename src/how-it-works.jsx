import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HowItWorks from './HowItWorks.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HowItWorks />
  </StrictMode>,
)
