<script setup lang="ts">
import { type FunctionalComponent, ref } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { recipeAccentClasses, type RecipeAccentKey } from "@/constants/recipe.ts";

withDefaults(defineProps<{ title: string; subtitle?: string; icon: FunctionalComponent; accent?: RecipeAccentKey; hasError?: boolean }>(), {
  subtitle: undefined,
  accent: "primary",
  hasError: false,
});

const open = ref(true);
</script>

<template>
  <Card :class="['py-0 gap-0 rounded-2xl overflow-hidden', hasError ? 'border-destructive/60' : 'border-border/60']">
    <Collapsible v-model:open="open">
      <CollapsibleTrigger as-child>
        <button type="button" class="w-full flex items-center gap-3 p-3 md:p-4 text-left hover:bg-accent/40 transition-colors">
          <span :class="['h-10 w-10 rounded-xl flex items-center justify-center shrink-0', recipeAccentClasses[accent].soft]">
            <Component :is="icon" class="h-5 w-5" />
          </span>
          <span class="flex-1 min-w-0">
            <span class="block text-lg font-bold leading-tight">{{ title }}</span>
            <span v-if="subtitle" class="block text-xs text-muted-foreground">{{ subtitle }}</span>
          </span>
          <span v-if="hasError" class="h-2 w-2 rounded-full bg-destructive" aria-label="Fehler in diesem Abschnitt" />
          <ChevronDown :class="['h-5 w-5 text-muted-foreground transition-transform', open ? 'rotate-180' : '']" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="px-3 pb-3 md:px-4 md:pb-4">
          <slot />
        </div>
      </CollapsibleContent>
    </Collapsible>
  </Card>
</template>
