# Summit's Next Step Website

Single-page narrative website for Summit Public Schools' next step (a school model where every learning experience is excellent and personal, with time flexing around each student, starting with the academic core) — a pitch/concept note for funders and partners.

**Naming:** the public name is "Summit's Next Step" (nav logo, page title, Hero). Never use "Summit 3.0" in rendered copy; the CEO prefers it retired. Where a sentence needs a subject, describe the model plainly ("flexible time", "Summit's school model"). Internal source documents keep their own titles (e.g. "How Summit 3.0 Works") in code comments.

## Tech stack

- React 19, Vite 8, Tailwind CSS v4, Framer Motion
- Font: Arimo (Google Fonts)
- No router. Two pages built as two Vite entries: the main narrative (`index.html` →
  `src/main.jsx` → `App.jsx`) and How It Works (`how-it-works/index.html` →
  `src/how-it-works.jsx` → `HowItWorks.jsx`, served at `/how-it-works/`)
- `npm run dev` / `npm run build` / `npm run lint`

## The model: three elements

The site is organized around three model elements, the one taxonomy and the one color coding:
**Academic Core** (indigo, darkest), **Mentoring** (teal, medium), **Career-Connected Learning**
(orange, lightest). Lunch is a light neutral gray outside the three, shown in schedules but never
on a key or legend.
All three exist at every Summit school today; mentoring and career-connected learning already
flex around each student, and the academic core personalizes next by flexing time.

- `src/elements.js` defines each element's label, fill, ink, and Tailwind classes;
  `ElementTag` / `ElementLegend` (`components/ElementTag.jsx`) pair every swatch with its label.
- `src/learningExperiences.js` lists the learning experiences under each element (with the
  learning-science notes used on How It Works). Academic Core leads with direct instruction,
  practice and feedback, and discussion and dialogue, the three Sierra flexes first.
- Color on the site means an element. Accents that are not elements (argument steps,
  outcomes, stats, progressions, UI chrome) use neutral black tints, with indigo kept for
  headings, links, and buttons.

## Section flow

Main page (`App.jsx`), wrapped in `<MotionConfig reducedMotion="user">` + `<main id="main">`, with
a skip link, a sticky `Nav` (section links plus How It Works), and `SiteFooter`:

1. **Hero** — H1 "Every student is equipped to lead a fulfilled life." with the five
   fulfilled-life pills (Purposeful Work · Financial Independence · Strong Relationships ·
   Community · Health, neutral dots), strategy subhead ("Every student gets what they need, when they need it."), earnings line, stats, quote
2. **WhyChange** (`#why-change`) — the concern, the 150-years time argument, constraint cards, Gallup stat
3. **WhatWeWant** (`#what-we-want`, mint) — "What We Want for Every Student": the portrait of a
   graduate (College-Ready Academic Core, Durable Skills, A Pathway and a Clear Next Step),
   neutral accents. Kept separate from the model on purpose
3b. **WhatStudentsGet** (`#what-students-get`) — the model: the three element cards (The Academic
   Core; A Long-Term Mentor with one-on-one check-ins and the 91% tile; Career-Connected Learning
   through Expeditions with expose/explore/pursue and the 2,245 placements), "2 in 3", Keep and
   Build, sources
4. **NextStep** (`#next-step`, nav "What's next") — "Excellent and Personal Learning for Every
   Student": the school model, the three elements and where each stands (no
   "what good looks like" framework on the site until it is built as part of codifying the model), time by day/week/season (how the academic core flexes) with the Sierra
   "Live now" link, and Learning Experiences in three element columns
