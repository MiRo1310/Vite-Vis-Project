<script setup lang="ts">
import { Row } from "@tanstack/vue-table";
import { CustomValue } from "@/lib/table.ts";
import { AlexaDotAction } from "@/pages/alexa.vue";
import { Switch } from "@/components/ui/switch";
import { ref } from "vue";

const props = defineProps<{
  value: boolean,
  row: Row<AlexaDotAction>,
  source: string,
  customValue: CustomValue,
  callback: (params: Record<string, any>) => void
}>();


const checked = ref(props.value);

function update() {
  props.callback({ checked: !checked.value, row: props.row, source: props.source });
}
</script>

<template>
  <Switch v-model:checked="checked" @click="update" />
</template>
