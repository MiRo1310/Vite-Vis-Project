<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { useToast } from "@/components/ui/toast";
import { useForm } from "vee-validate";
import { formSchemaAddress } from "@/components/section/finance/schema.form.ts";
import Form from "@/components/shared/form/Form.vue";
import FormInput from "@/components/shared/form/FormInput.vue";

const { toast } = useToast();

const { mutate } = useMutation(
  graphql(`
    mutation AddAddress($name: String!, $street: String!, $city: String!) {
      createAddress(dto: { name: $name, street: $street, city: $city }) {
        name
        street
        city
      }
    }
  `),
  { refetchQueries: ["Addresses", "AddressListing"] },
);

const form = useForm({
  validationSchema: formSchemaAddress,
  initialValues: { name: "", street: "", city: "" },
});

const onSubmit = form.handleSubmit(async (values) => {
  await mutate({
    name: values.name,
    street: values.street,
    city: values.city,
  });
  toast({
    title: "Die Adresse wurde zur Liste hinzugefügt",
  });
  form.resetForm();
});
</script>

<template>
  <Form @update:on-submit="onSubmit">
    <div class="my-4 flex gap-4 flex-wrap">
      <FormInput name="name" type="text" placeholder="Name" class="w-120" e2e="address-name" />
      <FormInput name="street" type="text" placeholder="Straße" class="w-120" e2e="address-street" />
      <FormInput name="city" type="text" placeholder="Stadt" class="w-120" e2e="address-city" />

      <Button type="submit" icon="add" variant="outline" size="icon" data-e2e="address-submit" />
    </div>
  </Form>
</template>
