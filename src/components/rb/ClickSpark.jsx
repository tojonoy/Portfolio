import { useEffect, useRef } from 'react'

// React Bits-style "Click Spark": a small accent-coloured burst of strokes at
// every click, on a fixed full-screen canvas that never intercepts input.
export default function ClickSpark({ count = 8, size = 20, duration = 420 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let sparks = []
    let raf = null

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#3d3bf3'

    const draw = now => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      sparks = sparks.filter(s => now - s.t < duration)
      ctx.strokeStyle = accent()
      ctx.lineWidth = 1.8
      ctx.lineCap = 'round'
      for (const s of sparks) {
        const p = (now - s.t) / duration
        const d1 = size * (0.35 + p)
        const d2 = d1 + size * 0.4 * (1 - p)
        ctx.globalAlpha = 1 - p
        ctx.beginPath()
        ctx.moveTo(s.x + Math.cos(s.a) * d1, s.y + Math.sin(s.a) * d1)
        ctx.lineTo(s.x + Math.cos(s.a) * d2, s.y + Math.sin(s.a) * d2)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      raf = sparks.length ? requestAnimationFrame(draw) : null
    }

    const onClick = e => {
      let reduce = false
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}
      if (reduce) return
      const t = performance.now()
      for (let i = 0; i < count; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, a: (Math.PI * 2 * i) / count, t })
      }
      if (!raf) raf = requestAnimationFrame(draw)
    }

    window.addEventListener('click', onClick)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [count, size, duration])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}
    />
  )
}
