import { recipeAccents, type RecipeAccentKey } from "@/constants/recipe.ts";
import { removeMultipleSpaces } from "@/lib/string.ts";

/**
 * Zerlegt eine komma-separierte Eingabe in einzelne Namen.
 * Leerzeichen werden normalisiert, leere Einträge und Duplikate (ohne Groß-/Kleinschreibung) entfernt.
 *
 * @param input - Eingabe wie `"Gramm, Liter,  Prise"`.
 * @returns Liste der Namen in Eingabe-Reihenfolge, z. B. `["Gramm", "Liter", "Prise"]`.
 */
export function parseNameList(input: string): string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const part of input.split(",")) {
    const name = removeMultipleSpaces(part);
    const key = name.toLowerCase();
    if (!name || seen.has(key)) {
      continue;
    }
    seen.add(key);
    names.push(name);
  }
  return names;
}

/**
 * Filtert Namen heraus, die es (ohne Groß-/Kleinschreibung) schon gibt.
 *
 * @param names - Neu einzutragende Namen.
 * @param existing - Bereits vorhandene Namen.
 * @returns Nur die Namen, die noch nicht existieren.
 */
export function filterNewNames(names: string[], existing: string[]): string[] {
  const existingKeys = new Set(existing.map((name) => name.trim().toLowerCase()));
  return names.filter((name) => !existingKeys.has(name.trim().toLowerCase()));
}

/**
 * Ordnet einer Kategorie deterministisch eine Akzentfarbe zu, damit dieselbe Kategorie
 * überall (Chips, Karten, Filter, Verwaltung) dieselbe Farbe hat.
 * Groß-/Kleinschreibung und Leerzeichen am Rand spielen keine Rolle.
 *
 * @param name - Kategoriename, z. B. `"Suppen"`.
 * @returns Eine der Akzentfarben aus `recipeAccents`, bzw. `"primary"` wenn keine Kategorie gesetzt ist.
 * @example getCategoryColor("Suppen"); // z. B. "teal"
 */
export function getCategoryColor(name: string | null | undefined): RecipeAccentKey {
  const normalized = name?.trim().toLowerCase();
  if (!normalized) {
    return "primary";
  }

  let hash = 0;
  for (const char of normalized) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return recipeAccents[hash % recipeAccents.length];
}
