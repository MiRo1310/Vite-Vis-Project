<script setup lang="ts">
import EditRecipe from "@/components/section/recipe/EditRecipe.vue";
import RecipeContent from "@/components/section/recipe/RecipeContent.vue";
import { onMounted, ref, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { getRecipeById } from "@/api/query/getRecipeById";
import { useRecipeStore } from "@/store/recipeStore";

const props = defineProps<{ recipeId?: string }>();

const { load, result, refetch } = useLazyQuery(getRecipeById);
const recipeStore = useRecipeStore();

const saveOpenedRecipe = recipeStore.saveOpenedRecipe.bind(recipeStore);

const loadRecipeFromServer = async (): Promise<void> => {
  const recipeId = props.recipeId;
  if (!recipeId) return;

  saveOpenedRecipe({ id: recipeId });
  await load(getRecipeById, { id: recipeId });
  await refetch({ id: recipeId });
};

watch(
  () => props.recipeId,
  () => loadRecipeFromServer(),
);

// const showImages = ref(false);
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
    <div class="recipe-detail-button-wrapper">
      <EditRecipe v-if="result?.recipe" :recipe="result.recipe" />
    </div>
  </Teleport>
  <RecipeContent :result-recipe-by-id="result" />
</template>

<style scoped>
.recipe-detail-button-wrapper {
  @apply flex items-center space-x-2;
}
</style>
