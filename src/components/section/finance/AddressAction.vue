<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { graphql } from "@/api/gql";
import { useMutation } from "@vue/apollo-composable";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { ref } from "vue";
import { type AddressesQuery } from "@/api/gql/graphql.ts";
import { type ITableColumn } from "@/types/types.ts";
import FormInput from "@/components/shared/form/FormInput.vue";
import Form from "@/components/shared/form/Form.vue";
import { useForm } from "vee-validate";
import { formSchemaAddress } from "@/components/section/finance/schema.form.ts";
import FormFooter from "@/components/shared/form/FormFooter.vue";

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ITableColumn<string, AddressesQuery["addresses"][number]>>();
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

const initialValues = () => ({
  name: props.row.original.name ?? "",
  street: props.row.original.street ?? "",
  city: props.row.original.city ?? "",
});

const form = useForm({
  validationSchema: formSchemaAddress,
  initialValues: initialValues(),
});

const remove = async () => {
  await mutate({ id: props.value });
};

const onSubmit = form.handleSubmit(async (values) => {
  dialogUpdateOpen.value = false;
  await updateMutation({
    id: props.value,
    name: values.name,
    street: values.street,
    city: values.city,
  });
});

const dialogOpen = ref(false);
const dialogUpdateOpen = ref(false);

const onOpen = () => {
  dialogUpdateOpen.value = true;
  form.resetForm({
    values: initialValues(),
  });
};
</script>

<template>
  <div class="py-2 flex gap-2 justify-end print-none">
    <Button size="iconRow" icon="edit" variant="outline" @click="onOpen" v-e2e="'address-edit'" />
    <Button size="iconRow" icon="remove" variant="outline" @click="dialogOpen = true" />
  </div>
  <DialogConfirm description="Möchtest du die Zeile wirklich löschen?" v-model:dialog-open="dialogOpen" @update:confirm="remove" />
  <Dialog v-model:open="dialogUpdateOpen">
    <template #title>Aktualisieren</template>
    <template #content>
      <Form @update:on-submit="onSubmit">
        <div class="my-4 flex flex-col gap-4 flex-wrap">
          <FormInput name="name" type="text" placeholder="Name" e2e="address-name" />
          <FormInput name="street" type="text" placeholder="Straße" e2e="address-street" />
          <FormInput name="city" type="text" placeholder="Stadt" e2e="address-city" />
        </div>

        <FormFooter @update:close="dialogUpdateOpen = false" save-label="Übernehmen" />
      </Form>
    </template>
  </Dialog>
</template>
