<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { Input } from "@/components/shared/input";
import { GetCategoriesQuery } from "@/api/gql/graphql.ts";
import { Row } from "@tanstack/vue-table";
import { TableColumnProps } from "@/types/types.ts";
import DialogFooterActions from "@/components/section/categories/DialogFooterActions.vue";

const props = defineProps<TableColumnProps<string, Row<GetCategoriesQuery["productCategories"][number]>>>();

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
      refetchQueries: ["GetCategories"],
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
  <Button size="iconRow" icon="edit" variant="outline" @click="dialogUpdateOpen = true" />

  <Dialog v-model:open="dialogUpdateOpen">
    <template #title>Aktualisieren</template>
    <template #content>
      <div class="dialog__input-wrapper">
        <Input type="text" placeholder="Einheit" v-model:model-value="name" />
      </div>
      <DialogFooterActions variant="update" @close="dialogUpdateOpen = false" @update="update" />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.dialog {
  &__input-wrapper {
    @apply mt-4 flex flex-col gap-4;
  }
}
</style>
