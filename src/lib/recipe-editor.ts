import * as z from "zod";
import { type RecipeCreateDtoInput } from "@/api/gql/graphql.ts";
import { createId } from "@/lib/id.ts";

/*
 * Entwurfs-Modell des Rezept-Editors.
 *
 * Gruppen enthalten ihre Zutaten direkt, Schritte stehen in Reihenfolge. Positionen (`groupPosition`,
 * `sortOrder`, `position`) entstehen erst beim Speichern aus der Reihenfolge der Arrays. `key` ist nur
 * für Vue (v-for) und Fehlermeldungen da, `id` ist die Datenbank-ID (fehlt bei neuen Einträgen).
 */

export interface DraftIngredient {
  key: string;
  id?: string;
  productId: string;
  amount: number | null;
  activeUnitId: string;
  description: string;
}

export interface DraftGroup {
  key: string;
  id?: string;
  /** Position der Gruppe beim Laden – nötig, um gelöschte Gruppen auf dem Server zu entfernen */
  originalPosition?: number;
  title: string;
  ingredients: DraftIngredient[];
}

export interface DraftStep {
  key: string;
  id?: string;
  header: string;
  text: string;
}

export interface RecipeDraft {
  name: string;
  portions: number | null;
  recipeCategoryId: string | null;
  preparationTimeMin: number | null;
  totalTimeMin: number | null;
  groups: DraftGroup[];
  steps: DraftStep[];
}

/** Rezept, wie es vom Server kommt (Ausschnitt aus `getRecipeById`). */
export interface RecipeSource {
  name: string;
  portions?: number | null;
  recipeCategoryId?: string | null;
  preparationTimeMin?: number | null;
  totalTimeMin?: number | null;
  recipeProducts: ReadonlyArray<{
    id: string;
    productId: string;
    amount?: number | null;
    activeUnitId?: string | null;
    description?: string | null;
    groupPosition: number;
    sortOrder: number;
  }>;
  recipeHeaderProducts: ReadonlyArray<{ id: string; position: number; text: string }>;
  recipeDescriptions: ReadonlyArray<{ id: string; position: number; header?: string | null; text: string }>;
}

/** Erzeugt einen eindeutigen Schlüssel für neue Einträge (funktioniert auch über http, siehe `createId`). */
export const newDraftKey = (): string => createId();

export const emptyIngredient = (): DraftIngredient => ({ key: newDraftKey(), productId: "", amount: null, activeUnitId: "", description: "" });

export const emptyGroup = (title = ""): DraftGroup => ({ key: newDraftKey(), title, ingredients: [] });

export const emptyStep = (): DraftStep => ({ key: newDraftKey(), header: "", text: "" });

/** Neues, leeres Rezept: eine Portion, eine Zutatengruppe mit einer leeren Zeile, ein leerer Schritt. */
export const emptyDraft = (): RecipeDraft => ({
  name: "",
  portions: 1,
  recipeCategoryId: null,
  preparationTimeMin: null,
  totalTimeMin: null,
  groups: [{ ...emptyGroup(), ingredients: [emptyIngredient()] }],
  steps: [emptyStep()],
});

/** Zutatenzeile ohne Produkt, Menge und Notiz – wird ignoriert (bzw. gelöscht). */
export const isEmptyIngredient = (ingredient: Pick<DraftIngredient, "productId" | "amount" | "description">): boolean =>
  !ingredient.productId && ingredient.amount === null && !ingredient.description.trim();

/** Schritt ohne Überschrift und Text – wird nicht gespeichert (bzw. gelöscht). */
export const isEmptyStep = (step: Pick<DraftStep, "header" | "text">): boolean => !step.header.trim() && !step.text.trim();

/** Gruppe ohne (nicht-leere) Zutaten und ohne Titel – wird nicht gespeichert (bzw. gelöscht). */
export const isEmptyGroup = (group: Pick<DraftGroup, "title" | "ingredients">): boolean =>
  group.ingredients.every(isEmptyIngredient) && !group.title.trim();

