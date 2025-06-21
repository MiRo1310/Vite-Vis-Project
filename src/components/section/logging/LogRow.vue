<script setup lang="ts">
import { type Log } from "@/pages/logs.vue";
import { toLocaleTime } from "@/lib/time.ts";

defineProps<{ log: Log }>();
</script>

<template>
  <div class="log-row">
    <span class="log-row__ts">{{ toLocaleTime(log.ts) }}</span>
    <span class="log-row__from">{{ log.from }}</span>
    {{ log.message }}
  </div>
</template>

<style scoped lang="scss">
.log-row {
  @apply text-2xs;

  &__ts {
    @apply w-28 inline-block;
  }

  &__from {
    @apply inline-block w-24;
  }
}
</style>
