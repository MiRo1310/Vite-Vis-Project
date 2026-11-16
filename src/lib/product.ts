export interface ProductLike {
  name: string;
  ean?: string | null;
}

export interface ProductGroupLike<T extends ProductLike> {
  key: string;
  value: readonly T[];
}

/**
 * Filtert nach Kategorie gruppierte Produkte nach Suchtext (Name oder EAN) und ausgewählten Kategorien.
 * Leere Gruppen fallen weg, Gruppen und Produkte werden alphabetisch sortiert.
 *
 * @param groups - Gruppen aus `productsGrouped` (`key` = Kategorie).
 * @param search - Suchtext, leer = alles.
 * @param categories - Ausgewählte Kategorien, leer = alle.
 * @returns Neue, gefilterte und sortierte Gruppen (Eingabe bleibt unverändert).
 */
export function filterProductGroups<T extends ProductLike>(
  groups: ReadonlyArray<ProductGroupLike<T>>,
  search: string,
  categories: string[],
): Array<{ key: string; value: T[] }> {
  const term = search.trim().toLowerCase();

  return groups
    .filter((group) => categories.length === 0 || categories.includes(group.key))
    .map((group) => ({
      key: group.key,
      value: group.value
        .filter((product) => !term || product.name.toLowerCase().includes(term) || (product.ean ?? "").toLowerCase().includes(term))
        .sort((a, b) => a.name.localeCompare(b.name, "de")),
    }))
    .filter((group) => group.value.length > 0)
    .sort((a, b) => a.key.localeCompare(b.key, "de"));
}

/**
 * Entfernt alles außer Ziffern aus einer Barcode-Eingabe (Leerzeichen, Bindestriche …).
 * Führende Nullen bleiben erhalten.
 *
 * @param input - Eingabe wie `" 4000 417-025005 "`.
 * @returns Nur die Ziffern, z. B. `"4000417025005"`.
 */
export function normalizeEan(input: string | number | null | undefined): string {
  return String(input ?? "").replace(/\D/g, "");
}

/**
 * Prüft einen Barcode (EAN-8, UPC-A, EAN-13, GTIN-14) auf gültige Länge und Prüfziffer.
 *
 * @param code - Nur Ziffern, siehe `normalizeEan`.
 * @returns `true` wenn Länge und Prüfziffer stimmen.
 */
