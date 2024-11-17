<script setup lang="ts">
import { computed, HTMLAttributes } from "vue";
import { Card, CardContent } from "@/components/shared/card";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { phoneStates } from "@/lib/iobroker/ids-to-subscribe/phone.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";

defineProps<{ class?: HTMLAttributes["class"] }>();
useDynamicSubscribe([phoneStates]);

const { phone } = useIobrokerStore();

const isCalling = computed((): string => {
  if (phone.ringing?.val) {
    return "bg-green-400 animate-pulse";
  }
  return "";
});
</script>

<template>
  <Card styling="blue" :class="[$props.class , isCalling]">
    <CardContent>
      <div class="callee__container">
        <p>Anrufer:</p>
        <div v-if="phone.ringing?.val">
          <p>{{ phone.calleeName?.val }}</p>
          <p>{{ phone.callee?.val }}</p>
        </div>
      </div>
      <div class="callee__container">
        <p>Letzter Anruf von:</p>
        <div class="ml-2">
          <p>{{ phone.lastCalleeName?.val }}</p>
          <p>{{ phone.lastCallee?.val }}</p>
          <p>{{ phone.lastCallTimestamp?.val }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="postcss">
.callee__container {
  @apply text-xs mt-2 min-h-16 border p-1 border-backgroundColor
}
</style>