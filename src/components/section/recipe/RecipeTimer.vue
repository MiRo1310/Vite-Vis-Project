<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import { computed } from "vue";
import { Timer } from "@/types/types.ts";
import { getNameByIndex } from "@/composables/timer.ts";

const iobrokerStore = useIobrokerStore();

const { timers, showTimerCard } = storeToRefs(iobrokerStore);
const filteredTimers = computed(() => {
  return Object.values(timers.value).filter((timer) => (timer as Timer)?.timeString?.val);
});
</script>

<template>
  <div v-if="showTimerCard.timerAlive?.val" class="flex gap-2">
    <CardSubcard v-for="(timer, i) in filteredTimers" :key="i" class="min-w-60 flex-1 flex">
      <div class="w-full">
        <h1 class="text-sm flex justify-between">
          <span>{{ getNameByIndex(timers, i) }}</span>
          <span v-if="timer?.timeString?.val"> {{ timer.timeString?.val }} / {{ timer.initialTimer?.val }}</span>
        </h1>
        <TextSeparator />
        <div class="w-full">
          <div class="flex justify-between">
            <p>Gerät:</p>
            <p class="flex-1 text-right">
              {{ timer.device?.val }}
            </p>
          </div>
        </div>
      </div>
    </CardSubcard>
  </div>
</template>
