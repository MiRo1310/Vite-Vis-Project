<script setup lang="ts">
import EditRecipe from "@/components/section/recipe/EditRecipe.vue";
import RecipeContent from "@/components/section/recipe/RecipeContent.vue";
import { onMounted, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import DeleteRecipe from "@/components/section/recipe/action/DeleteRecipe.vue";
import { Button } from "@/components/shared/button/button.variants";
import RecipeTimer from "@/components/section/recipe/RecipeTimer.vue";
import RecipeMetaInfo from "@/components/section/recipe/RecipeMetaInfo.vue";

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

const loadRecipeFromServer = async (): Promise<void> => {
  const recipeId = props.recipeId;
  if (!recipeId) {
    return;
  }

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
  <div class="overflow-y-auto h-full pb-4">
    <RecipeTimer />
    <div class="rounded-xl bg-gradient-to-br from-orange-500/10 via-amber-400/5 to-transparent border border-border/60 mb-4 p-4">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h1 class="text-2xl font-bold leading-tight tracking-tight mb-2.5">{{ result?.recipe?.name }}</h1>
          <RecipeMetaInfo
            :preparation-time-min="result?.recipe?.preparationTimeMin"
            :total-time-min="result?.recipe?.totalTimeMin"
            :portions="result?.recipe?.portions"
            :kcal="result?.recipe?.totalKcal"
          />
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <EditRecipe v-if="result?.recipe" :recipe="result.recipe" />
          <DeleteRecipe :recipe-id="recipeId">
            <Button variant="destructive" size="icon" icon="remove" />
          </DeleteRecipe>
        </div>
      </div>
    </div>

    <RecipeContent :recipe="result?.recipe" />
  </div>
</template>
