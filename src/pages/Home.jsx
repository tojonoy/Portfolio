import { Link } from 'react-router-dom'
import { GraduationCap, Layers, Building2 } from 'lucide-react'
import projects from '../data/projects.json'
import Chips from '../components/Chips.jsx'
import SectionHead from '../components/SectionHead.jsx'
import useReveal from '../hooks/useReveal.js'

const HERO_STATS = [
  { v: '200+', k: 'Endpoints in production' },
  { v: '8.2M', k: 'Price rows in the pipeline' },
  { v: '95%', k: 'Faster client workflow runs' },
  { v: '4', k: 'Products shipped at work' },
]
const HERO_META = [
  { i: GraduationCap, k: 'Studied', v: 'BTech CS — Honors in AI/ML', s: 'CGPA 9.46' },
  { i: Layers, k: 'Domains', v: 'Backend · GenAI · ML', s: 'Blockchain · automation' },
  { i: Building2, k: 'Now', v: 'Corestrat', s: 'Bengaluru, IN' },
]
const TICKER = ['Python','FastAPI','PostgreSQL','Redis','Celery','Azure','AWS','RAG','LangChain','Neo4j','Pinecone','C# .NET','React','Next.js','Docker','Go','Solidity']
const HI = new Set(['FastAPI','Celery','RAG','C# .NET','Solidity'])

const STACK = [
  ['Languages', ['Python','C#','Go','TypeScript','JavaScript','SQL','Solidity','C']],
  ['Backend', ['FastAPI','Flask','ASP.NET','SQLAlchemy','Pydantic','Celery','Redis','WebSockets','REST APIs','Microservices']],
  ['AI & ML', ['RAG','Agentic systems','LangChain','OpenAI','Llama 3','Pinecone','ChromaDB','Neo4j','scikit-learn','TensorFlow','pandas','NumPy','SciPy']],
  ['Frontend', ['React','Next.js','TypeScript','PWAs','Streamlit']],
  ['Blockchain', ['Solidity','Truffle','Ethereum','Smart contracts']],
  ['Data & cloud', ['PostgreSQL','MySQL','Azure SQL','Supabase','PostGIS','Parquet','Azure','AWS','Docker','CI/CD','Azure DevOps','Linux']],
]

export default function Home() {
  const work = projects.filter(p => p.group === 'work')
  const side = projects.filter(p => p.group === 'side')
  useReveal([])

  return (
    <main id="top">
      <section className="wrap hero" style={{ paddingBottom: 0 }}>
        <span className="avail">
          <i className="dot"></i>
          <span className="kicker">Available for software, backend &amp; AI roles</span>
        </span>
        <h1>I build software for <em>fintech and AI</em> products.</h1>
        <p className="lede">
          Backends and data pipelines are most of my day, but the work spreads out from there —{' '}
          <b>GenAI and agentic systems, ML models, workflow automation, blockchain</b>, and the
          frontends for everything I build on my own. I like the messy parts: bad data, slow
          queries, things that fall over at 2am.
        </p>

        <div className="hmeta">
          {HERO_META.map(({ i: Icon, ...m }) => (
            <div key={m.k}>
              <div className="k">
                <Icon size={12} strokeWidth={1.75} aria-hidden="true" />
                {m.k}
              </div>
              <div className="v">{m.v}</div>
              <div className="s">{m.s}</div>
            </div>
          ))}
        </div>

        <div className="acts">
          <a className="btn solid" href="#work">See the work</a>
          <a className="btn" href="mailto:thomasjohn3933@gmail.com">Email</a>
          <a className="btn" href="https://github.com/tojonoy" target="_blank" rel="noopener">GitHub</a>
          <a className="btn" href="https://x.com/ThomasJohn67097n" target="_blank" rel="noopener">X</a>
        </div>

        <div className="stats">
          {HERO_STATS.map(s => (
            <div key={s.k}><div className="v">{s.v}</div><div className="k">{s.k}</div></div>
          ))}
        </div>

        <div className="tick" aria-hidden="true">
          <div className="tick-in">
            {[0, 1].map(loop =>
              TICKER.map(t => (
                <span key={`${loop}-${t}`} className={HI.has(t) ? 's' : undefined}>{t}</span>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="wrap" id="work">
        <SectionHead title="Work at Corestrat" note="Feb 2025 → now" />
        {work.map(p => (
          <Link className="row rv" key={p.slug} to={`/work/${p.slug}`}>
            <span className="num">{p.num}</span>
            <span className="ttl">
              <h3>
                {p.name}{' '}
                <span className={p.status === 'live' ? 'live' : 'int'}>{p.statusLabel}</span>
              </h3>
              <p>{p.short}</p>
            </span>
            <span className="tags" dangerouslySetInnerHTML={{ __html: p.tags }} />
            <span className="arrow">→</span>
          </Link>
        ))}
      </section>

      <section className="wrap" id="side">
        <SectionHead title="Built on my own" note="Personal projects" />
        <div className="sg rv">
          {side.map(p => (
            <Link key={p.slug} to={`/work/${p.slug}`}>
              <div className="hrow">
                <span className="kicker">{p.kicker}</span>
                <span className="arrow">→</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.short}</p>
              <Chips items={p.chips} />
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap" id="stack">
        <SectionHead title="Stack & background" note="In production" />
        <div className="st rv">
          {STACK.map(([label, items]) => (
            <div className="r2" key={label}>
              <div className="rl">{label}</div>
              <Chips items={items} />
            </div>
          ))}
          <div className="r2">
            <div className="rl">Studied</div>
            <div>
              <div style={{ fontSize: '14.5px' }}>BTech Computer Science — Honors in AI/ML</div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                Rajagiri School of Engineering &amp; Technology · 2021–2025 · CGPA 9.46 · VP, CSI Student Branch
              </div>
            </div>
          </div>
          <div className="r2">
            <div className="rl">Certificates</div>
            <Chips items={['Deep Learning — IIT Ropar (NPTEL Elite)','Foundational C# — Microsoft','SQL — HackerRank','Intro to ML — NPTEL']} />
          </div>
        </div>
      </section>
    </main>
  )
}
