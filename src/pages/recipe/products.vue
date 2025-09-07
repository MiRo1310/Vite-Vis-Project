<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import PageSection from "@/components/shared/page-section/PageSection.vue";
import { ref } from "vue";
import DialogAddProduct from "@/components/section/products/DialogAddProduct.vue";
import ProductTableCellCategoryName from "@/components/section/products/ProductTableCellCategoryName.vue";
import ProductRemoveRow from "@/components/section/products/ProductRemoveRow.vue";
import ProductEditRow from "@/components/section/products/ProductEditRow.vue";
import Header from "@/components/section/header/Header.vue";
import Button from "@/components/shared/button/Button.vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { GetProductsQuery } from "@/api/gql/graphql.ts";

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
        productUnits {
          id
          amount
          unit
          isDefault
          faktor
        }
      }
    }
  `),
);

const columns: DatatableColumns<GetProductsQuery["products"][number]>[] = [
  { source: "name", labelKey: "Name" },
  { source: "category", labelKey: "Kategorie", type: "component", component: ProductTableCellCategoryName },
  { source: "kcal", labelKey: "Kalorien", type: "number", unit: "kcal" },
  { source: "amount", labelKey: "Menge" },
  { source: "unit", labelKey: "Einheit" },
  { source: "carbs", labelKey: "Kohlenhydrate", type: "number", unit: "g" },
  { source: "fat", labelKey: "Fett", type: "number", unit: "g" },
  { source: "protein", labelKey: "Protein", type: "number", unit: "g" },
  { source: "salt", labelKey: "Salz", type: "number", unit: "g" },
  { source: "sugar", labelKey: "Zucker", type: "number", unit: "g" },
  {
    source: "id",
    labelKey: "",
    accessorKey: "remove",
    type: "component",
    component: ProductEditRow,
    headerClass: "w-6",
  },
  { source: "id", labelKey: "", accessorKey: "remove", type: "component", component: ProductRemoveRow, headerClass: "w-6" },
];

const dialogOpen = ref(false);
</script>

<template>
  <div class="products">
    <Header title="Produkte">
      <Button variant="outline" icon="add" size="icon" @click="dialogOpen = !dialogOpen" />
    </Header>
    <PageSection class="products__page-section">
      <TableBasic :data="result?.products || []" :columns="getColumns(columns)" />
    </PageSection>
    <DialogAddProduct v-model:dialog-open="dialogOpen" />
  </div>
</template>

<style scoped lang="scss">
.products {
  &__header-label {
    @apply font-bold text-xl text-muted-foreground;
  }

  &__page-section {
    @apply flex flex-col rounded-lg p-2 max-h-[calc(100vh-9.5rem)] overflow-auto;
  }
}
</style>
