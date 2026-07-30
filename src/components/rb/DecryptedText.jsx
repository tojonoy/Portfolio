import { useEffect, useState } from 'react'

const POOL = '!<>-_\\/[]{}=+*^?#'

// React Bits-style "Decrypted Text": scrambles in from random glyphs,
// resolving left to right. Renders the final text immediately when the
// user prefers reduced motion.
export default function DecryptedText({ text, duration = 900, className }) {
  const [out, setOut] = useState(text)

  useEffect(() => {
    let reduce = false
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}
    if (reduce) { setOut(text); return }
    let start = null
    let raf
    const tick = t => {
      if (start === null) start = t
      const p = Math.min(1, (t - start) / duration)
      const reveal = Math.floor(p * text.length)
      let s = text.slice(0, reveal)
      for (let i = reveal; i < text.length; i++) {
        s += text[i] === ' ' ? ' ' : POOL[(Math.random() * POOL.length) | 0]
      }
      setOut(s)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, duration])

  return <span className={className} aria-label={text}><span aria-hidden="true">{out}</span></span>
}
