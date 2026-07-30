import { ChevronDown } from 'lucide-react'

// Native <details>/<summary> rather than React state: keyboard and screen-reader
// support come for free, it works before hydration, and Ctrl+F on a closed
// section still finds the text in modern browsers.
// `index` is the section's position in the page order — it matches the header
// nav numbering, so the numbers carry real sequence information.
export default function Section({ id, index, title, note, open = true, children }) {
  return (
    <section className="wrap" id={id}>
      <details className="sec" open={open}>
        <summary className="sh rv">
          <div className="sh-t">
            {index ? <span className="idx">{index}</span> : null}
            <h2>{title}</h2>
          </div>
          <div className="sh-r">
            {note ? <p>{note}</p> : null}
            <ChevronDown className="chev" size={16} strokeWidth={1.8} aria-hidden="true" />
          </div>
        </summary>
        {children}
      </details>
    </section>
  )
}
