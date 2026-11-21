<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { BookOpen, Plus, SearchX, X } from "@lucide/vue";
import { graphql } from "@/api/gql";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/recipe/EmptyState.vue";
import RecipePageHeader from "@/components/shared/recipe/RecipePageHeader.vue";
import RecipeCard from "@/components/section/recipe/RecipeCard.vue";
import RecipeListFilters from "@/components/section/recipe/RecipeListFilters.vue";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { filterRecipes, getCategoryColor, groupRecipesByCategory, pickRecentRecipes } from "@/lib/recipe.ts";
import { MAX_MOST_COOKED_RECIPES, RECIPE_UNCATEGORIZED, recipeAccentClasses } from "@/constants/recipe.ts";
import { routes } from "@/router/routes.ts";

const { result, loading } = useQuery(
  graphql(`
    query recipes {
      # Backend paginiert (Standard 10, max. 50) – bis es eine Liste ohne Pagination gibt, die größte Seite laden
      recipes(first: 50) {
        nodes {
          id
          name
          createdAt
          portions
          totalTimeMin
          preparationTimeMin
          totalKcal
          recipeCategory {
            name
            id
          }
        }
      }
    }
  `),
  {},
  { fetchPolicy: "cache-and-network" },
);

// „Oft gekocht“: sortiert und begrenzt das Backend, unabhängig von der paginierten Gesamtliste
const { result: mostCookedResult } = useQuery(
  graphql(`
    query mostCookedRecipes($first: Int!) {
      recipes(first: $first, where: { cookedCount: { gt: 0 } }, order: [{ cookedCount: DESC }, { lastCookedAt: DESC }]) {
        nodes {
          id
          name
          portions
          totalTimeMin
          preparationTimeMin
          totalKcal
          recipeCategory {
            name
            id
          }
        }
      }
    }
  `),
  { first: MAX_MOST_COOKED_RECIPES },
  { fetchPolicy: "cache-and-network" },
);

const recipeStore = useRecipeStore();

const allRecipes = computed(() => result.value?.recipes?.nodes ?? []);
const mostCookedRecipes = computed(() => mostCookedResult.value?.recipes?.nodes ?? []);

// --- Filter ---
const search = ref("");
const selectedCategories = ref<string[]>([]);
const maxTimeMin = ref<number | null>(null);
const maxKcal = ref<number | null>(null);

const isFiltered = computed(() => !!search.value.trim() || selectedCategories.value.length > 0 || !!maxTimeMin.value || !!maxKcal.value);

const categories = computed(() => groupRecipesByCategory(allRecipes.value).map((group) => ({ name: group.key, count: group.value.length })));

const filteredGroups = computed(() =>
  groupRecipesByCategory(
    filterRecipes(allRecipes.value, {
      search: search.value,
      categories: selectedCategories.value,
      maxTimeMin: maxTimeMin.value,
      maxKcal: maxKcal.value,
    }),
  ),
);
const filteredCount = computed(() => filteredGroups.value.reduce((sum, group) => sum + group.value.length, 0));

const recentRecipes = computed(() => pickRecentRecipes(recipeStore.getLastRecipes, allRecipes.value));

const resetFilter = () => {
  search.value = "";
  selectedCategories.value = [];
  maxTimeMin.value = null;
  maxKcal.value = null;
};

// Beim Öffnen eines anderen Rezepts den Editor-Entwurf verwerfen (wie bisher)
const onOpen = () => {
  recipeStore.resetRecipeInProgress();
};

const groupAccent = (key: string) => {
  if (key === RECIPE_UNCATEGORIZED) {
    return recipeAccentClasses.primary;
  }
  return recipeAccentClasses[getCategoryColor(key)];
};

const subtitle = computed(() => {
  if (!allRecipes.value.length) {
    return undefined;
  }
  if (isFiltered.value) {
    return `${filteredCount.value} von ${allRecipes.value.length} Rezepten`;
  }
  return `${allRecipes.value.length} Rezepte in ${categories.value.length} ${categories.value.length === 1 ? "Kategorie" : "Kategorien"}`;
});
</script>

<template>
  <div class="h-full overflow-y-auto pb-6">
    <div class="flex flex-col gap-4 max-w-7xl mx-auto">
      <RecipePageHeader title="Rezepte" :subtitle :icon="BookOpen">
        <template #actions>
          <Button as-child class="h-10 rounded-full px-4" :class="recipeAccentClasses.basil.solid">
            <RouterLink :to="{ name: routes.newRecipe.name }"><Plus class="h-4 w-4" /> Neues Rezept</RouterLink>
          </Button>
        </template>
      </RecipePageHeader>

      <RecipeListFilters
        v-if="allRecipes.length"
        v-model:search="search"
        v-model:categories="selectedCategories"
        v-model:max-time-min="maxTimeMin"
        v-model:max-kcal="maxKcal"
        :category-options="categories"
        :total-count="allRecipes.length"
      />

      <!-- Zuletzt geöffnet -->
      <section v-if="recentRecipes.length && !isFiltered">
        <p class="text-sm font-semibold mb-2">Zuletzt geöffnet</p>
        <div class="flex gap-3 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0 snap-x">
          <div v-for="recipe in recentRecipes" :key="recipe.id" class="w-40 sm:w-48 shrink-0 snap-start">
            <RecipeCard :recipe compact @open="onOpen" />
          </div>
        </div>
      </section>

      <!-- Oft gekocht -->
      <section v-if="mostCookedRecipes.length && !isFiltered" v-e2e="'recipes-most-cooked'">
        <p class="text-sm font-semibold mb-2">Oft gekocht</p>
        <div class="flex gap-3 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0 snap-x">
          <div v-for="recipe in mostCookedRecipes" :key="recipe.id" class="w-40 sm:w-48 shrink-0 snap-start">
            <RecipeCard :recipe compact @open="onOpen" />
          </div>
        </div>
      </section>

      <!-- Nach Kategorie -->
      <section v-for="group in filteredGroups" :key="group.key" v-e2e="'recipes-group'">
        <div class="flex items-center gap-2 mb-2">
          <span :class="['h-2.5 w-2.5 rounded-full', groupAccent(group.key).solid]" />
          <p :class="['text-sm font-semibold', groupAccent(group.key).text]">{{ group.key }}</p>
          <span class="text-xs text-muted-foreground">{{ group.value.length }}</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
          <RecipeCard v-for="recipe in group.value" :key="recipe.id" :recipe @open="onOpen" />
        </div>
      </section>

      <EmptyState
        v-if="!loading && filteredCount === 0"
        :icon="allRecipes.length ? SearchX : BookOpen"
        :title="allRecipes.length ? 'Nichts gefunden' : 'Noch keine Rezepte'"
        :description="
          allRecipes.length
            ? 'Probier einen anderen Suchbegriff oder lockere die Filter.'
            : 'Schreib dein erstes Lieblingsrezept auf – Zutaten, Schritte, fertig.'
        "
      >
        <Button v-if="allRecipes.length" variant="outline" class="rounded-full" @click="resetFilter"
          ><X class="h-4 w-4" /> Filter zurücksetzen</Button
        >
        <Button v-else as-child class="rounded-full" :class="recipeAccentClasses.basil.solid">
          <RouterLink :to="{ name: routes.newRecipe.name }"><Plus class="h-4 w-4" /> Rezept anlegen</RouterLink>
        </Button>
      </EmptyState>
    </div>
  </div>
</template>
