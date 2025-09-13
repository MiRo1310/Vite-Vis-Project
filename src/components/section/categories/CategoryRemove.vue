<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { ref } from "vue";
import { GetCategoriesQuery } from "@/api/gql/graphql.ts";
import { Row } from "@tanstack/vue-table";
import { TableColumnProps } from "@/types/types.ts";

const props = defineProps<TableColumnProps<string, Row<GetCategoriesQuery["productCategories"][number]>>>();

const { mutate } = useMutation(
  graphql(`
    mutation DeleteCategory($id: UUID!) {
      removeProductCategory(id: $id)
    }
  `),
);

const remove = () => {
  mutate(
    { id: props.value },
    {
      refetchQueries: ["GetCategories"],
    },
  );
};

const dialogOpen = ref(false);
</script>

<template>
  <Button size="iconRow" icon="remove" variant="outline" @click="dialogOpen = true" />
  <DialogConfirm description="Möchtest du die Zeile wirklich löschen?" v-model:dialog-open="dialogOpen" @update:confirm="remove" />
</template>
