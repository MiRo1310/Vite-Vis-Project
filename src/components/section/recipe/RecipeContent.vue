<script setup lang="ts">
import { type GetRecipeDetailsQuery } from "@/api/gql/graphql";
import PageSection from "@/components/shared/page-section/PageSection.vue";
import RecipeTexts from "@/components/section/recipe/RecipeTexts.vue";
import RecipeIngredients from "@/components/section/recipe/RecipeIngredients.vue";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

defineProps<{ recipe?: GetRecipeDetailsQuery["recipe"] }>();
</script>

<template>
  <PageSection v-if="recipe">
    <!-- Desktop: side-by-side -->
    <div class="hidden md:flex gap-2 min-h-24">
      <RecipeTexts :descriptions="recipe.recipeDescriptions || []" />
      <RecipeIngredients :recipe />
    </div>

    <!-- Mobile: Tabs -->
    <Tabs default-value="zubereitung" class="md:hidden">
      <TabsList class="mb-3">
        <TabsTrigger value="zubereitung">Zubereitung</TabsTrigger>
        <TabsTrigger value="zutaten">Zutaten</TabsTrigger>
      </TabsList>
      <TabsContent value="zubereitung" class="space-y-3">
        <RecipeTexts :descriptions="recipe.recipeDescriptions || []" />
      </TabsContent>
      <TabsContent value="zutaten" class="space-y-3">
        <RecipeIngredients :recipe />
      </TabsContent>
    </Tabs>
  </PageSection>
</template>
