<script setup lang="ts">
import DarkMode from "@/components/layout/DarkMode.vue";
import { routes } from "@/router/routes.ts";
import { INavigation } from "@/components/shared/responsiveNav";
import { githubNavigation } from "@/config/config.ts";
import ResponsiveNavigation from "@/components/shared/responsiveNav/ResponsiveNavigation.vue";

const navigations: INavigation[] = [
  { label: "Hauptseite", routeName: routes.finance.name },
  { label: "Adressen", routeName: routes.addresses.name },
  { label: "Beschreibung", routeName: routes.description.name },
  { ...githubNavigation },
];
</script>

<template>
  <div class="flex justify-between items-center">
    <ResponsiveNavigation :navigations />
    <div class="flex items-center gap-2">
      <DarkMode small />
      <slot />
    </div>
  </div>
</template>
