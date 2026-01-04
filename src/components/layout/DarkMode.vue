<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Button } from "@/components/shared/button";
import { Moon, Sun } from "lucide-vue-next";

defineProps<{ small?: boolean }>();

const mode = useColorMode();

const toggleTheme = () => {
  mode.value = mode.value === "light" ? "dark" : "light";
};
</script>

<template>
  <Button variant="outline" :size="small ? 'icon' : 'iconLg'" @click="toggleTheme">
    <Sun :class="['rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0', small ? '' : 'size-10']" />
    <Moon :class="['absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100', small ? '' : 'size-10']" />
  </Button>
</template>
