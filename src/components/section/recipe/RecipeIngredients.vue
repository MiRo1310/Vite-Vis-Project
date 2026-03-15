<script setup lang="ts">
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import RecipeIngredient from "@/components/section/recipe/RecipeIngredient.vue";
import Input from "@/components/shared/input/Input.vue";
import { computed, ref } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";

type RecipeType = GetRecipeDetailsQuery["recipe"];

const props = defineProps<{ recipe: RecipeType }>();

const customPortions = ref(props.recipe?.portions ?? 1);
const portions = ref(props.recipe?.portions ?? 1);

const getTotalKcal = computed(() => ((props.recipe?.totalKcal ?? 0) / portions.value).toFixed(2));

const getTotalKcalForSection = computed(
  () =>
    (ingredients: NonNullable<RecipeType>["recipeProducts"]): number =>
      ingredients.reduce((acc, curr) => {
        return acc + (curr.kcal ?? 0);
      }, 0) ?? 0,
);

const groupByGroupPosition = computed(() => {
  const groups: Record<number, NonNullable<RecipeType>["recipeProducts"]> = {};
  props.recipe?.recipeProducts.forEach((ingredient) => {
    const groupPosition = ingredient.groupPosition ?? 0;
    if (!groups[groupPosition]) {
      groups[groupPosition] = [];
    }
    groups[groupPosition].push(ingredient);
  });
  return groups;
});
</script>

<template>
  <div class="flex-1 max-w-full overflow-y-auto" v-component="'RecipeIngredients'">
    <h2 class="font-bold text-xl">Zutaten für {{ portions }} Portionen</h2>
    <div class="flex items-center justify-between mt-2 mr-1">
      <div class="flex items-center space-x-2">
        <Input v-model:model-value="customPortions" class="w-16" type="number" />
        <label>Portionen anpassen</label>
      </div>
      <div>
        <label class="mr-2">Gesamt Kalorien pro Portion</label>
        <Badge :value="getTotalKcal" unit="kcal/p" />
      </div>
    </div>
    <div v-for="(ingredients, index) in Object.values(groupByGroupPosition)" :key="index">
      <div class="mt-2 mb-1 h-8 flex items-center justify-between bg-popover px-1 py-1">
        <p v-if="recipe?.recipeHeaderProducts" class="font-semibold underline">
          {{ recipe.recipeHeaderProducts.find((h) => h.position === index)?.text }}
        </p>
        <Badge :value="getTotalKcalForSection(ingredients) / portions" unit="kcal/p" />
      </div>
      <div v-for="(ingredient, i) in ingredients" :key="i">
        <RecipeIngredient v-if="ingredient" :ingredient :custom-portions :portions />
      </div>
    </div>
  </div>
</template>
