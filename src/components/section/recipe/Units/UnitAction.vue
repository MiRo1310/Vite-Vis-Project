<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { Input } from "@/components/shared/input";
import { GetUnitsQuery } from "@/api/gql/graphql.ts";
import { Row } from "@tanstack/vue-table";
import description from "@/pages/finance/description.vue";
import { TableColumnProps } from "@/types/types.ts";

const props = defineProps<TableColumnProps<string, Row<GetUnitsQuery["units"][number]>>>();

const { mutate } = useMutation(
  graphql(`
    mutation DeleteUnit($id: UUID!) {
      deleteUnit(id: $id)
    }
  `),
  {
    refetchQueries: ["GetUnits"],
  },
);

const { mutate: updateMutation } = useMutation(
  graphql(`
    mutation UpdateUnit($id: UUID!, $name: String!) {
      updateUnit(dto: { name: $name, id: $id }) {
        id
      }
    }
  `),
  {
    refetchQueries: ["GetUnits"],
  },
);

const remove = () => {
  mutate(
    { id: props.value },
    {
      refetchQueries: ["GetUnits"],
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
      refetchQueries: ["GetUnits"],
    },
  );
  clear();
};

const clear = () => {
  name.value = "";
  description.value = "";
};

const dialogOpen = ref(false);
const dialogUpdateOpen = ref(false);

const name = ref(props.row.original.name ?? "");
</script>

<template>
  <div class="py-2 flex gap-2 justify-end print-none">
    <Button size="icon" icon="edit" variant="outline" @click="dialogUpdateOpen = true" />
    <Button size="icon" icon="remove" variant="outline" @click="dialogOpen = true" />
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
