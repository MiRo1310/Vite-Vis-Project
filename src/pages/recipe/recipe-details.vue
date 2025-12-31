<script setup lang="ts">
import EditRecipe from "@/components/section/recipe/EditRecipe.vue";
import RecipeContent from "@/components/section/recipe/RecipeContent.vue";
import { onMounted, ref, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { graphql } from "@/api/gql";

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
        productPosition
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
  if (!recipeId) return;

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
  <Teleport v-if="isRecipeElementPresent" to="#recipe">
    <div class="flex items-center space-x-2">
      <EditRecipe v-if="result?.recipe" :recipe="result.recipe" />
    </div>
  </Teleport>
  <RecipeContent :recipe="result?.recipe" />
</template>
