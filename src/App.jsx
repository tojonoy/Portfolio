import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ClickSpark from './components/rb/ClickSpark.jsx'
import Home from './pages/Home.jsx'
import Project from './pages/Project.jsx'
import NotFound from './pages/NotFound.jsx'
import useTheme from './hooks/useTheme.js'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView({ behavior: 'auto', block: 'start' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { dark, toggle } = useTheme()
  const { pathname } = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <ClickSpark />
      <Header dark={dark} onToggle={toggle} />
      {/* Keyed on pathname: every route change gets a short enter transition. */}
      <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
      <Footer />
    </MotionConfig>
  )
}
