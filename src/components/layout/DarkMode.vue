<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Button } from "@/components/shared/button";
import { Moon, Sun } from "lucide-vue-next";

const mode = useColorMode();

const toggleTheme = () => {
  mode.value = mode.value === "light" ? "dark" : "light";
};
</script>

<template>
  <Button variant="outline" size="iconLg" @click="toggleTheme">
    <Sun class="size-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Moon class="size-10 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  </Button>
</template>
