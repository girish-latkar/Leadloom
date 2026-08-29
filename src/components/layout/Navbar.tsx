"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { AudienceToggle } from "@/components/layout/AudienceToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { GetMatchedButton } from "@/components/ui/GetMatchedButton";
import { Button } from "@/components/ui/Button";
import { useAudience } from "@/context/AudienceContext";

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a15.9 15.9 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { audience } = useAudience();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  function goHome(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (!isHome) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  }

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onHashChange() {
      setMobileOpen(false);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onOutsideClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 border-b border-line backdrop-blur-[22px] backdrop-saturate-150",
          "transition-[background-color,box-shadow] duration-[350ms] ease-in-out",
          scrolled ? "bg-(--nav-bg-scrolled) shadow-(--nav-shadow)" : "bg-(--nav-bg)",
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[1180px] grid-cols-[auto_1fr_auto] items-center gap-6 px-8 transition-[height] duration-300 max-sm:gap-4 max-sm:px-5 max-[820px]:grid-cols-[auto_auto]",
            scrolled ? "h-[60px]" : "h-[72px]",
          )}
        >
          <Link href="/" onClick={goHome} className="group flex items-center no-underline">
            <Logo
              className={cn(
                "transition-all duration-300 group-hover:opacity-85",
                scrolled ? "h-8 w-[120px]" : "h-9 w-[136px]",
              )}
            />
          </Link>

          <div className="hidden min-[821px]:flex items-center justify-center gap-8">
            <div className="flex items-center gap-7 text-sm text-grey">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={link.href === "/" ? goHome : undefined}
                  className={cn(
                    "relative whitespace-nowrap no-underline transition-colors duration-250 hover:text-paper",
                    "after:absolute after:-bottom-[5px] after:left-0 after:h-px after:w-full",
                    "after:origin-right after:scale-x-0 after:bg-gold",
                    "after:transition-transform after:duration-[350ms] after:ease-out-loom",
                    "hover:after:origin-left hover:after:scale-x-100",
                    "audience" in link && link.audience !== audience && "opacity-60",
                    pathname === link.href && "text-gold after:origin-left after:scale-x-100",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
            {isHome && <AudienceToggle className="shrink-0" />}
          </div>

          <div className="flex items-center justify-end gap-3 max-[820px]:col-start-2">
            <div className="hidden items-center gap-3 min-[821px]:flex">
              <ThemeToggle />
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                aria-label={`Call Leadloom at ${CONTACT_INFO.phoneDisplay}`}
                className={cn(
                  "flex size-[38px] shrink-0 items-center justify-center rounded-full border border-line text-grey",
                  "transition-[border-color,background-color,transform] duration-200 ease-out-loom",
                  "hover:-translate-y-px hover:border-grey hover:bg-(--btn-outline-hover-bg) hover:text-paper",
                )}
              >
                <PhoneIcon />
              </a>
              <GetMatchedButton variant="teal" compact className="shrink-0" />
            </div>

            <div className="hidden items-center gap-3 max-[820px]:flex">
              <ThemeToggle />
              <button
                id="mobile-menu-toggle"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md",
                  "transition-colors duration-200 hover:bg-(--btn-outline-hover-bg)",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
                )}
              >
                <span
                  className={cn(
                    "block h-[1.5px] w-5 rounded-full bg-paper transition-all duration-300 ease-out-loom",
                    mobileOpen && "translate-y-[6.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-[1.5px] w-5 rounded-full bg-paper transition-all duration-300 ease-out-loom",
                    mobileOpen && "scale-x-0 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-[1.5px] w-5 rounded-full bg-paper transition-all duration-300 ease-out-loom",
                    mobileOpen && "-translate-y-[6.5px] -rotate-45",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300",
          "hidden max-[820px]:block",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col",
          "border-l border-line bg-ink-soft backdrop-blur-[16px]",
          "transition-transform duration-[400ms] ease-out-loom",
          "hidden max-[820px]:flex",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-line px-6">
          <Link href="/" onClick={goHome} className="inline-flex no-underline">
            <Logo className="h-8 w-[120px]" />
          </Link>
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-grey transition-colors hover:bg-(--btn-outline-hover-bg) hover:text-paper"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {isHome && (
          <div className="px-4 pt-5">
            <AudienceToggle variant="stacked" />
          </div>
        )}

        <nav className={cn("flex flex-col gap-1 px-4", isHome ? "pt-4" : "pt-5")} aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                if (link.href === "/") {
                  goHome(event);
                  return;
                }
                setMobileOpen(false);
              }}
              style={{ transitionDelay: mobileOpen ? `${i * 60 + 80}ms` : "0ms" }}
              className={cn(
                "flex w-full items-center justify-center rounded-lg px-3 py-3.5 text-center text-[15px] font-medium text-grey no-underline",
                "transition-all duration-300 ease-out-loom hover:bg-(--btn-outline-hover-bg) hover:text-paper",
                mobileOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                pathname === link.href && "text-gold",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mx-4 mt-6 h-px bg-linear-to-r from-gold/40 via-gold/20 to-transparent" />

        <div className="flex flex-col gap-3 px-4 pt-6">
          <Button
            href={`tel:${CONTACT_INFO.phone}`}
            variant="ghost"
            className="w-full justify-center px-5 hover:translate-y-0 active:translate-y-0"
          >
            <PhoneIcon />
            {CONTACT_INFO.phoneDisplay}
          </Button>
          <GetMatchedButton
            variant="teal"
            className="w-full justify-center"
            onOpen={() => setMobileOpen(false)}
          />
        </div>

        <div className="mt-auto border-t border-line px-6 pt-6 pb-8">
          <p className="text-[12px] leading-relaxed text-grey">Verified interior designers in Pune.</p>
        </div>
      </div>
    </>
  );
}
