<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import PageSection from "@/components/shared/page-section/PageSection.vue";
import { onMounted, ref } from "vue";
import Header from "@/components/section/header/Header.vue";
import Button from "@/components/shared/button/Button.vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { GetProductsQuery } from "@/api/gql/graphql.ts";
import { useProductCategories } from "@/composables/querys/productCategories.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import ProductUpdate from "@/components/section/products/ProductUpdate.vue";
import { useRouteQuery } from "@vueuse/router";
import { Input } from "@/components/shared/input";

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
} = useQuery(
  graphql(`
    query GetProducts($where: KeyValuePairOfStringAndListOfProductFilterInput) {
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
  { source: "name", labelKey: "Name", type: "component", component: ProductUpdate },
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
</script>

<template>
  <div class="products">
    <Header title="Produkte">
      <Button variant="outline" icon="add" size="icon" @click="dialogOpen = !dialogOpen" />
    </Header>

    <div class="flex flex-wrap gap-2">
      <!--    TODO Input mit Verzögerung  und X Button-->
      <!--    TODO input emitted nicht wenn der Wert leer ist-->
      <Input class="w-48" placeholder="Nach Produkten Filtern" @update:modelValue="refetchHandler(String($event))" />
      <Button
        v-for="(button, i) in result?.productsGrouped"
        :variant="selectedFilterHasKey(button.key) ? 'outline' : 'secondary'"
        @click="toggleFilter(button.key)"
        :key="i"
        >{{ button.key }}</Button
      >
    </div>

    <PageSection class="grid lg:grid-cols-2 grid-cols-1 gap-4 rounded-lg max-h-[calc(100vh-8.25rem)] overflow-auto">
      <template v-for="product in result?.productsGrouped" :key="product.key">
        <div v-if="selectedFilterHasKey(product.key) || selectedFilter.length === 0" class="rounded-md">
          {{ product.key }}
          <div class="bg-accent rounded-md px-2 pb-2 mt-1">
            <TableBasic :data="product.value || []" :columns="getColumns(columns)" />
          </div>
        </div>
      </template>
      <ProductUpdate v-if="dialogOpen" v-model:dialog-open="dialogOpen" :row="{} as any" source="''" :custom-value="productId" value="" />
    </PageSection>
  </div>
</template>
