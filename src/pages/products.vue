<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table";
import PageSection from "@/components/shared/page-section/PageSection.vue";
import { ref } from "vue";
import DialogAddProduct from "@/components/section/products/DialogAddProduct.vue";
import ProductTableCellCategoryName from "@/components/section/products/ProductTableCellCategoryName.vue";
import ProductRemoveRow from "@/components/section/products/ProductRemoveRow.vue";
import ProductEditRow from "@/components/section/products/ProductEditRow.vue";
import Header from "@/components/section/header/Header.vue";
import { useProducts } from "@/composables/querys/products";
import Button from "@/components/shared/button/Button.vue";
import { translation } from "@/lib/translation";

const { result, length } = useProducts();

const columns: DatatableColumns[] = [
  { source: "name", labelKey: "Name" },
  { source: "category", labelKey: "Kategorie", type: "component", component: ProductTableCellCategoryName },
  { source: "kcal", labelKey: "Kalorien", type: "number", unit: "kcal" },
  { source: "carbs", labelKey: "Kohlenhydrate", type: "number" },
  { source: "fat", labelKey: "Fett", type: "number" },
  { source: "protein", labelKey: "Protein", type: "number" },
  { source: "salt", labelKey: "Salz", type: "number" },
  { source: "sugar", labelKey: "Zucker", type: "number", unit: "g" },
  { source: "amount", labelKey: "Menge", type: "number" },
  { source: "unit", labelKey: "Einheit", type: "number" },
  { source: "id", labelKey: "", accessorKey: "remove", type: "component", component: ProductEditRow, headerClass: "w-10" },
  { source: "id", labelKey: "", accessorKey: "remove", type: "component", component: ProductRemoveRow, headerClass: "w-10" },
];

const dialogOpen = ref(false);
</script>

<template>
  <div class="products">
    <Header :title="translation('products.title')">
      <template #description>
        <p class="products__header-label">{{ translation("products.description", { length }) }}</p>
      </template>
      <Button variant="outline" icon="add" size="icon" @click="dialogOpen = !dialogOpen" />
    </Header>
    <PageSection class="products__page-section">
      <TableBasic :data="result || []" :columns="getColumns(columns)" />
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
    @apply flex flex-col bg-white/80 rounded-lg p-2 max-h-[calc(100vh-9.5rem)] overflow-auto;
  }
}
</style>
