<script setup lang="ts">
import { Minus, Plus, RotateCcw } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { recipeAccentClasses } from "@/constants/recipe.ts";

const MIN_PORTIONS = 1;
const MAX_PORTIONS = 99;

const props = defineProps<{ basePortions: number }>();
const portions = defineModel<number>({ required: true });

const change = (delta: number) => {
  portions.value = Math.min(MAX_PORTIONS, Math.max(MIN_PORTIONS, portions.value + delta));
};
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      variant="outline"
      size="icon-lg"
      class="rounded-full"
      aria-label="Eine Portion weniger"
      :disabled="portions <= MIN_PORTIONS"
      v-e2e="'servings-minus'"
      @click="change(-1)"
    >
      <Minus class="h-4 w-4" />
    </Button>
    <div class="min-w-16 text-center leading-tight" aria-live="polite">
      <p :class="['text-xl font-bold tabular-nums', recipeAccentClasses.basil.text]" v-e2e="'servings-value'">{{ portions }}</p>
      <p class="text-[11px] text-muted-foreground">{{ portions === 1 ? "Portion" : "Portionen" }}</p>
    </div>
    <Button
      variant="outline"
      size="icon-lg"
      class="rounded-full"
      aria-label="Eine Portion mehr"
      :disabled="portions >= MAX_PORTIONS"
      v-e2e="'servings-plus'"
      @click="change(1)"
    >
      <Plus class="h-4 w-4" />
    </Button>
    <Button
      v-if="portions !== props.basePortions"
      variant="ghost"
      size="sm"
      class="rounded-full text-muted-foreground"
      :title="`Zurück auf ${props.basePortions}`"
      @click="portions = props.basePortions"
    >
      <RotateCcw class="h-3.5 w-3.5" /> {{ props.basePortions }}
    </Button>
  </div>
</template>
