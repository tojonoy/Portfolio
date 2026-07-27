import { useEffect, useState } from 'react'

// Cycles through phrases, typing and deleting. Returns the visible character
// count for the current phrase plus whether it is fully typed, so the caller
// decides how to split those characters across styled spans.
export default function useTypewriter(phrases, {
  typeMs = 55,
  deleteMs = 28,
  holdMs = 1900,
  startMs = 400,
} = {}) {
  const reduce = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const [i, setI] = useState(0)
  const [n, setN] = useState(reduce ? phrases[0].length : 0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce || phrases.length === 0) return
    const len = phrases[i].length

    let delay
    if (!deleting && n === 0) delay = startMs
    else if (!deleting && n < len) delay = typeMs
    else if (!deleting && n === len) delay = holdMs
    else delay = deleteMs

    const t = setTimeout(() => {
      if (!deleting) {
        if (n < len) setN(n + 1)
        else if (phrases.length > 1) setDeleting(true)
      } else if (n > 0) {
        setN(n - 1)
      } else {
        setDeleting(false)
        setI((i + 1) % phrases.length)
      }
    }, delay)
    return () => clearTimeout(t)
  }, [i, n, deleting, phrases, reduce, typeMs, deleteMs, holdMs, startMs])

  return { index: i, count: n, done: n === phrases[i].length, animating: !reduce }
}
