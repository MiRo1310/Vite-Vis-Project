<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { X } from "lucide-vue-next";
import Button from "../../ui/button/Button.vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/appStore.ts";
import { Timer, Timers } from "@/types/types.ts";
import { computed } from "vue";

const appStore = useAppStore();
const iobrokerStore = useIobrokerStore();

const { timer } = storeToRefs(iobrokerStore);

const closeWindow = () => {
  appStore.toggleTimerVisibility();
};

const stopTimer = (index: number) => {
  if (adminConnection) adminConnection.setState(`alexa-timer-vis.0.${"timer" + [index]}.Reset`, true);
};

const timerLabel = computed(() => (i: number): string => {
  const timerName = timer.value[i as keyof Timers].name?.val;
  if (!timerName || timerName === "timer") {
    return `Timer ${i}`;
  }
  return timerName;
});
</script>

<template>
  <Card v-if="appStore.showTimer" class="card">
    <Button class="card__close" @click="closeWindow">
      <X />
    </Button>
    <CardHeader class="card__header">
      <p>Alexa Timer</p>
    </CardHeader>
    <CardContent class="card__content">
      <div v-for="i of 4" :key="i" class="card__timer default_card">
        <Button class="w-6 h-6 p-0 absolute right-2" @click="stopTimer(i)">
          <X />
        </Button>
        <div class="card__section">
          <h1 class="card__title line">
            <span>{{ timerLabel(i) }} </span>
            <span>
              {{ (timer[i as keyof Timers] as Timer).timeString?.val }}
            </span>
          </h1>
          <div class="card__wrapper">
            <div class="card__info card__half">
              <p>Startzeit:</p>
              <p class="">
                {{ timer[i as keyof Timers].timeStart?.val }}
              </p>
            </div>
            <div class="card__info card__half">
              <p>Endzeit:</p>
              <p>
                {{ timer[i as keyof Timers].timeEnd?.val }}
              </p>
            </div>
          </div>
          <div class="card__info">
            <p>Gerät:</p>
            <p>
              {{ timer[i as keyof Timers].device?.val }}
            </p>
          </div>
          <div class="card__info">
            <p>Länge:</p>
            <p>
              {{ timer[i as keyof Timers].initialTimer?.val }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped>
.card {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 border-4 shadow-2xl border-accent-foreground/70 bg-accent w-3/5 max-w-[60rem];

  &__header {
    @apply text-center relative px-4;
  }

  &__close {
    @apply absolute w-4 h-4 p-0 top-4 right-4 z-20;
  }

  &__timer {
    @apply min-w-[40%] flex-1 max-w-[50%] m-1 flex p-2 relative;
  }

  &__content {
    @apply flex flex-wrap px-3 pt-0 pb-3;
  }
  &__section {
    @apply w-full;
  }

  &__title {
    @apply text-xl text-gray-500 flex justify-between mr-10 flex-wrap gap-x-4;
  }

  &__wrapper {
    @apply flex justify-between items-center mt-2 text-xs gap-6;
  }

  &__info {
    @apply flex justify-between items-center;
  }

  &__half {
    @apply w-1/2;
  }
}
</style>
