<script setup lang="ts">
import type { ITableColumn } from "@/types/types.js";
import type { TravelCostQuery } from "@/api/gql/graphql.js";
import { Checkbox } from "@/components/ui/checkbox";
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Logger } from "@/lib/logger.ts";
import { useToast } from "@/components/ui/toast";
import { texts } from "@/text/de.ts";

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ITableColumn<boolean, TravelCostQuery["travelCost"][number]>>();
const checked = ref(props.value);
const { toast } = useToast();

const { mutate, onError } = useMutation(
  graphql(`
    mutation UpdateTravelCostCheckboxes($id: UUID!, $isValidated: Boolean, $hasInvoice: Boolean) {
      updateTravelCost(dto: { id: $id, isValidated: $isValidated, hasInvoice: $hasInvoice }) {
        id
        isValidated
        hasInvoice
      }
    }
  `),
  { refetchQueries: ["TravelCost"] },
);

const update = async (event: boolean | "indeterminate") => {
  if (props.source === "isValidated") {
    await mutate({ id: props.row.original.id, isValidated: !!event });
  } else if (props.source === "hasInvoice") {
    await mutate({ id: props.row.original.id, hasInvoice: !!event });
  }
};

onError((error) => {
  Logger.error("Error updating travel cost checkbox:", error);
  toast({ title: "Fehler", description: texts.finance.listing.errorUpdateCheckbox, variant: "destructive" });
  checked.value = props.value;
});
</script>

<template>
  <Checkbox
    v-model="checked"
    :aria-label="`Select row ${props.row.index + 1}`"
    :class="['translate-y-0.5', source, { 'bg-green-600! border-green-300!': checked && source === 'isValidated' }]"
    @update:model-value="update"
    :e2e="`${source}-checkbox`"
  />
</template>
