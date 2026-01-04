<script setup lang="ts">
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import PageSection from "@/components/shared/page-section/PageSection.vue";
import RecipeTexts from "@/components/section/recipe/RecipeTexts.vue";
import RecipeIngredients from "@/components/section/recipe/RecipeIngredients.vue";
import { Card } from "@/components/shared/card";

defineProps<{ recipe?: GetRecipeDetailsQuery["recipe"] }>();
</script>

<template>
  <Card>
    <PageSection v-if="recipe" class="flex w-full space-x-2 p-2 min-h-24 rounded-lg">
      <RecipeTexts :descriptions="recipe?.recipeDescriptions || []" />
      <RecipeIngredients :recipe />
    </PageSection>
  </Card>
</template>
