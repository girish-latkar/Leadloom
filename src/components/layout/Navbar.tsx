"use client";

import { useEffect, useRef, useState } from "react";

import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

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

  // Close menu on route/hash change
  useEffect(() => {
    function onHashChange() {
      setMobileOpen(false);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Close on outside click
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

  // Prevent body scroll when menu open
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
          "sticky top-0 z-50 border-b border-line backdrop-blur-[12px]",
          "transition-[background-color,box-shadow] duration-[350ms] ease-in-out",
          scrolled ? "bg-(--nav-bg-scrolled) shadow-(--nav-shadow)" : "bg-(--nav-bg)",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-8 max-sm:px-5">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center no-underline"
          >
            <Logo className="transition-opacity duration-300 group-hover:opacity-85" />
          </a>

          {/* Desktop nav links */}
          <div className="flex items-center gap-7 text-sm text-grey max-[820px]:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative no-underline transition-colors duration-250 hover:text-paper",
                  "after:absolute after:-bottom-[5px] after:left-0 after:h-px after:w-full",
                  "after:origin-right after:scale-x-0 after:bg-gold",
                  "after:transition-transform after:duration-[350ms] after:ease-out-loom",
                  "hover:after:origin-left hover:after:scale-x-100",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="flex items-center gap-2.5 max-[820px]:hidden">
            <ThemeToggle />
            <Button href={`tel:${SITE.phone}`} variant="ghost">
              Call now
            </Button>
            <Button href="#contact" variant="gold">
              Get started
            </Button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
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
      </nav>

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300",
          "hidden max-[820px]:block",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Mobile drawer */}
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
        {/* Drawer header */}
        <div className="flex h-[72px] items-center justify-between border-b border-line px-6">
          <span className="font-display text-[17px] font-medium text-paper">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-grey transition-colors hover:bg-(--btn-outline-hover-bg) hover:text-paper"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-4 pt-6" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: mobileOpen ? `${i * 60 + 80}ms` : "0ms" }}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-3.5 text-[15px] font-medium text-grey no-underline",
                "transition-all duration-300 ease-out-loom hover:bg-(--btn-outline-hover-bg) hover:text-paper",
                mobileOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
              )}
            >
              {/* Gold accent dot */}
              <span className="h-[5px] w-[5px] rounded-full bg-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              {link.label}
            </a>
          ))}
        </nav>

        {/* Gold divider */}
        <div className="mx-4 mt-6 h-px bg-linear-to-r from-gold/40 via-gold/20 to-transparent" />

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 px-4 pt-6">
          <Button href={`tel:${SITE.phone}`} variant="ghost" className="w-full justify-center">
            Call now
          </Button>
          <Button
            href="#contact"
            variant="gold"
            className="w-full justify-center"
            onClick={() => setMobileOpen(false)}
          >
            Get started
          </Button>
        </div>

        {/* Bottom brand accent */}
        <div className="mt-auto border-t border-line px-6 pb-8 pt-6">
          <p className="text-[12px] leading-relaxed text-grey">
            Verified leads for Pune interior designers.
          </p>
        </div>
      </div>
    </>
  );
}
