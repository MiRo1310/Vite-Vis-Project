<script setup lang="ts">
import { TableCellTypes } from "@/types/types.ts";
import DialogAddUpdateProduct from "@/components/section/products/DialogAddUpdateProduct.vue";
import { ref } from "vue";
import { graphql } from "@/api/gql";
import { useLazyQuery } from "@vue/apollo-composable";
import { GetProductsQuery } from "@/api/gql/graphql.ts";

const props = defineProps<TableCellTypes<string, GetProductsQuery["productsGrouped"][number]["value"][number]>>();

const dialogOpen = ref(false);

const getProductByIdQuery = graphql(`
  query getProductById($id: UUID!) {
    product(id: $id) {
      id
      carbs
      category
      fat
      kcal
      name
      protein
      salt
      sugar
      productUnits {
        modifiedAt
        createdAt
        id
        productId
        amount
        unit
        isDefault
      }
    }
  }
`);

const { load, result, onResult, refetch } = useLazyQuery(getProductByIdQuery);

const clickHandler = () => {
  const id = props.row.original?.id;
  if (id) {
    load(getProductByIdQuery, { id });
    refetch({ id });
  }
};

onResult(() => {
  dialogOpen.value = true;
});
</script>

<template>
  <DialogAddUpdateProduct v-if="result?.product" v-model:dialog-open="dialogOpen" :data="result.product" />
  <span class="underline cursor-pointer" @click="clickHandler">{{ value }}</span>
</template>
