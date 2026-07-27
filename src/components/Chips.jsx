export default function Chips({ items }) {
  return (
    <div className="chips">
      {items.map(c => <span key={c}>{c}</span>)}
    </div>
  )
}
