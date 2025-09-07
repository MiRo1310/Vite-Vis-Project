import { useLazyQuery } from "@vue/apollo-composable";

import { computed, onMounted } from "vue";
import { getSelectableOptions } from "@/composables/querys/options";
import { getIdByName, getNameById } from "@/components/section/new-recipe/utils";
import { SelectOption } from "@/types/types";
import { graphql } from "@/api/gql";

let productCategoriesFunction: null | ReturnType<typeof productCategoriesComposable> = null;

export const useProductCategories = () => {
  if (!productCategoriesFunction) {
    productCategoriesFunction = productCategoriesComposable();
  }
  return productCategoriesFunction;
};

const productCategoriesComposable = () => {
  const { load, result } = useLazyQuery(
    graphql(`
      query productCategories {
        productCategories {
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

  return { selectableOptions, getCategoryNameById, getCategoryIdByName, isResult, length };
};
