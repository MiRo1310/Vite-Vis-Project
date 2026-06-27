import { isDefined } from "@vueuse/core";

export function miBToGiB(val?: number): string {
  if (!isDefined(val)) {
    return "0 GB";
  }
  return (val / 1024).toFixed(2) + " GB";
}

export function formatUptime(val?: number): string {
  if (!isDefined(val)) {
    return "–";
  }
  const d = Math.floor(val / 86400);
  const h = Math.floor((val % 86400) / 3600);
  const m = Math.floor((val % 3600) / 60);
  const parts: string[] = [];
  if (d > 0) {
    parts.push(`${d}d`);
  }
  if (h > 0 || d > 0) {
    parts.push(`${h}h`);
  }
  parts.push(`${m}m`);
  return parts.join(" ");
}
