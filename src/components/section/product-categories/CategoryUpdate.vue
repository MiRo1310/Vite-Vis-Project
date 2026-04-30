<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { Input } from "@/components/shared/input/input.variants";
import DialogFooterActions from "@/components/section/product-categories/DialogFooterActions.vue";
import { ProductCategoriesQuery } from "@/api/gql/graphql.ts";
import { ITableColumn } from "@/types/types.ts";
import { refetchQueryProductCategories } from "@/composables/querys/productCategories.ts";

const props = defineProps<ITableColumn<string, ProductCategoriesQuery["productCategories"][number]>>();

const { mutate } = useMutation(
  graphql(`
    mutation UpdateProductCategory($id: UUID!, $name: String!) {
      updateProductCategory(dto: { name: $name, id: $id }) {
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
      refetchQueries: [refetchQueryProductCategories],
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
        <Input type="text" placeholder="Einheit" v-model:model-value="name" />
      </div>
      <DialogFooterActions naming-buttons="update" @close="dialogUpdateOpen = false" @update="update" />
    </template>
  </Dialog>
</template>
