import { useLazyQuery } from "@vue/apollo-composable";

import { computed, onMounted } from "vue";
import { getSelectableOptions } from "@/composables/querys/options";
import { getIdByName, getNameById } from "@/components/section/recipe-form/utils";
import { SelectOption } from "@/types/types";
import { graphql } from "@/api/gql";
import { invalidateCache as invalidateCacheFn } from "@/composables/querys/utils.ts";

let productCategoriesFunction: null | ReturnType<typeof productCategoriesComposable> = null;

export const useProductCategories = () => {
  if (!productCategoriesFunction) {
    productCategoriesFunction = productCategoriesComposable();
  }
  return productCategoriesFunction;
};

export const refetchQueryProductCategories = "ProductCategories";
export const fieldNameProductCategories = "productCategories";

const productCategoriesComposable = () => {
  const { load, result, refetch, loading } = useLazyQuery(
    graphql(`
      query ProductCategories {
        productCategories(order: { name: ASC }) {
          id
          name
        }
      }
    `),
  );

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
  const invalidateCache = async () => {
    await invalidateCacheFn(fieldNameProductCategories);
  };

  return { selectableOptions, getCategoryNameById, getCategoryIdByName, isResult, length, refetch, reload, invalidateCache, result, loading };
};
