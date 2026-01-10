<script setup lang="ts">
import { Button } from "@/components/shared/button";
import DarkMode from "@/components/layout/DarkMode.vue";

interface NavigationButtons {
  label: string;
  name: string;
  externalLink?: boolean;
}

const buttons: NavigationButtons[] = [
  { label: "VIS", name: "home" },
  { label: "Rezepte", name: "recipe" },
  { label: "Rezept erstellen", name: "new-recipe" },
  { label: "Produkte", name: "products" },
  { label: "Einheiten", name: "units" },
  { label: "Kategorien", name: "categories" },
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
