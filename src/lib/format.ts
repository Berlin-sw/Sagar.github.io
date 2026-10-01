const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const numberFormatter = new Intl.NumberFormat("en-US");

/** Formats an ISO date as e.g. "Sep 28, 2026" (UTC, so server and client agree). */
export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

export function formatMonth(iso: string) {
  return monthFormatter.format(new Date(iso));
}

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${formatNumber(count)} ${count === 1 ? singular : plural}`;
}
