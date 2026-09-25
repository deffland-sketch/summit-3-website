# Summit 3.0 Website

Single-page narrative website for Summit Public Schools' 3.0 model — a pitch/concept note for funders and partners.

## Tech stack

- React 19, Vite 8, Tailwind CSS v4, Framer Motion
- Font: Arimo (Google Fonts)
- No router — single scrolling page
- `npm run dev` / `npm run build` / `npm run lint`

## Section flow (in App.jsx)

Wrapped in `<MotionConfig reducedMotion="user">` + `<main id="main">`, with a skip
link and a sticky `Nav`.

1. **Hero** — photo + copy two-column, headline stats, pull quote
2. **Throughline** (`#the-model`) — pathway model (3 steps) + human-centered guidance (4 capacities),
   closing on "The right adult, in the right role, at the right moment" and a community sentence
3. **Purpose** (`#purpose`) — the motivational theory: long-term mentor + graduated
   Expeditions (expose, explore, pursue) → purpose → relevance → intrinsic motivation
4. **StudentStories** (`#student-day`) — 3 composite students of the same age (Marco, Amara,
   David), tabbed across three views: traditional schedule, spring of 9th grade, 11th grade
5. **LearningExperiences** (`#learning-experiences`) — 8 experience type tiles + expandable learning-science panel
6. **WhatStudentsBuild** (`#what-students-build`) — three outcomes: college-ready academics, durable skills, a plan and clear next step
7. **WholeSchool** (`#whole-school`) — interactive stacked bar chart (400 students across a school day), tabs for students/educators/spaces/partners
8. **Unlocks** (`#how-it-works`) — 3 expandable cards (tech stack, talent model, flexible time)
9. **AtScale** (`#at-scale`) — industrial model vs Summit 3.0 across 5 needs
10. **WhySummit** (`#why-summit`) — outcome stats and track record
11. **WhyNow** (`#why-now`) — the listening tour and the convergence argument
12. **Close** (`#invitation`) — CTA, "Get in touch" email link, founder bios

`TheBuild.jsx` exists but is **not rendered** — its listening-tour and proof-point
content was absorbed into WhyNow and WhySummit. Its "Built across our system"
detail (Sierra, Prep/Summit 780, and the network pilots) appears nowhere else on
the site.

## Colors

Defined **twice, intentionally**, and must be kept in sync:

- `src/index.css` `@theme` — the `--color-*` tokens behind Tailwind utility
  classes (`text-indigo`, `bg-teal`, …)
- `src/palette.js` — `brand` and `ink` objects, for the sections that drive color
  from data and need raw hex in inline `style` (SVG fills, per-item accent borders)

| Token | Hex | Use |
| --- | --- | --- |
| Indigo | `#4b4b96` | primary, headings, pathway |
| Teal | `#508278` | accents, practice/feedback |
| Orange | `#f6aa40` | highlights, guidance, CTAs |
| Peach | `#ffd2b4` | soft backgrounds |
| Light Blue | `#96d2dc` | independent work, accents |
| Brown | `#503c2d` | dark sections (WholeSchool bg) |
| Red | `#e6553c` | presentation/performance |
| Tan Grey | `#96a0ab` | wellbeing/community |
| Mint | `#ebf5f0` | AtScale section background |

### The `-ink` variants — read before styling text

Most of the palette is tuned for **fills** and fails WCAG AA as **text** on light
backgrounds (peach is 1.4:1 on white, light blue 1.7:1, orange 1.9:1, tan grey
2.7:1, red 3.7:1, teal 4.4:1 — all under the 4.5:1 floor).

So: **use `-ink` for text on light backgrounds** (`text-orange-ink`,
`text-teal-ink`, `ink.peach`, …) and the base token for fills, borders, and
swatches. Every `-ink` value clears 4.5:1 against white and against all four
tinted section backgrounds. Indigo and brown already pass and are their own ink.

On the dark sections (brown, indigo) the reverse applies — the light brand colors
pass there and `-ink` would be wrong.

## Key patterns

- `SummitCharacters.jsx` — SVG character illustration library (Person, Rug,
  StudentAvatar, StudentGroup, ExperienceScene, Character), matched to the brand
  slide deck. Only `StudentAvatar` is currently used; the rest are kept as an
  asset library.
- `Chevron.jsx` — the shared disclosure chevron for all expandable cards.
- Card pattern (set by `Purpose.jsx`): white cards with a single `border-t-4` brand-color
  accent, on a tinted section background (or with a `border-black/8` outline on white).
  Body text at `text-sm` or larger, no lighter than `text-black/60`. Eyebrows and labels are
  sentence case: no `uppercase`, no letter-spacing.
- No eyebrow labels (small colored kicker text) above section `<h2>`s, and no summary
  callouts or punchy taglines closing out a section.
- All sections use Framer Motion `useInView` for scroll-triggered animations.
- Tailwind custom colors are used as utility classes (e.g. `text-indigo`, `bg-teal`).

## Accessibility invariants

Keep these when editing — they were added deliberately:

- One `<h1>` (Hero). Every `<section>` has an `id` and `aria-labelledby` pointing
  at its own `<h2>`.
- Anything clickable is a real `<button>` or `<a>`. The WholeSchool chart bars are
  buttons with `aria-label` spelling out the distribution they encode.
- WholeSchool's tabs follow the WAI-ARIA tabs pattern (`role="tablist"/"tab"/
  "tabpanel"`, `aria-selected`, roving `tabIndex`, arrow-key navigation).
- Expandable triggers carry `aria-expanded`; their chevrons are `aria-hidden`.
- Decorative SVGs and color swatches are `aria-hidden="true"`.
- Motion respects `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`
  plus a CSS fallback in `index.css`.
- `:focus-visible` outline is defined globally in `index.css` — don't remove focus
  rings per-component.
