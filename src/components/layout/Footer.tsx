"use client";

import { FOOTER_LINKS, SITE } from "@/lib/constants";
import { useFooterContact } from "@/context/FooterContactContext";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const { showContact } = useFooterContact();

  return (
    <footer id="footer" className="scroll-mt-[72px] border-t border-line pt-8 pb-6 max-sm:pt-7 max-sm:pb-5">
      <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-8 max-sm:px-5">
        <SocialLinks />

        <nav className="flex flex-wrap items-center gap-6" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-expanded={link.href === "#contact" ? showContact : undefined}
              className={cn(
                "text-[14px] no-underline transition-colors duration-250 hover:text-gold",
                link.href === "#contact" && showContact ? "text-gold" : "text-paper-dim",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Reveal>

      <div
        id="footer-contact"
        className={cn(
          "mx-auto grid transition-[grid-template-rows,opacity,margin] duration-[400ms] ease-out-loom",
          "max-w-[1180px] px-8 max-sm:px-5",
          showContact ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ContactDetails variant="footer" className="border-t border-line pt-4 pb-1" />
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-[1180px] flex-wrap justify-between gap-2 border-t border-line px-8 pt-4 text-[12px] text-grey-soft max-sm:px-5">
        <span>© 2026 {SITE.name.toUpperCase()}. All rights reserved.</span>
        <span>{SITE.location}</span>
      </div>
    </footer>
  );
}
