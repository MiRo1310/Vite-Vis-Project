<script setup lang="ts">
import ToggleCardVisual from "@/components/shared/card/ToggleCardVisual.vue";

defineProps<{
  title: string;
  active: boolean;
  color?: "green" | "yellow";
}>();

const emits = defineEmits<(e: "click") => void>();
</script>

<template>
  <ToggleCardVisual :title="title" :active="active" :color="color" @click="emits('click')" />
</template>
