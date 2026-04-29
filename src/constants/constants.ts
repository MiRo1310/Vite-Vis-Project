export const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
export const weekdays: Weekdays[] = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

type Weekdays = "Montag" | "Dienstag" | "Mittwoch" | "Donnerstag" | "Freitag" | "Samstag" | "Sonntag";

export interface Days {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
}

export const days: Days = {
  0: "Sonntag",
  1: "Montag",
  2: "Dienstag",
  3: "Mittwoch",
  4: "Donnerstag",
  5: "Freitag",
  6: "Samstag",
};

export const range = {
  last5min: { rangeSec: 300, title: "Letzte 5 Minuten" },
  last30min: { rangeSec: 1800, title: "Letzte 30 Minuten" },
  last1h: { rangeSec: 3600, title: "Letzte 1 Stunde" },
  last6h: { rangeSec: 21600, title: "Letzte 6 Stunden" },
  last12h: { rangeSec: 43200, title: "Letzte 12 Stunden" },
  last24h: { rangeSec: 86400, title: "Letzte 24 Stunden" },
  last7d: { rangeSec: 604800, title: "Letzte 7 Tage" },
  last30d: { rangeSec: 2592000, title: "Letzte 30 Tage" },
};
