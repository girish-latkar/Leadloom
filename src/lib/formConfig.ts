import { BUDGET_RANGES, PROJECT_TYPES, TIMELINES } from "@/lib/constants";

export type FieldType = "text" | "email" | "tel" | "url" | "select" | "textarea";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
  /** Placeholder-style first option for selects. */
  selectPrompt?: string;
}

/** Each row renders one field full-width or two fields side by side. */
export type FieldRow = readonly [FieldConfig] | readonly [FieldConfig, FieldConfig];

export interface LeadFormConfig {
  id: string;
  formId: string;
  accent: "gold" | "teal";
  tag: string;
  heading: string;
  sub: string;
  rows: readonly FieldRow[];
  submitLabel: string;
  finePrint: string;
  success: { title: string; body: string };
}

export const DESIGNER_FORM: LeadFormConfig = {
  id: "designer-form",
  formId: "form-designer",
  accent: "gold",
  tag: "For designers",
  heading: "Apply for quality leads",
  sub: "Takes about 3 minutes. We review every application before you receive your first match.",
  rows: [
    [
      { name: "name", label: "Full name", type: "text", required: true, placeholder: "Jordan Reyes" },
      { name: "studio", label: "Studio name", type: "text", placeholder: "Reyes Interiors" },
    ],
    [
      { name: "email", label: "Email", type: "email", required: true, placeholder: "jordan@studio.com" },
      { name: "phone", label: "Phone", type: "tel", placeholder: "(555) 000-0000" },
    ],
    [
      { name: "city", label: "City / region served", type: "text", required: true, placeholder: "Austin, TX" },
      {
        name: "minProject",
        label: "Minimum project size",
        type: "select",
        options: BUDGET_RANGES,
        selectPrompt: "Select range",
      },
    ],
    [
      {
        name: "style",
        label: "Design specialties",
        type: "text",
        placeholder: "e.g. mid-century, coastal, full-home renovations",
      },
    ],
    [{ name: "portfolio", label: "Portfolio link", type: "url", placeholder: "https://" }],
    [
      {
        name: "about",
        label: "Anything else we should know",
        type: "textarea",
        placeholder: "Studio size, years in practice, current availability...",
      },
    ],
  ],
  submitLabel: "Submit application",
  finePrint:
    "By applying you agree to Leadloom's designer terms. We'll email you within 2 business days.",
  success: {
    title: "Application received",
    body: "We're reviewing your portfolio now. You'll hear from us within 2 business days — no spam, no auto-replies.",
  },
};

export const HOMEOWNER_FORM: LeadFormConfig = {
  id: "homeowner-form",
  formId: "form-homeowner",
  accent: "teal",
  tag: "For homeowners",
  heading: "Find your designer match",
  sub: "Free, no obligation. We'll introduce you to one or two designers who genuinely fit.",
  rows: [
    [
      { name: "name", label: "Full name", type: "text", required: true, placeholder: "Priya Shah" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "priya@email.com" },
    ],
    [
      { name: "phone", label: "Phone", type: "tel", placeholder: "(555) 000-0000" },
      { name: "city", label: "City", type: "text", required: true, placeholder: "Austin, TX" },
    ],
    [
      {
        name: "projectType",
        label: "Project type",
        type: "select",
        options: PROJECT_TYPES,
        selectPrompt: "Select one",
      },
      {
        name: "timeline",
        label: "Timeline",
        type: "select",
        options: TIMELINES,
        selectPrompt: "Select one",
      },
    ],
    [
      {
        name: "budget",
        label: "Estimated budget",
        type: "select",
        options: BUDGET_RANGES,
        selectPrompt: "Select range",
      },
    ],
    [
      {
        name: "style",
        label: "Style you're drawn to",
        type: "text",
        placeholder: "e.g. warm minimalist, traditional, Japandi",
      },
    ],
    [
      {
        name: "description",
        label: "Tell us about your space",
        type: "textarea",
        placeholder: "What are you hoping to change, and why now?",
      },
    ],
  ],
  submitLabel: "Get matched",
  finePrint: "Always free for homeowners. We'll follow up within 2 business days with your match.",
  success: {
    title: "Request received",
    body: "We're finding your match now. Expect to hear from us within 2 business days with a designer intro.",
  },
};
