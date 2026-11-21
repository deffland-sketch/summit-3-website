import { ELEMENTS } from '../elements'

/**
 * A color swatch paired with the element's name, so color is never the only
 * signal. Used in legends and as a small label on element cards and rows.
 */
export function ElementTag({ element, className = '', size = 'sm', plain = false }) {
  const el = ELEMENTS[element]
  const text = { xs: 'text-xs', sm: 'text-sm', base: 'text-base' }[size]
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold ${text} ${plain ? 'text-black/80' : ''} ${className}`}
      style={plain ? undefined : { color: el.ink }}
    >
      <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: el.color }} aria-hidden="true" />
      {el.label}
    </span>
  )
}

/** The three elements (plus Lunch where a schedule includes it) as one legend row. */
export function ElementLegend({ keys = ['academic', 'mentoring', 'ccl'], className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-1.5 ${className}`} aria-label="Legend">
      {keys.map((k) => (
        <li key={k}>
          <ElementTag element={k} size="xs" plain />
        </li>
      ))}
    </ul>
  )
}
