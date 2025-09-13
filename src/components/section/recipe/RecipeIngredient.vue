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
  <div class="ingredient__row">
    <div class="ingredient__row-header">
      <div class="ingredient__section">
        <div class="ingredient__text">
          <p class="ingredient__name">{{ ingredient?.product?.name }}</p>
          <p class="ingredient__description">{{ ingredient?.description }}</p>
        </div>
      </div>
      <div class="ingredient__badge-section">
        <Badge :value="calculatedAmount" :unit="ingredient?.unit" color="gray" class="ingredient__badge" />
        <Badge :value="calculatedKcal" unit="kcal" class="ingredient__badge" />
      </div>
    </div>

    <RecipeProductProperties v-if="ingredient.product" :product="ingredient.product" />
  </div>
</template>

<style scoped lang="scss">
.ingredient {
  &__row {
    @apply py-[2px] relative rounded-none m-0 bg-white;
    @apply border border-accent;
  }

  &__row-header {
    @apply flex justify-between;
  }

  &__section {
    @apply flex items-baseline space-x-4;
  }

  &__text {
    @apply ml-6 flex items-baseline space-x-4 min-w-80;
  }

  &__name {
    @apply text-muted-foreground text-sm;
  }

  &__description {
    @apply text-xs;
  }

  &__badge-section {
    @apply flex items-center gap-2 mr-1;
  }
}
</style>
