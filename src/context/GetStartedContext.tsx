"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useAudience, type Audience } from "@/context/AudienceContext";
import { GetStartedModal } from "@/components/layout/GetStartedModal";

interface GetStartedContextValue {
  openGetStarted: (audience?: Audience) => void;
}

const GetStartedContext = createContext<GetStartedContextValue | null>(null);

const FORM_HASHES: Record<string, Audience> = {
  "#homeowner-form": "homeowners",
  "#designer-form": "designers",
  "#start-search": "homeowners",
  "#intake-form": "homeowners",
};

export function GetStartedProvider({ children }: { children: ReactNode }) {
  const { audience } = useAudience();
  const [open, setOpen] = useState(false);
  const [formAudience, setFormAudience] = useState<Audience>(audience);

  const openGetStarted = useCallback(
    (nextAudience?: Audience) => {
      setFormAudience(nextAudience ?? audience);
      setOpen(true);
    },
    [audience],
  );

  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const targetAudience = FORM_HASHES[href];
      if (!targetAudience) return;

      e.preventDefault();
      openGetStarted(targetAudience);
    }

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [openGetStarted]);

  return (
    <GetStartedContext.Provider value={{ openGetStarted }}>
      {children}
      <GetStartedModal
        open={open}
        onClose={() => setOpen(false)}
        initialAudience={formAudience}
      />
    </GetStartedContext.Provider>
  );
}

export function useGetStarted() {
  const context = useContext(GetStartedContext);
  if (!context) {
    throw new Error("useGetStarted must be used within GetStartedProvider");
  }
  return context;
}
