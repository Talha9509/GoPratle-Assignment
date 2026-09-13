/**
 * Formats an ISO date string to a human-readable short date.
 * e.g. "13 September 2026"
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats an ISO date string to a human-readable long date with weekday.
 * e.g. "Sunday, 13 September 2026"
 */
export function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats an ISO date string to a human-readable date + time.
 * e.g. "13 Sep 2026, 04:30 PM"
 */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

