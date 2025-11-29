<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed, HTMLAttributes } from "vue";
import { useAppStore } from "@/store/appStore.ts";
import { Timer, Timers } from "@/types/types.ts";

defineProps<{ class: HTMLAttributes["class"] }>();

const iobrokerStore = useIobrokerStore();

const { timer } = storeToRefs(iobrokerStore);

const totalTime = computed(() => (i: number) => {
  const endTime = (timer.value[i as keyof Timers] as Timer).timeEnd?.val;
  const startTime = (timer.value[i as keyof Timers] as Timer).timeStart?.val;
  if (!endTime || !startTime) return "-";
  return Math.floor((new Date(`1970-01-01T${endTime}Z`).getTime() - new Date(`1970-01-01T${startTime}Z`).getTime()) / 60000) + " Min";
});
</script>

<template>
  <Card :class="$props.class" styling="light" @click="useAppStore().toggleTimerVisibility()">
    <CardHeader>
      <CardTitle>
        <p>Alexa Timer</p>
      </CardTitle>
    </CardHeader>
    <CardContent class="timer__content">
      <div v-for="i in 4" :key="i" class="min-w-[180px] flex-1 max-w-1/2 m-1 flex px-2 default_card">
        <div class="w-full">
          <h1 class="timer__sub-title line">
            <span>Timer {{ i }}</span>
            <span> {{ (timer[i as keyof Timers] as Timer).timeString?.val }}</span>
          </h1>
          <div class="w-full text-xs">
            <div class="timer__label">
              <p>Name:</p>
              <p class="flex-1 text-right">
                {{ (timer[i as keyof Timers] as Timer).name?.val }}
              </p>
            </div>
            <div class="timer__label">
              <p>Gerät:</p>
              <p class="flex-1 text-right">
                {{ (timer[i as keyof Timers] as Timer).device?.val }}
              </p>
            </div>
            <div class="timer__label">
              <p>Gesamtzeit:</p>
              <p class="flex-1 text-right">
                {{ totalTime(i) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.timer {
  &__content {
    @apply flex flex-wrap -mx-1 min-w-[400px];
  }

  &__sub-title {
    @apply text-gray-500 text-xl;
    @apply flex justify-between;
  }

  &__label {
    @apply text-accent-foreground/50 font-bold;
    @apply flex justify-between;
  }
}
</style>
