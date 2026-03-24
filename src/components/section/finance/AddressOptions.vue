<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { graphql } from "@/api/gql";
import { isDefined } from "@vueuse/core";
import { InputOption } from "@/types/types.ts";
import InputWithOptions from "@/components/shared/input/InputWithOptions.vue";

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

const options = computed((): InputOption[] => {
  const addresses = result.value?.addresses ?? [];

  const mappingAddress = addresses.map((address) => {
    return {
      name: address.name,
      id: address.id,
    };
  });

  return mappingAddress
    .filter((address) => isDefined(address.name) && isDefined(address.id))
    .map(({ id, name }): InputOption => ({ value: id, name: name as string }));
});

const modelValue = defineModel<string>();
</script>

<template>
  <InputWithOptions
    type="text"
    placeholder="Adresse"
    class="add-listing__input"
    name="Test"
    :options
    options-id="address"
    v-model:model-value="modelValue"
  />
</template>
