<script setup lang="ts">
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { formatSecondsToTime } from "@/lib/time.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import CardSubcardHeader from "@/components/shared/card/CardSubcardHeader.vue";

const { iobroker } = useIobrokerStore();

const lastCallDuration = computed(() => {
  return formatSecondsToTime(Number(iobroker.phone?.lastDuration?.val) || 0);
});
</script>

<template>
  <CardSubcard>
    <CardSubcardHeader>Letzter Anruf von: </CardSubcardHeader>
    <TextSeparator />
    <div>
      <p>{{ iobroker.phone?.lastCallerName?.val }}</p>
      <p>{{ iobroker.phone?.lastCaller?.val }}</p>
      <p>{{ iobroker.phone?.lastCallTimestamp?.val }}</p>
      <p>{{ lastCallDuration }}</p>
    </div>
  </CardSubcard>
</template>
