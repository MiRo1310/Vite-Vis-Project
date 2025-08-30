<script setup lang="ts">
import { TableCellTypes } from "@/types/types";
import { ProductsQuery } from "@/api/gql/graphql";
import { Button } from "@/components/shared/button";
import { Trash } from "lucide-vue-next";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";

const props = defineProps<TableCellTypes<string, ProductsQuery>>();

const { mutate } = useMutation(
  graphql(`
    mutation removeProduct($id: UUID!) {
      removeProduct(id: $id)
    }
  `),
  { refetchQueries: ["GetProducts"] },
);

const remove = async () => {
  if (!props.value) return;
  await mutate({ id: props.value });
};

const dialogOpen = ref(false);
</script>

<template>
  <Button variant="outline" size="iconRow" icon="remove" @click.prevent="dialogOpen = true" />
  <DialogConfirm v-model:dialog-open="dialogOpen" title="Soll das Produkt wirklich gelöscht werden?" @update:confirm="remove" />
</template>
