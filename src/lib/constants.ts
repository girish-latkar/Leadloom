/**
 * Site-wide content constants.
 * Keeping copy and option lists here means components stay purely presentational.
 */

export const SITE = {
  name: "Leadloom",
  title: "Leadloom — Verified interior design leads in Pune",
  description:
    "Leadloom connects homeowners with verified interior designers in Pune. We qualify every lead so designers only meet projects that fit.",
  email: "pritamautade33@gmail.com",
  phone: "+919876543210",
  location: "Pune, Maharashtra",
} as const;

export const NAV_LINKS = [
  { href: "#qualify", label: "Services" },
  { href: "#deliver", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const HERO = {
  eyebrow: "Home design matched",
  heading: "A real living room makes clearer decisions than a mood board ever will.",
  description:
    "We qualify homeowner leads in Pune so you only walk into projects that actually fit your style and budget.",
  image: {
    src: "/images/hero-living-room.png",
    alt: "Interior designer placing a fabric swatch in a sunlit Pune living room",
  },
  ctas: [
    { href: "#qualify", label: "See how we match", variant: "teal" as const },
    { href: `mailto:${SITE.email}`, label: "Email us", variant: "ghost" as const },
  ],
} as const;

export const BUDGET_RANGES = [
  "Under ₹5 lakh",
  "₹5 – 15 lakh",
  "₹15 – 30 lakh",
  "₹30 – 50 lakh",
  "₹50 lakh+",
] as const;

export const PROJECT_TYPES = [
  "Single room",
  "Multiple rooms",
  "Full home",
  "New construction",
  "Just exploring ideas",
] as const;

export const TIMELINES = ["ASAP", "1 – 3 months", "3 – 6 months", "6+ months"] as const;

export const LEAD_QUALIFICATION = {
  eyebrow: "Lead qualification",
  heading: "We don't send you every lead that walks in",
  description:
    "Most lead services flood your inbox. We screen every homeowner in Pune so you only meet the ones ready to move forward with a designer.",
  cta: { href: "#contact", label: "See how we qualify" },
  items: [
    {
      type: "card" as const,
      num: "01",
      title: "Real project in hand",
      body: "We only send leads with an active renovation, new home, or redesign project already planned.",
    },
    {
      type: "card" as const,
      num: "02",
      title: "Budget confirmed upfront",
      body: "Every homeowner shares a budget range before we introduce them. No guesswork, no awkward conversations.",
    },
    {
      type: "image" as const,
      src: "/images/qualify-phone-dashboard.png",
      alt: "Smartphone showing a qualified homeowner profile on a lead qualification dashboard",
    },
    {
      type: "image" as const,
      src: "/images/qualify-phone-desk.png",
      alt: "Smartphone on desk next to tea and notebook, symbolizing quiet efficiency",
    },
    {
      type: "card" as const,
      num: "03",
      title: "Timeline is set",
      body: "We ask when they need to start and finish. You get leads that fit your schedule.",
    },
    {
      type: "card" as const,
      num: "04",
      title: "Design style clarified",
      body: "Homeowners describe their preferred aesthetic. We match them to designers whose portfolio fits.",
    },
    {
      type: "card" as const,
      num: "05",
      title: "Contact verified",
      body: "Each lead's phone and email are checked. You won't waste time on disconnected numbers.",
    },
    {
      type: "image" as const,
      src: "/images/qualify-woman-desk.png",
      alt: "Woman reviewing a lead qualification document at a desk with a potted plant",
    },
    {
      type: "card" as const,
      num: "06",
      title: "One person, real care",
      body: "PriTam screens every lead personally in Pune. No bots, no automated lists.",
    },
  ],
} as const;

export const TESTIMONIALS = {
  eyebrow: "What designers say",
  heading: "0 wasted trips since we started screening",
  items: [
    {
      quote:
        "Before Leadloom, I was driving to consultations where the homeowner hadn't even checked their budget. Now I only get leads that are already qualified and serious about moving forward.",
      name: "Anika Sharma",
      role: "Interior designer, Pune",
      image: "/images/testimonial-anika.png",
    },
    {
      quote:
        "The screening call saved me hours. I knew the client's style preferences and budget before I walked in. That first meeting turned into a signed contract within a week.",
      name: "Rohan Mehta",
      role: "Principal designer at Form & Space",
      image: "/images/testimonial-rohan.png",
    },
    {
      quote:
        "Three months with Leadloom and I've stopped taking cold leads altogether. Every homeowner they've sent has been real, ready, and within my preferred project range.",
      name: "Priya Desai",
      role: "Independent interior consultant",
      image: "/images/testimonial-priya.png",
    },
  ],
} as const;

export const PUNE_NETWORK = {
  heading: "Join our Pune network of verified interior designers and real homeowners.",
  description:
    "We screen every lead so you only spend time on projects that are the right fit. No spam, just serious homeowners in Pune.",
  image: {
    src: "/images/studio.png",
    alt: "A bright interior design studio with fabric samples, blueprints, and a large wooden table",
  },
  cta: { href: "#contact", label: "Get started with Leadloom" },
} as const;

export const WHAT_WE_DELIVER = {
  eyebrow: "What we deliver",
  heading: "Verified leads, not just contacts",
  description:
    "We screen every homeowner in Pune ourselves so you only walk into projects that are worth your time.",
  points: [
    "Budget and timeline confirmed before you meet",
    "Style preferences matched to your portfolio",
    "Contact details verified — no dead numbers",
    "One thoughtful intro per project, not a blast list",
  ],
} as const;

export const START_YOUR_SEARCH = {
  eyebrow: "Start your search",
  heading: "Not sure if your project is ready? Let's talk it through.",
  description:
    "Tell us a bit about your space and style. We'll confirm the details and connect you with one of our verified interior designers in Pune.",
  image: {
    src: "/images/inquiry-homeowner.png",
    alt: "Homeowner discussing design plans in a bright Pune apartment",
  },
} as const;

export const PROCESS_STEPS = [
  {
    num: "01 — Intake",
    title: "We ask real questions",
    body: "Budget range, timeline, room scope, and style — not just a name and a zip code. Vague inquiries get filtered out here.",
  },
  {
    num: "02 — Verification",
    title: "We check both sides",
    body: "Designer portfolios are reviewed for specialty and project scale. Homeowner budgets are sanity-checked against project scope.",
  },
  {
    num: "03 — Weave",
    title: "We send one intro",
    body: "A homeowner meets one or two designers who genuinely fit — not ten who bid the fastest.",
  },
] as const;

export const DESIGNER_PANEL = {
  tag: "Gold thread — designers",
  heading: "Stop paying for leads you'll never close.",
  description:
    "Leadloom sends you homeowners who already match your style, your minimum project size, and your availability — reviewed by a person, not scraped from a form.",
  features: [
    "Budget and scope confirmed before it reaches you",
    "Matched to your portfolio's style, not your zip code alone",
    "No bidding wars — each homeowner sees one or two studios, not ten",
    "Set your own project minimums and pause anytime",
  ],
  cta: { href: "#designer-form", label: "Apply as a designer" },
} as const;

export const HOMEOWNER_PANEL = {
  tag: "Teal thread — homeowners",
  heading: "Find the designer who actually gets your home.",
  description:
    "Tell us about your space and your taste once. We match you to vetted designers whose portfolio and pricing genuinely fit — no cold calls, no directory scrolling.",
  features: [
    "Matched by style and project type, not just distance",
    "Every designer's portfolio and reviews verified in advance",
    "One thoughtful introduction, not ten unsolicited calls",
    "Free for homeowners, always",
  ],
  cta: { href: "#contact", label: "Find my designer" },
} as const;

export const FOOTER_LINKS = [
  { href: "#", label: "Home" },
  { href: "#deliver", label: "About" },
  { href: "#qualify", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;
