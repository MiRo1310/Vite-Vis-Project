<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { X } from "lucide-vue-next";
import Button from "../../ui/button/Button.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/appStore.ts";
import { Timer, Timers } from "@/types/types.ts";
import { computed } from "vue";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";

const appStore = useAppStore();
const iobrokerStore = useIobrokerStore();

const { timer } = storeToRefs(iobrokerStore);

const closeWindow = () => {
  appStore.toggleTimerVisibility();
};

const stopTimer = (index: number) => {
  if (adminConnection) {
    adminConnection.setState(`alexa-timer-vis.0.${"timer" + [index]}.Reset`, true);
  }
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
  <Card
    v-if="appStore.showTimer"
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 border-2 shadow-2xl border-accent-foreground/70 bg-accent w-4/5 max-w-300"
  >
    <Button class="absolute top-6 right-6 z-20" variant="outline" size="icon" @click="closeWindow">
      <X />
    </Button>
    <CardHeader class="text-center text-xl relative px-4">
      <p>Alexa Timer</p>
    </CardHeader>
    <CardContent class="flex flex-wrap gap-6">
      <div v-for="i of 4" :key="i" class="min-w-[40%] flex-1 max-w-[50%] flex relative bg-background/70 p-2 shadow-lg rounded-md">
        <div class="w-full">
          <div class="flex justify-between items-center mb-2">
            <h1 class="text-xl text-gray-500 flex justify-between mr-10 flex-wrap gap-x-4">
              <span class="text-cardCustom-foreground">{{ timerLabel(i) }} </span>
              <span>
                {{ (timer[i as keyof Timers] as Timer).timeString?.val }}
              </span>
            </h1>
            <Button variant="outline" size="icon" @click="stopTimer(i)">
              <X />
            </Button>
          </div>
          <TextSeparator />
          <div class="flex justify-between items-center mt-2 text-xs gap-6">
            <div class="flex justify-between items-center w-1/2">
              <p>Startzeit:</p>
              <p class="">
                {{ timer[i as keyof Timers].timeStart?.val }}
              </p>
            </div>
            <div class="flex justify-between items-center w-1/2">
              <p>Endzeit:</p>
              <p>
                {{ timer[i as keyof Timers].timeEnd?.val }}
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <p>Gerät:</p>
            <p>
              {{ timer[i as keyof Timers].device?.val }}
            </p>
          </div>
          <div class="flex justify-between items-center">
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
