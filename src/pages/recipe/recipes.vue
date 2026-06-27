<script setup lang="ts">
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes.ts";
import { type RecipesQuery } from "@/api/gql/graphql.ts";
import { useRecipeStore } from "@/store/recipeStore.ts";
import RecipeCard from "@/components/section/recipe/RecipeCard.vue";

const { result, load, refetch } = useLazyQuery(
  graphql(`
    query recipes {
      recipes {
        id
        name
        createdAt
        totalTimeMin
        preparationTimeMin
        totalKcal
        recipeCategory {
          name
          id
        }
      }
    }
  `),
);

onMounted(async () => {
  await load();
  await refetch();
});

const recipeStore = useRecipeStore();
const router = useRouter();

const navigate = async (recipe: TGroupedRecipesByCategory[number][number]) => {
  recipeStore.addNewOpenedRecipeToLastRecipes(recipe);
  recipeStore.resetRecipeInProgress();
  await router.push({ name: routes.recipeDetails.name, params: { recipeId: recipe.id } });
};

const groupedRecipesByCategory = computed((): TGroupedRecipesByCategory | undefined => {
  return result.value?.recipes.reduce((acc, cur) => {
    const categoryName = cur.recipeCategory?.name ?? "Keiner Kategorie zugeordnet";
    if (categoryName in acc) {
      acc[categoryName].push(cur);
    } else {
      acc[categoryName] = [cur];
    }
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  }, {} as TGroupedRecipesByCategory);
});

type TRecipe = RecipesQuery["recipes"][number];

export type TGroupedRecipesByCategory = Record<string, TRecipe[]>;

const lastRecipes = computed(() => {
  if (!groupedRecipesByCategory.value) {
    return [];
  }
  return recipeStore.getFilterLastRecipes(groupedRecipesByCategory.value);
});

const totalRecipeCount = computed(() =>
  Object.values(groupedRecipesByCategory.value ?? {}).reduce((acc, group) => acc + group.length, 0),
);
</script>

<template>
  <div class="overflow-y-auto h-full pb-4">
    <div class="flex items-baseline gap-3 mb-5 pt-1">
      <h1 class="text-xl font-bold tracking-tight">Rezepte</h1>
      <span v-if="totalRecipeCount" class="text-xs text-muted-foreground">{{ totalRecipeCount }} Rezepte</span>
    </div>

    <div v-if="lastRecipes.length" class="mb-6">
      <p class="text-xs text-muted-foreground uppercase tracking-wide mb-2">Zuletzt geöffnet</p>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        <div v-for="recipe in lastRecipes" :key="recipe.id" class="cursor-pointer h-full" @click="navigate(recipe)">
          <RecipeCard :recipe />
        </div>
      </div>
    </div>

    <div v-for="(group, categoryName) in groupedRecipesByCategory" :key="categoryName" class="mb-6">
      <p class="text-xs text-muted-foreground uppercase tracking-wide mb-2">{{ categoryName }}</p>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        <div v-for="recipe in group" :key="recipe.id" class="cursor-pointer h-full" @click="navigate(recipe)">
          <RecipeCard :recipe />
        </div>
      </div>
    </div>
  </div>
</template>
