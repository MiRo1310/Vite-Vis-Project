<script setup lang="ts">
import { Input } from "@/components/shared/input";
import { ref } from "vue";
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import AddressOptions from "@/components/section/travelcost/AddressOptions.vue";
import DescriptionOptions from "@/components/section/travelcost/DescriptionOptions.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { Textarea } from "@/components/ui/textarea";

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

const date = ref<string>();
const description = ref<string>();
const price = ref<number>();
const addressId = ref<string | null>(null);
const selectedName = ref<string>("");

const clearInputs = () => {
  date.value = "";
  description.value = "";
  price.value = 0;
  addressId.value = null;
  selectedName.value = "";
};

const addListingHandler = () => {
  if (!date.value || !price.value || !addressId.value) {
    return;
  }

  mutate({
    date: date.value ? new Date(date.value).toISOString().slice(0, 10) : "",
    description: description.value ?? "",
    price: parseFloat(String(price.value)) ?? 0,
    addressId: addressId.value,
  });

  toast({
    title: "Wurde zur Liste hinzugefügt",
  });
  clearInputs();
};
</script>

<template>
  <div class="add-listing">
    <Input type="date" placeholder="Datum" v-model:model-value="date" class="add-listing__input-date" />
    <DescriptionOptions v-model:model-value="description" :as-select="true" />
    <Textarea placeholder="Beschreibung" v-model:model-value="description" />
    <Input type="number" placeholder="Betrag" v-model:model-value="price" class="add-listing__input" />
    <AddressOptions v-model:address-id="addressId" v-model:model-value="selectedName" />
    <Button icon="add" variant="outline" size="icon" @click="addListingHandler" />
  </div>
</template>

<style scoped lang="scss">
.add-listing {
  @apply my-4 flex gap-4 flex-wrap;

  &__input {
    @apply w-[30rem];
  }
}
</style>
