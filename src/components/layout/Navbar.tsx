"use client";

import { useEffect, useState } from "react";

import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b border-line backdrop-blur-[12px]",
        "transition-[background-color,box-shadow] duration-[350ms] ease-in-out",
        scrolled ? "bg-(--nav-bg-scrolled) shadow-(--nav-shadow)" : "bg-(--nav-bg)",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-8 max-sm:px-5">
        <a
          href="#"
          className="group flex items-center gap-[9px] font-display text-[21px] font-semibold no-underline"
        >
          <span className="block transition-transform duration-500 ease-out-loom group-hover:rotate-90">
            <LogoMark />
          </span>
          {SITE.name}
        </a>

        <div className="flex items-center gap-7 text-sm text-grey max-[820px]:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative no-underline transition-colors duration-250 hover:text-paper",
                "after:absolute after:-bottom-[5px] after:left-0 after:h-px after:w-full",
                "after:origin-right after:scale-x-0 after:bg-paper",
                "after:transition-transform after:duration-[350ms] after:ease-out-loom",
                "hover:after:origin-left hover:after:scale-x-100",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Button href="#homeowner-form" variant="ghost">
            Find a designer
          </Button>
          <Button href="#designer-form" variant="gold">
            Get quality leads
          </Button>
        </div>
      </div>
    </nav>
  );
}
