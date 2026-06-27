<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import RecipeMetaInfo from "@/components/section/recipe/RecipeMetaInfo.vue";
import { UtensilsCrossed } from "lucide-vue-next";
import { type TRecipe } from "@/store";

defineProps<{ recipe: TRecipe }>();
</script>

<template>
  <Card class="py-0 gap-0 overflow-hidden cursor-pointer group hover:shadow-lg hover:border-orange-300/60 dark:hover:border-orange-700/50 transition-all duration-200 h-full">
    <div class="h-28 bg-gradient-to-br from-orange-400/25 via-amber-300/15 to-transparent dark:from-orange-600/20 dark:via-amber-500/10 flex items-center justify-center">
      <UtensilsCrossed class="h-10 w-10 text-orange-400/50 dark:text-orange-400/40" />
    </div>
    <CardContent class="px-3 pt-2 pb-3">
      <p class="font-semibold text-sm leading-tight mb-1.5 line-clamp-2">{{ recipe.name }}</p>
      <RecipeMetaInfo :preparation-time-min="recipe.preparationTimeMin" :total-time-min="recipe.totalTimeMin" :kcal="recipe.totalKcal" />
    </CardContent>
  </Card>
</template>
