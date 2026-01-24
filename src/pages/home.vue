<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
import Time from "@/components/section/home/Time.vue";
import Trash from "@/components/section/home/Trash.vue";
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import Pv from "@/components/section/home/PV.vue";
import Timer from "@/components/section/home/Timer.vue";
import Devices from "@/components/section/home/Devices.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import Lists from "@/components/section/home/Lists.vue";
import { Hourglass } from "lucide-vue-next";

import { useAppStore } from "@/store/appStore.ts";
import { Button } from "@/components/shared/button";
import Shutter from "@/components/section/home/Shutter.vue";
import Empty from "@/components/section/home/Empty.vue";
import "@/composables/influxDB.ts";
import { InfluxDBClient } from "@/composables/influxDB.ts";

const client = new InfluxDBClient("FörderSpirale", { type: "boolean", intervall: 30, rangeSec: 120000 });
const result = client.get();
const appStore = useAppStore();
</script>

<template>
  <PageHeader>
    <template #after>
      <Button size="icon" class="text-accent-foreground/70" class-card="ml-1" @click="appStore.toggleTimerVisibility"><Hourglass /></Button>
      <Shutter />
    </template>
  </PageHeader>
  <div class="overflow-auto max-h-[calc(100%-44px)] mt-2">
    <div class="grid grid-cols-11 gap-2">
      <div class="lg:col-span-2 md:col-span-5 col-span-11 flex flex-col">
        <Time>
          <Caller class="flex-1" />
        </Time>
      </div>
      <Info class="lg:col-span-2 md:col-span-6 col-span-11" />
      <Trash class="lg:col-span-3 md:col-span-5 col-span-11" />
      <Pv class="lg:col-span-2 md:col-span-3 col-span-11" />
      <Devices class="lg:col-span-2 md:col-span-3 col-span-11" />
      <Calendar class="lg:col-span-6 md:col-span-8 col-span-11" />
      <Lists class="lg:col-span-2 md:col-span-3 col-span-11" />
      <Empty class="lg:col-span-3 md:col-span-11 col-span-11" />
      <Timer class="col-span-11" />
    </div>
  </div>
</template>
