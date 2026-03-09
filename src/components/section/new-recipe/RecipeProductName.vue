<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { getSelectableOptions } from "@/composables/querys/options.ts";
import FormSelect from "@/components/shared/form/FormSelect.vue";

defineProps<{ index: number }>();

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
  <FormSelect label="" placeholder="Produkt wählen" :name="`productArray.${index}.productId`" :select-options="selectableOptions" />
</template>
