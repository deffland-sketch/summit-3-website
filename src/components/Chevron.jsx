import { motion } from 'framer-motion'

/**
 * Disclosure chevron for the expandable cards, shared by StudentStories,
 * LearningExperiences and Unlocks (which each had their own identical copy).
 *
 * Decorative: the open/closed state is conveyed to assistive tech by
 * `aria-expanded` on the trigger button, so this is hidden from the a11y tree.
 */
export function Chevron({ open, className = '' }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      className={`w-5 h-5 shrink-0 ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      />
    </motion.svg>
  )
}
