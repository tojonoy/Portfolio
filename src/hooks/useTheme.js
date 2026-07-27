import { useEffect, useState } from 'react'

const KEY = 'tj-theme'

export default function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch { return false }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem(KEY, dark ? 'dark' : 'light') } catch {}
  }, [dark])

  return { dark, toggle: () => setDark(d => !d) }
}
