import { useQuery } from "@vue/apollo-composable";
import { products } from "@/api/query/products";
import { computed } from "vue";
import { getSelectableOptions } from "@/composables/querys/options";
import { getIdByName, getNameById, getResultById } from "@/components/section/new-recipe/utils";
import { SelectOption } from "@/types/types";
import { ProductsQuery } from "@/api/gql/graphql";

let productsFunction: null | ReturnType<typeof productsComposable> = null;

export const useProducts = () => {
  if (!productsFunction) {
    productsFunction = productsComposable();
  }
  return productsFunction;
};

const productsComposable = () => {
  const { result } = useQuery(products);
  const graphQlResult = computed(() => result.value?.products);

  const isResult = computed(() => result.value?.products.length);
  const length = computed(() => result.value?.products.length);

  const selectableOptions = computed((): SelectOption[] => getSelectableOptions(result.value?.products));
  const getProductNameById = (id: string): string => computed(() => getNameById(id, result.value?.products)).value;
  const getProductResultById = (id: string): ProductsQuery["products"][number] | undefined | null =>
    computed(() => getResultById(id, result.value?.products)).value;
  const getProductIdByName = (name: string): string => computed(() => getIdByName(name, result.value?.products)).value;

  return { isResult, length, result: graphQlResult, selectableOptions, getProductIdByName, getProductNameById, getProductResultById };
};
