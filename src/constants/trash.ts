const _trashTypes: Partial<Record<string, { short: string; color: string }>> = {
  "Papier Tonne": { short: "Papier", color: "text-blue-400" },
  "Restmüll Tonne": { short: "Restmüll", color: "text-gray-400" },
  Biotonne: { short: "Bio", color: "text-trashBio" },
  "Gelbe Tonne": { short: "Gelb", color: "text-yellow-300" },
};

const shortName = (name: string): string => _trashTypes[name]?.short ?? name;
const color = (name: string): string => _trashTypes[name]?.color ?? "text-muted-foreground";

export const trashData = { shortName, color };
