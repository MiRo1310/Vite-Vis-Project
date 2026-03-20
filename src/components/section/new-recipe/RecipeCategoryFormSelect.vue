<script setup lang="ts">
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { computed } from "vue";
import { SelectOption } from "@/types/types.ts";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";

const { result } = useQuery(
  graphql(`
    query getRecipeCategories {
      recipeCategories {
        name
        id
      }
    }
  `),
);

const options = computed(() => {
  return (
    result?.value?.recipeCategories.map((category) => ({
      label: category.name,
      value: category.id,
    })) ?? ([] as SelectOption[])
  );
});
</script>

<template>
  <FormSelect
    label="Kategorie"
    name="recipeCategoryId"
    :select-options="options"
    class="flex-1"
    placeholder="Wähle eine Rezept-Kategorie"
    :disabled="!options.length"
  />
</template>
