<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { X } from "lucide-vue-next";
import Button from "../../ui/button/Button.vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker.ts";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/appStore.ts";

const appStore = useAppStore();
const iobrokerStore = useIobrokerStore();

const { timer } = storeToRefs(iobrokerStore);

const closeWindow = () => {
  appStore.toggleTimerVisibility();
};

const timersArray = ["timer1", "timer2", "timer3", "timer4"];

const stopTimer = (index: number) => {
  if (adminConnection.value)
    adminConnection.value.setState(`alexa-timer-vis.0.${timersArray[index]}.Reset`, true);
};
</script>
<template>
  <Card
    v-if="appStore.showTimer"
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 z-50 border-4 shadow-2xl border-accent-foreground/70 bg-accent"
  >
    <Button class="absolute w-4 h-4 p-0 top-4 right-4 z-20" @click="closeWindow">
      <X />
    </Button>
    <CardHeader class="text-center relative px-4">
      <p>Alexa Timer</p>
    </CardHeader>
    <CardContent class="flex flex-wrap px-3 pt-0 pb-3">
      <div
        v-for="(singleTimer, i) in timersArray" :key="i"
        class="bg-backgroundCards rounded-md min-w-[40%] flex-1 max-w-1/2 m-1 flex p-2 relative"
      >
        <Button class="w-8 h-8 p-0 absolute right-2" @click="stopTimer(i)">
          <X />
        </Button>
        <div class="w-full">
          <h1 class="text-xl text-gray-500 h-8">
            Timer {{ i + 1 }}
          </h1>
          <div class="flex w-full mt-2 justify-between text-xs">
            <div class="w-1/2 flex justify-between mr-6">
              <p>Startzeit:</p>
              <p class="flex-1 text-right">
                {{ timer[singleTimer as keyof typeof timer]?.timeStart?.val }}
              </p>
            </div>
            <div class="w-1/2 flex justify-between">
              <p>Endzeit:</p>
              <p class="flex-1 text-right">
                {{ timer[singleTimer as keyof typeof timer]?.timeEnd?.val }}
              </p>
            </div>
          </div>
          <div class="flex w-full mt-2">
            <p>Name:</p>
            <p class="flex-1 text-right">
              {{ timer[singleTimer as keyof typeof timer]?.name?.val }}
            </p>
          </div>
          <div class="flex w-full">
            <p>Gerät:</p>
            <p class="flex-1 text-right">
              {{ timer[singleTimer as keyof typeof timer]?.device?.val }}
            </p>
          </div>
          <div class="flex w-full">
            <p>Restdauer:</p>
            <p class="flex-1 text-right">
              {{ timer[singleTimer as keyof typeof timer]?.string?.val }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>