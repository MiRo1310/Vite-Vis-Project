<script setup lang="ts">
import { Input } from "@/components/shared/input";
import { useQuery } from "@vue/apollo-composable";
import { computed, watch, ref } from "vue";
import { InputOptions } from "@/components/shared/input/Input.vue";
import { graphql } from "@/api/gql";
import Select from "@/components/shared/select/Select.vue";
import { SelectOption } from "@/types/types.ts";

defineProps<{ asSelect?: boolean }>();

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

const options = computed((): InputOptions[] => {
  const descriptions = result.value?.description ?? [];

  const filteredDescriptions = descriptions.filter((d) => d.text && d.id);

  return filteredDescriptions.map((d) => {
    return {
      name: d.text,
      id: d.id,
    };
  });
});

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
  <Select v-if="asSelect" :items="selectOptions" v-model="modelValue" placeholder="Wähle eine Beschreibung" :selected class="w-48" />
  <Input
    v-else
    type="text"
    placeholder="Beschreibung"
    class="add-listing__input"
    :options
    options-id="description"
    v-model:model-value="modelValue"
  />
</template>
