import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, ExternalLink } from 'lucide-react'
import projects from '../data/projects.json'
import portrait from '../assets/thomas.jpg'
import Chips from '../components/Chips.jsx'
import Section from '../components/Section.jsx'
import useReveal from '../hooks/useReveal.js'
import SplitText from '../components/rb/SplitText.jsx'
import DecryptedText from '../components/rb/DecryptedText.jsx'
import DotGrid from '../components/rb/DotGrid.jsx'
import CountUp from '../components/rb/CountUp.jsx'
import Magnet from '../components/rb/Magnet.jsx'
import { spotlightMove } from '../lib/spotlight.js'

// One orchestrated entrance for the hero; MotionConfig in App.jsx downgrades
// it automatically when the user prefers reduced motion.
const EASE = [0.22, 1, 0.36, 1]
const heroStagger = { show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}
// Scroll-triggered stagger for work rows and side-project cards.
const listStagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const itemRise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}
const inView = { once: true, margin: '0px 0px -8% 0px' }
const MLink = motion.create(Link)

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
  { k: 'Studied', v: 'BTech CS — Honors in AI/ML', s: 'CGPA 9.46' },
  { k: 'Domains', v: 'Backend · GenAI · ML', s: 'Blockchain · automation' },
  { k: 'Now', v: 'Corestrat', s: 'Bengaluru, IN' },
]
// One kind of thing per row. Frameworks with frameworks, stores with stores.
// Concepts and practices (RAG, agentic systems, microservices, REST, WebSockets,
// CI/CD, PWAs, smart contracts) are deliberately NOT here — they aren't stack.
// They already appear in the hero lede, the Domains cell and the ticker.
const STACK = [
  ['Languages', ['Python','C#','Go','TypeScript','JavaScript','SQL','Solidity','C']],
  ['Backend', ['FastAPI','Flask','ASP.NET','SQLAlchemy','Pydantic','Celery']],
  ['AI & ML', ['LangChain','OpenAI','Llama 3','scikit-learn','TensorFlow']],
  ['Databases', ['PostgreSQL','MySQL','Azure SQL','Supabase','Redis','Pinecone','Neo4j']],
  ['Frontend', ['React','Next.js','Streamlit']],
  ['Blockchain', ['Ethereum','Truffle']],
  ['Cloud & infra', ['Azure','AWS','Docker','Azure DevOps','Linux']],
]

export default function Home() {
  const work = projects.filter(p => p.group === 'work')
  const side = projects.filter(p => p.group === 'side')
  useReveal([])

  return (
    <main id="top">
      <motion.section className="wrap hero" style={{ paddingBottom: 0 }}
                      variants={heroStagger} initial="hidden" animate="show">
        <div className="hero-bg" aria-hidden="true"><DotGrid /></div>
        <div className="htop">
          <div>
            <motion.p className="kicker eyebrow" variants={rise}>
              <DecryptedText text="Software engineer — Corestrat · Bengaluru, IN" />
            </motion.p>
            <h1>
              <span className="hl"><SplitText text="I build" delay={0.15} /></span>
              <span className="hl"><em><SplitText text="production software." delay={0.4} /></em></span>
            </h1>
            <motion.p className="lede" variants={rise}>
              Backends and data pipelines are most of my day, but the work spreads out from there —{' '}
              <b>GenAI and agentic systems, ML models, workflow automation, blockchain</b>, and the
              frontends for everything I build on my own. I like the messy parts: bad data, slow
              queries, things that fall over at 2am.
            </motion.p>
          </div>
          <motion.figure className="portrait" variants={rise}>
            <img src={portrait} alt="Thomas John" width="460" height="460"
                 decoding="async" fetchPriority="high" />
          </motion.figure>
        </div>

        <motion.div className="hmeta" variants={rise}>
          {HERO_META.map(m => (
            <div key={m.k}>
              <div className="k">{m.k}</div>
              <div className="v">{m.v}</div>
              <div className="s">{m.s}</div>
            </div>
          ))}
        </motion.div>

        <motion.div className="acts" variants={rise}>
          <Magnet><a className="btn solid" href="#work">See the work <ArrowRight size={13} strokeWidth={1.9} aria-hidden="true" /></a></Magnet>
          <Magnet><a className="btn" href="mailto:thomasjohn3933@gmail.com"><Mail size={13} strokeWidth={1.7} aria-hidden="true" /> Email</a></Magnet>
          <Magnet><a className="btn" href="https://github.com/tojonoy" target="_blank" rel="noopener">GitHub <ExternalLink size={12} strokeWidth={1.7} aria-hidden="true" /></a></Magnet>
          <Magnet><a className="btn" href="https://x.com/ThomasJohn67097" target="_blank" rel="noopener">X <ExternalLink size={12} strokeWidth={1.7} aria-hidden="true" /></a></Magnet>
        </motion.div>

        <motion.div className="stats" variants={rise}>
          {HERO_STATS.map(s => (
            <div key={s.k}><div className="v"><CountUp value={s.v} /></div><div className="k">{s.k}</div></div>
          ))}
        </motion.div>
      </motion.section>

      <Section id="work" index="01" title="Work at Corestrat" note="Feb 2025 → now">
        <motion.div variants={listStagger} initial="hidden" whileInView="show" viewport={inView}>
          {work.map(p => (
            <MLink className="row" variants={itemRise} key={p.slug} to={`/work/${p.slug}`}>
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
            </MLink>
          ))}
        </motion.div>
      </Section>

      <Section id="side" index="02" title="Built on my own" note="Personal projects">
        <motion.div className="sg" variants={listStagger} initial="hidden" whileInView="show" viewport={inView}>
          {side.map(p => (
            <MLink key={p.slug} className="spot" variants={itemRise} to={`/work/${p.slug}`}
                   onMouseMove={spotlightMove}>
              <div className="hrow">
                <span className="kicker">{p.kicker}</span>
                <span className="arrow">→</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.short}</p>
              <Chips items={p.chips} />
            </MLink>
          ))}
        </motion.div>
      </Section>

      <Section id="stack" index="03" title="Stack & background" note="In production">
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
        </div>
      </Section>
    </main>
  )
}
