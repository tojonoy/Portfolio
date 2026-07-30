import { motion } from 'framer-motion'

// React Bits-style "Split Text": per-character blur+rise reveal.
// Characters are grouped by word so lines still wrap at word boundaries.
export default function SplitText({ text, delay = 0, stagger = 0.028, className }) {
  const words = text.split(' ')
  let i = 0
  return (
    <span className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {Array.from(w).map(c => {
            const d = delay + i++ * stagger
            return (
              <motion.span
                key={i}
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: '0.55em', filter: 'blur(9px)' }}
                animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: d }}
              >
                {c}
              </motion.span>
            )
          })}
          {wi < words.length - 1 ? <span aria-hidden="true">{' '}</span> : null}
        </span>
      ))}
    </span>
  )
}
