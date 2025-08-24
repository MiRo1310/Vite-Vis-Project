<script setup lang="ts">
import { Input } from "@/components/shared/input";
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { InputOptions } from "@/components/shared/input/Input.vue";
import { graphql } from "@/api/gql";
import { isDefined } from "@vueuse/core";

const { result } = useQuery(
  graphql(`
    query AddressListing {
      addresses {
        id
        name
      }
    }
  `),
);

const options = computed((): InputOptions[] => {
  const addresses = result.value?.addresses ?? [];

  const mappingAddress = addresses.map((address) => {
    return {
      name: address.name,
      id: address.id,
    };
  });

  return mappingAddress.filter((address) => isDefined(address.name) && isDefined(address.id)) as InputOptions[];
});

const addressId = defineModel<string | null>("addressId");

const setOptionId = (name: string | number) => {
  addressId.value = options.value.find((option) => option.name === name)?.id ?? null;
};

const modelValue = defineModel<string>();
</script>

<template>
  <Input
    type="text"
    placeholder="Adresse"
    class="add-listing__input"
    name="Test"
    :options
    options-id="address"
    v-model:model-value="modelValue"
    @update:model-value="setOptionId"
  />
</template>

<style scoped lang="scss"></style>
