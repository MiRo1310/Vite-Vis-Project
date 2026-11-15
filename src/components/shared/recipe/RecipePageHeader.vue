<script setup lang="ts">
import { type FunctionalComponent, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { recipeAccentClasses, type RecipeAccentKey } from "@/constants/recipe.ts";

const props = withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    icon?: FunctionalComponent;
    accent?: RecipeAccentKey;
    class?: HTMLAttributes["class"];
  }>(),
  { accent: "primary", subtitle: undefined, icon: undefined, class: undefined },
);
</script>

<template>
  <div
    :class="
      cn(
        'rounded-2xl border border-border/60 bg-linear-to-br p-4 md:p-5 flex flex-wrap items-center gap-3',
        recipeAccentClasses[props.accent].gradient,
        props.class,
      )
    "
  >
    <div v-if="icon" :class="['h-11 w-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm', recipeAccentClasses[accent].solid]">
      <Component :is="icon" class="h-5 w-5" />
    </div>
    <div class="min-w-0 flex-1">
      <h1 class="text-xl md:text-2xl font-bold tracking-tight leading-tight truncate">{{ title }}</h1>
      <p v-if="subtitle" class="text-sm text-muted-foreground mt-0.5">{{ subtitle }}</p>
      <slot name="meta" />
    </div>
    <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2 shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
