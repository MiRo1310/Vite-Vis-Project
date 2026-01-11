<script setup lang="ts">
import { blinds0, blinds10, blinds100, blinds20, blinds30, blinds40, blinds50, blinds60, blinds70, blinds80, blinds90 } from "@/public";
import { computed } from "vue";
import { isDefined } from "@vueuse/core";

defineProps<{ position?: number }>();

const images = [blinds90, blinds80, blinds70, blinds60, blinds50, blinds40, blinds30, blinds20, blinds10];

const getShutterImageByPosition = computed(() => (position: number | undefined) => {
  if (!isDefined(position) || position === 0) {
    return blinds100;
  }

  if (position <= 10) {
    return blinds90;
  }
  if (position <= 20) {
    return blinds80;
  }
  if (position <= 30) {
    return blinds70;
  }
  if (position <= 40) {
    return blinds60;
  }
  if (position <= 50) {
    return blinds50;
  }
  if (position <= 60) {
    return blinds40;
  }
  if (position <= 70) {
    return blinds30;
  }
  if (position <= 80) {
    return blinds20;
  }
  if (position <= 90) {
    return blinds10;
  }
  return blinds0;
});
</script>

<template>
  <img class="w-8 h-12 img--white" :src="getShutterImageByPosition(position)" alt="FensterRollade" />
</template>

<style scoped lang="scss">
.dark {
  .img--white {
    filter: brightness(0) invert(1);
    -webkit-filter: brightness(0) invert(1);
  }
}
</style>
