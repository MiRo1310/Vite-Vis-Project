<script setup lang="ts">
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import { sortedHeaders } from "@/lib/object";
import RecipeIngredient from "@/components/section/recipe/RecipeIngredient.vue";
import Input from "@/components/shared/input/Input.vue";
import { computed, ref } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";

type RecipeType = GetRecipeDetailsQuery["recipe"];

const props = defineProps<{ recipe: RecipeType }>();

const customPortions = ref(props.recipe?.portions ?? 1);
const portions = ref(props.recipe?.portions ?? 1);

const filteredIngredients = computed(
  () => (index: number) => props.recipe?.recipeProducts.filter((ingredient) => ingredient.groupPosition === index + 1),
);

const getTotalKcal = computed(() => ((props.recipe?.totalKcal ?? 0) / portions.value).toFixed(2));

const getTotalKcalForSection = computed(
  () =>
    (index: number): number =>
      props.recipe?.recipeProducts.reduce((acc, curr) => {
        if (curr.groupPosition == index + 1) {
          return acc + (curr.kcal ?? 0);
        }
        return acc;
      }, 0) ?? 0,
);

const getIngredientGroupLength = computed(() => {
  return props.recipe?.recipeProducts.reduce((acc, curr) => {
    if (curr.groupPosition && curr.groupPosition > acc) {
      return curr.groupPosition;
    }
    return acc;
  }, 0);
});
</script>

<template>
  <div class="flex-1 max-w-full overflow-y-auto">
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
    <div v-for="index in getIngredientGroupLength" :key="index">
      <div class="mt-2 mb-1 h-8 flex items-center justify-between bg-popover px-1 py-1">
        <p v-if="recipe?.recipeHeaderProducts" class="font-semibold underline">
          {{ sortedHeaders(recipe.recipeHeaderProducts)?.[index]?.text }}
        </p>
        <Badge :value="(getTotalKcalForSection(index) / portions).toFixed(2)" unit="kcal/p" />
      </div>
      <div v-for="(ingredient, i) in filteredIngredients(index)" :key="i">
        <RecipeIngredient v-if="ingredient" :ingredient :custom-portions :portions />
      </div>
    </div>
  </div>
</template>
