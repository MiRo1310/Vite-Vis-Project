<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import PageSection from "@/components/shared/page-section/PageSection.vue";
import { onMounted, ref } from "vue";
import DialogAddProduct from "@/components/section/products/DialogAddProduct.vue";
import ProductRemove from "@/components/section/products/action/ProductRemove.vue";
import Header from "@/components/section/header/Header.vue";
import Button from "@/components/shared/button/Button.vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { GetProductsQuery } from "@/api/gql/graphql.ts";
import { useProductCategories } from "@/composables/querys/productCategories.ts";
import TableCellNavigation from "@/components/shared/table-cell/TableCellNavigation.vue";

const { refetch } = useProductCategories();

onMounted(() => {
  refetch();
});

const { result } = useQuery(
  graphql(`
    query GetProducts {
      products {
        id
        carbs
        category
        fat
        kcal
        name
        protein
        salt
        sugar
        unit
        amount
        productCategory {
          name
        }
      }
    }
  `),
  {},
  { fetchPolicy: "network-only" },
);

const columns: DatatableColumns<GetProductsQuery["products"][number]>[] = [
  { source: "name", labelKey: "Name", type: "component", component: TableCellNavigation, customValue: "id" },
  { source: "productCategory.name", labelKey: "Kategorie" },
  { source: "kcal", labelKey: "Kalorien", type: "number", unit: "kcal" },
  { source: "amount", labelKey: "Menge" },
  { source: "unit", labelKey: "Einheit" },
  { source: "carbs", labelKey: "Kohlenhydrate", type: "number", unit: "g" },
  { source: "fat", labelKey: "Fett", type: "number", unit: "g" },
  { source: "protein", labelKey: "Protein", type: "number", unit: "g" },
  { source: "salt", labelKey: "Salz", type: "number", unit: "g" },
  { source: "sugar", labelKey: "Zucker", type: "number", unit: "g" },
];

const dialogOpen = ref(false);
</script>

<template>
  <div class="products">
    <Header title="Produkte">
      <Button variant="outline" icon="add" size="icon" @click="dialogOpen = !dialogOpen" />
    </Header>
    <PageSection class="flex flex-col rounded-lg p-2 max-h-[calc(100vh-9.5rem)] overflow-auto">
      <TableBasic :data="result?.products || []" :columns="getColumns(columns)" />
      <DialogAddProduct v-model:dialog-open="dialogOpen" />
    </PageSection>
  </div>
</template>
