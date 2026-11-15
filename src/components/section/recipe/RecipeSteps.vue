<script setup lang="ts">
import { computed } from "vue";
import { type RecipeStep } from "@/composables/querys/recipeDetails.ts";
import { sortSteps } from "@/lib/recipe.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";

const props = defineProps<{ steps: RecipeStep[] }>();

const sortedSteps = computed(() => sortSteps(props.steps));
</script>

<template>
  <ol class="flex flex-col">
    <li v-for="(step, index) in sortedSteps" :key="step.position" class="relative flex gap-3 pb-6 last:pb-0 group" v-e2e="'recipe-step'">
      <!-- Verbindungslinie zwischen den Nummern -->
      <span class="absolute left-4 top-9 bottom-1 w-px bg-border group-last:hidden" aria-hidden="true" />
      <span :class="['relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold', recipeAccentClasses.primary.soft]">
        {{ index + 1 }}
      </span>
      <div class="min-w-0 pt-1">
        <h3 v-if="step.header" class="font-semibold leading-tight mb-1">{{ step.header }}</h3>
        <p class="whitespace-pre-wrap text-[15px] text-muted-foreground leading-relaxed">{{ step.text }}</p>
      </div>
    </li>
  </ol>
</template>
