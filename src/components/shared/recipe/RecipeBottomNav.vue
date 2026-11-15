<script setup lang="ts">
import { useRoute } from "vue-router";
import { recipeAccentClasses, type RecipeNavItem, recipeNavItems } from "@/constants/recipe.ts";

const route = useRoute();

const isActive = (item: RecipeNavItem): boolean => {
  const name = String(route.name ?? "");
  return name === item.routeName || item.activeFor.includes(name);
};
</script>

<template>
  <nav
    class="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]"
    aria-label="Rezept-Navigation"
  >
    <div class="grid grid-cols-4 h-16">
      <RouterLink
        v-for="item in recipeNavItems"
        :key="item.routeName"
        :to="{ name: item.routeName }"
        class="flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors"
        :class="isActive(item) ? recipeAccentClasses[item.accent].text : 'text-muted-foreground'"
        v-e2e="`recipe-nav-${item.routeName}`"
      >
        <span
          class="flex h-8 w-14 items-center justify-center rounded-full transition-all duration-200"
          :class="isActive(item) ? [recipeAccentClasses[item.accent].soft, 'scale-105'] : ''"
        >
          <Component :is="item.icon" class="h-5 w-5" />
        </span>
        {{ item.label }}
      </RouterLink>
    </div>
  </nav>
</template>
