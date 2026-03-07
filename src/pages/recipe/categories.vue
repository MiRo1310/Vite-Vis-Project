<script setup lang="ts">
import Header from "@/components/section/header/Header.vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import AddCategory from "@/components/section/products/AddCategory.vue";
import { ref } from "vue";
import CategoryUpdate from "@/components/section/categories/CategoryUpdate.vue";
import { ProductCategoriesQuery } from "@/api/gql/graphql.ts";
import CategoryRemove from "@/components/section/categories/CategoryRemove.vue";
import { useProductCategories } from "@/composables/querys/productCategories.ts";

const { result } = useProductCategories();

const columns: DatatableColumns<ProductCategoriesQuery["productCategories"][number]>[] = [
  { source: "name", labelKey: "Name" },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryUpdate },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryRemove },
];

const updateByPressEnter = ref(false);
</script>

<template>
  <Header title="Kategorien" />
  <div class="flex items-center gap-2">
    <AddCategory :update="updateByPressEnter" :result="result?.productCategories ?? []" />
  </div>

  <TableBasic :columns="getColumns(columns)" :data="result?.productCategories ?? []" />
</template>
