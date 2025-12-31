<script setup lang="ts">
import { computed, HTMLAttributes } from "vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { phoneStates } from "@/subscribeIds/phone.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { formatSecondsToTime } from "@/lib/time.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";

defineProps<{ class?: HTMLAttributes["class"] }>();
useDynamicSubscribe(phoneStates);

const { phone } = useIobrokerStore();

const lastCallDuration = computed(() => {
  return formatSecondsToTime(Number(phone?.lastDuration?.val) || 0);
});
</script>

<template>
  <div class="text-base mt-2 min-h-20 text-cardCustom-text bg-cardCustom-info p-2 shadow">
    <p>Letzter Anruf von:</p>
    <TextSeparator />
    <div class="text-2xs text-cardCustom-text/70">
      <p>{{ phone.lastCallerName?.val }}</p>
      <p>{{ phone.lastCaller?.val }}</p>
      <p>{{ phone.lastCallTimestamp?.val }}</p>
      <p>{{ lastCallDuration }}</p>
    </div>
  </div>
</template>
