<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { Input } from "@/components/shared/input";
import { DescriptionsQuery } from "@/api/gql/graphql.ts";
import { Row } from "@tanstack/vue-table";
import { Textarea } from "@/components/ui/textarea";

const props = defineProps<{ value: string; row: Row<DescriptionsQuery["description"][number]>; customValue: unknown; source: string }>();
const { mutate } = useMutation(
  graphql(`
    mutation RemoveDescription($id: UUID!) {
      removeDescription(id: $id)
    }
  `),
  {
    refetchQueries: ["Descriptions"],
  },
);

const { mutate: updateMutation } = useMutation(
  graphql(`
    mutation UpdateDescription($text: String!, $id: UUID!) {
      updateDescription(text: $text, id: $id) {
        text
      }
    }
  `),
  {
    refetchQueries: ["Descriptions"],
  },
);

const remove = () => {
  const id = props.value;
  if (!id) {
    return;
  }
  mutate(
    { id },
    {
      refetchQueries: ["Descriptions"],
    },
  );
};

const update = () => {
  dialogUpdateOpen.value = false;
  const id = props.value;

  if (!description.value || !id) {
    return;
  }
  updateMutation(
    {
      id,
      text: description.value,
    },
    {
      refetchQueries: ["Descriptions"],
    },
  );
  clear();
};

const clear = () => {
  description.value = "";
};

const dialogOpen = ref(false);
const dialogUpdateOpen = ref(false);

const description = ref(props.row.original.text ?? "");
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
        <Textarea placeholder="Beschreibung" v-model:model-value="description" class="textarea" />
      </div>
      <div class="flex gap-4 justify-end">
        <Button variant="outline" @click="update">Aktualisieren</Button>
        <Button variant="default" @click="dialogUpdateOpen = false">Schließen</Button>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.textarea {
  @apply h-40;
}
</style>
