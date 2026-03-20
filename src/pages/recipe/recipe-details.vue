<script setup lang="ts">
import EditRecipe from "@/components/section/recipe/EditRecipe.vue";
import RecipeContent from "@/components/section/recipe/RecipeContent.vue";
import { onMounted, ref, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { graphql } from "@/api/gql";
import DeleteRecipe from "@/components/section/recipe/action/DeleteRecipe.vue";
import { Button } from "@/components/shared/button";

const props = defineProps<{ recipeId?: string }>();

const recipeDetailsQuery = graphql(`
  query getRecipeDetails($id: UUID!) {
    recipe(id: $id) {
      id
      name
      portions
      totalKcal
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

const isRecipeElementPresent = ref(false);

onMounted(async () => {
  await loadRecipeFromServer();

  const checkElement = () => {
    if (document.getElementById("recipe")) {
      isRecipeElementPresent.value = true;
    } else {
      requestAnimationFrame(checkElement);
    }
  };
  checkElement();
});
</script>

<template>
  <div class="flex items-center gap-2 justify-end">
    <EditRecipe v-if="result?.recipe" :recipe="result.recipe" />
    <DeleteRecipe :recipe-id="recipeId">
      <Button variant="outline" size="icon" icon="remove" />
    </DeleteRecipe>
  </div>

  <RecipeContent :recipe="result?.recipe" />
</template>
