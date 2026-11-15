<script setup lang="ts">
import { type FunctionalComponent } from "vue";
import { recipeAccentClasses, type RecipeAccentKey } from "@/constants/recipe.ts";

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    icon: FunctionalComponent;
    accent?: RecipeAccentKey;
  }>(),
  { accent: "primary", description: undefined },
);
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center py-12 px-4">
    <div class="relative mb-5">
      <!-- bunte Kleckse hinter dem Icon -->
      <span class="absolute -left-4 -top-3 h-10 w-10 rounded-full bg-recipe-mango/40 blur-[2px]" />
      <span class="absolute -right-5 top-1 h-8 w-8 rounded-full bg-recipe-berry/35 blur-[2px]" />
      <span class="absolute left-2 -bottom-4 h-7 w-7 rounded-full bg-recipe-teal/35 blur-[2px]" />
      <div :class="['relative h-16 w-16 rounded-2xl flex items-center justify-center shadow-md', recipeAccentClasses[accent].solid]">
        <Component :is="icon" class="h-7 w-7" />
      </div>
    </div>
    <p class="text-lg font-semibold">{{ title }}</p>
    <p v-if="description" class="text-sm text-muted-foreground mt-1 max-w-sm">{{ description }}</p>
    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>
