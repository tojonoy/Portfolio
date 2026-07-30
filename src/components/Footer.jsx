import Magnet from './rb/Magnet.jsx'
import VariableProximity from './rb/VariableProximity.jsx'

const LINKS = [
  { label: 'thomasjohn3933@gmail.com', href: 'mailto:thomasjohn3933@gmail.com', solid: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-john3933/' },
  { label: 'GitHub', href: 'https://github.com/tojonoy' },
  { label: 'X', href: 'https://x.com/ThomasJohn67097' },
  { label: 'RawDiary', href: 'https://rawdiary.in' },
]

export default function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <span className="avail">
          <i className="dot"></i>
          <span className="kicker">Open to software, backend &amp; AI roles</span>
        </span>
        {/* Cursor proximity thins the grotesque — Bricolage is a variable font. */}
        <h2>
          <VariableProximity text="Got something " />
          <em>worth building?</em>
        </h2>
        <div className="fl">
          {LINKS.map(l => (
            <Magnet key={l.label}>
              <a className={`btn${l.solid ? ' solid' : ''}`} href={l.href}
                 target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener">
                {l.label}
              </a>
            </Magnet>
          ))}
        </div>
        <div className="colo">
          <span>Thomas John · Bengaluru, India</span>
        </div>
      </div>
    </footer>
  )
}
