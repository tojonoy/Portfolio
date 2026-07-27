const LINKS = [
  { label: 'thomasjohn3933@gmail.com', href: 'mailto:thomasjohn3933@gmail.com', solid: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-john3933/' },
  { label: 'GitHub', href: 'https://github.com/tojonoy' },
  { label: 'X', href: 'https://x.com/ThomasJohn67097n' },
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
        <h2>Got something <em>worth building?</em></h2>
        <div className="fl">
          {LINKS.map(l => (
            <a key={l.label} className={`btn${l.solid ? ' solid' : ''}`} href={l.href}
               target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener">
              {l.label}
            </a>
          ))}
        </div>
        <div className="colo">
          <span>Thomas John · Bengaluru, India</span>
          <span>Instrument Serif &amp; IBM Plex Mono</span>
        </div>
      </div>
    </footer>
  )
}
