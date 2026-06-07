<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { computed } from "vue";

const props = defineProps<{
  title: string;
  active: boolean;
  color?: "green" | "yellow";
}>();

defineEmits<{ click: [] }>();

const borderClass = computed(() => {
  if (props.color === "yellow") {
    return props.active ? "border-yellow-400/70" : "";
  }
  return props.active ? "border-green-500/60" : "border-destructive/60";
});

const dotClass = computed(() => {
  if (props.color === "yellow") {
    return props.active ? "bg-yellow-400 shadow-[0_0_6px_2px_rgba(250,204,21,0.4)]" : "bg-muted-foreground/25";
  }
  return props.active ? "bg-green-400" : "bg-red-400";
});

const label = computed(() => (props.active ? "An" : "Aus"));
</script>

<template>
  <Card
    class="py-0 gap-0 cursor-pointer transition-colors hover:bg-accent"
    :class="borderClass"
    @click="$emit('click')"
  >
    <CardHeader class="px-3 pt-2 pb-0">
      <CardTitle class="text-xs text-muted-foreground">{{ props.title }}</CardTitle>
    </CardHeader>
    <CardContent class="px-3 pt-1 pb-2 flex items-center gap-1.5">
      <span :class="['h-2 w-2 rounded-full shrink-0 transition-all', dotClass]" />
      <span class="text-sm font-semibold">{{ label }}</span>
    </CardContent>
  </Card>
</template>
