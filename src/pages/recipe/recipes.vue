<script setup lang="ts">
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes.ts";
import { defaultLocale } from "@/config/config.ts";
import Badge from "@/components/shared/badge/Badge.vue";
import { RecipesQuery } from "@/api/gql/graphql.ts";
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

const router = useRouter();

const navigate = async (id: string) => {
  await router.push({ name: routes.recipeDetails.name, params: { recipeId: id } });
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

type TGroupedRecipesByCategory = Record<string, TRecipe[]>;
</script>

<template>
  <div v-for="(group, categoryName) in groupedRecipesByCategory" :key="categoryName" class="mb-4">
    <p class="mb-1">{{ categoryName }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6 gap-2">
      <div v-for="recipe in group" :key="recipe.id" @click="navigate(recipe.id)" class="border-2 p-2 rounded-md bg-card">
        <div class="flex items-center justify-between">
          {{ recipe.name }}
          <Badge :value="recipe.totalKcal + ' kcal/p'" />
        </div>
        <div class="text-xs text-muted-foreground flex justify-between"><span>Zubereitungszeit:</span> {{ recipe.preparationTimeMin ?? "-" }}</div>
        <div class="text-xs text-muted-foreground flex justify-between"><span>Gesamtzeit: </span>{{ recipe.totalTimeMin ?? "-" }}</div>
        <div class="text-xs text-muted-foreground flex justify-between">
          <span> Erstellt am:</span> {{ new Date(recipe.createdAt).toLocaleString(defaultLocale) }}
        </div>
      </div>
    </div>
  </div>
</template>
