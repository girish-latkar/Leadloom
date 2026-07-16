# Leadloom — Next.js + Tailwind CSS

Interior design lead-matching landing page, converted from static HTML/CSS/JS to **Next.js 16 (App Router)** with **Tailwind CSS v4** and TypeScript.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Directory structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts (next/font), metadata, pre-hydration theme script
│   ├── page.tsx            # Home page composing all sections
│   └── globals.css         # Theme tokens (dark/light), Tailwind theme mapping, keyframes
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav with scroll state
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx # Cycles auto → light → dark
│   ├── sections/
│   │   ├── Hero.tsx        # Staggered fade-up entrance
│   │   ├── LoomVisual.tsx  # Animated gold/teal thread SVG
│   │   ├── SectionHead.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── AudiencePanels.tsx
│   │   └── LeadForms.tsx
│   ├── forms/
│   │   ├── LeadForm.tsx    # Config-driven form: validation, fade-out, success state
│   │   └── FormField.tsx   # Input / select / textarea with accent focus + error shake
│   └── ui/
│       ├── Button.tsx      # gold / teal / ghost variants (link or button)
│       ├── Reveal.tsx      # Scroll-reveal wrapper
│       ├── ThreadTag.tsx
│       └── icons.tsx
├── hooks/
│   ├── useTheme.ts         # auto/light/dark with localStorage persistence
│   └── useScrollReveal.ts  # IntersectionObserver, respects reduced motion
└── lib/
    ├── constants.ts        # Copy, nav links, option lists
    ├── formConfig.ts       # Designer & homeowner form definitions
    └── cn.ts               # Class name helper
```

## Key conversion notes

- **Theming** — the original CSS custom properties are kept as runtime tokens in `globals.css` and exposed to Tailwind via `@theme inline`, so utilities like `bg-ink`, `text-paper`, `border-line` respond to theme changes. Dark is default; light applies via system preference or `data-theme="light"`. An inline script in `layout.tsx` applies a saved manual theme before first paint to prevent flash.
- **Fonts** — Fraunces, Inter, and JetBrains Mono are self-hosted via `next/font/google` (no render-blocking `<link>` tags) and wired into Tailwind's `font-display` / `font-sans` / `font-mono`.
- **Animations** — keyframes (`fade-up`, `draw-line`, `node-pulse`, `shake`, `success-in`, `draw-check`) are registered in `@theme` and used as `animate-*` utilities. `prefers-reduced-motion` is respected globally and in the reveal hook.
- **Forms** — both forms are driven by a single `LeadForm` component + config objects. Validation replicates the original (required-field check, error shake, focus first invalid, clear on input, fade-out into an animated success state). No backend is wired up yet — add an API route or server action in `LeadForm.handleSubmit`.
