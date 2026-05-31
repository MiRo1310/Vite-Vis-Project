<script setup lang="ts">
import { Card, CardContent } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useAppStore } from "@/store/app-store.js";
import { Timers } from "@/types/types.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import { getNameByIndex } from "@/composables/timer.ts";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <Card styling="small" color="primary" @click="useAppStore().toggleTimerVisibility()">
    <CardContent class="flex flex-row flex-wrap gap-1 w-full">
      <CardSubcard v-for="i in 4" :key="i" class="lg:min-w-60 min-w-56 flex-1 flex">
        <div v-if="iobroker.timers" class="w-full">
          <h1 class="text-md flex justify-between">
            <span>{{ getNameByIndex(iobroker.timers, i) }}</span>
            <span> {{ iobroker.timers[i as keyof Timers]?.timeString?.val }}</span>
          </h1>
          <TextSeparator />
          <div class="w-full">
            <div class="flex justify-between">
              <p>Gerät:</p>
              <p class="flex-1 text-right">
                {{ iobroker.timers[i as keyof Timers]?.device?.val }}
              </p>
            </div>
            <div class="flex justify-between">
              <p>Länge:</p>
              <p class="flex-1 text-right">
                {{ iobroker.timers[i as keyof Timers]?.initialTimer?.val }}
              </p>
            </div>
          </div>
        </div>
      </CardSubcard>
    </CardContent>
  </Card>
</template>
