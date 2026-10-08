# Nang · Vol. 2, The Email Edition

Email-design portfolio. React 19 + TypeScript + Vite + Tailwind CSS v4, React Router, Lucide icons. Deployed on Vercel (SPA rewrites in `vercel.json`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Routes

| Path | Layout |
|---|---|
| `/` | 01 Cover, 02 About and 03 How I work turn like pages → 04 Work (featured card + zigzag cards, numbered index) → 05 My creative space → 06 Contact (Formspree form) |
| `/work/juiceday` | Book flip (two-page spreads; one page at a time on phones) |
| `/work/vivaia` | Campaign email → added to cart (on the site) → cart email + Design / Code card |
| `/work/redesigns` | Before/after slider + numbered problem → fix |
| `/work/concepts` | Poster-first gallery wall |

## Where things live

```
src/data/          all content: site.ts, projects.ts, juiceday.ts, redesigns.ts, cartEmailCode.ts
src/pages/         one file per route
src/components/    Book, FlipStack, SpringCursor, EmailViewer, PhoneFrame, Deco (allowed decorations) …
src/components/home/   home sections
src/components/case/   case study layout, before/after slider
src/lib/           hooks, page-flip sound
public/images/     images (Juiceday emails in public/images/juiceday)
public/sounds/     add page-flip.mp3 here (a synthesized rustle plays until then)
```

Search the code for `TODO(owner)` to find content that still needs to be filled in.

## Motion

- Spring cursor: add `data-cursor="LABEL"` to any element to show a label on hover.
- Text reveal: give an element `className="rv"` and `style={{ '--i': n }}` (or use `<Rv i={n}>`); it springs in when an ancestor gets `.show`.
- Everything respects `prefers-reduced-motion`.

## Design rules (keep every section consistent)

**Fonts (only these):**
- Playfair Display (`headline`, `font-serif`): headlines, titles, quotes, project names.
- AR One Sans (default): body text and descriptions.
- Small caps labels (`label` class): numbers, categories, meta lines. Red (`text-accent`) for numbers and section/column headings, `text-ink/55` for secondary labels.
- Caveat (`font-[family-name:var(--font-hand)]`): only tiny handwritten decorations, never real content.

**Type sizes:**
- Section titles in scrolling sections: `headline text-[13vw] md:text-[min(7vw,112px)]`.
- The closing Contact section is deliberately quieter: `headline text-[10vw] md:text-[min(4.4vw,68px)]`, compact form, details as a short list.
- Card / project titles: serif 19–32px. Quotes: serif italic.
- Body: 14–15px on phones, 17px on desktop. Labels: 9–10px.

**Layout:**
- Every part opens with `<SectionHead title n />` (title ··· 03 / 06, thin rule).
- Sections: `page-px`, `py-20 md:py-28`. Desktop grids use 12 columns with `gap-x-8` or more.
- Thin rules are `border-ink/15`; strong rules `border-ink`.
- Dark blocks (next-project bar, code panel) use the warm dark grey `bg-night`, never pure black.
- Lots of white space. Decorations stay small, few and precise (tape, a note, a doodle, corner dots).
- Accent colour `#B8322A` is the only accent; email images bring the colour.
- Paper texture: a cold-press paper photo (`public/textures/paper.jpg`, a seamless mirrored tile) is multiplied into every cream surface (`body`, `.bg-paper*`, book pages; see `--paper-texture` in `index.css`). It lives in the paper, never on top: images, video and text must stay clean. Don't add other textures or overlays.

**Motion:** text reveals with `<Rv i={n}>`, collage pieces land with `.pop` + `popStyle()`, hover = small lift or a red highlight. Everything respects reduced motion.
