<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { X } from "lucide-vue-next";
import Button from "../../ui/button/Button.vue";
import { useAppStore } from "@/store/app-store.js";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { ioBrokerService } from "@/lib/io-broker-service.ts";
import { computed } from "vue";
import { type Timers } from "@/iobroker-states/subscribed-states.iobroker.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";

const appStore = useAppStore();
const { iobroker } = useIobrokerStore();

const closeWindow = () => {
  appStore.toggleTimerVisibility();
};

const stopTimer = async (index: number) => {
  const adminConnection = ioBrokerService.connection;
  if (adminConnection) {
    await adminConnection.setState(`alexa-timer-vis.0.${"timer" + [index]}.Reset`, true);
  }
};

const timerLabel = computed(() => (i: number): string => {
  const timerName = iobroker.timers[i as keyof Timers].name.value;
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
    <CardContent class="grid grid-cols-2 gap-6">
      <div v-for="i of 4" :key="i" class="col-span-2 lg:col-span-1 relative bg-background/70 p-2 shadow-lg rounded-md">
        <div class="w-full">
          <div class="flex justify-between items-center mb-2">
            <h1 class="text-xl text-gray-500 flex justify-between mr-10 flex-wrap gap-x-4">
              <span class="text-cardCustom-foreground">{{ timerLabel(i) }} </span>
              <span>
                <span v-if="i === 1"> {{ iobroker.timers[1].timeString.value }} </span>
                <span v-else-if="i === 2"> {{ iobroker.timers[2].timeString.value }} </span>
                <span v-else-if="i === 3"> {{ iobroker.timers[3].timeString.value }} </span>
                <span v-else> {{ iobroker.timers[4].timeString.value }} </span>
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
                {{ iobroker.timers?.[i as keyof Timers].timeStart?.value }}
              </p>
            </div>
            <div class="flex justify-between items-center w-1/2">
              <p>Endzeit:</p>
              <p>
                {{ iobroker.timers?.[i as keyof Timers].timeEnd?.value }}
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <p>Gerät:</p>
            <p>
              {{ iobroker.timers?.[i as keyof Timers].device?.value }}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p>Länge:</p>
            <p>
              {{ iobroker.timers?.[i as keyof Timers].initialTimer?.value }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
