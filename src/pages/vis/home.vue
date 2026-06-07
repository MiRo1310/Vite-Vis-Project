<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
import Time from "@/components/section/home/Time.vue";
import Trash from "@/components/section/home/Trash.vue";
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import IobrokerValues from "@/components/section/home/IobrokerValues.vue";
import Timer from "@/components/section/home/Timer.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import { Hourglass } from "lucide-vue-next";
import { useAppStore } from "@/store/app-store.js";
import { Button } from "@/components/shared/button/button.variants";
import Shutter from "@/components/section/home/Shutter.vue";
import Fuel from "@/components/section/home/Fuel.vue";
import Lists from "@/components/section/home/Lists.vue";

const appStore = useAppStore();
</script>

<template>
  <PageHeader>
    <template #after>
      <Button size="icon" class="text-accent-foreground/70" class-card="ml-1" @click="appStore.toggleTimerVisibility"><Hourglass /></Button>
      <Shutter />
    </template>
  </PageHeader>
  <div class="mt-2 h-[calc(100%-44px)]">
    <div class="overflow-auto h-full grid grid-cols-12 gap-2 pr-2">
      <div class="lg:col-span-2 sm:col-span-5 col-span-12 h-full flex flex-col gap-2">
        <Time class="flex-1">
          <Caller class="flex-1" />
          <Fuel />
        </Time>

        <Lists class="flex flex-col flex-1" />
      </div>
      <div class="lg:col-span-7 sm:col-span-7 col-span-12 flex gap-2 flex-wrap">
        <div class="flex flex-col flex-1 gap-2">
          <Trash class="" />
          <Calendar class="flex-1" />
        </div>
        <Info class="lg:block hidden flex-1" />
        <Timer class="sm:block hidden w-full" />
      </div>

      <IobrokerValues class="lg:col-span-3 sm:col-span-6 col-span-12" />
      <Info class="lg:hidden block sm:col-span-6 col-span-12" />
    </div>
  </div>
</template>
