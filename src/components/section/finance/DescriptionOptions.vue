<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { computed, ref, watch } from "vue";
import { graphql } from "@/api/gql";
import { SelectOption } from "@/types/types.ts";
import FormSelect from "@/components/shared/form/FormSelect.vue";

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

const selectOptions = computed((): SelectOption[] => {
  const descriptions = result.value?.description ?? [];

  return descriptions.map((d) => {
    return {
      label: d.text,
      value: d.text,
    };
  });
});

const modelValue = defineModel<string>();

watch(modelValue, () => {
  if (modelValue.value === "") {
    selected.value = "";
  }
});
const selected = ref("");
</script>

<template>
  <FormSelect label="Wähle eine Beschreibung" name="descriptionHelper" :select-options="selectOptions" v-model="modelValue" class="w-48" />
</template>
