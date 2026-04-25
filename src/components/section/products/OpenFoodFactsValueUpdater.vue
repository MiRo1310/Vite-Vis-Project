<script setup lang="ts">
import { Button } from "@/components/shared/button";

import { computed, watch } from "vue";
import { TForm } from "@/components/section/recipe-form";

const props = defineProps<{ name: string; value?: string | number | boolean | null; unit?: string; form: TForm }>();

const addAll = defineModel<boolean>("addAll", { default: false });

const setValue = () => {
  if (props.value) {
    props.form.setFieldValue(props.name, props.value);
  }
};

watch(addAll, (newValue) => {
  if (newValue) {
    setValue();
    addAll.value = false;
  }
});

const disabled = computed(() => {
  return !props.value || props.value === "" || props.value === props.form.values[props.name];
});
</script>

<template>
  <div class="flex gap-2">
    <slot />

    <div class="mt-3 flex items-center gap-2">
      <Button @click.prevent="setValue" :disabled> Übernehmen </Button>
      <div v-if="value" class="text-blue-400 whitespace-nowrap">{{ value }} {{ unit }}</div>
    </div>
  </div>
</template>
