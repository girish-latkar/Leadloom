/**
 * Site-wide content constants.
 * Keeping copy and option lists here means components stay purely presentational.
 */

export const SITE = {
  name: "Leadloom",
  title: "Leadloom — Verified interior design leads in Pune",
  description:
    "Leadloom connects homeowners with verified interior designers in Pune. We qualify every lead so designers only meet projects that fit.",
  email: "leadloomconnect@gmail.com",
  phone: "+919552970123",
  location: "Pune, Maharashtra",
  address: "Pune, Maharashtra, India",
} as const;

export const CONTACT_INFO = {
  email: SITE.email,
  phone: SITE.phone,
  phoneDisplay: "+91 95529 70123",
  address: SITE.address,
} as const;

export const SOCIAL_LINKS = [
  { platform: "instagram" as const, label: "Instagram", href: "https://www.instagram.com/leadloompune?igsh=MXRxd2xvOHR3NzExcg==" },
  { platform: "twitter" as const, label: "Twitter", href: "https://twitter.com/leadloom" },
  { platform: "linkedin" as const, label: "LinkedIn", href: "https://linkedin.com/company/leadloom" },
  { platform: "whatsapp" as const, label: "WhatsApp", href: `https://wa.me/${SITE.phone.replace(/\D/g, "")}` },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Contact", audience: "homeowners" as const },
] as const;

export const CTA = {
  primaryLabel: "Get matched free",
  navLabel: "Get matched",
  reassurance: "Takes 60 seconds · No cost · No obligation to hire",
  secondaryLabel: "See how it works →",
  secondaryHref: "/services#how-it-works",
  designerLabel: "Apply as a designer",
  navDesignerLabel: "Apply",
  responseTime: "We respond within 24 hours",
} as const;

export const SOCIAL_PROOF = {
  stat: "48",
  label: "verified designers in Pune",
} as const;

export const PUNE_AREAS = [
  "Baner",
  "Aundh",
  "Koregaon Park",
  "Hinjewadi",
  "Wakad",
  "Kothrud",
  "Hadapsar",
  "Bibwewadi",
  "Other",
] as const;

export const FAQ = [
  {
    question: "Is it really free?",
    answer:
      "Yes — completely free for homeowners. No registration fees, consultation charges, or hidden costs. You only pay a designer if you choose to hire them.",
  },
  {
    question: "How fast do I hear back?",
    answer:
      "We respond within 24 hours with one or two designer introductions matched to your project, budget, and style.",
  },
  {
    question: "What if I don't like the match?",
    answer:
      "Tell us what didn't fit — style, budget, or timeline — and we'll refine the search. There's no obligation to hire anyone we introduce.",
  },
  {
    question: "How do you verify designers?",
    answer:
      "Every designer passes business identity checks, portfolio review, background verification, and is matched by location and specialization before joining our network.",
  },
  {
    question: "What areas in Pune do you cover?",
    answer:
      "We match homeowners across Pune — Baner, Aundh, Koregaon Park, Hinjewadi, Wakad, Kothrud, Hadapsar, and surrounding neighbourhoods.",
  },
  {
    question: "Do I have to fill a long form?",
    answer:
      "No — share your name, phone, area, and project type in under a minute. We follow up to confirm the rest.",
  },
] as const;

export const HERO = {
  eyebrow: "Verified interior designers, matched to you — Pune.",
  heading: "A real living room makes clearer decisions than a mood board ever will.",
  description:
    "Share your project once. We match you to vetted designers whose portfolio and pricing genuinely fit — no cold calls, no directory scrolling.",
  image: {
    src: "/images/hero-living-room.png",
    alt: "Interior designer placing a fabric swatch in a sunlit Pune living room",
  },
} as const;

export const BUDGET_RANGES = [
  "Under ₹8 lakh",
  "₹8 – 12 lakh",
  "₹12 – 18 lakh",
  "₹18 – 25 lakh",
  "₹25 lakh+",
] as const;

export const PROJECT_TYPES = ["1 BHK", "2 BHK", "3+ BHK", "Commercial"] as const;

export const TIMELINES = ["ASAP", "1 – 3 months", "3 – 6 months", "6+ months"] as const;

