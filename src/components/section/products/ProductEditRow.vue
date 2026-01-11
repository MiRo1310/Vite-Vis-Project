<script setup lang="ts">
import { OnResult, TableCellTypes } from "@/types/types";
import { GetProductByIdQuery } from "@/api/gql/graphql";
import { Button } from "@/components/shared/button";
import { ref } from "vue";
import DialogAddProduct from "@/components/section/products/DialogAddProduct.vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";

type Product = GetProductByIdQuery["product"];

const props = defineProps<TableCellTypes<string, Product>>();

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

const { load, onResult, refetch } = useLazyQuery(getProductByIdQuery);

const dialogOpen = ref(false);

const productById = async () => {
  if (!props.value) {return;}

  await load(getProductByIdQuery, { id: props.value });
  await refetch({ id: props.value });
};

const data = ref<Product>();

onResult((result: OnResult<GetProductByIdQuery>) => {
  if (result.data?.product) {
    dialogOpen.value = true;
    data.value = result.data.product;
  }
});
</script>

<template>
  <Button variant="outline" size="iconRow" icon="edit" @click.prevent="productById" />
  <Teleport to="body">
    <DialogAddProduct v-model:dialog-open="dialogOpen" :data />
  </Teleport>
</template>
