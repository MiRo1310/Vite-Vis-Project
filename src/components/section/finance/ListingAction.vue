<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { TravelCostQuery } from "@/api/gql/graphql.ts";
import AddressOptions from "@/components/section/finance/AddressOptions.vue";
import { useForm } from "vee-validate";
import { formSchemaListing } from "@/components/section/finance/schema.form.js";
import Form from "@/components/shared/form/Form.vue";
import FormFooter from "@/components/shared/form/FormFooter.vue";
import FormDate from "@/components/shared/form/FormDate.vue";
import FormInput from "@/components/shared/form/FormInput.vue";
import FormTextarea from "@/components/shared/form/FormTextarea.vue";
import { ITableColumn } from "@/types/types.ts";

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

const form = useForm({
  validationSchema: formSchemaListing,
  initialValues: {
    date: props.row.original.date,
    description: props.row.original.description,
    price: props.row.original.price ?? undefined,
    addressId: props.row.original.addressId ?? undefined,
  },
});

const dialogOpen = ref(false);
const dialogUpdateOpen = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
  dialogUpdateOpen.value = false;
  updateMutation(
    {
      id: props.value,
      date: values.date,
      description: values.description,
      price: Number(String(values.price)),
      addressId: values.addressId,
    },
    {
      refetchQueries: ["TravelCost"],
    },
  );
  form.resetForm();
});
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
