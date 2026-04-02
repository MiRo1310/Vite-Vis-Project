<script setup lang="ts">
import RecipeForm from "@/components/section/recipe-form/RecipeForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const recipeId = route.params.id as string | undefined;
</script>

<template>
  <RecipeForm :id="recipeId" />
</template>
