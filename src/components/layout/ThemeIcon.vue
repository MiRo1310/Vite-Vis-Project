<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { Moon, Sun } from "lucide-vue-next";
import { cn } from "@/lib/utils";

// Sonne/Mond mit Dreh-Animation beim Wechsel Hell/Dunkel. Größe über `class` (Standard size-10).
const props = defineProps<{ class?: HTMLAttributes["class"]; colored?: boolean }>();
</script>

<template>
  <span :class="cn('relative inline-block size-10 shrink-0', props.class)">
    <Sun :class="['absolute inset-0 size-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0', { 'text-yellow-500': colored }]" />
    <Moon :class="['absolute inset-0 size-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100', { 'text-blue-300': colored }]" />
  </span>
</template>
