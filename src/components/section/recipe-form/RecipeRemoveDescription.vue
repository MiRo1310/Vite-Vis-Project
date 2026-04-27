<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { Logger } from "@/lib/logger.ts";
import { TForm } from "@/components/section/recipe-form/index.ts";
import { isDefined } from "@vueuse/core";
import { computed } from "vue";
import { fieldsRecipe, TDescriptionSchema } from "@/components/section/recipe-form/schema.form.js";
import { useRecipeStore } from "@/store/recipeStore.ts";

const props = defineProps<{ description: TDescriptionSchema; form: TForm }>();

const recipeStore = useRecipeStore();
const formDescriptions = computed((): TDescriptionSchema[] => props.form.values[fieldsRecipe.descriptions]);
const saveToFormDescriptions = (descriptions: TDescriptionSchema[]) => {
  props.form.setFieldValue(fieldsRecipe.descriptions, descriptions);
};

const removeDescription = () => {
  const { id = null, position } = props.description;
  if (!isDefined(position)) {
    return;
  }
  if (id) {
    Logger("Removing description with id:", { value: id, useDebugMode: false });
    recipeStore.addRecipeDescriptionIdToDelete(id);
  }

  saveToFormDescriptions(
    [...formDescriptions.value]
      .filter((d) => d.position !== position)
      .sort((a, b) => a.position - b.position)
      .map((item, index) => ({ ...item, position: index })),
  );
};
</script>

<template>
  <Button v-if="formDescriptions.length > 1" size="icon" variant="outline" icon="remove" @click.prevent="removeDescription" />
</template>
