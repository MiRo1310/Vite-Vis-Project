<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import { ref } from "vue";
import { RecipeCategoriesQuery } from "@/api/gql/graphql.ts";
import { ITableColumn } from "@/types/types.ts";

const props = defineProps<ITableColumn<string, RecipeCategoriesQuery["recipeCategories"][number]>>();

const { mutate } = useMutation(
  graphql(`
    mutation RemoveRecipeCategory($id: UUID!) {
      removeRecipeCategory(id: $id)
    }
  `),
);

const remove = async () => {
  await mutate(
    { id: props.value },
    {
      refetchQueries: ["recipeCategories"],
    },
  );
};

const dialogOpen = ref(false);
</script>

<template>
  <div class="">
    <Button size="iconRow" icon="remove" variant="ghost" class="mt-1" @click="dialogOpen = true" />
    <DialogConfirm description="Möchtest du die Zeile wirklich löschen?" v-model:dialog-open="dialogOpen" @update:confirm="remove" />
  </div>
</template>
