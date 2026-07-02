<script setup lang="ts">
import type { ITableColumn } from "@/types/types.js";
import type { TravelCostQuery } from "@/api/gql/graphql.js";
import { Checkbox } from "@/components/ui/checkbox";
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ITableColumn<boolean, TravelCostQuery["travelCost"][number]>>();
const checked = ref(props.value);

const { mutate } = useMutation(
  graphql(`
    mutation UpdateTravelCostIsValidated($id: UUID!, $isValidated: Boolean!) {
      updateTravelCost(dto: { id: $id, isValidated: $isValidated }) {
        id
        isValidated
      }
    }
  `),
);

const update = async (event: boolean) => {
  await mutate({ id: props.row.original.id, isValidated: event });
};
</script>

<template>
  <Checkbox
    v-model:checked="checked"
    :aria-label="`Select row ${props.row.index + 1}`"
    :class="['translate-y-0.5 isValid', { 'bg-green-600! border-green-300!': checked }]"
    @update:checked="update"
  />
</template>
