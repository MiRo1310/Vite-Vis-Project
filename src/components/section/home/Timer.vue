<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed, HTMLAttributes } from "vue";
import { useAppStore } from "@/store/appStore.ts";
import { Timer, Timers } from "@/types/types.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";

defineProps<{ class: HTMLAttributes["class"] }>();

const iobrokerStore = useIobrokerStore();

const { timer } = storeToRefs(iobrokerStore);

const nameByIndex = computed(() => (index: number) => {
  const timerName = (timer.value[index as keyof Timers] as Timer)?.name?.val;
  return timerName != "Timer" ? timerName : null;
});
</script>

<template>
  <Card :class="$props.class" styling="small" color="primary" @click="useAppStore().toggleTimerVisibility()">
    <CardHeader>
      <CardTitle>
        <p>Alexa Timer</p>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap min-w-100 gap-2">
      <CardSubcard v-for="i in 4" :key="i" class="min-w-45 flex-1 max-w-[50%] flex">
        <div class="w-full">
          <h1 class="text-xl flex justify-between">
            <span>{{ nameByIndex(i) || `Timer ${i}` }}</span>
            <span> {{ (timer[i as keyof Timers] as Timer).timeString?.val }}</span>
          </h1>
          <TextSeparator />
          <div class="w-full">
            <div class="flex justify-between">
              <p>Gerät:</p>
              <p class="flex-1 text-right">
                {{ (timer[i as keyof Timers] as Timer).device?.val }}
              </p>
            </div>
            <div class="flex justify-between">
              <p>Länge:</p>
              <p class="flex-1 text-right">
                {{ (timer[i as keyof Timers] as Timer).initialTimer?.val }}
              </p>
            </div>
          </div>
        </div>
      </CardSubcard>
    </CardContent>
  </Card>
</template>
