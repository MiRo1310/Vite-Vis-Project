<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { Input } from "@/components/shared/input";
import { ITableColumn } from "@/types/types.ts";
import DialogFooterActions from "@/components/section/product-categories/DialogFooterActions.vue";
import { RecipeCategoriesQuery } from "@/api/gql/graphql.ts";

const props = defineProps<ITableColumn<string, RecipeCategoriesQuery["recipeCategories"][number]>>();

const { mutate } = useMutation(
  graphql(`
    mutation UpdateRecipeCategory($id: UUID!, $name: String!) {
      updateRecipeCategory(dto: { name: $name, id: $id }) {
        id
      }
    }
  `),
);

const update = () => {
  dialogUpdateOpen.value = false;
  if (!props.value) {
    return;
  }
  mutate(
    {
      id: props.value,
      name: name.value,
    },
    {
      refetchQueries: ["recipeCategories"],
    },
  );
  clear();
};

const clear = () => {
  name.value = "";
};

const dialogUpdateOpen = ref(false);

const name = ref(props.row.original.name ?? "");
</script>

<template>
  <Button size="iconRow" icon="edit" variant="ghost" class="mt-1" @click="dialogUpdateOpen = true" />

  <Dialog v-model:open="dialogUpdateOpen">
    <template #title>Aktualisieren</template>
    <template #content>
      <div class="mt-4 flex flex-col gap-4">
        <Input type="text" placeholder="Kategorie" v-model:model-value="name" />
      </div>
      <DialogFooterActions naming-buttons="update" @close="dialogUpdateOpen = false" @update="update" />
    </template>
  </Dialog>
</template>