export const LEAD_QUALIFICATION = {
  eyebrow: "Lead qualification",
  heading: "We don't send you every lead that walks in",
  description:
    "Most lead services flood your inbox. We screen every homeowner in Pune so you only meet the ones ready to move forward with a designer.",
  cta: { href: "#how-it-works", label: "See how it works →" },
  image: {
    src: "/images/qualify-woman-desk.png",
    alt: "Woman reviewing a lead qualification document at a desk with a potted plant",
  },
  criteria: [
    {
      num: "01",
      title: "Real project in hand",
      body: "We only send leads with an active renovation, new home, or redesign project already planned.",
    },
    {
      num: "02",
      title: "Budget confirmed upfront",
      body: "Every homeowner shares a budget range before we introduce them. No guesswork, no awkward conversations.",
    },
    {
      num: "03",
      title: "Timeline is set",
      body: "We ask when they need to start and finish. You get leads that fit your schedule.",
    },
    {
      num: "04",
      title: "Design style clarified",
      body: "Homeowners describe their preferred aesthetic. We match them to designers whose portfolio fits.",
    },
    {
      num: "05",
      title: "Contact verified",
      body: "Each lead's phone and email are checked. You won't waste time on disconnected numbers.",
    },
    {
      num: "06",
      title: "One person, real care",
      body: "Leadloom screens every lead personally in Pune. No bots, no automated lists.",
    },
  ],
} as const;

export const TESTIMONIALS = {
  designers: {
    eyebrow: "What designers say",
    heading: "0 wasted trips since we started screening",
    items: [
      {
        quote:
          "What I liked most about LeadLoom is that the conversations start with clarity. Instead of spending time figuring out a client's budget or requirements from scratch, I get inquiries with useful details already in place. It makes the entire process feel more professional and helps me focus on creating great designs rather than chasing leads.",
        name: "Shivani Suthar",
        role: "Interior Designer, Pune",
        image: "/images/shivani_suthar.png",
      },
      {
        quote:
          "As a designer, finding the right clients is often harder than designing the space itself. LeadLoom makes that process much smoother by connecting me with homeowners who are genuinely planning their interiors. The experience feels organized, transparent, and much more efficient than relying only on social media inquiries.",
        name: "Sumit Andhere",
        role: "Interior Designer, Pune",
        image: "/images/sumit_andhere.png",
      },
      {
        quote:
          "I've worked with different lead sources before, but LeadLoom stands out because it feels built specifically for interior designers. The platform helps connect me with homeowners who already have a project in mind, which means discussions are more meaningful from the very first call. It's a practical approach that saves time and builds confidence.",
        name: "Mayur Kashikar",
        role: "Independent interior consultant",
        image: "/images/mayur_kashikar.png",
      },
    ],
  },
  homeowners: {
    eyebrow: "What homeowners say",
    heading: "The right designer, without the endless search",
    items: [
      {
        quote:
          "We were overwhelmed choosing a designer for our bunglow in Bibavewadi. Leadloom matched us with someone who understood our budget and style from day one. No cold calls, no pressure — just one thoughtful introduction.",
        name: "Ankit Shelke",
        role: "Homeowner, Bibwewadi",
        tag: "Bungalow · Bibavewadi",
        image: "/images/ankit_shelke.png",
      },
      {
        quote:
          "I didn't want to interview ten studios. Leadloom sent one designer who actually fit our timeline and taste. The whole process felt calm and transparent.",
        name: "Nilam Khaire",
        role: "Homeowner, Amanora Town Park",
        tag: "2 BHK · Amanora",
        image: "/images/nilam_khaire.png",
      },
      {
        quote:
          "As first-time renovators, we had no idea where to start. Leadloom helped us clarify our 3 BHK project before connecting us with a verified designer in Pune. It saved us weeks of guesswork.",
        name: "Abhijeet Shinde",
        role: "Homeowner, Hadapsar",
        tag: "3 BHK · Hadapsar",
        image: "/images/abhijeet_shinde.png",
      },
    ],
  },
} as const;

export const PUNE_NETWORK = {
  heading: "Join our Pune network of verified interior designers and real homeowners.",
  description:
    "We screen every lead so you only spend time on projects that are the right fit. No spam, just serious homeowners in Pune.",
  image: {
    src: "/images/pune-network.png",
    alt: "Interior designers collaborating in a bright Pune studio",
  },
} as const;

export const FOUNDER = {
  name: "Pritam",
  role: "Founder, Leadloom",
  story:
    "We started Leadloom in Pune because homeowners were choosing designers off Instagram likes, not fit. We check the fit first — budget, style, timeline — before anyone gets your number.",
  image: {
    src: "/images/founder-portrait.png",
    alt: "Pritam, founder of Leadloom",
  },
} as const;

