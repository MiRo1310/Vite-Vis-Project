<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { type DatatableColumns, getColumns } from "@/lib/table.ts";
import AddCategory from "@/components/section/recipe-categories/AddCategory.vue";
import { ref } from "vue";
import CategoryUpdate from "@/components/section/recipe-categories/CategoryUpdate.vue";
import { type RecipeCategoriesQuery } from "@/api/gql/graphql.ts";
import CategoryRemove from "@/components/section/recipe-categories/CategoryRemove.vue";
import { useRecipeCategories } from "@/composables/querys/recipeCategories.ts";
import { Card, CardContent } from "@/components/ui/card";

const { result, loading } = useRecipeCategories();

const columns: Array<DatatableColumns<RecipeCategoriesQuery["recipeCategories"][number]>> = [
  { source: "name", labelKey: "Name" },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryUpdate },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryRemove },
];

const updateByPressEnter = ref(false);
</script>

<template>
  <div class="overflow-y-auto h-full pb-4 space-y-3">
    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Rezept Kategorien</p>
    <Card class="py-0 gap-0">
      <CardContent class="px-3 pt-2 pb-3">
        <div class="mb-3">
          <AddCategory :update="updateByPressEnter" :result="result?.recipeCategories ?? []" />
        </div>
        <TableBasic :columns="getColumns(columns)" :data="result?.recipeCategories ?? []" :loading wrapper-class="overflow-visible" />
      </CardContent>
    </Card>
  </div>
</template>
