import { computed, type ComputedRef, type Ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { refetchQueryUnits, useUnits } from "@/composables/querys/units.ts";
import { refetchQueryProductCategories, useProductCategories } from "@/composables/querys/productCategories.ts";
import { useRecipeCategories } from "@/composables/querys/recipeCategories.ts";
import { filterNewNames } from "@/lib/recipe.ts";

export interface MasterDataItem {
  id: string;
  name: string;
}

/** Einheitliche Schnittstelle für einfache Stammdaten (nur Name): Einheiten, Produkt- und Rezept-Kategorien. */
export interface MasterDataCrud {
  items: ComputedRef<MasterDataItem[]>;
  loading: Ref<boolean>;
  /** Legt alle Namen an, die es noch nicht gibt (Groß-/Kleinschreibung egal). */
  add: (names: string[]) => Promise<void>;
  rename: (id: string, name: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

interface CrudOperations {
  create: (name: string) => Promise<unknown>;
  update: (id: string, name: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
}

const toCrud = (items: ComputedRef<MasterDataItem[]>, loading: Ref<boolean>, operations: CrudOperations): MasterDataCrud => ({
  items,
  loading,
  add: async (names) => {
    const existing = items.value.map((item) => item.name);
    for (const name of filterNewNames(names, existing)) {
      await operations.create(name);
    }
  },
  rename: async (id, name) => {
    await operations.update(id, name);
  },
  remove: async (id) => {
    await operations.remove(id);
  },
});

// Dokumente zeichengenau wie bisher, damit die generierten Typen aus src/api/gql weiter passen
const createUnitMutation = graphql(`
    mutation CreateUnit($name: String!) {
      createUnit(dto: { name: $name }) {
        name
      }
    }
  `);

const updateUnitMutation = graphql(`
    mutation UpdateUnit($id: UUID!, $name: String!) {
      updateUnit(dto: { name: $name, id: $id }) {
        id
      }
    }
  `);

const deleteUnitMutation = graphql(`
    mutation DeleteUnit($id: UUID!) {
      deleteUnit(id: $id)
    }
  `);

const createRecipeCategoryMutation = graphql(`
    mutation addRecipeCategory($name: String!) {
      createRecipeCategory(dto: { name: $name }) {
        id
        name
      }
    }
  `);

const updateRecipeCategoryMutation = graphql(`
    mutation UpdateRecipeCategory($id: UUID!, $name: String!) {
      updateRecipeCategory(dto: { name: $name, id: $id }) {
        id
      }
    }
  `);

const removeRecipeCategoryMutation = graphql(`
    mutation RemoveRecipeCategory($id: UUID!) {
      removeRecipeCategory(id: $id)
    }
  `);

const createProductCategoryMutation = graphql(`
    mutation addCategory($name: String!) {
      createProductCategory(dto: { name: $name }) {
        id
        name
      }
    }
  `);

const updateProductCategoryMutation = graphql(`
    mutation UpdateProductCategory($id: UUID!, $name: String!) {
      updateProductCategory(dto: { name: $name, id: $id }) {
        id
      }
    }
  `);

const removeProductCategoryMutation = graphql(`
    mutation DeleteCategory($id: UUID!) {
      removeProductCategory(id: $id)
    }
  `);

export const useUnitsCrud = (): MasterDataCrud => {
  const { result, loading } = useUnits();
  const options = { refetchQueries: [refetchQueryUnits], awaitRefetchQueries: true };
  const { mutate: create } = useMutation(createUnitMutation, options);
  const { mutate: update } = useMutation(updateUnitMutation, options);
  const { mutate: remove } = useMutation(deleteUnitMutation, options);

  return toCrud(
    computed(() => result.value?.units ?? []),
    loading,
    {
      create: (name) => create({ name }),
      update: (id, name) => update({ id, name }),
      remove: (id) => remove({ id }),
    },
  );
};

export const useRecipeCategoriesCrud = (): MasterDataCrud => {
  const { result, loading } = useRecipeCategories();
  const options = { refetchQueries: ["recipeCategories"], awaitRefetchQueries: true };
  const { mutate: create } = useMutation(createRecipeCategoryMutation, options);
  const { mutate: update } = useMutation(updateRecipeCategoryMutation, options);
  const { mutate: remove } = useMutation(removeRecipeCategoryMutation, options);

  return toCrud(
    computed(() => result.value?.recipeCategories ?? []),
    loading,
    {
      create: (name) => create({ name }),
      update: (id, name) => update({ id, name }),
      remove: (id) => remove({ id }),
    },
  );
};

export const useProductCategoriesCrud = (): MasterDataCrud => {
  const { result, loading } = useProductCategories();
  const options = { refetchQueries: [refetchQueryProductCategories], awaitRefetchQueries: true };
  const { mutate: create } = useMutation(createProductCategoryMutation, options);
  const { mutate: update } = useMutation(updateProductCategoryMutation, options);
  const { mutate: remove } = useMutation(removeProductCategoryMutation, options);

  return toCrud(
    computed(() => result.value?.productCategories ?? []),
    loading,
    {
      create: (name) => create({ name }),
      update: (id, name) => update({ id, name }),
      remove: (id) => remove({ id }),
    },
  );
};
