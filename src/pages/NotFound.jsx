import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="wrap" style={{ padding: '90px 0 40px' }}>
      <span className="kicker">Error 404</span>
      <h1 style={{ marginTop: '14px' }}>This page doesn't exist.</h1>
      <p className="lede">The link may be old, or I may have renamed something.</p>
      <div className="acts">
        <Link className="btn solid" to="/">Back to the homepage</Link>
      </div>
    </main>
  )
}