/**
 * Entfernt alles, was nicht gespeichert wird: leere Zutatenzeilen, danach leere Gruppen ohne Titel und leere Schritte.
 * Grundlage für Prüfung, DTO und Löschungen, damit alle drei dasselbe sehen.
 *
 * @param draft - Entwurf.
 * @returns Neuer Entwurf (Einträge behalten `key` und `id`).
 */
export function pruneDraft(draft: RecipeDraft): RecipeDraft {
  return {
    ...draft,
    groups: draft.groups
      .map((group) => ({ ...group, ingredients: group.ingredients.filter((ingredient) => !isEmptyIngredient(ingredient)) }))
      .filter((group) => !isEmptyGroup(group)),
    steps: draft.steps.filter((step) => !isEmptyStep(step)),
  };
}

/**
 * Wandelt ein geladenes Rezept in einen Editor-Entwurf um.
 * Zutaten landen in ihrer Gruppe (nach `sortOrder`), Gruppen ohne Kopfzeile bekommen einen leeren Titel.
 * Als Schlüssel dient die Datenbank-ID, damit der Entwurf beim erneuten Laden gleich aussieht.
 *
 * @param recipe - Rezept vom Server.
 * @returns Entwurf mit Gruppen nach Position und Schritten nach Position.
 */
export function recipeToDraft(recipe: RecipeSource): RecipeDraft {
  const positions = new Set<number>([...recipe.recipeHeaderProducts.map((h) => h.position), ...recipe.recipeProducts.map((p) => p.groupPosition)]);

  const groups = [...positions]
    .sort((a, b) => a - b)
    .map((position): DraftGroup => {
      const header = recipe.recipeHeaderProducts.find((h) => h.position === position);
      const ingredients = recipe.recipeProducts
        .filter((p) => p.groupPosition === position)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((p) => ({
          key: p.id,
          id: p.id,
          productId: p.productId,
          amount: p.amount ?? null,
          activeUnitId: p.activeUnitId ?? "",
          description: p.description ?? "",
        }));
      return { key: header?.id ?? `group-${position}`, id: header?.id, originalPosition: position, title: header?.text ?? "", ingredients };
    });

  const steps = [...recipe.recipeDescriptions]
    .sort((a, b) => a.position - b.position)
    .map((d) => ({ key: d.id, id: d.id, header: d.header ?? "", text: d.text }));

  return {
    name: recipe.name,
    portions: recipe.portions ?? 1,
    recipeCategoryId: recipe.recipeCategoryId ?? null,
    preparationTimeMin: recipe.preparationTimeMin ?? null,
    totalTimeMin: recipe.totalTimeMin ?? null,
    groups: groups.length ? groups : [emptyGroup()],
    steps,
  };
}

/**
 * Baut aus dem Entwurf das DTO für `createRecipe` bzw. `updateRecipe`.
 * Positionen ergeben sich aus der Reihenfolge. Was `pruneDraft` entfernt, wird nicht mitgeschickt.
 *
 * @param fullDraft - Gültiger Entwurf (siehe `validateDraft`).
 * @param recreateIngredientIds - Zutaten-IDs, die als neue Zutat gespeichert werden sollen (siehe `getDraftDeletions`).
 * @returns DTO ohne Rezept-ID.
 */
export function draftToDto(fullDraft: RecipeDraft, recreateIngredientIds: ReadonlySet<string> = new Set()): RecipeCreateDtoInput {
  const draft = pruneDraft(fullDraft);
  const groups = draft.groups;
  return {
    name: draft.name.trim(),
    portions: draft.portions ?? 1,
    recipeCategoryId: draft.recipeCategoryId,
    preparationTimeMin: draft.preparationTimeMin,
    totalTimeMin: draft.totalTimeMin,
    recipeHeaderProducts: groups.map((group, position) => ({ id: group.id, position, text: group.title.trim() })),
    recipeProducts: groups.flatMap((group, groupPosition) =>
      group.ingredients.map((ingredient, sortOrder) => ({
        id: ingredient.id && !recreateIngredientIds.has(ingredient.id) ? ingredient.id : undefined,
        productId: ingredient.productId,
        amount: ingredient.amount ?? 0,
        activeUnitId: ingredient.activeUnitId,
        description: ingredient.description.trim(),
        groupPosition,
        sortOrder,
      })),
    ),
    recipeDescriptions: draft.steps.map((step, position) => ({ id: step.id, position, header: step.header.trim(), text: step.text.trim() })),
  };
}

