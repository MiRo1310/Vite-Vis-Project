<script setup lang="ts">
import Header from "@/components/section/header/Header.vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { type DatatableColumns, getColumns } from "@/lib/table.ts";
import AddCategory from "@/components/section/product-categories/AddCategory.vue";
import { ref } from "vue";
import CategoryUpdate from "@/components/section/product-categories/CategoryUpdate.vue";
import { type ProductCategoriesQuery } from "@/api/gql/graphql.ts";
import CategoryRemove from "@/components/section/product-categories/CategoryRemove.vue";
import { useProductCategories } from "@/composables/querys/productCategories";
import { routes } from "@/router/routes";
import { Button } from "@/components/shared/button/button.variants";

const { result, loading } = useProductCategories();

const columns: Array<DatatableColumns<ProductCategoriesQuery["productCategories"][number]>> = [
  { source: "name", labelKey: "Name" },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryUpdate },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryRemove },
];

const updateByPressEnter = ref(false);
</script>

<template>
  <div class="h-full flex flex-col">
    <Header title="Produkt Kategorien">
      <Button variant="outline" as-child>
        <RouterLink :to="{ name: routes.products.name }">Zu den Produkten</RouterLink>
      </Button>
    </Header>
    <div class="flex items-center gap-2 mb-2">
      <AddCategory :update="updateByPressEnter" :result="result?.productCategories ?? []" />
    </div>

    <TableBasic :columns="getColumns(columns)" :data="result?.productCategories ?? []" :loading wrapper-class="flex-1 min-h-0" />
  </div>
</template>
