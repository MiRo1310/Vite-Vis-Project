<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";

defineProps<{ id?: string; name?: string }>();

const { result } = useQuery(
  graphql(`
    query productUnits {
      productUnits {
        id
        unit
      }
    }
  `),
);
</script>

<template>
  <span v-if="name && result?.productUnits">{{ result.productUnits.find((u) => u.unit === name)?.id }}</span>
  <span v-if="id && result?.productUnits">{{ result.productUnits.find((u) => u.id === id)?.unit }}</span>
</template>
