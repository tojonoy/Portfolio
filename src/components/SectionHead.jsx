export default function SectionHead({ title, note }) {
  return (
    <div className="sh rv">
      <h2>{title}</h2>
      {note ? <p>{note}</p> : null}
    </div>
  )
}
