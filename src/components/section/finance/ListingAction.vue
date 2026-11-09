<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { type TravelCostQuery } from "@/api/gql/graphql.ts";
import AddressOptions from "@/components/section/finance/AddressOptions.vue";
import { useForm } from "vee-validate";
import { formSchemaListing } from "@/components/section/finance/schema.form.js";
import Form from "@/components/shared/form/Form.vue";
import FormFooter from "@/components/shared/form/FormFooter.vue";
import FormDate from "@/components/shared/form/FormDate.vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import FormTextarea from "@/components/shared/form/FormTextarea.vue";
import { type ITableColumn } from "@/types/types.ts";
import { Logger } from "@/lib/logger.ts";

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ITableColumn<string, TravelCostQuery["travelCost"][number]>>();

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

const {
  mutate: updateMutation,
  onDone: updateDone,
  onError: updateError,
} = useMutation(
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

const remove = async () => {
  await mutate({ id: props.value });
};
type TravelCostRow = TravelCostQuery["travelCost"][number];
const toFormValues = (row: TravelCostRow) => ({
  date: row.date ?? "",
  description: row.description,
  price: row.price ?? undefined,
  addressId: row.addressId ?? undefined,
});

const form = useForm({
  validationSchema: formSchemaListing,
  initialValues: toFormValues(props.row.original),
});

const dialogOpen = ref(false);
const dialogUpdateOpen = ref(false);

const openUpdate = () => {
  form.resetForm({ values: toFormValues(props.row.original) });
  dialogUpdateOpen.value = true;
};

const onSubmit = form.handleSubmit(async (values) => {
  await updateMutation({
    id: props.value,
    date: values.date,
    description: values.description,
    price: Number(String(values.price)),
    addressId: values.addressId,
  });
});

updateDone(() => {
  dialogUpdateOpen.value = false;
});

updateError((error) => {
  Logger.error("Error updating travel cost:", error);
});
</script>

<template>
  <div class="py-2 flex gap-2 justify-end print-none">
    <Button size="iconRow" icon="edit" variant="outline" v-e2e="'listing-edit'" @click="openUpdate" />
    <Button size="iconRow" icon="remove" variant="outline" @click="dialogOpen = true" />
  </div>
  <DialogConfirm description="Möchtest du die Zeile wirklich löschen?" v-model:dialog-open="dialogOpen" @update:confirm="remove" />
  <Dialog v-model:open="dialogUpdateOpen">
    <template #title>Aktualisieren</template>
    <template #content>
      <Form @update:on-submit="onSubmit">
        <div class="mt-4 flex flex-col gap-4">
          <FormDate name="date" label="Datum" />
          <FormTextarea name="description" label="Beschreibung" />
          <FormInput name="price" label="Betrag" type="number" :min="0" :step="0.01" />
          <AddressOptions />
        </div>
        <FormFooter @update:close="dialogUpdateOpen = false" />
      </Form>
    </template>
  </Dialog>
</template>
