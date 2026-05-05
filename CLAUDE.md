# Summit 3.0 Website

Single-page narrative website for Summit Public Schools' 3.0 model — a pitch/concept note for funders and partners.

## Tech stack

- React 19, Vite 8, Tailwind CSS v4, Framer Motion
- Font: Arimo (Google Fonts)
- No router — single scrolling page

## Section flow (in App.jsx)

1. **Hero** — gradient bg, animated grid-to-constellation canvas, tagline
2. **Throughline** — SVG diagram: 3-step pathway model + human-centered guidance
3. **StudentStories** — 3 student day-in-the-life cards (Marco, Amara, David)
4. **LearningExperiences** — 8 experience type cards with click-to-expand modals
5. **WholeSchool** — interactive stacked bar chart (400 students across a school day), tabs for students/educators/spaces/partners
6. **AtScale** — "How the industrial model keeps winning" — 5 need cards comparing industrial vs Summit 3.0
7. **Unlocks** — 3 expandable cards (tech stack, talent model, flexible time)
8. **WhySummit** — outcome stats and track record
9. **TheBuild** — 2 focal school cards (Sierra + Prep), system pilots, 3-year timeline
10. **Close** — CTA with "Get in touch" email link

## Brand colors (defined in src/index.css @theme)

- Indigo: `#4b4b96` — primary, headings, pathway
- Teal: `#508278` — accents, practice/feedback
- Orange: `#f6aa40` — highlights, guidance, CTAs
- Peach: `#ffd2b4` — soft backgrounds
- Light Blue: `#96d2dc` — independent work, accents
- Brown: `#503c2d` — dark sections (WholeSchool bg)
- Red: `#e6553c` — presentation/performance
- Tan Grey: `#96a0ab` — wellbeing/community

## Key patterns

- `SummitCharacters.jsx` — SVG character illustrations (Person, Spark, Rug, ExperienceScene, StudentAvatar, StudentGroup). Used across multiple sections.
- All sections use Framer Motion `useInView` for scroll-triggered animations.
- Tailwind custom colors are used as utility classes (e.g., `text-indigo`, `bg-teal`).
