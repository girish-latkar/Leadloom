"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface FooterContactContextValue {
  showContact: boolean;
}

const FooterContactContext = createContext<FooterContactContextValue | null>(null);

export function FooterContactProvider({ children }: { children: ReactNode }) {
  const [showContact, setShowContact] = useState(false);
  const prevShowContact = useRef(false);

  useEffect(() => {
    function onContactClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest('a[href="#contact"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      e.preventDefault();
      setShowContact((visible) => !visible);
      window.dispatchEvent(new CustomEvent("leadloom:contact-toggle"));
    }

    document.addEventListener("click", onContactClick);
    return () => document.removeEventListener("click", onContactClick);
  }, []);

  useEffect(() => {
    if (showContact && !prevShowContact.current) {
      const timer = window.setTimeout(() => {
        document.getElementById("footer-contact")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 350);
      prevShowContact.current = showContact;
      return () => window.clearTimeout(timer);
    }

    prevShowContact.current = showContact;
  }, [showContact]);

  return (
    <FooterContactContext.Provider value={{ showContact }}>
      {children}
    </FooterContactContext.Provider>
  );
}

export function useFooterContact() {
  const context = useContext(FooterContactContext);
  if (!context) {
    throw new Error("useFooterContact must be used within FooterContactProvider");
  }
  return context;
}
