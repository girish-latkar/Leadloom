import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface ContactDetailsProps {
  className?: string;
  variant?: "stacked" | "footer";
}

export function ContactDetails({ className, variant = "stacked" }: ContactDetailsProps) {
  if (variant === "footer") {
    return (
      <div
        className={cn(
          "grid grid-cols-3 gap-6 max-[820px]:grid-cols-1 max-[820px]:gap-3",
          className,
        )}
      >
        <div>
          <div className="text-[12px] text-grey">Email</div>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="mt-1 block text-[14px] text-paper no-underline transition-colors hover:text-gold"
          >
            {CONTACT_INFO.email}
          </a>
        </div>
        <div>
          <div className="text-[12px] text-grey">Phone</div>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="mt-1 block text-[14px] text-paper no-underline transition-colors hover:text-gold"
          >
            {CONTACT_INFO.phoneDisplay}
          </a>
        </div>
        <div>
          <div className="text-[12px] text-grey">Address</div>
          <p className="mt-1 text-[14px] leading-relaxed text-paper-dim">{CONTACT_INFO.address}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-mono text-xs tracking-[0.14em] text-grey uppercase">Get in touch</h3>
      <ul className="list-none space-y-3 p-0">
        <li>
          <div className="text-[12px] text-grey">Email</div>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="mt-0.5 block text-[15px] text-paper no-underline transition-colors hover:text-gold"
          >
            {CONTACT_INFO.email}
          </a>
        </li>
        <li>
          <div className="text-[12px] text-grey">Phone</div>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="mt-0.5 block text-[15px] text-paper no-underline transition-colors hover:text-gold"
          >
            {CONTACT_INFO.phoneDisplay}
          </a>
        </li>
        <li>
          <div className="text-[12px] text-grey">Address</div>
          <p className="mt-0.5 text-[15px] leading-relaxed text-paper-dim">{CONTACT_INFO.address}</p>
        </li>
      </ul>
    </div>
  );
}
