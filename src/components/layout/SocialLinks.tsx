import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/cn";

function SocialIcon({ platform }: { platform: (typeof SOCIAL_LINKS)[number]["platform"] }) {
  switch (platform) {
    case "instagram":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="13.4" cy="4.6" r="0.9" fill="currentColor" />
        </svg>
      );
    case "twitter":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M3 3.5L7.8 9.6 3.2 14.5H4.6L8.4 10.5L11.6 14.5H15L10 8.1L14.2 3.5H12.8L9.4 7.2L6.5 3.5H3Z"
            fill="currentColor"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 7.5v6M5 5.2v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 13.5V9.8c0-1.2.7-2 1.8-2 1 0 1.6.6 1.6 1.9V13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8 7.5v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 1.9.62 3.66 1.67 5.09L1.5 16.5l2.52-.59A7.44 7.44 0 0 0 9 16.5c4.14 0 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M6.75 7.05c-.12-.27-.25-.27-.4-.27-.11 0-.24 0-.36.01-.12.01-.3.05-.46.24-.16.19-.62.61-.62 1.48 0 .87.64 1.71.73 1.83.09.12 1.24 1.98 3.06 2.7 1.51.6 1.82.48 2.15.45.33-.03 1.06-.43 1.21-.85.15-.42.15-.78.1-.85-.05-.07-.18-.12-.37-.21-.19-.09-1.12-.55-1.29-.61-.17-.06-.29-.09-.41.09-.12.18-.47.61-.58.73-.11.12-.22.14-.41.05-.19-.09-.8-.29-1.52-.94-.56-.5-.94-1.12-1.05-1.31-.11-.19-.01-.29.08-.38.09-.09.19-.23.28-.35.09-.12.12-.21.18-.35.06-.14.03-.26-.02-.35-.05-.09-.41-.99-.56-1.36Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-full border border-line text-paper-dim",
            "transition-[border-color,color,background-color,transform] duration-250 ease-out-loom",
            "hover:-translate-y-0.5 hover:border-grey hover:bg-(--btn-outline-hover-bg) hover:text-gold",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
          )}
        >
          <SocialIcon platform={link.platform} />
        </a>
      ))}
    </div>
  );
}
