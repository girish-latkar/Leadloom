"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Audience = "homeowners" | "designers";

interface AudienceContextValue {
  audience: Audience;
  setAudience: (audience: Audience) => void;
  showDesigners: () => void;
  showHomeowners: () => void;
}

const AudienceContext = createContext<AudienceContextValue | null>(null);

const DESIGNER_HASHES = new Set(["#qualify", "#network"]);

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("homeowners");
  const audienceRef = useRef(audience);
  const pendingScroll = useRef<string | null>(null);
  const isFirstRender = useRef(true);

  audienceRef.current = audience;

  const setAudience = useCallback((next: Audience) => {
    setAudienceState(next);
  }, []);

  const showDesigners = useCallback(() => setAudienceState("designers"), []);
  const showHomeowners = useCallback(() => setAudienceState("homeowners"), []);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      if (DESIGNER_HASHES.has(href)) {
        e.preventDefault();
        const targetId = href.slice(1);

        if (audienceRef.current === "designers") {
          scrollToSection(targetId);
          return;
        }

        pendingScroll.current = targetId;
        setAudienceState("designers");
      }
    }

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      const target = pendingScroll.current ?? (audience === "designers" ? "qualify" : "top");
      pendingScroll.current = null;

      if (target === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      scrollToSection(target);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [audience]);

  return (
    <AudienceContext.Provider value={{ audience, setAudience, showDesigners, showHomeowners }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudience must be used within AudienceProvider");
  }
  return context;
}

export function useIsDesignerView() {
  return useAudience().audience === "designers";
}
