<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { useRoute } from "vue-router";
import DarkMode from "@/components/layout/DarkMode.vue";

const route = useRoute();
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <RouterLink :to="{ name: 'finance' }">
        <Button as="div" :variant="route.name === 'finance' ? 'default' : 'outline'">Hauptseite</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'addresses' }">
        <Button as="div" :variant="route.name === 'addresses' ? 'default' : 'outline'">Adressen</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'descriptions' }">
        <Button as="div" :variant="route.name === 'descriptions' ? 'default' : 'outline'">Beschreibung</Button>
      </RouterLink>
      <DarkMode small />
    </div>

    <slot />
  </div>
</template>
