import { Link, useLocation } from 'react-router-dom'

export default function Header({ dark, onToggle }) {
  const { pathname } = useLocation()
  const home = pathname === '/' ? '' : '/'
  return (
    <header>
      <div className="hd">
        <Link to="/" className="brand">
          <span className="n">Thomas John</span>
          <span className="r">Software engineer</span>
        </Link>
        <nav className="top">
          <a className="nl" href={`${home}#work`}>Work</a>
          <a className="nl" href={`${home}#side`}>Side</a>
          <a className="nl" href={`${home}#stack`}>Stack</a>
          <a className="hire" href={`${home}#contact`}>Say hi</a>
          <button className="tt" type="button" onClick={onToggle} aria-label="Switch colour theme">
            <i></i><span>{dark ? 'Light' : 'Dark'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
