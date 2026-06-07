<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HTMLAttributes } from "vue";

defineProps<{
  title: string;
  contentClass?: HTMLAttributes["class"];
}>();
</script>

<template>
  <Card class="py-0 gap-0">
    <CardHeader class="px-3 pt-2 pb-0">
      <CardTitle class="text-xs text-muted-foreground">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent :class="['px-3 pt-1 pb-2', contentClass]">
      <slot />
    </CardContent>
  </Card>
</template>