import { useEffect } from 'react'

export default function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.rv:not(.in)')
    let reduce = false
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}
    if (!('IntersectionObserver' in window) || reduce) {
      els.forEach(e => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
