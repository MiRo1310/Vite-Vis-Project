export const startYear = 2025;
// Keyword in der Beschreibung (case-insensitive) -> Textfarbe der Zeile, sobald beide Checkboxen gesetzt sind
export const financeListTextColorMapping: Array<[keyword: string, color: string]> = [
  ["fahrtkosten", "text-green-400!"],
  ["rechnung", "text-blue-400!"],
];

// Textfarbe der Zeile, solange "Geprüft" oder "Rechnung" nicht gesetzt ist
export const descriptionUncheckedColor = "text-red-300!";
