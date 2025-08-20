<script setup lang="ts">
import { Button } from "@/components/shared/button";
</script>

<template>
  <div class="navigation">
    <RouterLink :to="{ name: 'finance' }">
      <Button as="div">Hauptseite</Button>
    </RouterLink>
    <RouterLink :to="{ name: 'addresses' }">
      <Button as="div">Adressen</Button>
    </RouterLink>
    <RouterLink :to="{ name: 'descriptions' }">
      <Button as="div">Beschreibung</Button>
    </RouterLink>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.navigation {
  @apply flex items-center gap-2;
}
</style>
