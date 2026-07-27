import { Link } from 'react-router-dom'
import {
  GraduationCap, Layers, Building2,
  Briefcase, Boxes, Terminal,
  CodeXml, Server, BrainCircuit, MonitorSmartphone, Blocks, Database, BadgeCheck,
  ChartColumn, Cloud,
  ArrowRight, Mail, ExternalLink,
} from 'lucide-react'
import projects from '../data/projects.json'
import portrait from '../assets/thomas.jpg'
import Chips from '../components/Chips.jsx'
import Section from '../components/Section.jsx'
import useReveal from '../hooks/useReveal.js'

// Generic and meaningful: outcomes that describe the engineer, not one project.
// Project-specific volumes (equities, price rows, endpoint counts per product)
// belong on that project's own page, not here.
const HERO_STATS = [
  { v: '200+', k: 'API endpoints built' },
  { v: '30x', k: 'Faster API responses' },
  { v: '95%', k: 'Faster workflows for clients' },
  { v: '4', k: 'Products shipped at work' },
]
const HERO_META = [
  { i: GraduationCap, k: 'Studied', v: 'BTech CS — Honors in AI/ML', s: 'CGPA 9.46' },
  { i: Layers, k: 'Domains', v: 'Backend · GenAI · ML', s: 'Blockchain · automation' },
  { i: Building2, k: 'Now', v: 'Corestrat', s: 'Bengaluru, IN' },
]
const TICKER = ['Python','FastAPI','PostgreSQL','Redis','Celery','Azure','AWS','RAG','LangChain','Neo4j','Pinecone','C# .NET','React','Next.js','Docker','Go','Solidity']
const HI = new Set(['FastAPI','Celery','RAG','C# .NET','Solidity'])

// One kind of thing per row. Frameworks with frameworks, stores with stores.
// Concepts and practices (RAG, agentic systems, microservices, REST, WebSockets,
// CI/CD, PWAs, smart contracts) are deliberately NOT here — they aren't stack.
// They already appear in the hero lede, the Domains cell and the ticker.
const STACK = [
  ['Languages', CodeXml, ['Python','C#','Go','TypeScript','JavaScript','SQL','Solidity','C']],
  ['Backend', Server, ['FastAPI','Flask','ASP.NET','SQLAlchemy','Pydantic','Celery']],
  ['AI & ML', BrainCircuit, ['LangChain','OpenAI','Llama 3','scikit-learn','TensorFlow']],
  ['Data & analysis', ChartColumn, ['pandas','NumPy','SciPy','Parquet']],
  ['Databases', Database, ['PostgreSQL','MySQL','Azure SQL','Supabase','PostGIS','Redis','Pinecone','ChromaDB','Neo4j']],
  ['Frontend', MonitorSmartphone, ['React','Next.js','Streamlit']],
  ['Blockchain', Blocks, ['Ethereum','Truffle']],
  ['Cloud & infra', Cloud, ['Azure','AWS','Docker','Azure DevOps','Linux']],
]

export default function Home() {
  const work = projects.filter(p => p.group === 'work')
  const side = projects.filter(p => p.group === 'side')
  useReveal([])

  return (
    <main id="top">
      <section className="wrap hero" style={{ paddingBottom: 0 }}>
        <div className="htop">
          <div>
            <span className="avail">
              <i className="dot"></i>
              <span className="kicker">Available for software, backend &amp; AI roles</span>
            </span>
            <h1>I build <em>production software</em>.</h1>
            <p className="lede">
              Backends and data pipelines are most of my day, but the work spreads out from there —{' '}
              <b>GenAI and agentic systems, ML models, workflow automation, blockchain</b>, and the
              frontends for everything I build on my own. I like the messy parts: bad data, slow
              queries, things that fall over at 2am.
            </p>
          </div>
          <figure className="portrait">
            <img src={portrait} alt="Thomas John" width="460" height="460"
                 decoding="async" fetchPriority="high" />
          </figure>
        </div>

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
          <a className="btn solid" href="#work">See the work <ArrowRight size={13} strokeWidth={1.9} aria-hidden="true" /></a>
          <a className="btn" href="mailto:thomasjohn3933@gmail.com"><Mail size={13} strokeWidth={1.7} aria-hidden="true" /> Email</a>
          <a className="btn" href="https://github.com/tojonoy" target="_blank" rel="noopener">GitHub <ExternalLink size={12} strokeWidth={1.7} aria-hidden="true" /></a>
          <a className="btn" href="https://x.com/ThomasJohn67097n" target="_blank" rel="noopener">X <ExternalLink size={12} strokeWidth={1.7} aria-hidden="true" /></a>
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

      <Section id="work" icon={Briefcase} title="Work at Corestrat" note="Feb 2025 → now">
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
      </Section>

      <Section id="side" icon={Boxes} title="Built on my own" note="Personal projects">
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
      </Section>

      <Section id="stack" icon={Terminal} title="Stack & background" note="In production">
        <div className="st rv">
          {STACK.map(([label, Icon, items]) => (
            <div className="r2" key={label}>
              <div className="rl"><Icon size={13} strokeWidth={1.7} aria-hidden="true" />{label}</div>
              <Chips items={items} />
            </div>
          ))}
          <div className="r2">
            <div className="rl"><GraduationCap size={13} strokeWidth={1.7} aria-hidden="true" />Studied</div>
            <div>
              <div style={{ fontSize: '14.5px' }}>BTech Computer Science — Honors in AI/ML</div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                Rajagiri School of Engineering &amp; Technology · 2021–2025 · CGPA 9.46 · VP, CSI Student Branch
              </div>
            </div>
          </div>
          <div className="r2">
            <div className="rl"><BadgeCheck size={13} strokeWidth={1.7} aria-hidden="true" />Certificates</div>
            <Chips items={['Deep Learning — IIT Ropar (NPTEL Elite)','Foundational C# — Microsoft','SQL — HackerRank','Intro to ML — NPTEL']} />
          </div>
        </div>
      </Section>
    </main>
  )
}
