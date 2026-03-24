<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import AddressOptions from "@/components/section/finance/AddressOptions.vue";
import DescriptionOptions from "@/components/section/finance/DescriptionOptions.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useForm } from "vee-validate";
import { formSchemaListing } from "@/components/section/finance/formSchema.ts";
import FormInput from "@/components/shared/form/FormInput.vue";
import FormTextarea from "@/components/shared/form/FormTextarea.vue";
import FormDate from "@/components/shared/form/FormDate.vue";
import Form from "@/components/shared/form/Form.vue";

const { toast } = useToast();

const { mutate } = useMutation(
  graphql(`
    mutation AddTravelCost($price: Decimal, $description: String, $date: LocalDate, $addressId: UUID) {
      createTravelCost(dto: { price: $price, description: $description, date: $date, addressId: $addressId }) {
        id
      }
    }
  `),
  { refetchQueries: ["TravelCost"] },
);

const form = useForm({
  validationSchema: formSchemaListing,
  initialValues: { date: "", description: "", price: 0, addressId: "" },
});

const onSubmit = form.handleSubmit(async (values) => {
  mutate({
    date: new Date(values.date).toISOString().slice(0, 10),
    description: values.description ?? "",
    price: parseFloat(String(values.price)),
    addressId: values.addressId,
  });

  toast({
    title: "Wurde zur Liste hinzugefügt",
  });

  form.resetForm();
});

const handleDescriptionChange = (value?: string) => {
  form.setFieldValue("descriptionHelper", "");
  if (value) {
    form.setFieldValue("description", value);
  }
};
</script>

<template>
  <Form @update:on-submit="onSubmit">
    <div class="my-4 flex gap-4 flex-wrap">
      <FormDate name="date" label="Datum" />
      <FormInput name="price" label="Betrag" type="number" :min="0" />

      <AddressOptions />
      <div class="w-full">
        <DescriptionOptions @update:model-value="handleDescriptionChange($event)" />
        <FormTextarea name="description" label="Beschreibung" />
      </div>

      <Button type="submit" variant="outline">Hinzufügen</Button>
    </div>
  </Form>
</template>