export const ABOUT = {
  eyebrow: "About Leadloom",
  tagline: "India's trusted platform",
  heading: "Your Dream Home Deserves the Right Designer",
  description:
    "Buying a home is one of life's biggest milestones. Leadloom makes the next step — finding the right interior designer — just as meaningful. We connect homeowners with verified professionals based on project requirements, budget, style, and location.",
  image: {
    src: "/images/about-designers.png",
    alt: "Interior designers reviewing blueprints and design materials together",
  },
  verification: {
    eyebrow: "Why Leadloom",
    heading: "Every designer is thoroughly verified",
    description:
      "We don't randomly assign designers. Every professional undergoes a rigorous verification process before joining our network.",
    pillars: [
      {
        title: "Business & identity",
        body: "Registration, GST, and identity verification before any designer joins the network.",
        image: {
          src: "/images/qualify-phone-desk.png",
          alt: "Designer reviewing verification documents at a desk",
        },
      },
      {
        title: "Quality & background",
        body: "Portfolio review and background checks — we look at the work, not just the pitch deck.",
        image: {
          src: "/images/pillar-quality.png",
          alt: "Interior design studio with material samples and mood boards",
        },
      },
      {
        title: "Experience & portfolio",
        body: "Previous projects, client reviews, and credentials reviewed by our team in Pune.",
        image: {
          src: "/images/pillar-portfolio.png",
          alt: "Completed modern living room interior project",
        },
      },
      {
        title: "Location & specialization",
        body: "Matched by city, property type, and design style — not just whoever paid for a listing.",
        image: {
          src: "/images/qualify-phone-dashboard.png",
          alt: "Lead matching dashboard showing location and project details",
        },
      },
    ],
  },
} as const;

export const SERVICES = {
  eyebrow: "Our services",
  heading: "Find the right interior designer with confidence",
  description:
    "LeadLoom connects homeowners with verified, experienced interior designers — matched to your budget, style, and location. No guesswork. No hidden costs. Just confidence.",
  image: {
    src: "/images/services-matching.png",
    alt: "Warm modern home interior with natural light",
  },
  offerings: [
    {
      title: "For designers",
      body: "Stop paying for leads you'll never close. We send you homeowners who already match your style, minimum project size, and availability — reviewed by a person, not scraped from a form.",
      points: [
        "Budget and scope confirmed before it reaches you",
        "Matched to your portfolio's style, not your zip code alone",
        "No bidding wars — each homeowner sees one or two studios, not ten",
        "Set your own project minimums and pause anytime",
      ],
    },
    {
      title: "For homeowners",
      body: "Share your vision, budget, and project requirements. LeadLoom connects you with trusted interior designers who match your goals — with no obligation to hire.",
      points: [
        "Background-checked and portfolio-verified professionals",
        "Matched by style, location, budget, and project type",
        "Compare quotes, timelines, and materials before you decide",
        "Completely free — no registration, consultation, or hidden fees",
      ],
    },
  ],
  homeownerSteps: {
    eyebrow: "How it works",
    heading: "From idea to dream home in 5 simple steps",
    steps: [
      {
        num: "01",
        title: "Share requirements",
        body: "Tell us about your home, budget, and style",
      },
      {
        num: "02",
        title: "Designer matching",
        body: "We identify suitable verified designers",
      },
      {
        num: "03",
        title: "Receive quotes",
        body: "Get detailed proposals from matched designers",
      },
      {
        num: "04",
        title: "Compare & choose",
        body: "Review portfolios, timelines, and pricing",
      },
      {
        num: "05",
        title: "Start your project",
        body: "Work directly with the designer you choose",
      },
    ],
  },
  quoteComparison: {
    eyebrow: "Quote comparison",
    heading: "Compare quotes with full transparency",
    description:
      "Receive detailed quotations from multiple verified designers. LeadLoom helps you compare beyond just the price — so you can make a truly informed decision.",
    points: [
      "Pricing & timeline",
      "Material specifications",
      "Scope of work",
      "Warranty & payment terms",
    ],
  },
  benefits: {
    headline: "₹0 to use Leadloom, ever",
    description:
      "Leadloom is free for homeowners — no registration charges, no consultation fees, no hidden costs, and no obligation to hire.",
    items: [
      "No registration fees, subscription, or hidden charges — ever",
      "Skip weeks of research — we match you with suitable designers quickly",
      "Avoid unverified contractors and unreliable service",
      "Background-verified professionals with proven track records",
    ],
  },
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
    src: "/images/start-search.png",
    alt: "Sunlit living room ready for an interior design consultation",
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
  cta: { href: "#homeowner-form", label: "Get matched free" },
} as const;

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "#contact", label: "Contact Us" },
] as const;
