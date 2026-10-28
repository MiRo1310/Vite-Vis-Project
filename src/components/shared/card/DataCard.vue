<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HTMLAttributes } from "vue";
import type { RoutePath } from "@/router/routes.ts";

defineProps<{
  title?: string;
  contentClass?: HTMLAttributes["class"];
  /** Titel bricht nicht um, Karte wird so breit wie der Titel */
  nowrapTitle?: boolean;
  clickable?: boolean;
  /** Macht die ganze Karte zum Link (impliziert clickable) */
  to?: RoutePath;
}>();
</script>

<template>
  <Card
    :class="[
      'py-0 gap-0 rounded-md',
      {
        'cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50 transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring':
          clickable || to,
        relative: to,
      },
    ]"
  >
    <!-- Stretched Link: legt sich über die ganze Karte, Klassen von außen bleiben auf der Card -->
    <RouterLink
      v-if="to"
      :to
      :aria-label="title"
      class="absolute inset-0 z-10 rounded-md focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
    />
    <!-- @container im shadcn-Header ignoriert die Inhaltsbreite, daher bei nowrapTitle zurücksetzen -->
    <CardHeader v-if="title" :class="['px-3 pt-2 pb-0', { '[container-type:normal]!': nowrapTitle }]">
      <CardTitle :class="['text-xs text-muted-foreground', { 'whitespace-nowrap': nowrapTitle }]">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent :class="['px-3 pt-1 pb-2', contentClass]">
      <slot />
    </CardContent>
  </Card>
</template>
