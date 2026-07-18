<script setup lang="ts">
import ToggleCardVisual from "@/components/shared/card/ToggleCardVisual.vue";
import { type UnwrapRef } from "vue";
import { type BooleanValue } from "@/store/valueClasses.ts";

const props = defineProps<{
  title: string;
  booleanValue: UnwrapRef<BooleanValue>;
  color?: "green" | "yellow";
  ack?: boolean;
}>();
</script>

<template>
  <ToggleCardVisual :title="props.title" :active="booleanValue.value" :color="props.color" @click="booleanValue.toggle(ack)" />
</template>
