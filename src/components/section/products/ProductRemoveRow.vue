<script setup lang="ts">
import { TableCellTypes } from "@/types/types";
import { ProductsQuery } from "@/api/gql/graphql";
import { Button } from "@/components/shared/button";
import { Trash } from "lucide-vue-next";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { products } from "@/api/query/products";
import { removeProduct } from "@/api/mutation/removeProduct";

const props = defineProps<TableCellTypes<string, ProductsQuery>>();

const { mutate } = useMutation(removeProduct, { refetchQueries: [products] });

const remove = async () => {
  if (!props.value) return;
  await mutate({ id: props.value });
};

const dialogOpen = ref(false);
</script>

<template>
  <Button variant="outline" size="iconMedium" @click.prevent="dialogOpen = true">
    <Trash />
  </Button>
  <DialogConfirm v-model:dialog-open="dialogOpen" title="Soll das Produkt wirklich gelöscht werden?" @update:confirm="remove" />
</template>
