<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import FormInputOptions from "@/components/shared/form/FormInputOptions.vue";
import { InputOption } from "@/types/types.ts";

const { result } = useQuery(
  graphql(`
    query GetProductsForSelect {
      products {
        id
        name
        productCategory {
          name
        }
      }
    }
  `),
);

const selectableOptions = computed(
  (): InputOption[] =>
    result.value?.products
      ?.map((o) => ({ name: o.name ?? o.id, value: o.id, description: o.productCategory?.name }))
      .sort((a, b) => a.name.localeCompare(b.name)) ?? [],
);
</script>

<template>
  <FormInputOptions label="Produkt" name="productId" type="text" exact-option-required :options="selectableOptions" options-id="units" />
</template>
