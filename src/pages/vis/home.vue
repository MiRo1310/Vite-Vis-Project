<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
import Time from "@/components/section/home/Time.vue";
import Trash from "@/components/section/home/Trash.vue";
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import PvHeating from "@/components/section/home/PvHeating.vue";
import Timer from "@/components/section/home/Timer.vue";
import Devices from "@/components/section/home/Devices.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import Lists from "@/components/section/home/Lists.vue";
import { Hourglass } from "lucide-vue-next";
import { useAppStore } from "@/store/app-store.js";
import { Button } from "@/components/shared/button/button.variants";
import Shutter from "@/components/section/home/Shutter.vue";
import Empty from "@/components/section/home/Empty.vue";
import Fuel from "@/components/section/home/Fuel.vue";

const appStore = useAppStore();
</script>

<template>
  <PageHeader>
    <template #after>
      <Button size="icon" class="text-accent-foreground/70" class-card="ml-1" @click="appStore.toggleTimerVisibility"><Hourglass /></Button>
      <Shutter />
    </template>
  </PageHeader>
  <div class="overflow-auto max-h-[calc(100%-44px)] mt-2 grid grid-cols-12 grid-row-12 gap-2">
    <div class="col-start-1 col-end-3 row-start-1 row-end-6 flex flex-col">
      <Time>
        <Caller class="flex-1" />
        <Fuel />
      </Time>
    </div>
    <Info class="col-start-3 col-end-5 row-start-1 row-end-4" />
    <PvHeating class="col-start-10 col-end-13 row-start-1 row-end-12" />
    <Devices class="col-start-8 col-end-10 row-start-1 row-end-6" />
    <Trash class="col-start-5 col-end-8 row-start-1 row-end-2" />
    <Lists class="col-start-5 col-end-8 row-start-2 row-end-4" />
    <Empty class="col-start-3 col-end-5 row-start-4 row-end-6" />
    <Calendar class="col-start-1 col-end-5 row-start-6 row-end-12" />
    <Timer class="col-start-5 col-end-10 row-start-6 row-end-12" />
  </div>
</template>
