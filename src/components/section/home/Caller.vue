<script setup lang="ts">
import { computed, HTMLAttributes } from "vue";
import { Card, CardContent } from "@/components/shared/card";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { phoneStates } from "@/subscribeIds/phone.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { formatSecondsToTime } from "@/lib/time.ts";

defineProps<{ class?: HTMLAttributes["class"] }>();
useDynamicSubscribe([phoneStates]);

const { phone } = useIobrokerStore();

const isCalling = computed((): string => {
  if (phone.ringing?.val) {
    return "bg-green-400 animate-pulse";
  }
  return "";
});

const lastCallDuration = computed(() => {
  return formatSecondsToTime(Number(phone?.lastDuration?.val) || 0);
});

</script>

<template>
  <Card styling="light" :class="[$props.class , isCalling]">
    <CardContent>
      <div class="callee__container">
        <p class="line">
          Anrufer:
        </p>
        <div v-if="phone.ringing?.val" class="caller">
          <p>{{ phone.callerName?.val }}</p>
          <p>{{ phone.caller?.val }}</p>
          <p>{{ phone.callerTimestamp?.val }}</p>
        </div>
      </div>
      <div class="callee__container">
        <p class="line">
          Letzter Anruf von:
        </p>
        <div class="caller">
          <p>{{ phone.lastCallerName?.val }}</p>
          <p>{{ phone.lastCaller?.val }}</p>
          <p>{{ phone.lastCallTimestamp?.val }}</p>
          <p>{{ lastCallDuration }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="postcss">
.callee__container {
  @apply text-xs mt-2 min-h-20  p-1  text-accent-foreground/50 bg-white p-2 shadow-lg
}

.caller {
  @apply ml-2 text-2xs text-black
}
</style>