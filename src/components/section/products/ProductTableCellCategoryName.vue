<script setup lang="ts">
import { TableCellTypes } from "@/types/types";
import { useProductCategories } from "@/composables/querys/productCategories";
import { ProductsQuery } from "@/api/gql/graphql";

withDefaults(defineProps<TableCellTypes<string, ProductsQuery>>(), {
  value: "",
  customValue: "",
  callback: undefined,
});

const { getCategoryNameById } = useProductCategories();
</script>

<template>
  {{ getCategoryNameById(value) }}
</template>
