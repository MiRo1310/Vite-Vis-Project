<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Button } from "@/components/shared/button/button.variants";
import ThemeIcon from "@/components/layout/ThemeIcon.vue";

defineProps<{ small?: boolean; title?: boolean }>();

const mode = useColorMode();

const toggleTheme = () => {
  mode.value = mode.value === "light" ? "dark" : "light";
};
</script>

<template>
  <!-- Kachel-Variante im Stil der NavigationButtons (Navigationsseite) -->
  <Button v-if="title" variant="outline" size="fullXxl" @click="toggleTheme">
    <div class="flex justify-between items-center w-full gap-2">
      <div class="flex flex-col items-start">
        <span>Erscheinungsbild</span>
        <span class="text-xs text-muted-foreground">{{ mode === "dark" ? "Dunkel" : "Hell" }}</span>
      </div>
      <ThemeIcon colored />
    </div>
  </Button>
  <Button v-else variant="outline" :size="small ? 'icon' : 'iconLg'" class="relative shrink-0" @click="toggleTheme">
    <ThemeIcon :class="small ? 'size-4' : 'size-10'" />
  </Button>
</template>
