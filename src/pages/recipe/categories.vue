<script setup lang="ts">
import Header from "@/components/section/header/Header.vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { graphql } from "@/api/gql";
import { useQuery } from "@vue/apollo-composable";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import ProductAddCategory from "@/components/section/products/ProductAddCategory.vue";
import Input from "../../components/ui/input/InputShadcn.vue";
import { computed, ref } from "vue";
import CategorieAction from "@/components/section/categories/CategorieAction.vue";

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

const columns: DatatableColumns[] = [
  { source: "name", labelKey: "Name" },
  { source: "id", labelKey: "ID" },
  { source: "id", labelKey: "", type: "component", component: CategorieAction },
];
const category = ref("");

const categoryExists = computed(() => result.value?.productCategories?.find((c) => c.name === category.value) !== undefined);
</script>

<template>
  <div class="flex items-start gap-2">
    <div class="flex flex-col">
      <Input
        v-model:model-value="category"
        :class="['w-60', { 'border-destructive': categoryExists }]"
        placeholder="Kategorie hinzu oder ändern"
        @update:model-value="categoryExists = false"
        type="text"
      />
      <p v-if="categoryExists" class="text-[0.8rem] font-medium text-destructive mt-2">Die Kategorie existiert schon</p>
    </div>
    <ProductAddCategory v-model:category-exists="categoryExists" v-model:new-category="category" />
  </div>

  <Header title="Kategorien" />
  <div class="px-2">
    <TableBasic :columns="getColumns(columns)" :data="result?.productCategories ?? []" />
  </div>
</template>
