<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/shared/card";
import { X } from "lucide-vue-next";
import Button from "../../ui/button/Button.vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
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
  if (adminConnection)
    adminConnection.setState(
      `alexa-timer-vis.0.${timersArray[index]}.Reset`,
      true,
    );
};
</script>

<template>
  <Card v-if="appStore.showTimer" class="card">
    <Button class="button__close" @click="closeWindow">
      <X />
    </Button>
    <CardHeader class="card__header">
      <p>Alexa Timer</p>
    </CardHeader>
    <CardContent class="flex flex-wrap px-3 pt-0 pb-3">
      <div
        v-for="(singleTimer, i) in timersArray"
        :key="i"
        class="card__timer default_card"
      >
        <Button class="w-6 h-6 p-0 absolute right-2" @click="stopTimer(i)">
          <X />
        </Button>
        <div class="w-full">
          <h1 class="text-xl text-gray-500 h-8 line">Timer {{ i + 1 }}</h1>
          <div class="flex-between mt-2 text-xs">
            <div class="flex-between w-1/2 mr-6">
              <p>Startzeit:</p>
              <p class="">
                {{
                  timer[(singleTimer + "TimeStart") as keyof typeof timer]?.val
                }}
              </p>
            </div>
            <div class="flex-between w-1/2">
              <p>Endzeit:</p>
              <p>
                {{
                  timer[(singleTimer + "TimeEnd") as keyof typeof timer]?.val
                }}
              </p>
            </div>
          </div>
          <div class="flex-between mt-2">
            <p>Name:</p>
            <p>
              {{ timer[(singleTimer + "Name") as keyof typeof timer]?.val }}
            </p>
          </div>
          <div class="flex-between">
            <p>Gerät:</p>
            <p>
              {{ timer[(singleTimer + "Device") as keyof typeof timer]?.val }}
            </p>
          </div>
          <div class="flex-between">
            <p>Restdauer:</p>
            <p>
              {{ timer[(singleTimer + "String") as keyof typeof timer]?.val }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
<style lang="postcss" scoped>
.card {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 border-4 shadow-2xl border-accent-foreground/70 bg-accent w-3/5 max-w-[60rem];
}

.card__header {
  @apply text-center relative px-4;
}

.button__close {
  @apply absolute w-4 h-4 p-0 top-4 right-4 z-20;
}

.card__timer {
  @apply min-w-[40%] flex-1 max-w-[50%] m-1 flex p-2 relative;
}
</style>
