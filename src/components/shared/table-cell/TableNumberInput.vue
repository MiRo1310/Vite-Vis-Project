<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Row } from "@tanstack/vue-table";
import { AlexaDotAction } from "@/pages/alexa.vue";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  value: string,
  row: Row<AlexaDotAction>,
  source: string,
  customValue: { step?: number, min?: number, max?: number, defaultValue?: number },
  callback: (params: Record<string, any>) => void
}>();
const value = ref(Number(props.value));

function update(event: string | number) {
  value.value = Number(event);
  if (isNaN(Number(event))) return;
  props.callback({ value: Number(event), row: props.row, source: props.source });
}

watchEffect(() => {
  if (props.value) {
    value.value = Number(props.value);
  }
});
</script>

<template>
  <Input
    class="w-24"
    :model-value="value" type="number" :step="props.customValue.step" :min="props.customValue.min"
    :default-value="props.customValue.defaultValue"
    :max="props.customValue.max"
    @update:model-value="update($event)"
  />
</template>
