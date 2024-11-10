<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import { Hourglass, X } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import { ref, watch } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker";
import { storeToRefs } from "pinia";

const iobrokerStore = useIobrokerStore();

const { timer } = storeToRefs(iobrokerStore);

const closeWindow = () => {
  iobrokerStore.setValueToKey("showTimerCard", false);
};
const showTimerCard = ref(false);
const timersArray = ["timer1", "timer2", "timer3", "timer4"];

watch(
  () => iobrokerStore.showTimerCard,
  (val: boolean) => {
    showTimerCard.value = val;
  }
);
const stopTimer = (index: number) => {
  if (adminConnection.value)
    adminConnection.value.setState(`alexa-timer-vis.0.${timersArray[index]}.Reset`, true);
};
</script>
<template>
  <Card
    v-if="iobrokerStore.showTimerCard"
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 z-50"
  >
    <Button class="absolute w-8 h-8 p-0 top-4 right-4 z-20" @click="closeWindow">
      <X />
    </Button>

    <CardHeader class="text-center relative px-4">
      <Hourglass class="w-10 h-10 absolute top-4 left-3" />
      <p>Alexa Timer</p>
    </CardHeader>
    <CardContent class="flex flex-wrap px-3 pt-0 pb-3">
      <div
        v-for="(singleTimer, i) in timersArray" :key="i"
        class="bg-gray-100 rounded-md min-w-[40%] flex-1 max-w-1/2 m-1 flex p-2 relative"
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
                {{ timer[singleTimer as keyof typeof timer]?.timeStart.val }}
              </p>
            </div>
            <div class="w-1/2 flex justify-between">
              <p>Endzeit:</p>
              <p class="flex-1 text-right">
                {{ timer[singleTimer as keyof typeof timer]?.timeEnd.val }}
              </p>
            </div>
          </div>
          <div class="flex w-full mt-2">
            <p>Name:</p>
            <p class="flex-1 text-right">
              {{ timer[singleTimer as keyof typeof timer]?.name.val }}
            </p>
          </div>
          <div class="flex w-full">
            <p>Gerät:</p>
            <p class="flex-1 text-right">
              {{ timer[singleTimer as keyof typeof timer]?.device.val }}
            </p>
          </div>
          <div class="flex w-full">
            <p>Restdauer:</p>
            <p class="flex-1 text-right">
              {{ timer[singleTimer as keyof typeof timer]?.string.val }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
<style lang="postcss" scoped></style>
../ui/card
