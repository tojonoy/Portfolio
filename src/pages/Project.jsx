import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import projects from '../data/projects.json'
import Chips from '../components/Chips.jsx'

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

  return (
    <main>
      <div className="wrap back">
        <Link to={anchor}>← {backLabel}</Link>
      </div>

      <section className="wrap phero" style={{ paddingBottom: 0 }}>
        <span className="kicker">
          {p.group === 'work' ? 'Work at Corestrat' : 'Side project'} · {p.num}
        </span>
        <h1 style={{ marginTop: '14px' }}>
          {p.name}
          <span className={p.status === 'live' ? 'tag' : 'tag g'}>{p.statusLabel}</span>
        </h1>
        <p className="sub">{p.sub}</p>
        <div className="fact">
          {p.facts.map(f => (
            <div key={f.k}><div className="k">{f.k}</div><div className="v">{f.v}</div></div>
          ))}
        </div>
      </section>

      <div className="wrap">
        <div className="cs">
          <article className="doc" dangerouslySetInnerHTML={{ __html: p.doc }} />
          <aside className="side">
            <h4>Numbers</h4>
            <div className="mm">
              {p.metrics.map(m => (
                <div key={m.k}>
                  <div className="v" dangerouslySetInnerHTML={{ __html: m.v }} />
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
            ? <Link className="pv" to={`/work/${prev.slug}`}><div className="k">← Previous</div><div className="t">{prev.name}</div></Link>
            : <Link className="pv" to={anchor}><div className="k">← Back</div><div className="t">All projects</div></Link>}
          {next
            ? <Link className="nx" to={`/work/${next.slug}`}><div className="k">Next →</div><div className="t">{next.name}</div></Link>
            : <Link className="nx" to={anchor}><div className="k">Back →</div><div className="t">All projects</div></Link>}
        </div>
      </div>
    </main>
  )
}
