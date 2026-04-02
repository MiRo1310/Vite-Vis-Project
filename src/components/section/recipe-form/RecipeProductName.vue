<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { getSelectableOptions } from "@/composables/querys/options.ts";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";

const { result } = useQuery(
  graphql(`
    query GetProductsForSelect {
      products {
        id
        name
      }
    }
  `),
);

const selectableOptions = computed(() => getSelectableOptions(result.value?.products));
</script>

<template>
  <FormInputOptions
    label="Produkt"
    name="productId"
    type="text"
    exact-option-required
    :options="selectableOptions.map((o) => ({ name: o.label ?? o.value, value: o.value }))"
    options-id="units"
  />
</template>
