<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed, HTMLAttributes } from "vue";
import { useAppStore } from "@/store/appStore.ts";
import { Timers } from "@/types/types.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";

defineProps<{ class?: HTMLAttributes["class"] }>();

const iobrokerStore = useIobrokerStore();

const { timers } = storeToRefs(iobrokerStore);

const nameByIndex = computed(() => (index: number) => {
  const timerName = timers.value[index as keyof Timers]?.name?.val;
  return timerName !== "Timer" ? timerName : null;
});
</script>

<template>
  <Card :class="$props.class" styling="small" color="primary" @click="useAppStore().toggleTimerVisibility()">
    <CardHeader>
      <CardTitle>
        <p>Alexa Timer</p>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap gap-2 w-full">
      <CardSubcard v-for="i in 4" :key="i" class="min-w-60 flex-1 flex">
        <div class="w-full">
          <h1 class="text-xl flex justify-between">
            <span>{{ nameByIndex(i) || `Timer ${i}` }}</span>
            <span> {{ timers[i as keyof Timers]?.timeString?.val }}</span>
          </h1>
          <TextSeparator />
          <div class="w-full">
            <div class="flex justify-between">
              <p>Gerät:</p>
              <p class="flex-1 text-right">
                {{ timers[i as keyof Timers]?.device?.val }}
              </p>
            </div>
            <div class="flex justify-between">
              <p>Länge:</p>
              <p class="flex-1 text-right">
                {{ timers[i as keyof Timers]?.initialTimer?.val }}
              </p>
            </div>
          </div>
        </div>
      </CardSubcard>
    </CardContent>
  </Card>
</template>
