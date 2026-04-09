<script setup lang="ts">
import Header from "@/components/section/header/Header.vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import AddCategory from "@/components/section/recipe-categories/AddCategory.vue";
import { ref } from "vue";
import CategoryUpdate from "@/components/section/recipe-categories/CategoryUpdate.vue";
import { RecipeCategoriesQuery } from "@/api/gql/graphql.ts";
import CategoryRemove from "@/components/section/recipe-categories/CategoryRemove.vue";
import { useRecipeCategories } from "@/composables/querys/recipeCategories.ts";

const { result, loading } = useRecipeCategories();

const columns: DatatableColumns<RecipeCategoriesQuery["recipeCategories"][number]>[] = [
  { source: "name", labelKey: "Name" },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryUpdate },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryRemove },
];

const updateByPressEnter = ref(false);
</script>

<template>
  <Header title="Rezept Kategorien" />
  <div class="flex items-center gap-2">
    <AddCategory :update="updateByPressEnter" :result="result?.recipeCategories ?? []" />
  </div>

  <TableBasic :columns="getColumns(columns)" :data="result?.recipeCategories ?? []" :loading />
</template>
