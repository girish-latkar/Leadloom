import "server-only";

/** Escape user-provided values before inserting into HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF from values used in email headers. */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]/g, "").trim();
}
