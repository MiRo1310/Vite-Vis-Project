<script setup lang="ts">
import { Input } from "@/components/shared/input";
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { InputOptions } from "@/components/shared/input/Input.vue";
import { graphql } from "@/api/gql";

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

const modelValue = defineModel<string>();
</script>

<template>
  <Input
    type="text"
    placeholder="Beschreibung"
    class="add-listing__input"
    name="Test"
    :options
    options-id="description"
    v-model:model-value="modelValue"
  />
</template>

<style scoped lang="scss"></style>
