<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import PageSection from "@/components/shared/page-section/PageSection.vue";
import { computed, onMounted, ref } from "vue";
import Header from "@/components/section/header/Header.vue";
import Button from "@/components/shared/button/Button.vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { GetProductsQuery } from "@/api/gql/graphql.ts";
import { useProductCategories } from "@/composables/querys/productCategories.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import ProductAddUpdate from "@/components/section/products/ProductAddUpdate.vue";
import { useRouteQuery } from "@vueuse/router";
import InputSearch from "@/components/shared/input/InputSearch.vue";
import { routes } from "@/router/routes.ts";
import { useUnits } from "@/composables/querys/units.ts";

useUnits();
const productId = useRouteQuery("productId", null);

const { refetch } = useProductCategories();

const recipeStore = useRecipeStore();

const dialogOpen = ref(false);

onMounted(() => {
  refetch();
  if (productId.value) {
    dialogOpen.value = true;
  }
  const directlyOpenNewProductModal = recipeStore.getDirectlyOpenNewProductModal;
  if (directlyOpenNewProductModal) {
    dialogOpen.value = directlyOpenNewProductModal;
    recipeStore.setDirectlyOpenNewProductModal(false);
    return;
  }
});

const {
  onResult,
  result,
  refetch: refetchProductsGrouped,
  loading,
} = useQuery(
  graphql(`
    query GetProducts($where: MySql_KeyValuePairOfStringAndListOfProductFilterInput) {
      productsGrouped(where: $where) {
        key
        value {
          id
          carbs
          fat
          kcal
          name
          protein
          salt
          sugar
          unit
          ean
          amount
          productUnits {
            id
            amount
            unit
          }
        }
      }
    }
  `),
  {},
  { fetchPolicy: "network-only" },
);

const columns: DatatableColumns<GetProductsQuery["productsGrouped"][number]["value"][number]>[] = [
  { source: "name", labelKey: "Name", type: "component", component: ProductAddUpdate },
  { source: "ean", labelKey: "Ean" },
  { source: "kcal", labelKey: "Kalorien", type: "number", unit: "kcal" },
  { source: "amount", labelKey: "Menge" },
  { source: "unit", labelKey: "Einheit" },
  { source: "carbs", labelKey: "Kohlenhydrate", type: "number", unit: "g" },
  { source: "fat", labelKey: "Fett", type: "number", unit: "g" },
  { source: "protein", labelKey: "Protein", type: "number", unit: "g" },
  { source: "salt", labelKey: "Salz", type: "number", unit: "g" },
  { source: "sugar", labelKey: "Zucker", type: "number", unit: "g" },
];

const selectedFilter = ref<string[]>([]);
onResult(() => {
  result.value?.productsGrouped.forEach((group) => {
    if (!selectedFilterHasKey(group.key)) {
      selectedFilter.value.push(group.key);
    }
  });
});

const selectedFilterHasKey = (key: string) => {
  return selectedFilter.value.some((f) => f === key);
};

const toggleFilter = (key: string) => {
  if (!selectedFilterHasKey(key)) {
    selectedFilter.value.push(key);
    return;
  }
  selectedFilter.value = selectedFilter.value.filter((f) => f !== key);
};

const refetchHandler = (search: string) => {
  refetchProductsGrouped({ where: { value: { some: { name: { contains: search } } } } });
};

type TGroupedProducts = GetProductsQuery["productsGrouped"];
interface IProducts {
  group1: TGroupedProducts;
  group2: TGroupedProducts;
}

const groupedProducts = computed((): IProducts => {
  const length = {
    group1: 0,
    group2: 0,
  };
  return (
    result.value?.productsGrouped
      .map((g) => ({ key: g.key, value: [...g.value].sort((a, b) => a.name.localeCompare(b.name)) }))
      .reduce(
        (acc, curr) => {
          if (length.group1 <= length.group2) {
            length.group1 += curr.value?.length ?? 0;
            acc.group1.push(curr);
            return acc;
          }
          length.group2 += curr.value?.length ?? 0;
          acc.group2.push(curr);
          return acc;
        },
        { group1: [] as TGroupedProducts, group2: [] as TGroupedProducts },
      ) ?? { group1: [], group2: [] }
  );
});
</script>

<template>
  <div class="max-h-full flex flex-col">
    <Header title="Produkte">
      <div class="flex gap-2 flex-wrap">
        <RouterLink :to="{ name: routes.productCategories.name }">
          <Button as="div" variant="outline">Zu den Produktkategorien</Button>
        </RouterLink>

        <Button variant="outline" icon="add" size="icon" @click="dialogOpen = !dialogOpen" />
      </div>
    </Header>

    <div class="flex flex-wrap gap-2">
      <InputSearch class="w-48" placeholder="Nach Produkten Filtern" @update:modelValue="refetchHandler(String($event))" />
      <Button
        v-for="(button, i) in result?.productsGrouped"
        :variant="selectedFilterHasKey(button.key) ? 'outline' : 'secondary'"
        @click="toggleFilter(button.key)"
        :key="i"
        >{{ button.key }}</Button
      >
    </div>
    <PageSection class="grid lg:grid-cols-2 grid-cols-1 gap-4 rounded-lg flex-1 overflow-auto">
      <div>
        <template v-for="product in groupedProducts.group1" :key="product.key">
          <div v-if="selectedFilterHasKey(product.key) || selectedFilter.length === 0" class="rounded-md">
            {{ product.key }}
            <div class="bg-accent rounded-md px-2 pb-2 mt-1">
              <TableBasic :data="product.value || []" :columns="getColumns(columns)" :loading />
            </div>
          </div>
        </template>
      </div>
      <div>
        <template v-for="product in groupedProducts.group2" :key="product.key">
          <div v-if="selectedFilterHasKey(product.key) || selectedFilter.length === 0" class="rounded-md">
            {{ product.key }}
            <div class="bg-accent rounded-md px-2 pb-2 mt-1">
              <TableBasic :data="product.value || []" :columns="getColumns(columns)" :loading />
            </div>
          </div>
        </template>
      </div>
      <p v-if="!result?.productsGrouped || !result.productsGrouped.length" class="mt-10 text-center text-xl">Es wurden keine Daten gefunden</p>
      <ProductAddUpdate v-if="dialogOpen" v-model:dialog-open="dialogOpen" :row="{} as any" source="''" :custom-value="productId" value="" />
    </PageSection>
  </div>
</template>
