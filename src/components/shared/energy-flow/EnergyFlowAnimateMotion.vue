<script setup lang="ts">
defineProps<{ duration: number; begin: string; id: string; reverse?: boolean }>();
</script>

<template>
  <animateMotion
    :dur="`${duration}s`"
    repeatCount="indefinite"
    :begin="begin"
    :keyPoints="reverse ? '1;0' : '0;1'"
    keyTimes="0;1"
    calcMode="linear"
    rotate="auto"
  >
    <mpath :href="`#energy-path-${id}`" />
  </animateMotion>
</template>
