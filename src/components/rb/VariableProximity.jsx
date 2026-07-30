import { useEffect, useRef } from 'react'

// React Bits-style "Variable Proximity", inverted: Bricolage Grotesque is a
// variable font, and characters near the cursor thin out (wght 750 → 300),
// as if the pointer erodes the type. No-op under reduced motion and on
// touch devices (no pointer proximity to track).
export default function VariableProximity({ text, radius = 150, from = 750, to = 300, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let reduce = false
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}
    if (reduce) return
    const spans = Array.from(el.children)
    let mx = -9999, my = -9999, raf = null, active = false

    const update = () => {
      raf = null
      let any = false
      for (const s of spans) {
        const r = s.getBoundingClientRect()
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2))
        const t = Math.max(0, 1 - d / radius)
        if (t > 0.01) {
          s.style.fontVariationSettings = `'wght' ${Math.round(from + (to - from) * t)}`
          any = true
        } else if (s.style.fontVariationSettings) {
          s.style.fontVariationSettings = ''
        }
      }
      active = any
    }
    const onMove = e => {
      mx = e.clientX; my = e.clientY
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onLeave = () => {
      mx = -9999; my = -9999
      if (active && !raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [radius, from, to])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span key={i} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>{c}</span>
      ))}
    </span>
  )
}
