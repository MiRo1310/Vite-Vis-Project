<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { graphql } from "@/api/gql";
import { isDefined } from "@vueuse/core";
import { InputOption } from "@/types/types.ts";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";

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
</script>

<template>
  <FormInputOptions name="addressId" :options options-id="address" label="Adresse" exact-option-required />
</template>
