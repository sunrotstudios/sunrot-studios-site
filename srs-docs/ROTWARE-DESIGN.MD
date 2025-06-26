# Zine Flipbook Implementation Prompt for Claude Code

## Project Context

- **Website:** Sun Rot Studios creative studio site
- **Section:** Rotware (experimental software arm)
- **Design Style:** DIY zine meets brutalist web—photocopied paper textures, chunky type, hand-drawn elements, grainy overlays.
- **Tech Stack:** React (Next.js/Vite), Tailwind CSS, Framer Motion, optional sound effect assets.

---

## Objective

Create a **Zine Flipbook** component on the Rotware page that:

1. **Displays one project per "page.**"
2. **Simulates turning pages** (page curl or flip) in response to user scroll, swipe, or arrow clicks.
3. **Shows metadata** in a typewriter-style footer (year, tech stack, status).
4. **Respects the zine aesthetic**: rough paper background, hand-drawn arrows, photocopier jitter on page load.

---

## Deliverables

1. **`FlipbookPage.jsx`** (or `.tsx`) React component(s) implementing the flipbook.
2. **`projects.json`** sample data file listing Rotware projects with fields: `id`, `title`, `tagline`, `blurb`, `year`, `tech[]`, `status`, `imageUrl`.
3. **Tailwind CSS classes** (with any necessary custom utilities) for styling: paper texture, grain overlay, arrow elements.
4. **Framer Motion variants** for page-turn animations:

   - Page entry: slight rotateY + fade-in.
   - Page exit: rotateY opposite + fade-out.
   - Jitter effect: subtle random offset on load.

5. **Typewriter footer** animation for metadata:

   - Animate each character sequentially.
   - Small delay between `year`, `tech`, and `status` lines.

6. **Navigation controls**:

   - Hand-drawn arrow SVGs for "Next" and "Prev".
   - Click or swipe to advance/rewind pages.

---

## Component Structure

```bash
src/components/
  ├─ flipbook/
  │   ├─ Flipbook.jsx        # Parent container handles pagination logic
  │   ├─ Page.jsx            # Renders a single page (image + header + blurb + footer)
  │   ├─ ArrowControls.jsx   # Prev/Next arrows
  │   └─ flipbook.css        # Custom styles or Tailwind overrides
  └─ data/
      └─ projects.json       # Sample project metadata
```

---

## Data Format (`projects.json`)

```json
[
  {
    "id": "beesides",
    "title": "Beesides",
    "tagline": "Community-driven album discovery",
    "blurb": "A social platform for album curation and deep listening experiences.",
    "year": 2024,
    "tech": ["React", "Node.js", "PostgreSQL"],
    "status": "Live",
    "imageUrl": "/rotware/beesides.png"
  },
  {
    "id": "velvet-metal",
    "title": "Velvet Metal",
    "tagline": "Seamless music aggregation",
    "blurb": "Aggregate playlists and libraries across services into one experience.",
    "year": 2025,
    "tech": ["Next.js", "Tailwind", "Framer Motion"],
    "status": "Beta",
    "imageUrl": "/rotware/velvet-metal.png"
  }
]
```

---

## Animation & Interaction Requirements

1. **Page Turn Effect**

   - Use Framer Motion `motion.div` with `rotateY` transform.
   - Define `variants` for `initial`, `animate`, and `exit`.
   - Transition: `{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }`.

2. **Photocopier Jitter**

   - On page load, apply a quick random `x`/`y` offset and `rotate` jitter.
   - Use a short `keyframes` animation or Framer Motion `useAnimation`.

3. **Typewriter Footer**

   - Create a small `useTypewriter` hook to reveal text one char at a time.
   - Animate each line in sequence with a 0.1s delay between lines.

4. **Arrow Navigation**

   - Arrow SVGs styled with Tailwind: `w-8 h-8 stroke-current text-gray-700`.
   - On click, call parent `goNext()` / `goPrev()` to update index.

5. **Responsive Design**

   - On mobile, allow swipe gestures (touch events) to flip pages.
   - Scale typography and images down appropriately (e.g., `text-4xl` → `text-2xl`).

---

### Accessibility

- Add `aria-live="polite"` to the footer region so screen readers announce metadata on page change.
- Ensure arrow buttons have `aria-label="Next project"` and `"Previous project"`.

---

## Instructions for Claude Code

1. **Generate** the directory structure under `src/components/flipbook` and `src/data/projects.json`.
2. **Implement** the data loader using `import projects from '../data/projects.json'`.
3. **Build** `Flipbook.jsx` with React state to track `currentIndex` and handlers for navigation.
4. **Use** Framer Motion’s `<AnimatePresence>` to handle mounting/unmounting `Page` components with variants.
5. **Style** using Tailwind classes; include a global import of a paper-texture image as a background via CSS module.
6. **Write** helper hook `useTypewriter` in `src/hooks/useTypewriter.js`.
7. **Test** desktop scroll and mobile swipe.

> _Aim for clean, well-commented code ready for an interactive zine-inspired user experience._
