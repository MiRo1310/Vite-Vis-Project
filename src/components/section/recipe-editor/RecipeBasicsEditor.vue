<script setup lang="ts">
import { computed } from "vue";
import { InputShadcn } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NumberField from "@/components/shared/recipe/NumberField.vue";
import { useRecipeEditor } from "@/composables/recipeEditor.ts";
import { useRecipeCategories } from "@/composables/querys/recipeCategories.ts";
import { getCategoryColor } from "@/lib/recipe.ts";
import { recipeAccentClasses } from "@/constants/recipe.ts";

const NO_CATEGORY = "__none__";

const editor = useRecipeEditor();
const draft = editor.draft;
const errors = editor.visibleErrors;

const { result: categoriesResult } = useRecipeCategories();
const categories = computed(() => categoriesResult.value?.recipeCategories ?? []);

const category = computed({
  get: () => draft.value.recipeCategoryId ?? NO_CATEGORY,
  set: (value: string) => {
    draft.value.recipeCategoryId = value === NO_CATEGORY ? null : value;
  },
});

const setName = (value: string | number | undefined) => {
  draft.value.name = String(value ?? "");
};
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div class="col-span-2 md:col-span-4 flex flex-col gap-1.5">
      <Label for="recipe-name">Name</Label>
      <InputShadcn
        id="recipe-name"
        :model-value="draft.name"
        type="text"
        placeholder="z. B. Omas Apfelkuchen"
        :invalid="!!errors.name"
        class="h-12 rounded-xl text-lg font-semibold"
        e2e="recipe-name"
        @update:model-value="setName"
      />
      <p v-if="errors.name" class="text-xs text-destructive">{{ errors.name }}</p>
    </div>

    <div class="col-span-2 flex flex-col gap-1.5">
      <Label for="recipe-category">Kategorie</Label>
      <Select v-model="category">
        <SelectTrigger id="recipe-category" class="w-full h-11! rounded-xl" v-e2e="'recipe-category'">
          <SelectValue placeholder="Keine Kategorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="NO_CATEGORY">Keine Kategorie</SelectItem>
          <SelectItem v-for="c in categories" :key="c.id" :value="c.id">
            <span :class="['h-2 w-2 rounded-full inline-block mr-1.5', recipeAccentClasses[getCategoryColor(c.name)].solid]" />{{ c.name }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="col-span-2 md:col-span-2 flex flex-col gap-1.5">
      <Label for="recipe-portions">Portionen</Label>
      <NumberField
        id="recipe-portions"
        v-model="draft.portions"
        integer
        :min="1"
        :max="255"
        :invalid="!!errors.portions"
        class="h-11 rounded-xl text-base"
        e2e="recipe-portions"
      />
      <p v-if="errors.portions" class="text-xs text-destructive">{{ errors.portions }}</p>
    </div>

    <div class="col-span-1 md:col-span-2 flex flex-col gap-1.5">
      <Label for="recipe-prep">Arbeitszeit (min)</Label>
      <NumberField id="recipe-prep" v-model="draft.preparationTimeMin" integer :min="0" placeholder="–" :invalid="!!errors.preparationTimeMin" class="h-11 rounded-xl text-base" />
      <p v-if="errors.preparationTimeMin" class="text-xs text-destructive">{{ errors.preparationTimeMin }}</p>
    </div>

    <div class="col-span-1 md:col-span-2 flex flex-col gap-1.5">
      <Label for="recipe-total">Gesamtzeit (min)</Label>
      <NumberField id="recipe-total" v-model="draft.totalTimeMin" integer :min="0" placeholder="–" :invalid="!!errors.totalTimeMin" class="h-11 rounded-xl text-base" />
      <p v-if="errors.totalTimeMin" class="text-xs text-destructive">{{ errors.totalTimeMin }}</p>
    </div>
  </div>
</template>
