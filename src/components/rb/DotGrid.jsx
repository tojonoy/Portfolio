import { useEffect, useRef } from 'react'

// React Bits-style "Dot Grid" background: a canvas dot lattice where dots
// near the pointer swell and take the accent colour, with eased follow.
// Static (single draw, no listeners) under prefers-reduced-motion.
// Colours are read from the CSS variables so both themes work, and re-read
// when html[data-theme] flips.
export default function DotGrid({ gap = 26, radius = 140, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    let reduce = false
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}

    let w = 0, h = 0, dots = []
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let base = '#c7c7bf', hi = '#3d3bf3'
    let raf = null

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      base = cs.getPropertyValue('--rule-strong').trim() || base
      hi = cs.getPropertyValue('--accent').trim() || hi
    }

    const build = () => {
      const dpr = window.devicePixelRatio || 1
      w = parent.offsetWidth
      h = parent.offsetHeight
      canvas.width = Math.max(1, w * dpr)
      canvas.height = Math.max(1, h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) dots.push({ x, y })
      }
    }

    const paint = () => {
      ctx.clearRect(0, 0, w, h)
      mouse.x += (mouse.tx - mouse.x) * 0.14
      mouse.y += (mouse.ty - mouse.y) * 0.14
      for (const d of dots) {
        const t = Math.max(0, 1 - Math.hypot(d.x - mouse.x, d.y - mouse.y) / radius)
        ctx.fillStyle = t > 0.02 ? hi : base
        ctx.globalAlpha = 0.3 + t * 0.7
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1 + t * 1.7, 0, 6.2832)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reduce) raf = requestAnimationFrame(paint)
    }

    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - r.left
      mouse.ty = e.clientY - r.top
    }
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999 }

    readColors()
    build()
    paint()

    const ro = new ResizeObserver(() => { build(); if (reduce) paint() })
    ro.observe(parent)
    const mo = new MutationObserver(() => { readColors(); if (reduce) paint() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [gap, radius])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
