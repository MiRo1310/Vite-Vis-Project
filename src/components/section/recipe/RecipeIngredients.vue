<script setup lang="ts">
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import { sortedHeaders } from "@/lib/object";
import RecipeIngredient from "@/components/section/recipe/RecipeIngredient.vue";
import Input from "@/components/ui/input/InputShadcn.vue";
import { computed, ref } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { translation } from "@/lib/translation";

type RecipeType = GetRecipeDetailsQuery["recipe"];

const props = defineProps<{ recipe: RecipeType }>();

const customPortions = ref(props.recipe?.portions ?? 1);
const portions = ref(props.recipe?.portions ?? 1);

const filteredIngredients = computed(
  () => (index: number) => props.recipe?.recipeProducts.filter((ingredient) => ingredient.groupPosition === index + 1),
);

const getTotalKcal = computed(() => ((props.recipe?.totalKcal ?? 0) / customPortions.value).toFixed(2));

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
  <div class="ingredients">
    <h2 class="ingredients__title">Zutaten für {{ portions }} Portionen</h2>
    <div class="ingredients__header">
      <div class="ingredients__input-wrapper">
        <Input v-model:model-value="customPortions" class="ingredients__portion-input" type="number" />
        <label>Portionen anpassen</label>
      </div>
      <div>
        <label class="ingredients__header-badge-label">Gesamt Kalorien pro Portion</label>
        <Badge :value="getTotalKcal" unit="kcal" />
      </div>
    </div>
    <div v-for="(_, index) in getIngredientGroupLength" :key="index">
      <div class="ingredients__section">
        <p v-if="recipe?.recipeHeaderProducts" class="ingredients__section-title">
          {{ sortedHeaders(recipe.recipeHeaderProducts)?.[index]?.text }}
        </p>
        <Badge :value="(getTotalKcalForSection(index) * (customPortions / portions)).toFixed(2)" :unit="translation('recipe.ingredient.badgeUnit')" />
      </div>
      <div v-for="(ingredient, i) in filteredIngredients(index)" :key="i">
        <RecipeIngredient v-if="ingredient" :ingredient :custom-portions :portions />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ingredients {
  @apply flex-1 max-w-full overflow-y-auto;
}
.ingredients__title {
  @apply font-bold text-xl;
}
.ingredients__header {
  @apply flex items-center justify-between mt-2 mr-1;
}
.ingredients__header-badge-label {
  @apply mr-2;
}
.ingredients__input-wrapper {
  @apply flex items-center space-x-2;
}
.ingredients__portion-input {
  @apply bg-white w-16;
}
.ingredients__section {
  @apply mt-2 mb-1 h-8 flex items-center justify-between bg-white/70 px-1 py-1;
}
.ingredients__section-title {
  @apply font-semibold underline;
}
</style>
