import { RECIPE_UNCATEGORIZED, recipeAccents, type RecipeAccentKey } from "@/constants/recipe.ts";
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

/**
 * Rechnet die Kalorien eines ganzen Rezepts auf eine Portion um.
 *
 * @param totalKcal - Kalorien des ganzen Rezepts (`recipe.totalKcal`).
 * @param portions - Portionen des Rezepts; fehlt der Wert oder ist er ≤ 0, zählt das Rezept als eine Portion.
 * @returns Gerundete kcal pro Portion, `0` wenn nichts bekannt ist.
 * @example kcalPerPortion(4102, 10); // 410
 */
export function kcalPerPortion(totalKcal: number | null | undefined, portions: number | null | undefined): number {
  const total = totalKcal ?? 0;
  if (!portions || portions <= 0) {
    return Math.round(total);
  }
  return Math.round(total / portions);
}

/**
 * Skaliert eine Menge von der Original-Portionenzahl auf die gewünschte.
 *
 * @param amount - Menge im Rezept, z. B. `200`.
 * @param basePortions - Portionen, für die das Rezept geschrieben ist.
 * @param targetPortions - Gewünschte Portionen.
 * @returns Skalierte Menge, `null` wenn keine Menge hinterlegt ist. Ungültige Portionen (≤ 0) lassen die Menge unverändert.
 * @example scaleAmount(200, 4, 2); // 100
 */
export function scaleAmount(amount: number | null | undefined, basePortions: number | null | undefined, targetPortions: number): number | null {
  if (amount === null || amount === undefined) {
    return null;
  }
  if (!basePortions || basePortions <= 0 || targetPortions <= 0) {
    return amount;
  }
  return (amount * targetPortions) / basePortions;
}

/**
 * Formatiert eine Menge für die Anzeige: deutsches Komma, höchstens zwei Nachkommastellen, keine überflüssigen Nullen.
 *
 * @param value - Menge, z. B. `1.5` oder `33.3333`.
 * @returns Text wie `"1,5"` bzw. `"33,33"`, leerer Text bei `null`/`undefined`.
 */
export function formatAmount(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "";
  }
  return value.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}

export interface RecipeListItem {
  id: string;
  name: string;
  portions?: number | null;
  totalKcal?: number | null;
  totalTimeMin?: number | null;
  preparationTimeMin?: number | null;
  recipeCategory?: { name: string } | null;
}

export interface RecipeFilter {
  /** Suchtext, durchsucht den Rezeptnamen (ohne Groß-/Kleinschreibung). */
  search?: string;
  /** Kategorienamen; leer = alle. `RECIPE_UNCATEGORIZED` findet Rezepte ohne Kategorie. */
  categories?: string[];
  /** Maximale Gesamtzeit (sonst Zubereitungszeit) in Minuten. Rezepte ohne Zeitangabe fallen dann raus. */
  maxTimeMin?: number | null;
  /** Maximale kcal pro Portion. Rezepte ohne kcal fallen dann raus. */
  maxKcal?: number | null;
}

/**
 * Liefert den Kategorienamen eines Rezepts, bzw. `RECIPE_UNCATEGORIZED`.
 *
 * @param recipe - Rezept mit optionaler `recipeCategory`.
 * @returns Kategoriename für Gruppierung und Filter.
 */
export function getRecipeCategoryName(recipe: Pick<RecipeListItem, "recipeCategory">): string {
  const name = recipe.recipeCategory?.name.trim();
  if (!name) {
    return RECIPE_UNCATEGORIZED;
  }
  return name;
}

/**
 * Zeit eines Rezepts für Filter und Karte: Gesamtzeit, sonst Arbeitszeit.
 *
 * @param recipe - Rezept mit optionalen Zeitangaben.
 * @returns Minuten oder `null`, wenn beides fehlt bzw. 0 ist.
 */
export function getRecipeTime(recipe: Pick<RecipeListItem, "totalTimeMin" | "preparationTimeMin">): number | null {
  if (recipe.totalTimeMin) {
    return recipe.totalTimeMin;
  }
  if (recipe.preparationTimeMin) {
    return recipe.preparationTimeMin;
  }
  return null;
}

/** Prüft, ob `value` gesetzt (nicht 0) ist und höchstens `max` beträgt. Ohne `max` passt alles. */
const isWithinMax = (value: number | null, max: number | null | undefined): boolean => {
  if (!max) {
    return true;
  }
  return !!value && value <= max;
};

/**
 * Filtert Rezepte nach Suchtext, Kategorien, maximaler Zeit und maximalen kcal pro Portion.
 *
 * @param recipes - Alle Rezepte.
 * @param filter - Aktive Filter; leere bzw. fehlende Werte filtern nicht.
 * @returns Neue Liste mit den passenden Rezepten in Eingabe-Reihenfolge.
 */
export function filterRecipes<T extends RecipeListItem>(recipes: readonly T[], filter: RecipeFilter): T[] {
  const term = filter.search?.trim().toLowerCase() ?? "";
  const categories = filter.categories ?? [];

  return recipes.filter((recipe) => {
    const matchesSearch = !term || recipe.name.toLowerCase().includes(term);
    const matchesCategory = categories.length === 0 || categories.includes(getRecipeCategoryName(recipe));
    return (
      matchesSearch &&
      matchesCategory &&
      isWithinMax(getRecipeTime(recipe), filter.maxTimeMin) &&
      isWithinMax(kcalPerPortion(recipe.totalKcal, recipe.portions), filter.maxKcal)
    );
  });
}

