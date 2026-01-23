<script setup lang="ts">
import { Button } from "@/components/shared/button";
import DarkMode from "@/components/layout/DarkMode.vue";
import { routes } from "@/router/routes.ts";

interface NavigationButtons {
  label: string;
  name: string;
  externalLink?: boolean;
}

const buttons: NavigationButtons[] = [
  { label: "VIS", name: routes.home.name },
  { label: "Rezepte", name: routes.recipe.name },
  { label: "Rezept erstellen", name: routes.newRecipe.name },
  { label: "Produkte", name: routes.recipeProducts.name },
  { label: "Einheiten", name: routes.recipeUnits.name },
  { label: "Kategorien", name: routes.recipeCategories.name },
];
</script>

<template>
  <div class="fixed top-0 flex p-2 space-x-2 flex-wrap w-full z-50">
    <div v-for="(button, index) in buttons" :key="index">
      <RouterLink v-if="!button.externalLink" :to="{ name: button.name }">
        <Button variant="outline">{{ button.label }}</Button>
      </RouterLink>
      <a v-if="button.externalLink" :href="button.name" target="_self">
        <Button as="div" variant="outline">
          {{ button.label }}
        </Button>
      </a>
    </div>
    <DarkMode small />
  </div>
</template>
