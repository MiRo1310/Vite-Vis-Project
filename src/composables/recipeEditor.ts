import { computed, type InjectionKey, inject, provide, ref, shallowRef } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import apolloClient from "@/apolloClient.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import {
  cloneDraft,
  type DraftGroup,
  type DraftIngredient,
  type DraftStep,
  draftToDto,
  emptyDraft,
  emptyGroup,
  emptyIngredient,
  emptyStep,
  getDefaultUnitId,
  getDraftDeletions,
  isSameDraft,
  moveItem,
  type RecipeDraft,
  recipeToDraft,
  validateDraft,
} from "@/lib/recipe-editor.ts";
import { Logger } from "@/lib/logger.ts";

const getRecipeByIdQuery = graphql(`
  query getRecipeById($id: UUID!) {
    recipe(id: $id) {
      id
      name
      portions
      recipeCategoryId
      preparationTimeMin
      totalTimeMin
      recipeProducts {
        id
        productId
        amount
        activeUnitId
        description
        groupPosition
        sortOrder
      }
      recipeDescriptions {
        id
        position
        header
        text
      }
      recipeHeaderProducts {
        id
        position
        text
      }
    }
  }
`);

const addRecipeMutation = graphql(`
  mutation addRecipe($dto: RecipeCreateDtoInput!) {
    createRecipe(dto: $dto) {
      id
    }
  }
`);

const updateRecipeMutation = graphql(`
  mutation updateRecipe($dto: RecipeUpdateDtoInput!) {
    updateRecipe(dto: $dto) {
      id
    }
  }
`);

const removeStepMutation = graphql(`
  mutation RemoveTextArea($id: UUID!) {
    removeTextArea(id: $id)
  }
`);

const removeIngredientMutation = graphql(`
  mutation removeRecipeProduct($id: UUID!) {
    removeRecipeProduct(id: $id)
  }
`);

const removeGroupMutation = graphql(`
  mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {
    removeProductGroup(dto: $dto)
  }
`);

const editorProductsQuery = graphql(`
  query recipeEditorProducts {
    products {
      id
      name
      productCategory {
        name
      }
      productUnits {
        id
        unit
        isDefault
      }
    }
  }
`);

/** Nach dem Speichern veraltete Abfragen: Liste und Detail sollen den neuen Stand zeigen. */
const REFETCH_AFTER_SAVE = ["recipes", "getRecipeDetails"];

/** Produkte für die Zutaten-Auswahl (inkl. Einheiten-Varianten). */
export const useEditorProducts = () => {
  const { result, refetch, loading } = useQuery(editorProductsQuery, {}, { fetchPolicy: "cache-and-network" });
  const products = computed(() => result.value?.products ?? []);
  return { products, refetch, loading };
};

export type EditorProduct = ReturnType<typeof useEditorProducts>["products"]["value"][number];

/**
 * Zustand und Aktionen des Rezept-Editors. Wird in `RecipeEditor.vue` erzeugt und per provide/inject
 * an Gruppen, Zutaten und Schritte weitergegeben.
 *
 * @param recipeId - ID beim Bearbeiten, `undefined` bei einem neuen Rezept.
 */
