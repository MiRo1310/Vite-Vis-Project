<script setup lang="ts">
import { computed } from "vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { phoneStates } from "@/subscribeIds/phone.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { formatSecondsToTime } from "@/lib/time.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import CardSubcardHeader from "@/components/shared/card/CardSubcardHeader.vue";

useDynamicSubscribe(phoneStates);

const { phone } = useIobrokerStore();

const lastCallDuration = computed(() => {
  return formatSecondsToTime(Number(phone?.lastDuration?.val) || 0);
});
</script>

<template>
  <CardSubcard>
    <CardSubcardHeader>Letzter Anruf von: </CardSubcardHeader>
    <TextSeparator />
    <div>
      <p>{{ phone.lastCallerName?.val }}</p>
      <p>{{ phone.lastCaller?.val }}</p>
      <p>{{ phone.lastCallTimestamp?.val }}</p>
      <p>{{ lastCallDuration }}</p>
    </div>
  </CardSubcard>
</template>
