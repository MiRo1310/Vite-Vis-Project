<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Button } from "@/components/shared/button/button.variants";
import { Moon, Sun } from "lucide-vue-next";

defineProps<{ small?: boolean; tile?: boolean }>();

const mode = useColorMode();

const toggleTheme = () => {
  mode.value = mode.value === "light" ? "dark" : "light";
};
</script>

<template>
  <!-- Kachel-Variante im Stil der NavigationButtons (Navigationsseite) -->
  <Button v-if="tile" variant="outline" size="fullXxl" @click="toggleTheme">
    <div class="flex justify-between items-center w-full gap-2">
      <div class="flex flex-col items-start">
        <span>Erscheinungsbild</span>
        <span class="text-xs text-muted-foreground">{{ mode === "dark" ? "Dunkel" : "Hell" }}</span>
      </div>
      <div class="relative size-10">
        <Sun class="absolute size-10 text-yellow-500 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute size-10 text-blue-300 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </div>
  </Button>
  <Button v-else variant="outline" :size="small ? 'icon' : 'iconLg'" class="relative shrink-0" @click="toggleTheme">
    <Sun :class="['rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0', small ? 'size-4' : 'size-10']" />
    <Moon :class="['absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100', small ? 'size-4' : 'size-10']" />
  </Button>
</template>
