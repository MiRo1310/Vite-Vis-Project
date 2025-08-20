<script setup lang="ts">
import { Input } from "@/components/shared/input";
import { ref } from "vue";
import { Button } from "@/components/shared/button";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";

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
  { refetchQueries: ["Addresses"] },
);

const name = ref<string>();
const street = ref<string>();
const city = ref<string>();

const clearInputs = () => {
  name.value = "";
  street.value = "";
  city.value = "";
};
const addAddressHandler = () => {
  if (!name.value && !street.value && !city.value) {
    return;
  }
  mutate({
    name: name.value ?? "",
    street: street.value ?? "",
    city: city.value ?? "",
  });
  clearInputs();
};
</script>

<template>
  <div class="add-address">
    <Input type="text" placeholder="Name" v-model:model-value="name" class="add-address__input" />
    <Input type="text" placeholder="Straße" v-model:model-value="street" class="add-address__input" />
    <Input type="text" placeholder="City" v-model:model-value="city" class="add-address__input" />
    <Button icon="add" variant="outline" size="icon" @click="addAddressHandler" />
  </div>
</template>

<style scoped lang="scss">
.add-address {
  @apply my-4 flex gap-4 flex-wrap;

  &__input {
    @apply w-[30rem];
  }
}
</style>
