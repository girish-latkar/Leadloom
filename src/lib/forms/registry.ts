import { DESIGNER_FORM, HOMEOWNER_FORM, INQUIRY_FORM, type LeadFormConfig } from "@/lib/formConfig";

export const FORM_BY_ID: Record<string, LeadFormConfig> = {
  [DESIGNER_FORM.formId]: DESIGNER_FORM,
  [HOMEOWNER_FORM.formId]: HOMEOWNER_FORM,
  [INQUIRY_FORM.formId]: INQUIRY_FORM,
};

export function getFormConfig(formId: string): LeadFormConfig | undefined {
  return FORM_BY_ID[formId];
}

export function getFormFields(config: LeadFormConfig) {
  return config.rows.flat();
}
