# Summit's Next Step Website

Single-page narrative website for Summit Public Schools' next step (flexing time around each student) — a pitch/concept note for funders and partners.

**Naming:** the public name is "Summit's Next Step" (nav logo, page title, Hero). Never use "Summit 3.0" in rendered copy; the CEO prefers it retired. Where a sentence needs a subject, describe the model plainly ("flexible time", "Summit's learner-centered model"). Internal source documents keep their own titles (e.g. "How Summit 3.0 Works") in code comments.

## Tech stack

- React 19, Vite 8, Tailwind CSS v4, Framer Motion
- Font: Arimo (Google Fonts)
- No router — single scrolling page
- `npm run dev` / `npm run build` / `npm run lint`

## Section flow (in App.jsx)

Wrapped in `<MotionConfig reducedMotion="user">` + `<main id="main">`, with a skip
link and a sticky `Nav`. One story arc: why change, what Summit already has, the next
step (flexing time), what it looks like, what makes it work, why Summit.

1. **Hero** — vision line (verbatim), "When time is flexible in service of each student,
   students grow faster," theory-of-action subhead, earnings line, proof stats, pull quote
2. **WhyChange** (`#why-change`) — the concern, the 150-years time argument, three constraint
   cards, the Gallup preparedness stat
3. **WhatStudentsBuild** (`#what-students-build`) — "What We Want for Every Student": three
   outcomes plus the economic empowerment line
4. **Purpose** (`#what-we-have`) — "What Summit Already Has": long-term mentor (guides each
   student's pathway), graduated Expeditions, "2 in 3",
   the Fall 2025 community Keep and Build lists
4b. **Motivation** (`#purpose-to-motivation`, mint) — "Purpose Makes Learning Relevant, and
   Relevance Builds Motivation": the logic of the model. Mentor and Expeditions build purpose,
   flexible time makes the academic core relevant to it, motivation follows. The 69% Transcend
   stat. This wording is the source for the same idea in the Sierra and 2030 strategy decks
5. **NextStep** (`#next-step`) — theory of action, today vs. where we are headed for time,
   talent, technology, time by day/week/season with a "Live now" line, and the eight
   experience types (`ExperienceTypes`, exported from `LearningExperiences.jsx`)
6. **AWeek** (`#a-week`) — "A Week Built Around Amara": her week (Friday goals, built over the weekend, confirmed
   Monday), tabbed against a traditional bell schedule. Partner sites are generic, not named
7. **WholeSchool** (`#whole-school`) — "The Whole School in a Day", on a light mint background: interactive chart of 200
   students across a day, tabs for students/educators/spaces/partners. Staffing follows "How
   Summit 3.0 Works" scaled to 200 at the same ratios. Partner names are real organizations,
   labeled as hypothetical examples
8. **Educators** (`#educators`, white background) — four capacities (mentoring, learning strategies coaching,
   content expertise, project facilitation), partner educators, AI handles / adults do more
   of, "Live now"
9. **Technology** (`#how-it-works`) — "Technology Recommends. People Decide.": four-layer
   stack, safety, how learning is verified, "Live now", and the one sentence that every
   Summit school is moving toward flexible time at the pace its size allows
10. **WhySummit** (`#why-summit`) — 2030 ambition verbatim, "prove," why now, outcome stats,
    track record
11. **Close** (`#invitation`) — North Star headline, CTA, "Get in touch" email link, bios

Never describe forms of flexible time by school type or group schools on the site.
`TheBuild.jsx` exists but is **not rendered** and holds older wording. The industrial
model comparison, the three-student comparison, and One Model, Three Forms were retired
in the Oct 30 2026 revision; they live in git history (tag pre-site-revision-2026-10-30).

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
| Brown | `#503c2d` | real-world experience fills, partner accents |
| Red | `#e6553c` | presentation/performance |
| Tan Grey | `#96a0ab` | wellbeing/community |
| Mint | `#ebf5f0` | WholeSchool section background, soft panels |

### The `-ink` variants — read before styling text

Most of the palette is tuned for **fills** and fails WCAG AA as **text** on light
backgrounds (peach is 1.4:1 on white, light blue 1.7:1, orange 1.9:1, tan grey
2.7:1, red 3.7:1, teal 4.4:1 — all under the 4.5:1 floor).

So: **use `-ink` for text on light backgrounds** (`text-orange-ink`,
`text-teal-ink`, `ink.peach`, …) and the base token for fills, borders, and
swatches. Every `-ink` value clears 4.5:1 against white and against all four
tinted section backgrounds. Indigo and brown already pass and are their own ink.

On the dark section (indigo, the Close) the reverse applies — the light brand colors
pass there and `-ink` would be wrong.

## Key patterns

- `SummitCharacters.jsx` — SVG character illustration library (Person, Rug,
  StudentAvatar, StudentGroup, ExperienceScene, Character), matched to the brand
  slide deck. Only `StudentAvatar` is currently used; the rest are kept as an
  asset library.
- `Chevron.jsx` — the shared disclosure chevron for all expandable cards.
- Copy follows the 2030 Strategy Source of Truth (Oct 2026). Vision, 2030 ambition, and theory of
  action are used verbatim. No em-dashes, no "not X but Y," no deficit framing of educators. Never:
  landed, deliver(ed/able), spine, ship(ping), seat, "accelerat*" for student outcomes, "pathways"
  for groups of schools, or participant counts for the Fall 2025 focus groups.
- "Pathway" is the single term for a student's plan for the life they want. Don't introduce a
  second term for it ("plan for their future" was retired). Mentors guide it; Expeditions shape it.
- Section headings and card titles are title case; body text and labels stay sentence case. The
  Hero vision line and the Close North Star are verbatim sentences and stay sentence case.
- Card pattern (set by `Purpose.jsx`): white cards with a single `border-t-4` brand-color
  accent, on a tinted section background (or with a `border-black/8` outline on white).
  Body text at `text-sm` or larger, no lighter than `text-black/60`. Labels are sentence case:
  no `uppercase`, no letter-spacing.
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
