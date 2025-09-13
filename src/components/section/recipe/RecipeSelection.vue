<script setup lang="ts">
import SelectCard from "@/components/shared/select/SelectCard.vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { computed, HTMLAttributes, onMounted, watchEffect } from "vue";
import { SelectOption } from "@/types/types";
import { graphql } from "@/api/gql";

defineProps<{ class?: HTMLAttributes["class"] }>();

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
  if (result.value?.recipes) {
    return result.value.recipes
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
  }
  return [] as SelectOption[];
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
  <SelectCard v-model:model-value="selected" :options placeholder="Wähle ein Rezept aus" :class="['recipe__select', $props.class]" />
</template>