/**
 * Gruppiert Rezepte nach Kategorie. Gruppen und Rezepte sind alphabetisch sortiert,
 * `RECIPE_UNCATEGORIZED` steht immer am Ende.
 *
 * @param recipes - Rezepte, z. B. schon durch `filterRecipes` gefiltert.
 * @returns Gruppen mit `key` (Kategorie) und `value` (Rezepte).
 */
export function groupRecipesByCategory<T extends RecipeListItem>(recipes: readonly T[]): Array<{ key: string; value: T[] }> {
  const groups = new Map<string, T[]>();
  for (const recipe of recipes) {
    const key = getRecipeCategoryName(recipe);
    groups.set(key, [...(groups.get(key) ?? []), recipe]);
  }

  return [...groups.entries()]
    .map(([key, value]) => ({ key, value: value.sort((a, b) => a.name.localeCompare(b.name, "de")) }))
    .sort((a, b) => {
      if (a.key === RECIPE_UNCATEGORIZED) {
        return 1;
      }
      if (b.key === RECIPE_UNCATEGORIZED) {
        return -1;
      }
      return a.key.localeCompare(b.key, "de");
    });
}

/**
 * Ordnet die gemerkten „zuletzt geöffnet“-Einträge den aktuellen Rezepten zu.
 * Gelöschte Rezepte fallen weg, die Daten (Name, Zeit, kcal) kommen frisch aus der Liste.
 *
 * @param recent - Gemerkte Einträge, neuester zuerst.
 * @param recipes - Aktuelle Rezepte vom Server.
 * @returns Rezepte in der Reihenfolge von `recent`.
 */
export function pickRecentRecipes<T extends { id: string }>(recent: ReadonlyArray<{ id: string }>, recipes: readonly T[]): T[] {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  return recent.map((entry) => byId.get(entry.id)).filter((recipe): recipe is T => recipe !== undefined);
}

export interface IngredientGroup<T> {
  position: number;
  title: string;
  items: T[];
}

/**
 * Gruppiert die Zutaten eines Rezepts nach `groupPosition` und hängt die Gruppen-Überschrift an.
 *
 * @param ingredients - `recipe.recipeProducts`.
 * @param headers - `recipe.recipeHeaderProducts` (Überschrift je Position).
 * @returns Gruppen aufsteigend nach Position; ohne Überschrift heißt eine Gruppe `"Gruppe <n>"`, bei nur einer Gruppe bleibt der Titel leer.
 */
export function groupIngredientsByGroupPosition<T extends { groupPosition: number }>(
  ingredients: readonly T[],
  headers: ReadonlyArray<{ position: number; text?: string | null }> = [],
): Array<IngredientGroup<T>> {
  const groups = new Map<number, T[]>();
  for (const ingredient of ingredients) {
    groups.set(ingredient.groupPosition, [...(groups.get(ingredient.groupPosition) ?? []), ingredient]);
  }

  const positions = [...groups.keys()].sort((a, b) => a - b);
  return positions.map((position, index) => {
    let title = headers.find((h) => h.position === position)?.text?.trim() ?? "";
    if (!title && positions.length > 1) {
      title = `Gruppe ${index + 1}`;
    }
    return { position, title, items: groups.get(position) ?? [] };
  });
}

/**
 * Sortiert die Zubereitungsschritte nach `position`.
 *
 * @param steps - `recipe.recipeDescriptions`.
 * @returns Neue, sortierte Liste.
 */
export function sortSteps<T extends { position: number }>(steps: readonly T[] | null | undefined): T[] {
  return [...(steps ?? [])].sort((a, b) => a.position - b.position);
}

/**
 * Schlüssel einer Zutat für „abgehakt“ – gleich in Zutatenliste, Zutaten-Panel und Schritt-Anzeige.
 *
 * @param groupPosition - Position der Gruppe.
 * @param index - Index der Zutat innerhalb der Gruppe.
 * @returns z. B. `"0-2"`.
 */
export function ingredientKey(groupPosition: number, index: number): string {
  return `${groupPosition}-${index}`;
}

/**
 * Menge mit Einheit, umgerechnet auf die gewünschten Portionen.
 *
 * @param amount - Menge im Rezept.
 * @param unit - Einheit.
 * @param basePortions - Portionen des Rezepts.
 * @param targetPortions - Gewünschte Portionen.
 * @returns z. B. `"125 g"`, nur die Einheit oder `""`.
 */
export function formatScaledAmount(
  amount: number | null | undefined,
  unit: string | null | undefined,
  basePortions: number | null | undefined,
  targetPortions: number,
): string {
  return [formatAmount(scaleAmount(amount, basePortions, targetPortions)), unit?.trim()].filter(Boolean).join(" ");
}

/**
 * Macht aus gruppierten Zutaten eine flache Liste mit Häkchen-Schlüssel und Gruppentitel.
 *
 * @param groups - Ergebnis von `groupIngredientsByGroupPosition`.
 * @returns Zutaten in Anzeige-Reihenfolge.
 */
export function flattenIngredientGroups<T>(groups: ReadonlyArray<IngredientGroup<T>>): Array<{ key: string; groupTitle: string; item: T }> {
  return groups.flatMap((group) => group.items.map((item, index) => ({ key: ingredientKey(group.position, index), groupTitle: group.title, item })));
}
