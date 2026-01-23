<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { useRoute } from "vue-router";
import DarkMode from "@/components/layout/DarkMode.vue";
import { routes } from "@/router/routes.ts";

const route = useRoute();
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <RouterLink :to="{ name: routes.finance.name }">
        <Button as="div" :variant="route.name === routes.finance.name ? 'default' : 'outline'">Hauptseite</Button>
      </RouterLink>
      <RouterLink :to="{ name: routes.addresses.name }">
        <Button as="div" :variant="route.name === routes.addresses.name ? 'default' : 'outline'">Adressen</Button>
      </RouterLink>
      <RouterLink :to="{ name: routes.description.name }">
        <Button as="div" :variant="route.name === routes.description.name ? 'default' : 'outline'">Beschreibung</Button>
      </RouterLink>
      <DarkMode small />
    </div>

    <slot />
  </div>
</template>
