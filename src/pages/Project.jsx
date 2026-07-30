import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import projects from '../data/projects.json'
import Chips from '../components/Chips.jsx'
import SplitText from '../components/rb/SplitText.jsx'
import DecryptedText from '../components/rb/DecryptedText.jsx'
import DotGrid from '../components/rb/DotGrid.jsx'
import CountUp from '../components/rb/CountUp.jsx'
import { spotlightMove } from '../lib/spotlight.js'

const EASE = [0.22, 1, 0.36, 1]
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
const stagger = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }

export default function Project() {
  const { slug } = useParams()
  const i = projects.findIndex(p => p.slug === slug)
  const p = projects[i]

  useEffect(() => {
    if (!p) return
    document.title = `${p.name} — Thomas John`
    const m = document.querySelector('meta[name="description"]')
    if (m) m.setAttribute('content', p.short)
    return () => { document.title = 'Thomas John — Software Engineer' }
  }, [p])

  if (!p) return <Navigate to="/" replace />

  const prev = i > 0 ? projects[i - 1] : null
  const next = i < projects.length - 1 ? projects[i + 1] : null
  const anchor = p.group === 'work' ? '/#work' : '/#side'
  const backLabel = p.group === 'work' ? 'Back to all work' : 'Back to all projects'
  const kicker = `${p.group === 'work' ? 'Work at Corestrat' : 'Side project'} · ${p.num}`

  return (
    <main>
      <div className="wrap back">
        <Link to={anchor}><ArrowLeft size={13} strokeWidth={1.8} aria-hidden="true" />{backLabel}</Link>
      </div>

      <motion.section className="wrap phero" style={{ paddingBottom: 0 }}
                      variants={stagger} initial="hidden" animate="show">
        <div className="hero-bg" aria-hidden="true"><DotGrid /></div>
        <motion.span className="kicker eyebrow" variants={rise}>
          <DecryptedText text={kicker} />
        </motion.span>
        <h1 style={{ marginTop: '14px' }}>
          <SplitText text={p.name} delay={0.12} stagger={0.02} />
          <motion.span variants={rise} className={p.status === 'live' ? 'tag' : 'tag g'}>{p.statusLabel}</motion.span>
        </h1>
        <motion.p className="sub" variants={rise}>{p.sub}</motion.p>
        <motion.div className="fact" variants={rise}>
          {p.facts.map(f => (
            <div key={f.k}><div className="k">{f.k}</div><div className="v">{f.v}</div></div>
          ))}
        </motion.div>
      </motion.section>

      <div className="wrap">
        <div className="cs">
          <article className="doc" dangerouslySetInnerHTML={{ __html: p.doc }} />
          <aside className="side">
            <h4>Numbers</h4>
            <div className="mm">
              {p.metrics.map(m => (
                <div key={m.k}>
                  <div className="v"><CountUp value={m.v} /></div>
                  <div className="k">{m.k}</div>
                </div>
              ))}
            </div>
            <h4>My role</h4>
            <p>{p.role}</p>
            <h4>Stack</h4>
            <Chips items={p.stack} />
            {(p.links.length > 0 || p.note) && (
              <div className="lnks">
                {p.links.map(l => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label}</a>
                ))}
                {p.note && <span className="q">{p.note}</span>}
              </div>
            )}
          </aside>
        </div>

        <div className="pn">
          {prev
            ? <Link className="pv spot" onMouseMove={spotlightMove} to={`/work/${prev.slug}`}><div className="k">← Previous</div><div className="t">{prev.name}</div></Link>
            : <Link className="pv spot" onMouseMove={spotlightMove} to={anchor}><div className="k">← Back</div><div className="t">All projects</div></Link>}
          {next
            ? <Link className="nx spot" onMouseMove={spotlightMove} to={`/work/${next.slug}`}><div className="k">Next →</div><div className="t">{next.name}</div></Link>
            : <Link className="nx spot" onMouseMove={spotlightMove} to={anchor}><div className="k">Back →</div><div className="t">All projects</div></Link>}
        </div>
      </div>
    </main>
  )
}
