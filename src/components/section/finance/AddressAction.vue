<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { Input } from "@/components/shared/input";
import { AddressesQuery } from "@/api/gql/graphql.ts";
import { Row } from "@tanstack/vue-table";

const props = defineProps<{ value: string; row: Row<AddressesQuery["addresses"][number]>; customValue: unknown; source: string }>();
const { mutate } = useMutation(
  graphql(`
    mutation RemoveAddress($id: UUID!) {
      removeAddress(id: $id)
    }
  `),
  {
    refetchQueries: ["Addresses", "TravelCost"],
  },
);

const { mutate: updateMutation } = useMutation(
  graphql(`
    mutation UpdateAddress($id: UUID!, $name: String!, $street: String!, $city: String!) {
      updateAddress(dto: { name: $name, street: $street, city: $city, id: $id }) {
        name
        street
        city
        id
      }
    }
  `),
  {
    refetchQueries: ["Addresses", "TravelCost"],
  },
);

const remove = () => {
  mutate(
    { id: props.value },
    {
      refetchQueries: ["Addresses"],
    },
  );
};

const update = () => {
  dialogUpdateOpen.value = false;
  updateMutation(
    {
      id: props.value,
      name: name.value,
      street: street.value,
      city: city.value,
    },
    {
      refetchQueries: ["Addresses"],
    },
  );
};

const dialogOpen = ref(false);
const dialogUpdateOpen = ref(false);

const name = ref(props.row.original.name ?? "");
const street = ref(props.row.original.street ?? "");
const city = ref(props.row.original.city ?? "");
</script>

<template>
  <div class="py-2 flex gap-2 justify-end print-none">
    <Button size="iconRow" icon="edit" variant="outline" @click="dialogUpdateOpen = true" />
    <Button size="iconRow" icon="remove" variant="outline" @click="dialogOpen = true" />
  </div>
  <DialogConfirm description="Möchtest du die Zeile wirklich löschen?" v-model:dialog-open="dialogOpen" @update:confirm="remove" />
  <Dialog v-model:open="dialogUpdateOpen">
    <template #title>Aktualisieren</template>
    <template #content>
      <div class="mt-4 flex flex-col gap-4">
        <Input type="text" placeholder="Name" v-model:model-value="name" />
        <Input type="text" placeholder="Straße" v-model:model-value="street" />
        <Input type="text" placeholder="Stadt" v-model:model-value="city" />
      </div>
      <div class="flex gap-4 justify-end">
        <Button variant="outline" @click="update">Aktualisieren</Button>
        <Button variant="default" @click="dialogUpdateOpen = false">Schließen</Button>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>
