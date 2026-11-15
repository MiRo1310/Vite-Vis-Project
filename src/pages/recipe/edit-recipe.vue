<script setup lang="ts">
import RecipeEditor from "@/components/section/recipe-editor/RecipeEditor.vue";

defineProps<{ id?: string }>();
</script>

<template>
  <!-- key: anderes Rezept → Editor neu aufbauen (lädt und merkt Entwurf je Rezept) -->
  <RecipeEditor :id :key="id" />
</template>
