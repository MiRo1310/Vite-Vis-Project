<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="navigation">
    <div class="navigation__links">
      <RouterLink :to="{ name: 'finance' }">
        <Button as="div" :variant="route.name === 'finance' ? 'default' : 'outline'">Hauptseite</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'addresses' }">
        <Button as="div" :variant="route.name === 'addresses' ? 'default' : 'outline'">Adressen</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'descriptions' }">
        <Button as="div" :variant="route.name === 'descriptions' ? 'default' : 'outline'">Beschreibung</Button>
      </RouterLink>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.navigation {
  @apply flex justify-between items-center;

  &__links {
    @apply flex items-center gap-2;
  }
}
</style>
