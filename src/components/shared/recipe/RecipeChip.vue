<script setup lang="ts">
import { recipeAccentClasses, type RecipeAccentKey } from "@/constants/recipe.ts";

/**
 * Runder Filter-Chip der Rezept-App. Aktiv: weiche Fläche in der Akzentfarbe,
 * ohne `accent` neutral (dunkle Fläche). Ein `dot` zeigt die Akzentfarbe auch im inaktiven Zustand.
 */
withDefaults(defineProps<{ active?: boolean; accent?: RecipeAccentKey; dot?: boolean; count?: number }>(), {
  active: false,
  accent: undefined,
  dot: false,
  count: undefined,
});
</script>

<template>
  <button
    type="button"
    :aria-pressed="active"
    class="h-9 px-3.5 rounded-full text-sm font-medium whitespace-nowrap border inline-flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
    :class="
      active
        ? accent
          ? [recipeAccentClasses[accent].soft, recipeAccentClasses[accent].border]
          : 'bg-foreground text-background border-foreground'
        : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    "
  >
    <span v-if="dot && accent" :class="['h-2 w-2 rounded-full', recipeAccentClasses[accent].solid]" />
    <slot />
    <span v-if="count !== undefined" class="opacity-60">{{ count }}</span>
  </button>
</template>