5. **Motivation** (`#purpose-to-motivation`, mint, above Amara's week by choice) — Purpose + Relevance + Competence =
   Motivation (neutral accents), 69% stat, self-determination theory source line
6. **AWeek** (`#a-week`) — "A Week Built Around Amara", blocks colored by element (Lunch gray, off the key),
   tabbed against a traditional bell schedule
8. **Sierra** (`#sierra`, peach/10) — first proof point of the evolved Summit model (Cady's framing; never "the first school flexing time"), eyebrow "The first proof point" (the one
   exception to the no-eyebrow rule); three academic-core learning experiences in indigo shades
9. **WhySummit** (`#why-summit`) — the 2030 sentence ("Summit will prove a school model where
   every student gets what they need, when they need it, to attain economic empowerment and
   lead a fulfilled life."), "prove," why now, outcome stats, track record
10. **Close** (`#invitation`) — North Star headline, the three-elements investment line, CTA, "Get in touch" email link, bios

How It Works page (`HowItWorks.jsx`): **WholeSchool** (`#whole-school`, mint, 200 students across a
day counted by learning experience in shades of each element's color, key grouped by element;
educator roles and spaces tagged by element; partner names are real organizations labeled as
hypothetical examples), **Educators** (`#educators`, four capacities and partner
educators grouped by element, AI handles / adults do more of, "Live now"), **Technology**
(`#technology`, four-layer stack, safety, verification, "Live now"), **LearningScience**
(`#learning-science`, a note per learning experience plus the research citation).

Never describe forms of flexible time by school type or group schools on the site. Sierra is
named as the first proof point (its own section and the NextStep "Live now" line); other schools
stay unnamed. The eight experience types, the Time/Talent/Technology table, and post-industrial
framing were retired in Nov 2026; earlier versions live in git history.

## Colors

Defined **twice, intentionally**, and must be kept in sync:

- `src/index.css` `@theme` — the `--color-*` tokens behind Tailwind utility
  classes (`text-indigo`, `bg-teal`, …)
- `src/palette.js` — `brand` and `ink` objects, for the sections that drive color
  from data and need raw hex in inline `style` (SVG fills, per-item accent borders)

| Token | Hex | Use |
| --- | --- | --- |
| Indigo | `#4b4b96` | Academic Core; also headings, links, buttons |
| Teal | `#508278` | Mentoring |
| Orange | `#f6aa40` | Career-Connected Learning (and the Close CTA button) |
| Peach | `#ffd2b4` | soft backgrounds |
| Light Blue | `#96d2dc` | not used for categories |
| Brown | `#503c2d` | Close CTA text |
| Red | `#e6553c` | not used (never distinguish by red vs green) |
| Tan Grey | `#96a0ab` | not used for categories |
| Mint | `#ebf5f0` | section backgrounds |
| Lunch | `#d5d9de` | Lunch in schedules (light neutral) |

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
- Model terms: "academic core" (never "academic foundations"); "Career-Connected Learning" is the
  element and Expeditions is Summit's program within it; "practice and feedback" (never "applied
  practice"); "learning experiences" (never "experience types", never "eight"). Educator roles
  are "flexible enough for educators to specialize in certain capacities", never sized ("one or
  two"). No "learner-centered" in new copy, no post-industrial framing.
- "Pathway" is the single term for a student's plan for the life they want. Don't introduce a
  second term for it ("plan for their future" was retired). Mentors guide it; Expeditions shape it.
- Section headings and card titles are title case; body text and labels stay sentence case. The
  Hero H1 and the Close North Star are sentences and stay sentence case. The five fulfilled-life
  elements are "purposeful work, financial independence, strong relationships, community, and
  health" everywhere.
- Card pattern (set by `WhatStudentsGet.jsx`): white cards with a single `border-t-4` brand-color
  accent, on a tinted section background (or with a `border-black/8` outline on white).
  Body text at `text-sm` or larger, no lighter than `text-black/60`. Labels are sentence case:
  no `uppercase`, no letter-spacing.
- No eyebrow labels (small colored kicker text) above section `<h2>`s, and no summary
  callouts or punchy taglines closing out a section.
- All sections use Framer Motion `useInView` for scroll-triggered animations.
- Tailwind custom colors are used as utility classes (e.g. `text-indigo`, `bg-teal`).

## Accessibility invariants

Keep these when editing — they were added deliberately:

- One `<h1>` per page (Hero; the How It Works title). Every `<section>` has an `id` and
  `aria-labelledby` pointing at its own `<h2>`.
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