export const createRecipeEditor = (recipeId: string | undefined) => {
  const recipeStore = useRecipeStore();

  /** Stand vom Server (bzw. leeres Rezept) – Vergleichsbasis für „ungespeichert“ und Löschungen */
  const original = shallowRef<RecipeDraft>(emptyDraft());
  const draft = ref<RecipeDraft>(cloneDraft(original.value));
  const loading = ref(!!recipeId);
  const notFound = ref(false);
  const saving = ref(false);
  const restoredDraft = ref(false);
  const showErrors = ref(false);

  const isDirty = computed(() => !isSameDraft(draft.value, original.value));
  const errors = computed(() => validateDraft(draft.value));
  const visibleErrors = computed((): Record<string, string> => (showErrors.value ? errors.value : {}));

  const load = async () => {
    const stored = recipeStore.getRecipeInProgress;

    if (recipeId) {
      loading.value = true;
      try {
        const { data } = await apolloClient.query({ query: getRecipeByIdQuery, variables: { id: recipeId }, fetchPolicy: "network-only" });
        if (!data.recipe) {
          notFound.value = true;
          return;
        }
        original.value = recipeToDraft(data.recipe);
      } finally {
        loading.value = false;
      }
    }

    if (stored && stored.recipeId === recipeId && !isSameDraft(stored.draft, original.value)) {
      draft.value = cloneDraft(stored.draft);
      restoredDraft.value = true;
      return;
    }
    draft.value = cloneDraft(original.value);
  };

  /** Ungespeicherte Änderungen beim Verlassen merken, sonst einen alten Entwurf verwerfen */
  const keepDraftOnLeave = () => {
    if (notFound.value || loading.value) {
      return;
    }
    if (isDirty.value) {
      recipeStore.saveRecipeInProgress(draft.value, recipeId);
      return;
    }
    recipeStore.resetRecipeInProgress();
  };

  const discardChanges = () => {
    draft.value = cloneDraft(original.value);
    restoredDraft.value = false;
    showErrors.value = false;
    recipeStore.resetRecipeInProgress();
  };

  /**
   * Prüft und speichert. Beim Bearbeiten werden vorher entfernte Schritte, Zutaten und Gruppen gelöscht
   * (das Backend kennt noch kein atomares Update, siehe #423).
   *
   * @returns ID des gespeicherten Rezepts, `null` bei Fehlern.
   */
  const save = async (): Promise<string | null> => {
    showErrors.value = true;
    if (Object.keys(errors.value).length) {
      return null;
    }

    saving.value = true;
    try {
      const id = recipeId ? await updateExisting(recipeId) : await createNew();
      if (id) {
        restoredDraft.value = false;
        showErrors.value = false;
        recipeStore.resetRecipeInProgress();
      }
      return id;
    } catch (e) {
      Logger.error("Rezept speichern fehlgeschlagen", e);
      return null;
    } finally {
      saving.value = false;
    }
  };

  const createNew = async (): Promise<string | null> => {
    const { data } = await apolloClient.mutate({
      mutation: addRecipeMutation,
      variables: { dto: draftToDto(draft.value) },
      refetchQueries: REFETCH_AFTER_SAVE,
    });
    const id = data?.createRecipe.id ?? null;
    if (id) {
      // Ab jetzt gilt der gespeicherte Stand als Basis (die Seite wechselt gleich auf „Bearbeiten“ bzw. Details)
      original.value = cloneDraft(draft.value);
    }
    return id;
  };

  const updateExisting = async (id: string): Promise<string | null> => {
    const deletions = getDraftDeletions(original.value, draft.value);
    Logger.log("Rezept speichern, Löschungen:", null, { value: deletions });

    for (const stepId of deletions.stepIds) {
      await apolloClient.mutate({ mutation: removeStepMutation, variables: { id: stepId } });
    }
    for (const ingredientId of deletions.ingredientIds) {
      await apolloClient.mutate({ mutation: removeIngredientMutation, variables: { id: ingredientId } });
    }
    for (const position of deletions.groupPositions) {
      await apolloClient.mutate({ mutation: removeGroupMutation, variables: { dto: { position, recipeId: id } } });
    }

    await apolloClient.mutate({
      mutation: updateRecipeMutation,
      variables: { dto: { id, ...draftToDto(draft.value, deletions.recreateIngredientIds) } },
      refetchQueries: REFETCH_AFTER_SAVE,
    });

    // Neu angelegte Einträge haben jetzt IDs – frisch laden, damit spätere Löschungen sie kennen
    const { data } = await apolloClient.query({ query: getRecipeByIdQuery, variables: { id }, fetchPolicy: "network-only" });
    if (data.recipe) {
      original.value = recipeToDraft(data.recipe);
      draft.value = cloneDraft(original.value);
    }
    return id;
  };

  // --- Gruppen ---
  const findGroup = (groupKey: string): DraftGroup | undefined => draft.value.groups.find((g) => g.key === groupKey);

  const addGroup = (): DraftGroup => {
    const group = emptyGroup();
    group.ingredients.push(emptyIngredient());
    draft.value.groups.push(group);
    return group;
  };

  const removeGroup = (groupKey: string) => {
    draft.value.groups = draft.value.groups.filter((g) => g.key !== groupKey);
    if (!draft.value.groups.length) {
      addGroup();
    }
  };

  const moveGroup = (from: number, to: number) => {
    draft.value.groups = moveItem(draft.value.groups, from, to);
  };

  // --- Zutaten ---
  const addIngredient = (groupKey: string): DraftIngredient | undefined => {
    const group = findGroup(groupKey);
    if (!group) {
      return undefined;
    }
    const ingredient = emptyIngredient();
    group.ingredients.push(ingredient);
    return ingredient;
  };

  const updateIngredient = (groupKey: string, ingredientKey: string, patch: Partial<Omit<DraftIngredient, "key" | "id">>) => {
    const ingredient = findGroup(groupKey)?.ingredients.find((i) => i.key === ingredientKey);
    if (ingredient) {
      Object.assign(ingredient, patch);
    }
  };

  /** Produkt wählen: Standard-Einheit vorbelegen, wenn die bisherige Einheit nicht zum Produkt passt */
  const selectProduct = (groupKey: string, ingredientKey: string, product: EditorProduct | undefined) => {
    const ingredient = findGroup(groupKey)?.ingredients.find((i) => i.key === ingredientKey);
    if (!ingredient || !product) {
      return;
    }
    ingredient.productId = product.id;
    if (!product.productUnits.some((unit) => unit.id === ingredient.activeUnitId)) {
      ingredient.activeUnitId = getDefaultUnitId(product.productUnits);
    }
    recipeStore.addRecentProduct(product.id);
  };

  const removeIngredient = (groupKey: string, ingredientKey: string) => {
    const group = findGroup(groupKey);
    if (group) {
      group.ingredients = group.ingredients.filter((i) => i.key !== ingredientKey);
    }
  };

  const moveIngredient = (groupKey: string, from: number, to: number) => {
    const group = findGroup(groupKey);
    if (group) {
      group.ingredients = moveItem(group.ingredients, from, to);
    }
  };

  const moveIngredientToGroup = (fromGroupKey: string, ingredientKey: string, toGroupKey: string) => {
    const from = findGroup(fromGroupKey);
    const to = findGroup(toGroupKey);
    const ingredient = from?.ingredients.find((i) => i.key === ingredientKey);
    if (!from || !to || !ingredient || from === to) {
      return;
    }
    from.ingredients = from.ingredients.filter((i) => i.key !== ingredientKey);
    to.ingredients.push(ingredient);
  };

  // --- Schritte ---
  const addStep = (): DraftStep => {
    const step = emptyStep();
    draft.value.steps.push(step);
    return step;
  };

  const removeStep = (stepKey: string) => {
    draft.value.steps = draft.value.steps.filter((s) => s.key !== stepKey);
  };

  const moveStep = (from: number, to: number) => {
    draft.value.steps = moveItem(draft.value.steps, from, to);
  };

  return {
    draft,
    loading,
    notFound,
    saving,
    restoredDraft,
    isDirty,
    errors,
    visibleErrors,
    load,
    save,
    discardChanges,
    keepDraftOnLeave,
    addGroup,
    removeGroup,
    moveGroup,
    addIngredient,
    updateIngredient,
    selectProduct,
    removeIngredient,
    moveIngredient,
    moveIngredientToGroup,
    addStep,
    removeStep,
    moveStep,
  };
};

export type RecipeEditor = ReturnType<typeof createRecipeEditor>;

const recipeEditorKey: InjectionKey<RecipeEditor> = Symbol("recipeEditor");

export const provideRecipeEditor = (editor: RecipeEditor) => {
  provide(recipeEditorKey, editor);
};

/** Editor-Zustand in Unterkomponenten (Gruppe, Zutat, Schritt). */
export const useRecipeEditor = (): RecipeEditor => {
  const editor = inject(recipeEditorKey);
  if (!editor) {
    throw new Error("useRecipeEditor() braucht provideRecipeEditor() in einer Elternkomponente");
  }
  return editor;
};
