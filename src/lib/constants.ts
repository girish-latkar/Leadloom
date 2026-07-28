/**
 * Site-wide content constants.
 * Keeping copy and option lists here means components stay purely presentational.
 */

export const SITE = {
  name: "Leadloom",
  title: "Leadloom — Fewer leads. Better matches.",
  description:
    "Leadloom weaves homeowners together with the interior designers who actually fit their home, budget, and taste.",
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const BUDGET_RANGES = [
  "Under $10k",
  "$10k – $30k",
  "$30k – $75k",
  "$75k – $150k",
  "$150k+",
] as const;

export const PROJECT_TYPES = [
  "Single room",
  "Multiple rooms",
  "Full home",
  "New construction",
  "Just exploring ideas",
] as const;

export const TIMELINES = ["ASAP", "1 – 3 months", "3 – 6 months", "6+ months"] as const;

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
  cta: { href: "#homeowner-form", label: "Find my designer" },
} as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Designers",
    links: [
      { href: "#designer-form", label: "Apply" },
      { href: "#how", label: "How matching works" },
    ],
  },
  {
    heading: "Homeowners",
    links: [
      { href: "#homeowner-form", label: "Get matched" },
      { href: "#how", label: "How matching works" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
  },
] as const;
