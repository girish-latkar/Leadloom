# Leadloom — Next.js + Tailwind CSS

Interior design lead-matching marketing site for Pune, built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, and TypeScript. Production domain: [leadloom.in](https://leadloom.in).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build                # production build
npm start                    # serve production build
```

## Directory structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, dynamic metadata, JSON-LD, theme script
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── services/           # Services page
│   ├── contact/            # Contact page
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of use
│   ├── disclaimer/         # Disclaimer
│   ├── not-found.tsx       # 404 page
│   ├── robots.ts           # Host-aware robots.txt
│   ├── sitemap.ts          # Sitemap (production URLs only)
│   ├── api/submit-lead/    # Lead form API
│   └── globals.css         # Theme tokens, Tailwind theme mapping, keyframes
├── components/
│   ├── layout/             # Navbar, Footer, SiteShell, ContactDetails, SocialLinks
│   ├── sections/           # Hero, FAQ, Testimonials, About, Services, etc.
│   ├── forms/              # LeadForm, FormField
│   ├── seo/                # JsonLd helper
│   └── ui/                 # Button, Reveal, GetMatchedButton, ThemeToggle, etc.
├── hooks/                  # useTheme, useScrollReveal, useAudience
└── lib/
    ├── constants.ts        # Copy, nav links, FAQ, team, social links
    ├── seo.ts              # Metadata helpers, structured data
    ├── siteUrl.ts          # Production URL + indexability helpers
    ├── formConfig.ts       # Designer & homeowner form definitions
    └── server/             # Rate limiting, Turnstile, email delivery
```

## Key notes

- **Theming** — CSS custom properties in `globals.css` are exposed to Tailwind via `@theme inline`, so utilities like `bg-ink`, `text-paper`, and `border-line` respond to theme changes. Dark is default; light applies via system preference or `data-theme="light"`. An inline script in `layout.tsx` applies a saved manual theme before first paint to prevent flash.
- **Fonts** — Fraunces, Inter, and JetBrains Mono load from Google Fonts via `<link>` tags in `layout.tsx` and are wired into Tailwind's `font-display` / `font-sans` / `font-mono`. CSP allows `fonts.googleapis.com` (stylesheets) and `fonts.gstatic.com` (font files).
- **Animations** — keyframes (`fade-up`, `draw-line`, `node-pulse`, `shake`, `success-in`, `draw-check`) are registered in `@theme` and used as `animate-*` utilities. `prefers-reduced-motion` is respected globally and in the reveal hook.
- **Forms** — config-driven `LeadForm` component with client-side checks, honeypot field, optional Cloudflare Turnstile, and a server API at `/api/submit-lead`. Submissions are validated on the server, optionally rate-limited via Upstash Redis, and delivered to your inbox through Nodemailer over SMTP. See [Registration email delivery](#registration-email-delivery) below.

## Registration email delivery

Registration and lead forms submit to `POST /api/submit-lead`. The server validates input, verifies Turnstile when configured, applies rate limiting when Upstash is configured, and sends email through Nodemailer over SMTP/TLS.

### Required environment variables

```env
NEXT_PUBLIC_SITE_URL=https://leadloom.in

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

Recommended for production (limits spam; submissions still work without it):

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
4. In production, both keys are required and your production domain must be listed in the Turnstile widget hostnames. In local development (`npm run dev`), Cloudflare **test keys** are used automatically so forms work on `localhost` even when production keys are present in `.env.local` (the widget shows a **“For testing only”** banner).
5. In the Cloudflare Turnstile dashboard, add every hostname that will serve the form: your production domain (e.g. `leadloom.in`) and Vercel preview URLs (e.g. `*.vercel.app`) if you test forms on preview deployments.
6. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is embedded at **build time**. After adding or changing it in Vercel, trigger a new deployment.

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

**SMTP troubleshooting:** If submission fails with an authentication error (`EAUTH` / `535`), verify `SMTP_USER` and `SMTP_PASSWORD` in `.env.local`. For Gmail/Google Workspace, use an [app password](https://support.google.com/accounts/answer/185833) (not your regular login password) and set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`.

### Deploy safely

1. Add all production environment variables to your host (Vercel, etc.).
2. Set `NEXT_PUBLIC_SITE_URL=https://leadloom.in` in production.
3. Confirm outbound SMTP is allowed from your hosting environment.
4. Configure Turnstile for your production domain.
5. Configure Upstash for production rate limiting.
6. Run `npm run build` before deploying.

### SEO

The site ships with:

- **Sitemap** (`/sitemap.xml`) — always lists production URLs from `NEXT_PUBLIC_SITE_URL`
- **Robots** (`/robots.txt`) — host-aware: production allows crawling; preview/Vercel URLs disallow all
- **Canonical URLs & Open Graph** — always point at the production origin (`NEXT_PUBLIC_SITE_URL`), even on preview deployments
- **Indexing** — only `leadloom.in` (or whatever host matches `NEXT_PUBLIC_SITE_URL`) gets `index, follow`; all other hosts get `noindex, nofollow`
- **JSON-LD** — Organization, LocalBusiness, and WebSite sitewide; FAQPage on the homepage (generated from the shared `FAQ` constant in `constants.ts`)

Set `NEXT_PUBLIC_SITE_URL` to your production origin (e.g. `https://leadloom.in`) before deploying. This is the single source of truth for canonical links, sitemap URLs, Open Graph URLs, and structured data.
