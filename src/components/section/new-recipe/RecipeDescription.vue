<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";
import FormTextarea from "@/components/shared/form/FormTextarea.vue";

defineProps<{ index: number }>();
</script>

<template>
  <FormInput placeholder="Hier kannst du eine Überschrift hinzufügen" :name="`descriptions.${index}.header`" />
  <FormTextarea
    placeholder="Hier kannst du Text hinzufügen"
    :name="`descriptions.${index}.text`"
    onfocus="textareaFocus = true"
    onfocusout="textareaFocus=false"
    class-text-area="h-32"
  />
</template>
