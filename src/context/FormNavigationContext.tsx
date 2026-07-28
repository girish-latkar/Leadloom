"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ActiveForm = "designer-form" | "homeowner-form" | null;
export type AudienceTab = "designers" | "homeowners";

interface FormNavigationContextValue {
  activeForm: ActiveForm;
  activeTab: AudienceTab | null;
  audienceScrollToken: number;
  setActiveTab: (tab: AudienceTab) => void;
}

const FormNavigationContext = createContext<FormNavigationContextValue | null>(null);

const AUDIENCE_HASHES: Record<string, AudienceTab> = {
  "#services": "designers",
  "#designers": "designers",
  "#homeowners": "homeowners",
};

const FORM_HASHES: Record<string, { tab: AudienceTab; form: Exclude<ActiveForm, null> }> = {
  "#designer-form": { tab: "designers", form: "designer-form" },
  "#homeowner-form": { tab: "homeowners", form: "homeowner-form" },
};

export function FormNavigationProvider({ children }: { children: ReactNode }) {
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);
  const [activeTab, setActiveTab] = useState<AudienceTab | null>(null);
  const [audienceScrollToken, setAudienceScrollToken] = useState(0);

  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const audienceTab = AUDIENCE_HASHES[href];
      const formTarget = FORM_HASHES[href];

      if (audienceTab) {
        e.preventDefault();
        setActiveTab(audienceTab);
        setActiveForm(null);
        setAudienceScrollToken((token) => token + 1);
        return;
      }

      if (formTarget) {
        e.preventDefault();
        setActiveTab(formTarget.tab);
        setActiveForm(formTarget.form);
      }
    }

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return (
    <FormNavigationContext.Provider
      value={{ activeForm, activeTab, audienceScrollToken, setActiveTab }}
    >
      {children}
    </FormNavigationContext.Provider>
  );
}

export function useFormNavigation() {
  const context = useContext(FormNavigationContext);
  if (!context) {
    throw new Error("useFormNavigation must be used within FormNavigationProvider");
  }
  return context;
}

export function useActiveForm() {
  const { activeForm } = useFormNavigation();
  return activeForm;
}
