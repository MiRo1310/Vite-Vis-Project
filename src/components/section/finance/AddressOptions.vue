<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { graphql } from "@/api/gql";
import { type InputOption } from "@/types/types.ts";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";
import { getAddressOptions } from "@/lib/finance.ts";

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

const options = computed((): InputOption[] => getAddressOptions(result.value?.addresses));
</script>

<template>
  <FormInputOptions name="addressId" :options options-id="address" label="Adresse" exact-option-required />
</template>
