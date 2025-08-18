<script setup lang="ts">
import { useProducts } from "@/composable/querys/products";
import RecipeProductProperties from "@/components/section/recipe/RecipeProductProperties.vue";
import { computed } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { translation } from "@/lib/translation";
import { GetRecipeByIdQuery, ProductsQuery } from "@/api/gql/graphql";

type Ingredient = NonNullable<GetRecipeByIdQuery["recipe"]>["recipeProducts"][number];

const props = defineProps<{ ingredient: Ingredient; customPortions: number; portions: number }>();

const { getProductResultById, getProductNameById } = useProducts();

const calculatedAmount = computed(() => {
  return props.ingredient.amount ? ((props.ingredient.amount / props.portions) * props.customPortions).toFixed(2) : 0;
});

const result = computed((): ProductsQuery["products"][number]  => {
  if (props.ingredient.productId) {
    return getProductResultById(props.ingredient.productId) ?? ({} as ProductsQuery["products"][number]);
  }
  return {} as ProductsQuery["products"][number];
});

const calculatedKcal = computed(() => {
  const product = result.value;
  if (product.kcal && product.amount) {
    const kcal = (product.kcal / product.amount) * (props.ingredient.factor || 1) * Number(calculatedAmount.value);
    updateVal(kcal);
    return kcal;
  }
  return "N/A";
});

const updateVal = (kcal: number): void => {
  calcKcal.value = kcal;
};

const calcKcal = defineModel<number>("calcKcal");
</script>

<template>
  <div class="ingredient__row">
    <div class="ingredient__row-header">
      <div class="ingredient__section">
        <div class="ingredient__text">
          <p v-if="result?.id" class="ingredient__name">{{ getProductNameById(result.id) }}</p>
          <p class="ingredient__description">{{ ingredient?.description }}</p>
        </div>
        <Badge :val="calculatedAmount" :unit="ingredient?.unit" color="gray" class="ingredient__badge" />
      </div>
      <div>
        <Badge
          :val="typeof calculatedKcal === 'number' ? calculatedKcal.toFixed(2) : calculatedKcal"
          :unit="translation('recipe.ingredient.badgeUnit2')"
          class="ingredient__badge"
        />
      </div>
    </div>

    <RecipeProductProperties v-if="ingredient.productId" :product-id="ingredient.productId" />
  </div>
</template>

<style scoped lang="scss">
.ingredient {
  &__row {
    @apply p-[2px] relative rounded-none m-0 bg-white;
    @apply border border-accent;
  }

  &__row-header {
    @apply flex justify-between;
  }

  &__section {
    @apply flex items-baseline space-x-4;
  }

  &__text {
    @apply flex items-baseline space-x-4 min-w-80;
  }

  &__name {
    @apply text-muted-foreground text-sm;
  }

  &__description {
    @apply text-xs;
  }

  &__badge {
    @apply mr-10;
  }
}
</style>
