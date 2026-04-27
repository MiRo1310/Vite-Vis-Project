<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { ref } from "vue";
import { ProductCategoriesQuery } from "@/api/gql/graphql.ts";
import { ITableColumn } from "@/types/types.ts";
import { refetchQueryProductCategories } from "@/composables/querys/productCategories.ts";

const props = defineProps<ITableColumn<string, ProductCategoriesQuery["productCategories"][number]>>();

const { mutate } = useMutation(
  graphql(`
    mutation DeleteCategory($id: UUID!) {
      removeProductCategory(id: $id)
    }
  `),
);

const remove = async () => {
  await mutate(
    { id: props.value },
    {
      refetchQueries: [refetchQueryProductCategories],
    },
  );
};

const dialogOpen = ref(false);
</script>

<template>
  <Button size="iconRow" icon="remove" variant="ghost" class="mt-1" @click="dialogOpen = true" />
  <DialogConfirm description="Möchtest du die Zeile wirklich löschen?" v-model:dialog-open="dialogOpen" @update:confirm="remove" />
</template>
