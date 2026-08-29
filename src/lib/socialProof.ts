import { SOCIAL_PROOF } from "@/lib/constants";

/** Optional live count via NEXT_PUBLIC_VERIFIED_DESIGNER_COUNT (> 0). */
export function getVerifiedDesignerCount(): number | null {
  const raw = process.env.NEXT_PUBLIC_VERIFIED_DESIGNER_COUNT?.trim();
  if (!raw) return null;

  const count = Number.parseInt(raw, 10);
  return Number.isFinite(count) && count > 0 ? count : null;
}

export function getSocialProofLabel(): string {
  const count = getVerifiedDesignerCount();
  if (count) return `${count} verified designers in Pune`;
  return SOCIAL_PROOF.fallbackLabel;
}
