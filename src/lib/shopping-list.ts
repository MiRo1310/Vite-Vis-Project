import { formatAmount, scaleAmount } from "@/lib/recipe.ts";

/** Ein Eintrag, der auf die Einkaufsliste soll. */
export interface ShoppingListItem {
  name: string;
  amount?: number;
  unit?: string;
  recipeId?: string;
}

/**
 * Ziel für Einkaufslisten-Einträge (z. B. die Alexa-Liste über ioBroker).
 * Die konkrete Umsetzung liegt in `composables/shoppingList.ts`.
 */
export interface ShoppingListSink {
  /** `false`, solange die Anbindung noch nicht eingerichtet ist */
  readonly isConnected: boolean;
  add(items: ShoppingListItem[]): Promise<void>;
}

export class ShoppingListNotConnectedError extends Error {
  constructor() {
    super("Die Einkaufsliste ist noch nicht angebunden");
    this.name = "ShoppingListNotConnectedError";
  }
}

interface IngredientLike {
  amount?: number | null;
  unit?: string | null;
  product?: { name: string } | null;
}

/**
 * Macht aus Rezept-Zutaten Einkaufslisten-Einträge, umgerechnet auf die gewünschten Portionen.
 * Gleiche Produkte mit gleicher Einheit werden zusammengezählt (z. B. Zucker in Teig und Guss).
 *
 * @param ingredients - Zutaten des Rezepts (`recipeProducts`).
 * @param basePortions - Portionen, für die das Rezept geschrieben ist.
 * @param targetPortions - Gewünschte Portionen.
 * @param recipeId - Wird an jeden Eintrag gehängt.
 * @returns Einträge in Reihenfolge des ersten Vorkommens; Zutaten ohne Produkt fallen weg.
 */
export function ingredientsToShoppingItems(
  ingredients: readonly IngredientLike[],
  basePortions: number | null | undefined,
  targetPortions: number,
  recipeId?: string,
): ShoppingListItem[] {
  const items: ShoppingListItem[] = [];

  for (const ingredient of ingredients) {
    const name = ingredient.product?.name.trim();
    if (!name) {
      continue;
    }
    const amount = scaleAmount(ingredient.amount, basePortions, targetPortions) ?? undefined;
    const unit = emptyToUndefined(ingredient.unit);

    const existing = items.find((item) => normalizeName(item.name) === normalizeName(name) && item.unit === unit);
    if (existing) {
      existing.amount = addAmounts(existing.amount, amount);
      continue;
    }
    items.push({ name, amount, unit, recipeId });
  }

  return items;
}

const emptyToUndefined = (text: string | null | undefined): string | undefined => {
  const trimmed = text?.trim();
  if (!trimmed) {
    return undefined;
  }
  return trimmed;
};

/** Summe zweier Mengen; bleibt leer, wenn beide fehlen. */
const addAmounts = (a: number | undefined, b: number | undefined): number | undefined => {
  if (a === undefined && b === undefined) {
    return undefined;
  }
  return (a ?? 0) + (b ?? 0);
};

/**
 * Text eines Eintrags, wie er auf der Liste stehen soll.
 *
 * @param item - Eintrag.
 * @returns z. B. `"250 g Mehl"`, `"2 Ei"` oder nur `"Salz"`.
 */
export function formatShoppingItem(item: ShoppingListItem): string {
  const amount = item.amount ? formatAmount(item.amount) : "";
  return [amount, amount ? item.unit : "", item.name].filter(Boolean).join(" ");
}

const normalizeName = (name: string): string => name.trim().toLowerCase().replace(/\s+/g, " ");

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Prüft, welche Produktnamen schon auf der Einkaufsliste stehen.
 * Ohne Groß-/Kleinschreibung; ein Listeneintrag passt, wenn er dem Namen entspricht oder ihn
 * als ganzes Wort enthält („250 g Mehl“ passt zu „Mehl“, „Mehlschwitze“ nicht).
 *
 * @param productNames - Namen der Zutaten.
 * @param listNames - Einträge der Einkaufsliste.
 * @returns Die Produktnamen (Originalschreibweise), die auf der Liste stehen.
 */
export function matchIngredientsWithShoppingList(productNames: readonly string[], listNames: readonly string[]): Set<string> {
  const entries = listNames.map(normalizeName).filter(Boolean);
  const matches = new Set<string>();

  for (const productName of productNames) {
    const name = normalizeName(productName);
    if (!name) {
      continue;
    }
    const wholeWord = new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(name)}($|[^\\p{L}\\p{N}])`, "u");
    if (entries.some((entry) => entry === name || wholeWord.test(entry))) {
      matches.add(productName);
    }
  }

  return matches;
}