export interface DraftDeletions {
  /** Schritte, die gelöscht wurden (→ `removedStepIds`) */
  stepIds: string[];
  /** Zutaten, die gelöscht wurden und nicht schon mit ihrer Gruppe verschwinden (→ `removedRecipeProductIds`) */
  ingredientIds: string[];
  /** Ursprüngliche Positionen gelöschter Gruppen, absteigend (→ `removedGroupPositions`) */
  groupPositions: number[];
  /** Zutaten, die aus einer gelöschten Gruppe verschoben wurden – der Server löscht sie mit der Gruppe, also neu anlegen */
  recreateIngredientIds: Set<string>;
}

/**
 * Ermittelt, was vor dem Speichern auf dem Server gelöscht werden muss, durch Vergleich mit dem geladenen Stand.
 * Gruppen werden über ihre ursprüngliche Position erkannt, Zutaten und Schritte über ihre ID.
 * Was `pruneDraft` entfernt (geleerte Zutaten, Schritte, Gruppen ohne Titel), zählt als gelöscht,
 * weil `draftToDto` es nicht mitschickt.
 *
 * @param original - Entwurf direkt nach dem Laden (`recipeToDraft`).
 * @param fullCurrent - Aktueller Entwurf.
 * @returns Zu löschende Einträge; Gruppen absteigend, damit sich Positionen beim Löschen nicht verschieben.
 */
export function getDraftDeletions(original: RecipeDraft, fullCurrent: RecipeDraft): DraftDeletions {
  const current = pruneDraft(fullCurrent);
  const keptPositions = new Set(current.groups.map((g) => g.originalPosition).filter((p): p is number => p !== undefined));
  const deletedGroups = original.groups.filter((g) => g.originalPosition !== undefined && !keptPositions.has(g.originalPosition));
  const idsInDeletedGroups = new Set(deletedGroups.flatMap((g) => g.ingredients.map((i) => i.id)).filter((id): id is string => !!id));

  const currentIngredientIds = new Set(current.groups.flatMap((g) => g.ingredients.map((i) => i.id)).filter((id): id is string => !!id));
  const currentStepIds = new Set(current.steps.map((s) => s.id).filter((id): id is string => !!id));

  const originalIngredientIds = original.groups.flatMap((g) => g.ingredients.map((i) => i.id)).filter((id): id is string => !!id);

  return {
    stepIds: original.steps.map((s) => s.id).filter((id): id is string => !!id && !currentStepIds.has(id)),
    ingredientIds: originalIngredientIds.filter((id) => !currentIngredientIds.has(id) && !idsInDeletedGroups.has(id)),
    groupPositions: deletedGroups.map((g) => g.originalPosition as number).sort((a, b) => b - a),
    recreateIngredientIds: new Set([...idsInDeletedGroups].filter((id) => currentIngredientIds.has(id))),
  };
}

/**
 * Verschiebt ein Element innerhalb einer Liste.
 *
 * @param list - Ausgangsliste (bleibt unverändert).
 * @param from - Aktueller Index.
 * @param to - Ziel-Index.
 * @returns Neue Liste; bei ungültigen Indizes eine unveränderte Kopie.
 */
