<script setup lang="ts">
import DataCard from "@/components/shared/card/DataCard.vue";
import StatusDot, { type TStatusDotColor } from "@/components/shared/display/StatusDot.vue";
import type { RoutePath } from "@/router/routes.ts";

defineProps<{
  title: string;
  value: string | number;
  active: boolean;
  to?: RoutePath;
  inactiveColor?: TStatusDotColor;
}>();
</script>

<template>
  <DataCard :title :to content-class="flex items-center gap-1.5">
    <StatusDot :active :inactive-color />
    <span class="text-sm font-semibold">{{ value }}</span>
  </DataCard>
</template>
