<script setup lang="ts">
import RecipeForm from "@/components/section/new-recipe/RecipeForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const recipeId = String(route.params.id);
</script>

<template>
  <RecipeForm :recipe-id="recipeId" />
</template>
