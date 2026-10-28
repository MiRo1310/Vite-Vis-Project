<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { RoutePath } from "@/router/routes.ts";

defineProps<{ title: string; to?: RoutePath }>();
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to
    :type="to ? undefined : 'button'"
    class="flex flex-col items-center gap-1 rounded-md border bg-card shadow-xs px-3 pt-2 pb-2 cursor-pointer hover:bg-accent transition-colors shrink-0 min-w-20 flex-auto"
  >
    <span class="text-xs text-muted-foreground whitespace-nowrap w-full">{{ title }}</span>
    <slot />
  </component>
</template>
