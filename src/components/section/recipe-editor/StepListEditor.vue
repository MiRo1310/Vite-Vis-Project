<script setup lang="ts">
import { useTemplateRef } from "vue";
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { InputShadcn } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRecipeEditor } from "@/composables/recipeEditor.ts";
import { useSortableList } from "@/composables/sortableList.ts";
import { type DraftStep } from "@/lib/recipe-editor.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";

const editor = useRecipeEditor();

const list = useTemplateRef<HTMLElement>("list");
useSortableList(list, (from, to) => editor.moveStep(from, to));

const setField = (step: DraftStep, field: "header" | "text", value: string | number | undefined) => {
  step[field] = String(value ?? "");
};

const headerError = (step: DraftStep) => editor.visibleErrors.value[`step.${step.key}.header`];
</script>

<template>
  <div class="flex flex-col gap-3">
    <ol ref="list" class="flex flex-col gap-3">
      <li
        v-for="(step, index) in editor.draft.value.steps"
        :key="step.key"
        class="rounded-xl border border-border/60 bg-card p-2.5 md:p-3 flex gap-2 md:gap-3"
        v-e2e="'recipe-step-editor'"
      >
        <div class="flex flex-col items-center gap-1 shrink-0">
          <span :class="['h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold', recipeAccentClasses.primary.soft]">{{ index + 1 }}</span>
          <button
            type="button"
            data-drag-handle
            class="hidden md:flex h-8 w-8 items-center justify-center text-muted-foreground/60 hover:text-foreground cursor-grab active:cursor-grabbing"
            aria-label="Schritt verschieben"
          >
            <GripVertical class="h-4 w-4" />
          </button>
        </div>

        <div class="flex-1 min-w-0 flex flex-col gap-2">
          <InputShadcn
            :model-value="step.header"
            type="text"
            placeholder="Überschrift (optional), z. B. Teig vorbereiten"
            aria-label="Überschrift"
            :invalid="!!headerError(step)"
            class="h-10 rounded-xl font-medium"
            @update:model-value="setField(step, 'header', $event)"
          />
          <p v-if="headerError(step)" class="text-xs text-destructive">{{ headerError(step) }}</p>
          <Textarea
            :model-value="step.text"
            placeholder="Was ist zu tun?"
            aria-label="Beschreibung"
            class="min-h-24 field-sizing-content rounded-xl text-base md:text-sm leading-relaxed"
            e2e="recipe-step-text"
            @update:model-value="setField(step, 'text', $event)"
          />
        </div>

        <div class="flex flex-col gap-1 shrink-0">
          <Button variant="ghost" size="icon" class="rounded-full" :disabled="index === 0" aria-label="Nach oben" @click="editor.moveStep(index, index - 1)">
            <ArrowUp class="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="rounded-full"
            :disabled="index >= editor.draft.value.steps.length - 1"
            aria-label="Nach unten"
            @click="editor.moveStep(index, index + 1)"
          >
            <ArrowDown class="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" class="rounded-full text-destructive hover:text-destructive" aria-label="Schritt entfernen" @click="editor.removeStep(step.key)">
            <Trash2 class="h-4 w-4" />
          </Button>
        </div>
      </li>
    </ol>

    <Button variant="outline" class="h-11 rounded-xl border-dashed self-start" v-e2e="'recipe-add-step'" @click="editor.addStep()">
      <Plus class="h-4 w-4" /> Schritt
    </Button>
  </div>
</template>