export function isValidEan(code: string): boolean {
  if (!/^\d+$/.test(code) || ![8, 12, 13, 14].includes(code.length)) {
    return false;
  }
  const digits = code.split("").map(Number);
  const checkDigit = digits.pop();
  // Gewichtung von rechts: 3, 1, 3, 1, …
  const sum = digits.reverse().reduce((acc, digit, index) => acc + digit * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === checkDigit;
}

export interface MacroShares {
  carbs: number;
  fat: number;
  protein: number;
}

/**
 * Anteile der Makronährstoffe (nach Gramm) in Prozent – z. B. für einen gestapelten Balken.
 *
 * @param macros - Gramm-Werte, `null`/`undefined` zählt als 0.
 * @returns Prozentwerte, die zusammen 100 ergeben, oder überall 0 wenn keine Werte vorhanden sind.
 */
export function getMacroShares(macros: { carbs?: number | null; fat?: number | null; protein?: number | null }): MacroShares {
  const carbs = Math.max(macros.carbs ?? 0, 0);
  const fat = Math.max(macros.fat ?? 0, 0);
  const protein = Math.max(macros.protein ?? 0, 0);
  const total = carbs + fat + protein;

  if (total === 0) {
    return { carbs: 0, fat: 0, protein: 0 };
  }

  return { carbs: (carbs / total) * 100, fat: (fat / total) * 100, protein: (protein / total) * 100 };
}

export interface ProductSearchResult<T> {
  /** Zuletzt verwendete Produkte – nur ohne Suchtext */
  recent: T[];
  /** Treffer (mit Suchtext) bzw. alle übrigen Produkte (ohne Suchtext), höchstens `limit` */
  matches: T[];
  /** Es gibt ein Produkt mit genau diesem Namen (ohne Groß-/Kleinschreibung) */
  hasExactMatch: boolean;
}

/**
 * Sucht Produkte für die Zutaten-Auswahl.
 * Ohne Suchtext stehen die zuletzt verwendeten Produkte oben, danach alle anderen alphabetisch.
 * Mit Suchtext zählen Namen, die den Text enthalten; Namen, die damit beginnen, stehen vorne.
 *
 * @param products - Alle Produkte.
 * @param search - Suchtext.
 * @param recentIds - Zuletzt verwendete Produkt-IDs, neueste zuerst.
 * @param limit - Maximale Anzahl Treffer.
 * @returns Zuletzt verwendet, Treffer und ob der Name exakt existiert.
 */
export function searchProducts<T extends { id: string; name: string }>(
  products: readonly T[],
  search: string,
  recentIds: readonly string[] = [],
  limit = 50,
): ProductSearchResult<T> {
  const term = search.trim().toLowerCase();
  const byName = (a: T, b: T) => a.name.localeCompare(b.name, "de");

  if (!term) {
    const byId = new Map(products.map((product) => [product.id, product]));
    const recent = recentIds.map((id) => byId.get(id)).filter((product): product is T => product !== undefined);
    const recentSet = new Set(recent.map((product) => product.id));
    const matches = products.filter((product) => !recentSet.has(product.id)).sort(byName).slice(0, limit);
    return { recent, matches, hasExactMatch: false };
  }

  const startsWith = (product: T) => product.name.toLowerCase().startsWith(term);
  const matches = products
    .filter((product) => product.name.toLowerCase().includes(term))
    .sort((a, b) => Number(startsWith(b)) - Number(startsWith(a)) || byName(a, b))
    .slice(0, limit);

  return { recent: [], matches, hasExactMatch: products.some((product) => product.name.trim().toLowerCase() === term) };
}

/**
 * Wählt aus erkannten Barcodes den ersten gültigen EAN/UPC.
 *
 * @param rawValues - Rohwerte des Scanners (können Leerzeichen o. Ä. enthalten).
 * @returns Normalisierte EAN oder `null`, wenn keiner gültig ist.
 */
export function pickValidEan(rawValues: readonly string[]): string | null {
  for (const raw of rawValues) {
    const ean = normalizeEan(raw);
    if (isValidEan(ean)) {
      return ean;
    }
  }
  return null;
}

/**
 * Sucht ein Produkt mit dieser EAN in nach Kategorie gruppierten Produkten.
 *
 * @param groups - Gruppen aus `productsGrouped`.
 * @param ean - Gesuchte EAN (wird normalisiert).
 * @returns Das Produkt oder `undefined`.
 */
export function findProductByEan<T extends ProductLike>(groups: ReadonlyArray<ProductGroupLike<T>>, ean: string): T | undefined {
  const code = normalizeEan(ean);
  if (!code) {
    return undefined;
  }
  return groups.flatMap((group) => group.value).find((product) => normalizeEan(product.ean) === code);
}

/**
 * Namen der Rezepte, in denen ein Produkt als Zutat vorkommt (z. B. als Warnung vor dem Löschen).
 *
 * @param recipes - Rezepte mit ihren Zutaten.
 * @param productId - Gesuchtes Produkt.
 * @returns Rezeptnamen ohne Doppelte, alphabetisch.
 */
export function findRecipesUsingProduct(
  recipes: ReadonlyArray<{ name: string; recipeProducts: ReadonlyArray<{ productId: string }> }>,
  productId: string,
): string[] {
  const names = recipes.filter((recipe) => recipe.recipeProducts.some((ingredient) => ingredient.productId === productId)).map((recipe) => recipe.name);
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, "de"));
}
