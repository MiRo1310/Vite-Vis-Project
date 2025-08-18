<script setup lang="ts">
import { GetRecipeByIdQuery } from "@/api/gql/graphql";
import { sortedHeaders } from "@/lib/object";
import RecipeIngredient from "@/components/section/recipe/RecipeIngredient.vue";
import Input from "@/components/ui/input/InputShadcn.vue";
import { computed, ref, watch } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { translation } from "@/lib/translation";

type Ingredient = NonNullable<GetRecipeByIdQuery["recipe"]>["recipeProducts"];
type Headers = NonNullable<GetRecipeByIdQuery["recipe"]>["recipeHeaderProducts"];

const props = defineProps<{ ingredients: Ingredient; headers: Headers; portions: number }>();

const calcKcal = ref<Record<number, number[] | undefined>>({});

const updateKcal = ({ kcal, index, i }: { kcal?: number; index: number; i: number }) => {
  if (!calcKcal.value[index]) {
    calcKcal.value[index] = [];
  }
  if (!kcal) {
    return;
  }

  calcKcal.value[index][i] = kcal;
};

const customPortions = ref(props.portions);

const filteredIngredients = computed(() => (index: number) => {
  return props.ingredients.filter((ingredient) => ingredient.groupPosition === index + 1);
});

const getTotalKcal = computed(() => {
  return (
    Object.values(calcKcal.value).reduce((kcal, value) => {
      if (value?.length) {
        return kcal + value.reduce((acc, item) => acc + item, 0);
      }
      return kcal;
    }, 0) / customPortions.value
  ).toFixed(2);
});

const getTotalKcalForSection = computed(
  () =>
    (index: number): number =>
      calcKcal.value[index]?.reduce((acc, curr) => acc + curr, 0) ?? 0,
);

watch(
  () => props.portions,
  () => {
    customPortions.value = props.portions;
  },
);

const getIngredientGroupLength = computed(() => {
  return props.ingredients.reduce((acc, curr) => {
    if (curr.groupPosition && curr.groupPosition > acc) {
      return curr.groupPosition;
    }
    return acc;
  }, 0);
});
</script>

<template>
  <div class="ingredients">
    <h2 class="ingredients__title">{{ translation("recipe.ingredient.title", { portions }) }}</h2>
    <div class="ingredients__header">
      <div class="ingredients__input-wrapper">
        <Input v-model:model-value="customPortions" class="ingredients__portion-input" type="number" />
        <label>{{ translation("recipe.ingredient.inputLabel") }}</label>
      </div>
      <div>
        <label class="ingredients__header-badge-label">{{ translation("recipe.ingredient.badgeLabel") }}</label>
        <Badge :value="getTotalKcal" :unit="translation('recipe.ingredient.badgeUnit')" />
      </div>
    </div>
    <div v-for="(_, index) in getIngredientGroupLength" :key="index">
      <div class="ingredients__section">
        <p class="ingredients__section-title">{{ sortedHeaders(headers)[index]?.text }}</p>
        <Badge
          v-if="getTotalKcalForSection(index) > 0"
          :value="(getTotalKcalForSection(index) / customPortions).toFixed(2)"
          :unit="translation('recipe.ingredient.badgeUnit')"
        />
      </div>
      <div v-for="(ingredient, i) in filteredIngredients(index)" :key="i">
        <RecipeIngredient
          v-if="ingredient"
          :ingredient
          :custom-portions
          :portions
          @update:calc-kcal="updateKcal({ kcal: $event, index: index, i: i })"
        />
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
  @apply flex items-center justify-between mt-2 mr-2;
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
  @apply mt-2 mb-1 flex items-center justify-between bg-white/70 px-2 py-1;
}
.ingredients__section-title {
  @apply font-semibold underline;
}
</style>
