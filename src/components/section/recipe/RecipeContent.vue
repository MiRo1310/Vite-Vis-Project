<script setup lang="ts">
import { GetRecipeByIdQuery } from "@/api/gql/graphql";
import PageSection from "@/components/shared/page-section/PageSection.vue";
import RecipeTexts from "@/components/section/recipe/RecipeTexts.vue";
import RecipeIngredients from "@/components/section/recipe/RecipeIngredients.vue";

defineProps<{ resultRecipeById?: GetRecipeByIdQuery }>();
</script>

<template>
  <PageSection v-if="resultRecipeById?.recipe" class="recipe__content-wrapper">
    <RecipeTexts :descriptions="resultRecipeById?.recipe?.recipeDescriptions || []" />
    <RecipeIngredients
      :ingredients="resultRecipeById.recipe.recipeProducts || []"
      :headers="resultRecipeById.recipe.recipeHeaderProducts || []"
      :portions="resultRecipeById.recipe.portions || 1"
    />
  </PageSection>
</template>

<style scoped>
.recipe__content-wrapper {
  @apply flex w-full space-x-2 p-2 min-h-24 rounded-lg bg-primary-brown-lightest/90;
}
</style>
