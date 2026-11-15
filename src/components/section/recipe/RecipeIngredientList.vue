<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronDown, ShoppingBasket } from "@lucide/vue";
import { Checkbox } from "@/components/ui/checkbox";
import RecipeIngredientNutrients from "@/components/section/recipe/RecipeIngredientNutrients.vue";
import { type RecipeDetails, type RecipeIngredient } from "@/composables/querys/recipeDetails.ts";
import { formatAmount, groupIngredientsByGroupPosition, scaleAmount } from "@/lib/recipe.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";

const props = withDefaults(
  defineProps<{
    recipe: RecipeDetails;
    /** Gewünschte Portionen – Mengen und kcal werden darauf umgerechnet */
    portions: number;
    /** Nährwerte je Zutat aufklappbar (im Kochmodus aus) */
    showNutrients?: boolean;
    /** Produktnamen, die schon auf der Einkaufsliste stehen */
    onShoppingList?: ReadonlySet<string>;
  }>(),
  { showNutrients: true, onShoppingList: () => new Set<string>() },
);

/** Schlüssel der abgehakten Zutaten (`<Gruppe>-<Index>`) */
const checked = defineModel<string[]>("checked", { default: () => [] });

const groups = computed(() => groupIngredientsByGroupPosition(props.recipe.recipeProducts, props.recipe.recipeHeaderProducts));

const keyOf = (position: number, index: number) => `${position}-${index}`;
const isChecked = (key: string) => checked.value.includes(key);

const toggle = (key: string) => {
  if (isChecked(key)) {
    checked.value = checked.value.filter((k) => k !== key);
    return;
  }
  checked.value = [...checked.value, key];
};

const expanded = ref<string | null>(null);
const toggleExpanded = (key: string) => {
  expanded.value = expanded.value === key ? null : key;
};

const amountText = (ingredient: RecipeIngredient) => {
  const amount = formatAmount(scaleAmount(ingredient.amount, props.recipe.portions, props.portions));
  return [amount, ingredient.unit].filter(Boolean).join(" ");
};

const kcalText = (ingredient: RecipeIngredient) => {
  const kcal = scaleAmount(ingredient.kcal, props.recipe.portions, props.portions);
  if (!kcal) {
    return "";
  }
  return `${Math.round(kcal)} kcal`;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="group in groups" :key="group.position">
      <p v-if="group.title" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{{ group.title }}</p>
      <ul class="divide-y divide-border/60">
        <li v-for="(ingredient, index) in group.items" :key="keyOf(group.position, index)" class="py-1" v-e2e="'recipe-ingredient'">
          <div class="flex items-center gap-3 min-h-11">
            <Checkbox
              :id="`ingredient-${keyOf(group.position, index)}`"
              :model-value="isChecked(keyOf(group.position, index))"
              class="h-5 w-5 rounded-md border-muted-foreground/40 data-[state=checked]:bg-recipe-basil data-[state=checked]:border-recipe-basil data-[state=checked]:text-white"
              @update:model-value="toggle(keyOf(group.position, index))"
            />
            <label
              :for="`ingredient-${keyOf(group.position, index)}`"
              class="flex-1 min-w-0 cursor-pointer select-none transition-opacity"
              :class="isChecked(keyOf(group.position, index)) ? 'opacity-45 line-through' : ''"
            >
              <span v-if="amountText(ingredient)" :class="['font-semibold mr-1.5 tabular-nums', recipeAccentClasses.primary.text]">{{ amountText(ingredient) }}</span>
              <span class="font-medium">{{ ingredient.product?.name }}</span>
              <ShoppingBasket
                v-if="ingredient.product && onShoppingList.has(ingredient.product.name)"
                class="inline h-3.5 w-3.5 ml-1.5 -mt-0.5 text-recipe-teal-fg"
                aria-label="steht auf der Einkaufsliste"
              />
              <span v-if="ingredient.description" class="block text-xs text-muted-foreground mt-0.5">{{ ingredient.description }}</span>
            </label>
            <span v-if="kcalText(ingredient)" class="text-xs text-muted-foreground tabular-nums shrink-0">{{ kcalText(ingredient) }}</span>
            <button
              v-if="showNutrients && ingredient.product"
              type="button"
              class="h-9 w-9 -mr-2 rounded-full flex items-center justify-center text-muted-foreground hover:bg-accent shrink-0"
              :aria-expanded="expanded === keyOf(group.position, index)"
              aria-label="Nährwerte anzeigen"
              @click="toggleExpanded(keyOf(group.position, index))"
            >
              <ChevronDown :class="['h-4 w-4 transition-transform', expanded === keyOf(group.position, index) ? 'rotate-180' : '']" />
            </button>
          </div>
          <RecipeIngredientNutrients
            v-if="showNutrients && ingredient.product && expanded === keyOf(group.position, index)"
            :product="ingredient.product"
            :product-id="ingredient.productId"
            class="mb-2 ml-8"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
