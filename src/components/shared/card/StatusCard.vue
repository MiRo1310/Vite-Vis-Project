<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { useRouter } from "vue-router";
import { type HTMLAttributes } from "vue";

const props = defineProps<{
  title: string;
  value: string | number;
  active: boolean;
  route?: string;
  class?: HTMLAttributes["class"];
}>();

const router = useRouter();

async function handleClick() {
  if (props.route) {
    await router.push(props.route);
  }
}
</script>

<template>
  <Card :class="['py-0 gap-0 transition-colors', props.class, route ? 'cursor-pointer hover:bg-accent' : '']" @click="handleClick">
    <CardHeader class="px-3 pt-2 pb-0">
      <CardTitle class="text-xs text-muted-foreground">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="px-3 pt-1 pb-2 flex items-center gap-1.5">
      <StatusDot :active />
      <span class="text-sm font-semibold">{{ value }}</span>
    </CardContent>
  </Card>
</template>
