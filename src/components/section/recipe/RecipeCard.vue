<script setup lang="ts">
import { computed } from "vue";
import { Heart, UtensilsCrossed } from "@lucide/vue";
import { Card } from "@/components/ui/card";
import RecipeMetaInfo from "@/components/section/recipe/RecipeMetaInfo.vue";
import { getCategoryColor, getRecipeCategoryName, getRecipeTime, kcalPerPortion, type RecipeListItem } from "@/lib/recipe.ts";
import { RECIPE_UNCATEGORIZED, recipeAccentClasses } from "@/constants/recipe.ts";
import { routes } from "@/router/routes.ts";

const props = withDefaults(defineProps<{ recipe: RecipeListItem; compact?: boolean }>(), { compact: false });
const emits = defineEmits<{ open: [] }>();

const categoryName = computed(() => getRecipeCategoryName(props.recipe));
const accent = computed(() => recipeAccentClasses[getCategoryColor(props.recipe.recipeCategory?.name)]);
const kcal = computed(() => kcalPerPortion(props.recipe.totalKcal, props.recipe.portions));
</script>

<template>
  <Card
    class="relative py-0 gap-0 overflow-hidden group border-border/60 hover:shadow-lg hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-ring transition-all duration-200 h-full"
    v-e2e="'recipe-card'"
  >
    <!-- Bildfläche: vorerst Verlauf in der Kategoriefarbe (Bilder kommen mit Backend-Issue #420) -->
    <div :class="['relative bg-linear-to-br flex items-center justify-center', accent.gradient, compact ? 'h-20' : 'h-28']">
      <UtensilsCrossed
        :class="['opacity-40 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6', accent.text, compact ? 'h-8 w-8' : 'h-11 w-11']"
      />
      <span
        v-if="!compact && categoryName !== RECIPE_UNCATEGORIZED"
        :class="['absolute left-2 bottom-2 rounded-full px-2 h-5 inline-flex items-center text-[11px] font-semibold', accent.soft]"
      >
        {{ categoryName }}
      </span>
    </div>

    <div :class="compact ? 'px-3 py-2' : 'px-3 pt-2.5 pb-3'">
      <p :class="['font-semibold leading-tight line-clamp-2', compact ? 'text-sm' : 'text-[15px] mb-1.5']">{{ recipe.name }}</p>
      <RecipeMetaInfo v-if="!compact" :total-time-min="getRecipeTime(recipe)" :kcal="kcal" />
    </div>

    <!-- Stretched Link: ganze Karte klickbar -->
    <RouterLink
      :to="{ name: routes.recipeDetails.name, params: { recipeId: recipe.id } }"
      class="absolute inset-0 outline-none"
      :aria-label="recipe.name"
      @click="emits('open')"
    />

    <!-- Favorit: vorbereitet, aktiv sobald Backend-Issue #421 umgesetzt ist -->
    <button
      v-if="!compact"
      type="button"
      disabled
      title="Favoriten kommen bald"
      aria-label="Als Favorit merken (bald verfügbar)"
      class="absolute right-2 top-2 z-10 h-9 w-9 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-muted-foreground disabled:cursor-not-allowed"
    >
      <Heart class="h-4 w-4" />
    </button>
  </Card>
</template>
