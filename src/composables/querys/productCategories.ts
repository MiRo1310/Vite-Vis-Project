import { useLazyQuery, useApolloClient } from "@vue/apollo-composable";

import { computed, onMounted } from "vue";
import { getSelectableOptions } from "@/composables/querys/options";
import { getIdByName, getNameById } from "@/components/section/new-recipe/utils";
import { SelectOption } from "@/types/types";
import { graphql } from "@/api/gql";
import { Logger, args } from "@/lib/logger.ts";

let productCategoriesFunction: null | ReturnType<typeof productCategoriesComposable> = null;

export const useProductCategories = () => {
  if (!productCategoriesFunction) {
    productCategoriesFunction = productCategoriesComposable();
  }
  return productCategoriesFunction;
};

const productCategoriesComposable = () => {
  const { load, result, refetch } = useLazyQuery(
    graphql(`
      query productCategories {
        productCategories {
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

  const selectableOptions = computed((): SelectOption[] => getSelectableOptions(result.value?.productCategories));

  const isResult = computed(() => result.value?.productCategories?.length && result.value.productCategories.length > 0);
  const length = computed(() => result.value?.productCategories?.length);

  const getCategoryNameById = (id: string): string => computed(() => getNameById(id, result.value?.productCategories)).value;
  const getCategoryIdByName = (name: string): string => computed(() => getIdByName(name, result.value?.productCategories)).value;

  const reload = async () => {
    await invalidateCache();
    await load(null, null, { fetchPolicy: "network-only" });

    await refetch();
  };

  // Public: Cache invalidieren (evict + garbage collect + evtl. refetch aktiver Queries)
  const invalidateCache = async () => {
    try {
      if (!client) {
        return;
      }
      // Evict das Root-Feld productCategories
      client.cache.evict({ id: "ROOT_QUERY", fieldName: "productCategories" });
      // Entferne dereferenzierte Einträge
      client.cache.gc();
      // Optional: refetch alle aktiven observable queries
      if (client.reFetchObservableQueries) {
        await client.reFetchObservableQueries();
      }
    } catch (e) {
      Logger(args("Failed to invalidate productCategories cache"), { e, type: "error" });
    }
  };

  return { selectableOptions, getCategoryNameById, getCategoryIdByName, isResult, length, refetch, reload, invalidateCache, result };
};
