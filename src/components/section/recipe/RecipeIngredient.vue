<script setup lang="ts">
import RecipeProductProperties from "@/components/section/recipe/RecipeProductProperties.vue";
import { computed } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";

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
  <div class="py-[2px] relative rounded-none m-0 bg-white border border-accent">
    <div class="flex justify-between">
      <div class="flex items-baseline space-x-4">
        <div class="ml-6 flex items-baseline space-x-4 min-w-80">
          <p class="text-muted-foreground text-sm">{{ ingredient?.product?.name }}</p>
          <p class="text-xs">{{ ingredient?.description }}</p>
        </div>
      </div>
      <div class="flex items-baseline space-x-4">
        <Badge :value="calculatedAmount" :unit="ingredient?.unit" color="gray" class="ingredient__badge" />
        <Badge :value="calculatedKcal" unit="kcal" class="ingredient__badge" />
      </div>
    </div>

    <RecipeProductProperties v-if="ingredient.product" :product="ingredient.product" />
  </div>
</template>
