<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const props = defineProps<{
  title: string;
  active: boolean;
}>();

defineEmits<{ click: [] }>();
</script>

<template>
  <Card
    class="py-0 gap-0 cursor-pointer transition-colors hover:bg-accent"
    :class="props.active ? 'border-green-500/60' : 'border-destructive/60'"
    @click="$emit('click')"
  >
    <CardHeader class="px-3 pt-2 pb-0">
      <CardTitle class="text-xs text-muted-foreground">{{ props.title }}</CardTitle>
    </CardHeader>
    <CardContent class="px-3 pt-1 pb-2 flex items-center gap-1.5">
      <span :class="['h-2 w-2 rounded-full shrink-0', props.active ? 'bg-green-400' : 'bg-red-400']" />
      <span class="text-sm font-semibold">{{ props.active ? "An" : "Aus" }}</span>
    </CardContent>
  </Card>
</template>
