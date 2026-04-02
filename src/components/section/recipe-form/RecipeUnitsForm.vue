<script setup lang="ts">
import FormInput from "@/components/shared/form/FormInput.vue";

defineProps<{ name: string; label?: string }>();

const modelValue = defineModel<string>("modelValue");
</script>

<template>
  <FormInput v-model:model-value="modelValue" :label :name :disabled="true" />
</template>
