export const toLocaleTime = (time: number | string) => {
  const date = new Date(time);
  return date.toLocaleString();
};

export const formatSecondsToTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
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
