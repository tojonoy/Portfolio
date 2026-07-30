import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// React Bits-style "Count Up": parses the numeric core out of strings like
// "5,000+", "8.2M+", "30x", "~90%" and counts to it when scrolled into view.
// Non-numeric values ("Daily", "Bulk") render unchanged.
export default function CountUp({ value, duration = 1300, className }) {
  const m = /^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/.exec(value)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [txt, setTxt] = useState(m ? m[1] + '0' + m[3] : value)

  useEffect(() => {
    if (!m) return
    if (!inView) return
    let reduce = false
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}
    if (reduce) { setTxt(value); return }
    const target = parseFloat(m[2].replace(/,/g, ''))
    const dec = (m[2].split('.')[1] || '').length
    const grouped = m[2].includes(',')
    let start = null
    let raf
    const tick = t => {
      if (start === null) start = t
      const p = Math.min(1, (t - start) / duration)
      const e = 1 - Math.pow(1 - p, 3)
      let n = (target * e).toFixed(dec)
      if (grouped) n = Number(n).toLocaleString('en-US', { minimumFractionDigits: dec })
      setTxt(m[1] + n + m[3])
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return <span ref={ref} className={className}>{txt}</span>
}
