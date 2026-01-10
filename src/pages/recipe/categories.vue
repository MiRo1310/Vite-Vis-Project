<script setup lang="ts">
import Header from "@/components/section/header/Header.vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { graphql } from "@/api/gql";
import { useQuery } from "@vue/apollo-composable";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import AddCategory from "@/components/section/products/AddCategory.vue";
import { ref } from "vue";
import CategoryUpdate from "@/components/section/categories/CategoryUpdate.vue";
import { GetCategoriesQuery } from "@/api/gql/graphql.ts";
import CategoryRemove from "@/components/section/categories/CategoryRemove.vue";

const { result } = useQuery(
  graphql(`
    query GetCategories {
      productCategories {
        name
        id
      }
    }
  `),
);

const columns: DatatableColumns<GetCategoriesQuery["productCategories"][number]>[] = [
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

  <div class="px-2">
    <TableBasic :columns="getColumns(columns)" :data="result?.productCategories ?? []" />
  </div>
</template>
