<script setup lang="ts">
import { Clock, Flame, Timer, Users2 } from "lucide-vue-next";

defineProps<{
  preparationTimeMin?: number | null;
  totalTimeMin?: number | null;
  portions?: number | null;
  kcal?: number | null;
}>();
</script>

<template>
  <div class="flex flex-wrap gap-3 text-xs text-muted-foreground">
    <span v-if="preparationTimeMin" class="flex items-center gap-1">
      <Clock class="h-3 w-3 shrink-0" />
      {{ preparationTimeMin }} min
    </span>
    <span v-if="totalTimeMin" class="flex items-center gap-1">
      <Timer class="h-3 w-3 shrink-0" />
      {{ totalTimeMin }} min
    </span>
    <span v-if="portions" class="flex items-center gap-1">
      <Users2 class="h-3 w-3 shrink-0" />
      {{ portions }} Portionen
    </span>
    <span v-if="kcal" class="flex items-center gap-1">
      <Flame class="h-3 w-3 shrink-0" />
      {{ kcal }} kcal/P
    </span>
  </div>
</template>
