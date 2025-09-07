<script setup lang="ts">
import Header from "@/components/section/header/Header.vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { graphql } from "@/api/gql";
import { useQuery } from "@vue/apollo-composable";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import ProductAddCategory from "@/components/section/products/ProductAddCategory.vue";
import Input from "../../components/ui/input/InputShadcn.vue";
import { computed, ref } from "vue";
import CategoryUpdate from "@/components/section/categories/CategoryUpdate.vue";
import { isDefined } from "@vueuse/core";
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
  { source: "id", labelKey: "ID" },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryUpdate },
  { source: "id", labelKey: "", type: "component", headerClass: "w-6", component: CategoryRemove },
];

const category = ref("");

const categoryExists = computed(() => isDefined(result.value?.productCategories?.find((c) => c.name === category.value)));

const updateByPressEnter = ref(false);
</script>

<template>
  <Header title="Kategorien" />
  <div class="categories__section">
    <div class="categories__input-wrapper">
      <Input
        v-model:model-value="category"
        :class="['w-60', { 'border-destructive': categoryExists }]"
        placeholder="Kategorie hinzu oder ändern"
        @update:model-value="categoryExists = false"
        @keyup.enter="updateByPressEnter = true"
        type="text"
      />
      <p v-if="categoryExists" class="categories__warning">Die Kategorie existiert schon</p>
    </div>
    <ProductAddCategory :update="updateByPressEnter" v-model:category-exists="categoryExists" v-model:new-category="category" />
  </div>

  <div class="categories__table-wrapper">
    <TableBasic :columns="getColumns(columns)" :data="result?.productCategories ?? []" />
  </div>
</template>

<style scoped lang="scss">
.categories {
  &__input-wrapper {
    @apply flex flex-col;
  }

  &__section {
    @apply flex items-center gap-2;
  }

  &__warning {
    @apply text-[0.8rem] font-medium text-destructive mt-2;
  }

  &__table-wrapper {
    @apply px-2 max-w-[1000px];
  }
}
</style>
