<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { onMounted, ref } from "vue";
import { Input } from "@/components/shared/input";
import { TravelCostQuery } from "@/api/gql/graphql.ts";
import { Row } from "@tanstack/vue-table";
import AddressOptions from "@/components/section/travelcost/AddressOptions.vue";
import { Textarea } from "@/components/ui/textarea";

const props = defineProps<{ value: string; row: Row<TravelCostQuery["travelCost"][number]>; customValue: unknown; source: string }>();
const { mutate } = useMutation(
  graphql(`
    mutation RemoveTravelCost($id: UUID!) {
      removeTravelCost(id: $id)
    }
  `),
  {
    refetchQueries: ["TravelCost"],
  },
);

const { mutate: updateMutation } = useMutation(
  graphql(`
    mutation UpdateTravelCost($id: UUID!, $price: Decimal, $addressId: UUID!, $date: LocalDate, $description: String) {
      updateTravelCost(dto: { price: $price, addressId: $addressId, date: $date, description: $description, id: $id }) {
        id
      }
    }
  `),
  {
    refetchQueries: ["TravelCost"],
  },
);

const remove = () => {
  mutate(
    { id: props.value },
    {
      refetchQueries: ["TravelCost"],
    },
  );
};

const update = () => {
  dialogUpdateOpen.value = false;
  if (!addressId.value) {
    return;
  }
  updateMutation(
    {
      id: props.value,
      date: date.value,
      description: description.value,
      price: Number(String(price.value)) ?? 0,
      addressId: addressId.value,
    },
    {
      refetchQueries: ["TravelCost"],
    },
  );
  clear();
};

const clear = () => {
  date.value = "";
  description.value = "";
  price.value = "";
  addressId.value = null;
  modelValue.value = "";
};

onMounted(() => {
  modelValue.value = props.row.original.address.name ?? "";
});

const dialogOpen = ref(false);
const dialogUpdateOpen = ref(false);

const date = ref(props.row.original.date ?? "");
const description = ref(props.row.original.description ?? "");
const price = ref(props.row.original.price ?? "");
const addressId = ref<string | null>(props.row.original.addressId ?? null);
const modelValue = ref("");
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
        <Input type="date" placeholder="Datum" v-model:model-value="date" />
        <Textarea placeholder="Beschreibung" v-model:model-value="description" />
        <Input type="number" placeholder="Betrag" v-model:model-value="price" />
        <AddressOptions v-model:model-value="modelValue" :address-id />
      </div>
      <div class="flex gap-4 justify-end">
        <Button variant="outline" @click="update">Aktualisieren</Button>
        <Button variant="default" @click="dialogUpdateOpen = false">Schließen</Button>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>
