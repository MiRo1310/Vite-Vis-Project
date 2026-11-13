<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { graphql } from "@/api/gql";
import { type SelectOption } from "@/types/types.ts";
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { getDescriptionOptions } from "@/lib/finance.ts";

const { result } = useQuery(
  graphql(`
    query DescriptionsListing {
      description {
        id
        text
      }
    }
  `),
);

const descriptionOptions = computed((): SelectOption[] => getDescriptionOptions(result.value?.description));

const modelValue = defineModel<string>();
</script>

<template>
  <FormSelect label="Wähle eine Beschreibung" name="descriptionHelper" :select-options="descriptionOptions" v-model="modelValue" class="w-48" />
</template>
