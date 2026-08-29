"use client";

import Link from "next/link";

import { FOOTER_LINKS, LEGAL_LINKS, SITE } from "@/lib/constants";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer id="footer" className="scroll-mt-[72px] border-t border-line pt-8 pb-6 max-sm:pt-7 max-sm:pb-5">
      <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-start justify-between gap-6 px-8 max-sm:px-5">
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-flex no-underline transition-opacity duration-300 hover:opacity-85">
            <Logo className="h-9 w-[136px] sm:h-10 sm:w-[152px]" />
          </Link>
          <SocialLinks />
        </div>

        <nav className="flex flex-wrap items-center gap-6" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] text-paper-dim no-underline transition-colors duration-250 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Reveal>

      <Reveal className="mx-auto mt-4 flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-8 max-sm:px-5">
        <nav className="flex flex-wrap items-center gap-6" aria-label="Legal">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] text-grey no-underline transition-colors duration-250 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Reveal>

      <div className="mx-auto mt-5 flex max-w-[1180px] flex-wrap justify-between gap-2 border-t border-line px-8 pt-4 text-[12px] text-grey-soft max-sm:px-5">
        <span>© 2026 {SITE.name.toUpperCase()}. All rights reserved.</span>
        <span>{SITE.location}</span>
      </div>
    </footer>
  );
}
