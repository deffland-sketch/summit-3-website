import { brand, ink } from './palette'

/**
 * The three model elements: the one taxonomy and the one color coding on the site.
 *
 * Lightness carries the order (Academic Core darkest, Mentoring medium,
 * Career-Connected Learning lightest), so the three stay distinct without relying
 * on hue, and every use pairs the color with its text label. Lunch is the one
 * light neutral outside the three elements, used only in schedule views.
 *
 * `color` is for fills, borders and swatches; `ink` for text on light backgrounds;
 * `onFill` for text sitting on the fill itself (each clears 4.5:1). The Tailwind
 * class strings are spelled out in full so Tailwind can find them at build time.
 */
export const ELEMENTS = {
  academic: {
    key: 'academic',
    label: 'Academic Core',
    color: brand.indigo,
    ink: ink.indigo,
    onFill: '#ffffff',
    topBorder: 'border-t-indigo',
    text: 'text-indigo',
    tint: 'bg-indigo/[0.07]',
  },
  mentoring: {
    key: 'mentoring',
    label: 'Mentoring',
    color: brand.teal,
    ink: ink.teal,
    onFill: '#000000',
    topBorder: 'border-t-teal',
    text: 'text-teal-ink',
    tint: 'bg-teal/[0.08]',
  },
  ccl: {
    key: 'ccl',
    label: 'Career-Connected Learning',
    color: brand.orange,
    ink: ink.orange,
    onFill: '#000000',
    topBorder: 'border-t-orange',
    text: 'text-orange-ink',
    tint: 'bg-orange/10',
  },
  lunch: {
    key: 'lunch',
    label: 'Lunch',
    color: brand.lunch,
    ink: ink.lunch,
    onFill: '#000000',
    topBorder: 'border-t-lunch',
    text: 'text-tan-grey-ink',
    tint: 'bg-lunch/40',
  },
}

export const ELEMENT_KEYS = ['academic', 'mentoring', 'ccl']
