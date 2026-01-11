<script setup lang="ts">
import { getShutterImageByPosition } from "@/composables/shutterImages.ts";

defineProps<{ position?: number }>();
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
