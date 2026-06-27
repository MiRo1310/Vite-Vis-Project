<script setup lang="ts">
import RecipeProductProperties from "@/components/section/recipe/RecipeProductProperties.vue";
import { computed } from "vue";
import { type GetRecipeDetailsQuery } from "@/api/gql/graphql";
import { routes } from "@/router/routes.ts";

type Ingredient = NonNullable<GetRecipeDetailsQuery["recipe"]>["recipeProducts"][number];

const props = defineProps<{ ingredient: Ingredient; customPortions: number; portions: number }>();

const faktor = computed(() => props.customPortions / props.portions);

const calculatedAmount = computed(() => {
  return props.ingredient.amount ? (props.ingredient.amount * faktor.value).toFixed(2) : 0;
});

const calculatedKcal = computed(() => {
  return props.ingredient.kcal ? (props.ingredient.kcal * faktor.value).toFixed(0) : 0;
});
</script>

<template>
  <div class="py-1 px-3 relative border-b border-border/50 last:border-0 bg-card">
    <div class="flex items-start justify-between gap-2 pl-5">
      <div class="min-w-0">
        <RouterLink :to="{ name: routes.products.name, query: { productId: ingredient.productId } }" class="inline-flex">
          <span class="text-sm font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{{ ingredient?.product?.name }}</span>
        </RouterLink>
        <p v-if="ingredient?.description" class="text-xs text-muted-foreground mt-0.5">{{ ingredient?.description }}</p>
      </div>
      <div class="flex items-baseline gap-2 shrink-0">
        <span class="text-sm font-semibold text-orange-600 dark:text-orange-400">{{ calculatedAmount }} {{ ingredient?.unit }}</span>
        <span class="text-xs text-muted-foreground">{{ calculatedKcal }} kcal</span>
      </div>
    </div>
    <RecipeProductProperties v-if="ingredient.product" :product="ingredient.product" />
  </div>
</template>