export function moveItem<T>(list: readonly T[], from: number, to: number): T[] {
  const copy = [...list];
  if (from === to || from < 0 || to < 0 || from >= copy.length || to >= copy.length) {
    return copy;
  }
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

/**
 * Wählt die Standard-Einheit eines Produkts: die als Standard markierte, sonst die erste.
 *
 * @param units - Einheiten-Varianten des Produkts.
 * @returns ID der Einheit oder `""`, wenn das Produkt keine hat.
 */
export function getDefaultUnitId(units: ReadonlyArray<{ id: string; isDefault?: boolean | null }> | null | undefined): string {
  if (!units?.length) {
    return "";
  }
  return (units.find((unit) => unit.isDefault) ?? units[0]).id;
}

const optionalMinutes = z.number().int("Ganze Minuten").min(0, "Nicht negativ").max(10000, "Zu groß").nullable();

const draftSchema = z.object({
  name: z.string().trim().min(1, "Gib dem Rezept einen Namen").max(255, "Höchstens 255 Zeichen"),
  portions: z.number("Gib die Portionen an").int("Ganze Portionen").min(1, "Mindestens 1").max(255, "Höchstens 255"),
  recipeCategoryId: z.string().nullable(),
  preparationTimeMin: optionalMinutes,
  totalTimeMin: optionalMinutes,
  groups: z.array(
    z.object({
      title: z.string().max(255, "Höchstens 255 Zeichen"),
      ingredients: z.array(
        z.object({
          productId: z.string().min(1, "Wähle ein Produkt"),
          amount: z.number("Menge fehlt").gt(0, "Menge fehlt"),
          activeUnitId: z.string().min(1, "Einheit fehlt"),
          description: z.string().max(255, "Höchstens 255 Zeichen"),
        }),
      ),
    }),
  ),
  steps: z.array(z.object({ header: z.string().max(255, "Höchstens 255 Zeichen"), text: z.string() })),
});

/**
 * Prüft den Entwurf. Die Schlüssel der Fehler sind Pfade mit den `key`s der Einträge,
 * z. B. `"name"`, `"ingredient.<key>.amount"` oder `"step.<key>.header"`, damit die Meldung beim
 * richtigen Feld bleibt, auch wenn umsortiert wird. Leere Zeilen (siehe `pruneDraft`) werden nicht geprüft.
 *
 * @param fullDraft - Aktueller Entwurf.
 * @returns Fehlermeldung je Feld; leeres Objekt = gültig.
 */
export function validateDraft(fullDraft: RecipeDraft): Record<string, string> {
  const draft = pruneDraft(fullDraft);
  const result = draftSchema.safeParse(draft);
  if (result.success) {
    return {};
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issuePathToKey(draft, issue.path);
    errors[key] ??= issue.message;
  }
  return errors;
}

const issuePathToKey = (draft: RecipeDraft, path: PropertyKey[]): string => {
  const [root, groupIndex, child, ingredientIndex, field] = path;
  if (root === "groups" && child === "ingredients" && typeof groupIndex === "number" && typeof ingredientIndex === "number") {
    return `ingredient.${draft.groups[groupIndex].ingredients[ingredientIndex].key}.${String(field)}`;
  }
  if (root === "groups" && typeof groupIndex === "number") {
    return `group.${draft.groups[groupIndex].key}.${String(child)}`;
  }
  if (root === "steps" && typeof groupIndex === "number") {
    return `step.${draft.steps[groupIndex].key}.${String(child)}`;
  }
  return String(root);
};

/**
 * Tiefe Kopie eines Entwurfs, auch aus einem reaktiven Proxy heraus.
 *
 * @param draft - Entwurf.
 * @returns Unabhängige Kopie.
 */
export function cloneDraft(draft: RecipeDraft): RecipeDraft {
  return JSON.parse(JSON.stringify(draft)) as RecipeDraft;
}

/**
 * Prüft, ob sich zwei Entwürfe unterscheiden (z. B. für „ungespeicherte Änderungen“).
 *
 * @param a - Erster Entwurf.
 * @param b - Zweiter Entwurf.
 * @returns `true` bei gleichem Inhalt.
 */
export function isSameDraft(a: RecipeDraft, b: RecipeDraft): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Zählt die Zutaten eines Entwurfs (ohne leere Zeilen).
 *
 * @param draft - Entwurf.
 * @returns Anzahl über alle Gruppen.
 */
export function countIngredients(draft: Pick<RecipeDraft, "groups">): number {
  return draft.groups.reduce((sum, group) => sum + group.ingredients.filter((ingredient) => !isEmptyIngredient(ingredient)).length, 0);
}
