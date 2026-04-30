<script setup lang="ts">
import { defaultLocale } from "@/config/config.ts";
import Badge from "@/components/shared/badge/Badge.vue";
import { TRecipe } from "@/store";

defineProps<{ recipe: TRecipe }>();
</script>

<template>
  <div class="flex items-center justify-between">
    {{ recipe.name }}
    <Badge :value="recipe.totalKcal + ' kcal/p'" />
  </div>
  <div class="text-xs text-muted-foreground flex justify-between">
    <span>Zubereitungszeit:</span>
    <span v-if="recipe.preparationTimeMin"> {{ recipe.preparationTimeMin }} min </span>
    <span v-else>-</span>
  </div>
  <div class="text-xs text-muted-foreground flex justify-between">
    <span>Gesamtzeit: </span>
    <span v-if="recipe.totalTimeMin"> {{ recipe.totalTimeMin }} min </span>
    <span v-else>-</span>
  </div>
  <div class="text-xs text-muted-foreground flex justify-between">
    <span> Erstellt am:</span> {{ new Date(recipe.createdAt).toLocaleString(defaultLocale) }}
  </div>
</template>
