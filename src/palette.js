/**
 * The Summit brand palette, in JS.
 *
 * These are the same values as the `--color-*` tokens in index.css. They exist
 * here as well because several sections drive colour from data and need raw hex
 * for inline `style` (SVG fills, per-item accent borders) rather than a utility
 * class. Keep the two in sync — index.css is the reference for Tailwind classes,
 * this is the reference for inline styles.
 *
 * `brand` is for fills, borders, and swatches. `ink` is for TEXT on light
 * backgrounds: most of the palette is tuned for fills and falls below the WCAG AA
 * 4.5:1 floor as text (peach is 1.4:1 on white, orange 1.9:1, light blue 1.7:1).
 * Every `ink` value clears 4.5:1 against white and against every tinted section
 * background used on the page.
 */
export const brand = {
  indigo: '#4b4b96',
  teal: '#508278',
  orange: '#f6aa40',
  peach: '#ffd2b4',
  lightBlue: '#96d2dc',
  brown: '#503c2d',
  red: '#e6553c',
  tanGrey: '#96a0ab',
}

export const ink = {
  // Indigo and brown already pass as text; they are their own ink.
  indigo: '#4b4b96',
  teal: '#47756c',
  orange: '#9d6009',
  peach: '#94603a',
  lightBlue: '#297987',
  brown: '#503c2d',
  red: '#c64027',
  tanGrey: '#5f6b78',
}
