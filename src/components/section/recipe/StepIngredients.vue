<script setup lang="ts">
import { computed } from "vue";
import { Check } from "@lucide/vue";
import { type RecipeDetails } from "@/composables/querys/recipeDetails.ts";
import { flattenIngredientGroups, formatScaledAmount, groupIngredientsByGroupPosition } from "@/lib/recipe.ts";

/**
 * Zutaten im Kochmodus, antippen zum Abhaken (gleiche Häkchen wie im Zutaten-Panel).
 * `layout="chips"`: kompakt im Schritt (Mobil), `layout="list"`: untereinander in der Seitenspalte (Desktop).
 *
 * Solange Zutaten noch keinem Schritt zugeordnet werden können (Backend-Issue #427), stehen hier alle
 * Zutaten des Rezepts. Danach nur noch die des Schritts filtern.
 */
const props = withDefaults(defineProps<{ recipe: RecipeDetails; portions: number; layout?: "chips" | "list" }>(), { layout: "chips" });
const checked = defineModel<string[]>("checked", { default: () => [] });

const ingredients = computed(() =>
  flattenIngredientGroups(groupIngredientsByGroupPosition(props.recipe.recipeProducts, props.recipe.recipeHeaderProducts)),
);
const hasGroups = computed(() => ingredients.value.some((entry) => entry.groupTitle));

const isChecked = (key: string) => checked.value.includes(key);
const toggle = (key: string) => {
  checked.value = isChecked(key) ? checked.value.filter((k) => k !== key) : [...checked.value, key];
};

/** Gruppentitel nur vor der ersten Zutat einer Gruppe */
const showGroupTitle = (index: number) => hasGroups.value && ingredients.value[index].groupTitle !== ingredients.value[index - 1]?.groupTitle;
</script>

<template>
  <section v-if="ingredients.length" aria-label="Zutaten" v-e2e="'cooking-step-ingredients'">
    <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
      Zutaten<template v-if="layout === 'list'"> · {{ checked.length }}/{{ ingredients.length }}</template>
    </p>
    <div :class="layout === 'list' ? 'flex flex-col gap-1.5' : 'flex flex-wrap items-center gap-2'">
      <template v-for="(entry, index) in ingredients" :key="entry.key">
        <span v-if="showGroupTitle(index)" class="basis-full text-xs font-semibold text-muted-foreground mt-2 first:mt-0">{{ entry.groupTitle }}</span>
        <button
          type="button"
          :aria-pressed="isChecked(entry.key)"
          :class="[
            'min-h-11 border pl-2 py-1.5 inline-flex items-center gap-2 text-base text-left transition-all active:scale-[0.98]',
            layout === 'list' ? 'w-full rounded-xl pr-3' : 'rounded-full pr-3.5',
            isChecked(entry.key) ? 'bg-recipe-basil-soft border-recipe-basil/50 text-muted-foreground' : 'bg-card border-border/70 hover:bg-accent',
          ]"
          @click="toggle(entry.key)"
        >
          <span
            :class="[
              'h-6 w-6 rounded-full flex items-center justify-center shrink-0 border',
              isChecked(entry.key) ? 'bg-recipe-basil border-recipe-basil text-white' : 'border-muted-foreground/40',
            ]"
          >
            <Check v-if="isChecked(entry.key)" class="h-3.5 w-3.5" />
          </span>
          <span :class="['min-w-0', isChecked(entry.key) ? 'line-through' : '']">
            <span class="font-semibold text-recipe-primary-fg">{{ formatScaledAmount(entry.item.amount, entry.item.unit, recipe.portions, portions) }}</span>
            {{ entry.item.product?.name }}
          </span>
        </button>
      </template>
    </div>
  </section>
</template>
