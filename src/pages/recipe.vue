<script setup lang="ts">
import RecipeSelection from "@/components/section/recipe/RecipeSelection.vue";
import RecipeAddNew from "@/components/section/recipe/RecipeAddNew.vue";
import { onMounted, ref } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const { openedRecipe } = storeToRefs(useRecipeStore());

const router = useRouter();

onMounted(async () => {
  if (!openedRecipe.value?.id) return;
  selected.value = openedRecipe.value.id;
  await updateSelect();
});

const updateSelect = async () => {
  await router.push({ name: "recipe-details", params: { recipeId: selected.value } });
};

const selectedName = ref("");
const selected = ref("");
</script>

<template>
  <div class="recipe">
    <div class="recipe__header">
      <div class="recipe__header-left-col">
        <RecipeSelection
          v-model:selected="selected"
          v-model:selected-name="selectedName"
          class="recipe__header-recipe-selection"
          @update:selected="updateSelect"
        />
        <RecipeAddNew />
      </div>
      <div id="recipe" />
    </div>
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.recipe {
  @apply flex flex-col space-y-2 overflow-hidden h-full;

  &__header {
    @apply flex justify-between items-center space-x-2;
  }

  &__header-left-col {
    @apply flex space-x-2 items-center;
  }

  &__header-recipe-selection {
    @apply w-80;
  }
}
</style>
