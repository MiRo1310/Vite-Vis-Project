<script setup lang="ts">
import RecipeSelection from "@/components/section/recipe/RecipeSelection.vue";
import RecipeAddNew from "@/components/section/recipe/RecipeAddNew.vue";
import { onMounted, ref } from "vue";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const { openedRecipe } = storeToRefs(useRecipeStore());

const router = useRouter();

onMounted(async () => {
  if (!openedRecipe.value?.id) {return;}
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
  <div class="flex flex-col overflow-hidden h-full">
    <div class="flex justify-between items-center gap-2">
      <div class="flex gap-2 items-center">
        <RecipeSelection v-model:selected="selected" v-model:selected-name="selectedName" class="w-80" @update:selected="updateSelect" />
        <RecipeAddNew />
      </div>
      <div id="recipe" />
    </div>
    <router-view />
  </div>
</template>
