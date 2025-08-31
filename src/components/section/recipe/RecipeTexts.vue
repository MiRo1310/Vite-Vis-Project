<script setup lang="ts">
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import { getElementByPosition } from "@/components/section/new-recipe/utils";

type DescriptionType = NonNullable<GetRecipeDetailsQuery["recipe"]>["recipeDescriptions"];

defineProps<{ descriptions: DescriptionType }>();
</script>

<template>
  <div class="recipe__text-wrapper">
    <template v-for="(_, index) in descriptions" :key="index">
      <p class="recipe__header">{{ getElementByPosition(index + 1, descriptions)?.header }}</p>
      <p class="recipe__description">{{ getElementByPosition(index + 1, descriptions)?.text }}</p>
    </template>
  </div>
</template>

<style scoped lang="scss">
.recipe {
  &__text-wrapper {
    @apply w-[50%] border border-accent mb-4 p-2 rounded-lg bg-accent;
  }

  &__header {
    @apply font-bold text-accent-foreground mb-2 mt-2;
    @apply 2xl:text-2xl text-xl;

    @apply first:mt-0;
  }

  &__description {
    @apply w-full h-auto whitespace-pre-wrap;
    @apply text-base;
  }
}
</style>
