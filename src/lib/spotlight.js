// Shared handler for React Bits-style "Spotlight Card" hover: stores the
// pointer position in CSS vars that .spot::after uses for its radial wash.
export function spotlightMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
