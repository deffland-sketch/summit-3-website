# Summit 3.0

Single-page narrative website for Summit Public Schools' 3.0 model — a pitch and
concept note for funders and partners.

Built with React 19, Vite 8, Tailwind CSS v4 and Framer Motion. No router; the
whole thing is one scrolling page composed of the section components in
`src/components/`.

## Getting started

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
```

## Layout

```
index.html          document head: title, meta description, Open Graph/Twitter tags
src/
  main.jsx          React entry
  App.jsx           section order, <main>, skip link, reduced-motion config
  index.css         Tailwind import, @theme color tokens, focus ring, reduced motion
  palette.js        brand + ink hex values for inline styles
  components/       one file per page section, plus Nav, Chevron, SummitCharacters
public/
  photos/           photography served as-is
  favicon.svg
```

See `CLAUDE.md` for the section-by-section breakdown, the color system (including
the `-ink` text variants and why they exist), and the accessibility invariants to
preserve when editing.
