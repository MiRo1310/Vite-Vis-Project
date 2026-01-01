<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <RouterLink :to="{ name: 'finance' }">
        <Button as="div" :variant="route.name === 'finance' ? 'default' : 'outline-solid'">Hauptseite</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'addresses' }">
        <Button as="div" :variant="route.name === 'addresses' ? 'default' : 'outline-solid'">Adressen</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'descriptions' }">
        <Button as="div" :variant="route.name === 'descriptions' ? 'default' : 'outline-solid'">Beschreibung</Button>
      </RouterLink>
    </div>
    <slot />
  </div>
</template>
