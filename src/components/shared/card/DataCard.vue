<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HTMLAttributes } from "vue";

defineProps<{
  title: string;
  contentClass?: HTMLAttributes["class"];
  clickable?: boolean;
}>();
</script>

<template>
  <Card :class="['py-0 gap-0', clickable ? 'cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50 transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring' : '']">
    <CardHeader class="px-3 pt-2 pb-0">
      <CardTitle class="text-xs text-muted-foreground">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent :class="['px-3 pt-1 pb-2', contentClass]">
      <slot />
    </CardContent>
  </Card>
</template>
