<script setup lang="ts">
import { computed, ref } from "vue";
import { Flame, Search, SlidersHorizontal, Timer, X } from "@lucide/vue";
import { InputShadcn } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import RecipeChip from "@/components/shared/recipe/RecipeChip.vue";
import { getCategoryColor } from "@/lib/recipe.ts";
import { RECIPE_UNCATEGORIZED, recipeKcalFilters, recipeTimeFilters } from "@/constants/recipe.ts";

defineProps<{ categoryOptions: Array<{ name: string; count: number }>; totalCount: number }>();

const search = defineModel<string>("search", { required: true });
const selectedCategories = defineModel<string[]>("categories", { required: true });
const maxTimeMin = defineModel<number | null>("maxTimeMin", { required: true });
const maxKcal = defineModel<number | null>("maxKcal", { required: true });

const filtersOpen = ref(false);
const activeQuickFilters = computed(() => Number(!!maxTimeMin.value) + Number(!!maxKcal.value));

const toggleCategory = (name: string) => {
  if (selectedCategories.value.includes(name)) {
    selectedCategories.value = selectedCategories.value.filter((category) => category !== name);
    return;
  }
  selectedCategories.value = [...selectedCategories.value, name];
};

const toggleValue = (current: number | null, value: number): number | null => {
  if (current === value) {
    return null;
  }
  return value;
};

const categoryAccent = (name: string) => {
  if (name === RECIPE_UNCATEGORIZED) {
    return "primary";
  }
  return getCategoryColor(name);
};
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <!-- Suche + Filter-Schalter -->
    <div class="flex gap-2">
      <div class="relative flex-1 min-w-0">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
        <InputShadcn v-model="search" type="text" placeholder="Rezept suchen" class="h-11 rounded-full pl-10 pr-10 text-base md:text-sm" e2e="recipes-search" />
        <button
          v-if="search"
          type="button"
          aria-label="Suche leeren"
          class="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-accent"
          @click="search = ''"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
      <Button
        variant="outline"
        class="h-11 rounded-full px-4 shrink-0 relative max-sm:w-11! max-sm:px-0!"
        aria-label="Filter"
        :aria-expanded="filtersOpen"
        v-e2e="'recipes-filter-toggle'"
        @click="filtersOpen = !filtersOpen"
      >
        <SlidersHorizontal class="h-4 w-4" />
        <span class="hidden sm:inline">Filter</span>
        <span
          v-if="activeQuickFilters"
          class="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-recipe-primary text-white text-[11px] font-bold flex items-center justify-center"
        >
          {{ activeQuickFilters }}
        </span>
      </Button>
    </div>

    <!-- Schnellfilter Zeit / kcal -->
    <Collapsible v-model:open="filtersOpen">
      <CollapsibleContent>
        <div class="rounded-2xl border border-border/60 bg-muted/30 p-3 flex flex-col gap-3">
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><Timer class="h-3.5 w-3.5" /> Zeit</p>
            <div class="flex flex-wrap gap-2">
              <RecipeChip
                v-for="minutes in recipeTimeFilters"
                :key="minutes"
                accent="lavender"
                :active="maxTimeMin === minutes"
                @click="maxTimeMin = toggleValue(maxTimeMin, minutes)"
              >
                bis {{ minutes }} min
              </RecipeChip>
            </div>
          </div>
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><Flame class="h-3.5 w-3.5" /> Kalorien pro Portion</p>
            <div class="flex flex-wrap gap-2">
              <RecipeChip v-for="kcal in recipeKcalFilters" :key="kcal" accent="primary" :active="maxKcal === kcal" @click="maxKcal = toggleValue(maxKcal, kcal)">
                bis {{ kcal }} kcal
              </RecipeChip>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>

    <!-- Kategorie-Chips -->
    <div v-if="categoryOptions.length > 1" class="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      <RecipeChip :active="selectedCategories.length === 0" :count="totalCount" @click="selectedCategories = []">Alle</RecipeChip>
      <RecipeChip
        v-for="category in categoryOptions"
        :key="category.name"
        :accent="categoryAccent(category.name)"
        dot
        :active="selectedCategories.includes(category.name)"
        :count="category.count"
        @click="toggleCategory(category.name)"
      >
        {{ category.name }}
      </RecipeChip>
    </div>
  </div>
</template>
