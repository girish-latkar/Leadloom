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
- **Forms** — config-driven `LeadForm` component with client-side checks, honeypot field, optional Cloudflare Turnstile, and a server API at `/api/submit-lead`. Submissions are validated on the server, optionally rate-limited via Upstash Redis, and delivered to your inbox through Nodemailer over SMTP. See [Registration email delivery](#registration-email-delivery) below.

## Registration email delivery

Registration and lead forms submit to `POST /api/submit-lead`. The server validates input, verifies Turnstile when configured, applies rate limiting when Upstash is configured, and sends email through Nodemailer over SMTP/TLS.

### Required environment variables

```env
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASSWORD=
REGISTRATION_FROM_EMAIL=Website Registration <registrations@yourdomain.com>
REGISTRATION_TO_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Optional (recommended for production rate limiting):

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Never use `NEXT_PUBLIC_` for secrets. SMTP credentials and the Turnstile secret key must remain server-side only.

### Configure SMTP

Obtain SMTP settings from your email provider (Google Workspace, Microsoft 365, Zoho, your host, etc.). Typical values:

| Setting | SSL (implicit TLS) | STARTTLS |
|---|---|---|
| Port | `465` | `587` |
| `SMTP_SECURE` | `true` | `false` |

1. Set `SMTP_HOST` to your provider's SMTP hostname (e.g. `smtp.gmail.com`, `smtp.office365.com`).
2. Set `SMTP_PORT` and `SMTP_SECURE` according to your provider's documentation.
3. Set `SMTP_USER` and `SMTP_PASSWORD` to your SMTP login credentials (often an app-specific password).
4. Set `REGISTRATION_FROM_EMAIL` to the sender address, for example `Website Registration <registrations@yourdomain.com>`.
5. Set `REGISTRATION_TO_EMAIL` to the inbox that should receive submissions.

**Deployment note:** Some hosting providers block outbound SMTP on ports 25, 465, or 587. If email fails in production but works locally, confirm your host allows outbound SMTP to your provider before changing the application architecture.

### Configure Cloudflare Turnstile

1. Create a Turnstile widget in the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Add the **site key** as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (public; used by the browser widget).
3. Add the **secret key** as `TURNSTILE_SECRET_KEY` (server-only; never expose to the client).
4. In production, both keys are required. In local development, Cloudflare’s test keys are used automatically so the widget works on any hostname (`localhost`, LAN IP, etc.) without extra dashboard setup.

### Configure rate limiting (recommended for production)

1. Create a free [Upstash Redis](https://upstash.com/) database.
2. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your environment.
3. The API allows 5 submissions per IP every 10 minutes when Upstash is configured. Upstash is used only as a shared rate-limit counter store — registration data is not stored in Redis.

### Test locally

1. Copy `.env.example` to `.env.local` and fill in SMTP values.
2. Run `npm run dev`.
3. Submit a registration form on the site.
4. Confirm the email arrives at `REGISTRATION_TO_EMAIL`.
5. Test invalid email, missing required fields, HTML/script injection in message fields, and rapid duplicate clicks.

### Deploy safely

1. Add all production environment variables to your host (Vercel, etc.).
2. Confirm outbound SMTP is allowed from your hosting environment.
3. Configure Turnstile for your production domain.
4. Configure Upstash for production rate limiting.
5. Run `npm run build` before deploying.

### SEO

The site ships with sitemap (`/sitemap.xml`), robots (`/robots.txt`), Open Graph / Twitter metadata, canonical URLs, and LocalBusiness + WebSite JSON-LD.

Set `NEXT_PUBLIC_SITE_URL` to your production origin (e.g. `https://leadloom.in`) before deploying so canonical links, the sitemap, and social previews use the correct domain.
