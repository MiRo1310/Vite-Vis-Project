<script setup lang="ts">
import { Clock, Flame, Timer, Users2 } from "@lucide/vue";
import { recipeAccentClasses } from "@/constants/recipe.ts";

withDefaults(
  defineProps<{
    preparationTimeMin?: number | null;
    totalTimeMin?: number | null;
    portions?: number | null;
    /** kcal pro Portion */
    kcal?: number | null;
    size?: "sm" | "md";
  }>(),
  { size: "sm", preparationTimeMin: undefined, totalTimeMin: undefined, portions: undefined, kcal: undefined },
);
</script>

<template>
  <div :class="['flex flex-wrap items-center text-muted-foreground', size === 'md' ? 'gap-x-4 gap-y-1.5 text-sm' : 'gap-x-3 gap-y-1 text-xs']">
    <span v-if="preparationTimeMin" class="flex items-center gap-1" title="Arbeitszeit">
      <Clock :class="['shrink-0', size === 'md' ? 'h-4 w-4' : 'h-3 w-3', recipeAccentClasses.teal.text]" />
      {{ preparationTimeMin }} min
    </span>
    <span v-if="totalTimeMin" class="flex items-center gap-1" title="Gesamtzeit">
      <Timer :class="['shrink-0', size === 'md' ? 'h-4 w-4' : 'h-3 w-3', recipeAccentClasses.lavender.text]" />
      {{ totalTimeMin }} min
    </span>
    <span v-if="portions" class="flex items-center gap-1">
      <Users2 :class="['shrink-0', size === 'md' ? 'h-4 w-4' : 'h-3 w-3', recipeAccentClasses.basil.text]" />
      {{ portions }} {{ portions === 1 ? "Portion" : "Portionen" }}
    </span>
    <span v-if="kcal" class="flex items-center gap-1" title="pro Portion">
      <Flame :class="['shrink-0', size === 'md' ? 'h-4 w-4' : 'h-3 w-3', recipeAccentClasses.primary.text]" />
      {{ kcal }} kcal/P
    </span>
  </div>
</template>
