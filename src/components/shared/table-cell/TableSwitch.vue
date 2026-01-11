<script setup lang="ts">
import { Row } from "@tanstack/vue-table";
import { AlexaDotAction } from "@/pages/alexa.vue";
import { Switch } from "@/components/ui/switch";
import { ref } from "vue";

const props = defineProps<{
  value: boolean | undefined;
  row: Row<AlexaDotAction>;
  source: string;
  callback: (params: Record<string, any>) => void;
}>();

const checked = ref(props.value);

function update() {
  props.callback({
    checked: !checked.value,
    row: props.row,
    source: props.source,
  });
}
</script>

<template>
  <Switch v-model:checked="checked" @click="update" class="ml-4" />
</template>
