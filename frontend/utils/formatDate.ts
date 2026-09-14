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

/**
 * Formats a start + end ISO date pair into a readable range.
 * If same day: "13 September 2026"
 * If different days: "13 – 15 September 2026"
 */
export function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();
  const sameDay = sameMonth && start.getDate() === end.getDate();

  if (sameDay) {
    return start.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (sameMonth) {
    return `${start.getDate()} – ${end.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`;
  }

  return `${start.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${end.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`;
}

/**
 * Converts a 24h "HH:MM" time string to a readable 12h format.
 * e.g. "14:30" → "2:30 PM"
 */
export function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = minuteStr ?? "00";
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${minute} ${period}`;
}
