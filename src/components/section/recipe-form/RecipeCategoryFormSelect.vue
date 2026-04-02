<script setup lang="ts">
import FormSelect from "@/components/shared/form/FormSelect.vue";
import { computed } from "vue";
import { SelectOption } from "@/types/types.ts";
import { useRecipeCategories } from "@/composables/querys/recipeCategories.ts";

const { result } = useRecipeCategories();

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
