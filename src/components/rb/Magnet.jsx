import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

// React Bits-style "Magnet": the child leans toward the cursor while hovered
// and springs back on leave. Strength stays small so it reads as weight,
// not as a toy.
export default function Magnet({ children, strength = 0.22, className }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 320, damping: 22 })
  const y = useSpring(0, { stiffness: 320, damping: 22 })

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.span>
  )
}
