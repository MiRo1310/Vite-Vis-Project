<script setup lang="ts">
import { useLazyQuery } from "@vue/apollo-composable";
import { computed, onMounted, watchEffect } from "vue";
import { SelectOption } from "@/types/types";
import { graphql } from "@/api/gql";
import Select from "@/components/shared/select/Select.vue";

const { result, load, refetch } = useLazyQuery(
  graphql(`
    query recipes {
      recipes {
        id
        name
      }
    }
  `),
);

const selected = defineModel<string>("selected");
const selectedName = defineModel<string | undefined>("selectedName");

const options = computed((): SelectOption[] => {
  const recipes = result.value?.recipes;
  if (!recipes) {
    return [] as SelectOption[];
  }
  return recipes
    .map((recipe) => {
      if (recipe.name && recipe.id) {
        return {
          label: recipe.name,
          value: recipe.id,
        };
      }
      return { label: "", value: "" };
    })
    .filter((recipe) => recipe.label !== "")
    .sort((a, b) => a.label.localeCompare(b.label));
});

onMounted(async () => {
  await load();
  await refetch();
});

watchEffect(() => {
  const option: SelectOption | undefined = options.value.find((option: SelectOption): boolean => {
    return option.value === selected.value;
  });

  if (option) {
    selectedName.value = option.label;
  }
});
</script>
<template>
  <Select v-model:model-value="selected" :items="options" placeholder="Wähle ein Rezept aus" />
</template>
