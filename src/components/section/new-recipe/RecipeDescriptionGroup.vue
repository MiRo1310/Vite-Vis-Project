<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import FormTextarea from "@/components/shared/form/FormTextarea.vue";
import { IRecipeDescriptionCreateOrUpdate } from "@/components/section/new-recipe/index.ts";

defineProps<{ description: IRecipeDescriptionCreateOrUpdate }>();
</script>

<template>
  <FormInput placeholder="Hier kannst du eine Überschrift hinzufügen" :name="`descriptions.${description.position}.header`" />
  <FormTextarea
    placeholder="Hier kannst du Text hinzufügen"
    :name="`descriptions.${description.position}.text`"
    onfocus="textareaFocus = true"
    onfocusout="textareaFocus=false"
    class-text-area="h-32"
  />
</template>
