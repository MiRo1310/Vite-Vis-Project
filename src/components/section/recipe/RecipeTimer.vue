<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import { computed } from "vue";
import { Timer } from "@/types/types.ts";
import { getNameByIndex } from "@/composables/timer.ts";

const { iobroker } = useIobrokerStore();

const filteredTimers = computed(() => {
  return Object.values(iobroker.timers ?? {}).filter((timer) => (timer as Timer)?.timeString?.val);
});
</script>

<template>
  <div v-if="iobroker.timers?.timerAlive?.val" class="flex gap-2">
    <CardSubcard v-for="(timer, i) in filteredTimers" :key="i" class="min-w-60 flex-1 flex">
      <div class="w-full">
        <h1 class="text-sm flex justify-between">
          <span>{{ getNameByIndex(iobroker.timers, i + 1) }}</span>
          <span v-if="timer && 'timeString' in timer"> {{ timer.timeString?.val }} / {{ timer.initialTimer?.val }}</span>
        </h1>
        <TextSeparator />
        <div class="w-full">
          <div class="flex justify-between">
            <p>Gerät:</p>
            <p v-if="timer && 'device' in timer">
              class="flex-1 text-right">
              {{ timer.device?.val }}
            </p>
          </div>
        </div>
      </div>
    </CardSubcard>
  </div>
</template>
