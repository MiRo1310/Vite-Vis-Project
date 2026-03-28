<script setup lang="ts">
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes.ts";
import { RecipesQuery } from "@/api/gql/graphql.ts";
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
  await router.push({ name: routes.recipeDetails.name, params: { recipeId: recipe.id } });
};

const groupedRecipesByCategory = computed(() => {
  return result.value?.recipes.reduce((acc, cur) => {
    const categoryName = cur?.recipeCategory?.name ?? "Keiner Kategorie zugeordnet";
    if (categoryName in acc) {
      acc[categoryName].push(cur);
    } else {
      acc[categoryName] = [cur];
    }
    return acc;
  }, {} as TGroupedRecipesByCategory);
});

type TRecipe = RecipesQuery["recipes"][number];

export type TGroupedRecipesByCategory = Record<string, TRecipe[]>;
</script>

<template>
  <p class="mb-1">Letzten 3 geöffneten Rezepte</p>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6 gap-2 mb-4">
    <div
      v-for="recipe in recipeStore.getLastRecipes"
      :key="recipe.id"
      @click="navigate(recipe)"
      class="border-2 p-2 rounded-md bg-card cursor-pointer"
    >
      <RecipeCard :recipe />
    </div>
  </div>

  <div v-for="(group, categoryName) in groupedRecipesByCategory" :key="categoryName" class="mb-4">
    <p class="mb-1">{{ categoryName }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6 gap-2">
      <div v-for="recipe in group" :key="recipe.id" @click="navigate(recipe)" class="border-2 p-2 rounded-md bg-card cursor-pointer">
        <RecipeCard :recipe />
      </div>
    </div>
  </div>
</template>
