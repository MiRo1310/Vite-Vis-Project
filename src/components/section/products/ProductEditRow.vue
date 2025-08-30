<script setup lang="ts">
import { OnResult, TableCellTypes } from "@/types/types";
import { GetProductByIdQuery } from "@/api/gql/graphql";
import { Button } from "@/components/shared/button";
import { ref } from "vue";
import DialogAddProduct from "@/components/section/products/DialogAddProduct.vue";
import { getProductById } from "@/api/query/getProductById";
import { useLazyQuery } from "@vue/apollo-composable";

type Product = GetProductByIdQuery["product"];

const props = defineProps<TableCellTypes<string, Product>>();

const { load, onResult, refetch } = useLazyQuery(getProductById);

const dialogOpen = ref(false);

const productById = async () => {
  if (!props.value) return;

  await load(getProductById, { id: props.value });
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
