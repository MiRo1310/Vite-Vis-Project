<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { HTMLAttributes } from "vue";
import { useAppStore } from "@/store/appStore.ts";

defineProps<{ class: HTMLAttributes["class"] }>();

const iobrokerStore = useIobrokerStore();

const { timer } = storeToRefs(iobrokerStore);
const timersArray = ["timer1", "timer2", "timer3", "timer4"];
</script>

<template>
  <Card
    :class="$props.class"
    styling="light"
    @click="useAppStore().toggleTimerVisibility()"
  >
    <CardHeader>
      <CardTitle>
        <p>Alexa Timer</p>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap -mx-1 min-w-[400px]">
      <div
        v-for="(singleTimer, i) in timersArray"
        :key="i"
        class="min-w-[180px] flex-1 max-w-1/2 m-1 flex px-2 default_card"
      >
        <div class="w-full">
          <h1 class="text-lg text-gray-500 line">Timer {{ i + 1 }}</h1>
          <div class="w-full text-xs">
            <div class="flex justify-between timer__title">
              <p>Name:</p>
              <p class="flex-1 text-right">
                {{ timer[(singleTimer + "Name") as keyof typeof timer]?.val }}
              </p>
            </div>
            <div class="flex timer__title">
              <p>Gerät:</p>
              <p class="flex-1 text-right">
                {{ timer[(singleTimer + "Device") as keyof typeof timer]?.val }}
              </p>
            </div>
            <div class="flex timer__title">
              <p>Restdauer:</p>
              <p class="flex-1 text-right">
                {{ timer[(singleTimer + "String") as keyof typeof timer]?.val }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="postcss">
.timer__title {
  @apply text-accent-foreground/50 font-bold;
}
</style>
