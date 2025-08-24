<script setup lang="ts">
import { Button } from "@/components/shared/button";

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
];
</script>

<template>
  <div class="navigation__container">
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
  </div>
</template>

<style scoped lang="scss">
.navigation__container {
  @apply fixed top-0 border-b-2 border-accent flex p-2 space-x-2 flex-wrap w-full z-50 bg-primary-brown-lightest h-12;
}

.router-link-active button {
  @apply bg-primary-brown-dark;
}
</style>
