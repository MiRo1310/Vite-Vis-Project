import { useLazyQuery } from "@vue/apollo-composable";
import { computed, onMounted } from "vue";
import { getSelectableOptions } from "@/composables/querys/options";
import { getIdByName, getNameById } from "@/components/section/recipe-form/utils";
import { SelectOption } from "@/types/types";
import { graphql } from "@/api/gql";
import { invalidateCache as invalidate } from "@/composables/querys/utils.ts";

let recipeCategoriesFunction: null | ReturnType<typeof recipeCategoriesComposable> = null;

export const useRecipeCategories = () => {
  if (!recipeCategoriesFunction) {
    recipeCategoriesFunction = recipeCategoriesComposable();
  }
  return recipeCategoriesFunction;
};

const recipeCategoriesComposable = () => {
  const { load, result, refetch } = useLazyQuery(
    graphql(`
      query recipeCategories {
        recipeCategories(order: { name: ASC }) {
          id
          name
        }
      }
    `),
  );

  onMounted(async () => {
    await load();
  });

  const selectableOptions = computed((): SelectOption[] => getSelectableOptions(result.value?.recipeCategories));

  const isResult = computed(() => result.value?.recipeCategories?.length && result.value.recipeCategories.length > 0);
  const length = computed(() => result.value?.recipeCategories?.length);

  const getCategoryNameById = (id: string): string => computed(() => getNameById(id, result.value?.recipeCategories)).value;
  const getCategoryIdByName = (name: string): string => computed(() => getIdByName(name, result.value?.recipeCategories)).value;

  const reload = async () => {
    await invalidateCache();
    await load(null, null, { fetchPolicy: "network-only" });

    await refetch();
  };

  const invalidateCache = async () => {
    await invalidate("recipeCategories");
  };

  return { selectableOptions, getCategoryNameById, getCategoryIdByName, isResult, length, refetch, reload, invalidateCache, result };
};
