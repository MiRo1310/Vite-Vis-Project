<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { Input } from "@/components/shared/input";
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

const { mutate: updateMutation } = useMutation(
  graphql(`
    mutation UpdateProductCategory($id: UUID!, $name: String!) {
      updateProductCategory(dto: { name: $name, id: $id }) {
        id
      }
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

const update = () => {
  dialogUpdateOpen.value = false;
  if (!props.value) {
    return;
  }
  updateMutation(
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

const dialogOpen = ref(false);
const dialogUpdateOpen = ref(false);

const name = ref(props.row.original.name ?? "");
</script>

<template>
  <div class="flex gap-2 justify-end print-none">
    <Button size="iconRow" icon="edit" variant="outline" @click="dialogUpdateOpen = true" />
    <Button size="iconRow" icon="remove" variant="outline" @click="dialogOpen = true" />
  </div>
  <DialogConfirm description="Möchtest du die Zeile wirklich löschen?" v-model:dialog-open="dialogOpen" @update:confirm="remove" />
  <Dialog v-model:open="dialogUpdateOpen">
    <template #title>Aktualisieren</template>
    <template #content>
      <div class="mt-4 flex flex-col gap-4">
        <Input type="text" placeholder="Einheit" v-model:model-value="name" />
      </div>
      <div class="flex gap-4 justify-end">
        <Button variant="outline" @click="update">Aktualisieren</Button>
        <Button variant="default" @click="dialogUpdateOpen = false">Schließen</Button>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>
