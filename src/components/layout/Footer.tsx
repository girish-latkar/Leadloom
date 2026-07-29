import { FOOTER_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-[42px]">
      <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-start justify-between gap-8 px-8 max-sm:px-5">
        <Logo />

        <nav className="flex flex-wrap gap-8" aria-label="Footer">
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

      <div className="mx-auto mt-10 flex max-w-[1180px] flex-wrap justify-between gap-2.5 border-t border-line px-8 pt-6 text-[12.5px] text-grey-soft max-sm:px-5">
        <span>© 2026 {SITE.name.toUpperCase()}. All rights reserved.</span>
        <span>{SITE.location}</span>
      </div>
    </footer>
  );
}
