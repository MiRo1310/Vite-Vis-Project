<script setup lang="ts">
import { type GetRecipeDetailsQuery } from "@/api/gql/graphql";
import RecipeIngredient from "@/components/section/recipe/RecipeIngredient.vue";
import Input from "@/components/shared/input/Input.vue";
import { computed, ref } from "vue";

type RecipeType = GetRecipeDetailsQuery["recipe"];

const props = defineProps<{ recipe: RecipeType }>();

const customPortions = ref(props.recipe?.portions ?? 1);
const portions = ref(props.recipe?.portions ?? 1);

const getTotalKcal = computed(() => Math.ceil((props.recipe?.totalKcal ?? 0) / portions.value));

const getTotalKcalForSection = computed(
  () =>
    (ingredients: NonNullable<RecipeType>["recipeProducts"]): number =>
      ingredients.reduce((acc, curr) => {
        return acc + curr.kcal;
      }, 0),
);

const groupByGroupPosition = computed(() => {
  const groups: Record<number, NonNullable<RecipeType>["recipeProducts"]> = {};
  props.recipe?.recipeProducts.forEach((ingredient) => {
    const groupPosition = ingredient.groupPosition;
    if (!(groupPosition in groups)) {
      groups[groupPosition] = [];
    }
    groups[groupPosition].push(ingredient);
  });
  return groups;
});
</script>

<template>
  <div class="flex-1 max-w-full overflow-y-auto">
    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-3">Zutaten</p>

    <div class="flex items-center justify-between gap-3 bg-muted/40 rounded-lg px-3 py-2.5 mb-4">
      <div class="flex items-center gap-2">
        <Input v-model:model-value="customPortions" class="w-16 h-7 text-center" type="number" />
        <span class="text-sm text-muted-foreground">Portionen</span>
      </div>
      <div class="text-right">
        <p class="text-xs text-muted-foreground leading-none mb-0.5">Gesamt</p>
        <p class="text-sm font-semibold">{{ getTotalKcal }} kcal</p>
      </div>
    </div>

    <div v-for="(ingredients, index) in Object.values(groupByGroupPosition)" :key="index" class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <p v-if="recipe?.recipeHeaderProducts" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {{ recipe.recipeHeaderProducts.find((h) => h.position === index)?.text || `Gruppe ${index + 1}` }}
        </p>
        <span class="text-xs text-muted-foreground">{{ Math.ceil(getTotalKcalForSection(ingredients) / portions) }} kcal/P</span>
      </div>
      <div class="rounded-lg border border-border/60 overflow-hidden">
        <template v-for="(ingredient, i) in ingredients" :key="i">
          <RecipeIngredient v-if="ingredient" :ingredient :custom-portions :portions />
        </template>
      </div>
    </div>
  </div>
</template>
