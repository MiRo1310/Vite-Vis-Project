import { useLazyQuery, useApolloClient } from "@vue/apollo-composable";
import { computed, onMounted } from "vue";
import { getSelectableOptions } from "@/composables/querys/options";
import { getIdByName, getNameById } from "@/components/section/new-recipe/utils";
import { SelectOption } from "@/types/types";
import { graphql } from "@/api/gql";
import { invalidateCache as invalidate } from "@/composables/querys/utils.ts";

let productCategoriesFunction: null | ReturnType<typeof productCategoriesComposable> = null;

export const useRecipeCategories = () => {
  if (!productCategoriesFunction) {
    productCategoriesFunction = productCategoriesComposable();
  }
  return productCategoriesFunction;
};

const productCategoriesComposable = () => {
  const { load, result, refetch } = useLazyQuery(
    graphql(`
      query recipeCategories {
        recipeCategories {
          id
          name
        }
      }
    `),
  );

  // Apollo Client für Cache-Operationen
  const { client } = useApolloClient();

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
    await invalidate(client, "recipeCategories");
  };

  return { selectableOptions, getCategoryNameById, getCategoryIdByName, isResult, length, refetch, reload, invalidateCache, result };
};
