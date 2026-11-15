import { recipeAccents, type RecipeAccentKey } from "@/constants/recipe.ts";

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
