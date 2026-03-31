<script setup lang="ts">
import EditRecipe from "@/components/section/recipe/EditRecipe.vue";
import RecipeContent from "@/components/section/recipe/RecipeContent.vue";
import { onMounted, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { graphql } from "@/api/gql";
import DeleteRecipe from "@/components/section/recipe/action/DeleteRecipe.vue";
import { Button } from "@/components/shared/button";
import RecipeTimer from "@/components/section/recipe/RecipeTimer.vue";

const props = defineProps<{ recipeId?: string }>();

const recipeDetailsQuery = graphql(`
  query getRecipeDetails($id: UUID!) {
    recipe(id: $id) {
      id
      name
      portions
      totalKcal
      preparationTimeMin
      totalTimeMin
      recipeProducts {
        amount
        description
        groupPosition
        unit
        kcal
        activeUnitId
        productId
        product {
          name
          category
          carbs
          fat
          kcal
          protein
          salt
          sugar
        }
      }
      recipeDescriptions {
        position
        text
        header
      }
      recipeHeaderProducts {
        position
        text
      }
    }
  }
`);

const { load, result, refetch } = useLazyQuery(recipeDetailsQuery);
const recipeStore = useRecipeStore();

const saveOpenedRecipe = recipeStore.saveOpenedRecipe.bind(recipeStore);

const loadRecipeFromServer = async (): Promise<void> => {
  const recipeId = props.recipeId;
  if (!recipeId) {
    return;
  }

  saveOpenedRecipe({ id: recipeId });
  await load(recipeDetailsQuery, { id: recipeId });
  await refetch({ id: recipeId });
};

watch(
  () => props.recipeId,
  () => loadRecipeFromServer(),
);

onMounted(async () => {
  await loadRecipeFromServer();
});
</script>

<template>
  <RecipeTimer />
  <div class="flex items-start gap-2 justify-between">
    <div class="flex items-baseline gap-x-6 text-xs text-blue-200 flex-wrap">
      <span class="text-foreground text-xl! md:w-auto w-full md:inline inline-block">{{ result?.recipe?.name }}</span>
      <span
        >Zubereitungszeit:
        <span v-if="result?.recipe?.preparationTimeMin">{{ result?.recipe?.preparationTimeMin }} min</span>
        <span v-else> - </span>
      </span>
      <span>
        Gesamtzeit:
        <span v-if="result?.recipe?.totalTimeMin">{{ result?.recipe?.totalTimeMin }} min</span>
        <span v-else> - </span>
      </span>
    </div>
    <div class="flex items-center gap-2">
      <EditRecipe v-if="result?.recipe" :recipe="result.recipe" />
      <DeleteRecipe :recipe-id="recipeId">
        <Button variant="outline" size="icon" icon="remove" />
      </DeleteRecipe>
    </div>
  </div>

  <RecipeContent :recipe="result?.recipe" />
</template>
