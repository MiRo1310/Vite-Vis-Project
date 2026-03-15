<script setup lang="ts">
import RecipeForm from "@/components/section/new-recipe/RecipeForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const recipeId = route.params.id as string | undefined;
</script>

<template>
  <RecipeForm :recipe-id="recipeId" />
</template>
