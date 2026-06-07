<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
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
import { useTime } from "@/composables/time.ts";
import { DataCard, StatusCard } from "@/components/shared/card";
import { getOpenWindows } from "@/composables/windows.ts";
import { getActiveLights } from "@/composables/lights.ts";
import { routes } from "@/router/routes.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { computed } from "vue";

const appStore = useAppStore();
const { time, date } = useTime();
const { iobroker } = useIobrokerStore();

const wpActive = computed(() => getStoreValBoolean(iobroker.pool?.heaterState));
const fuelPrice = computed(() => getStoreValNumber(iobroker.tankerKoenig?.cheapestPrice));
</script>

<template>
  <PageHeader>
    <template #after>
      <Button size="icon" class="text-accent-foreground/70" class-card="ml-1" @click="appStore.toggleTimerVisibility">
        <Hourglass />
      </Button>
      <Shutter />
    </template>
  </PageHeader>

  <div class="mt-2 h-[calc(100%-44px)] flex flex-col gap-2">
    <!-- Statusleiste: kein flex-wrap, horizontal scrollbar -->
    <div class="flex gap-2 shrink-0 overflow-x-auto pb-1">
      <DataCard title="Zeit" class="shrink-0 min-w-30">
        <p class="text-sm font-semibold leading-tight">{{ time }}</p>
        <p class="text-xs text-muted-foreground leading-tight">{{ date }}</p>
      </DataCard>

      <StatusCard title="Fenster" :value="getOpenWindows ?? 0" :active="(getOpenWindows ?? 0) === 0" :route="routes.window.path" class="shrink-0 min-w-22" />

      <StatusCard title="Licht" :value="getActiveLights" :active="getActiveLights === 0" :route="routes.light.path" class="shrink-0 min-w-22" />

      <StatusCard title="Wärmepumpe" :value="wpActive ? 'An' : 'Aus'" :active="wpActive" :route="routes.heatPump.path" class="shrink-0 min-w-26" />

      <DataCard title="Sprit" class="shrink-0 min-w-22">
        <span class="text-sm font-semibold">{{ fuelPrice.toFixed(2) }}</span>
        <span class="text-xs text-muted-foreground ml-1">€</span>
      </DataCard>
    </div>

    <!-- Hauptgrid -->
    <div class="flex-1 overflow-hidden grid grid-cols-12 gap-2 pr-2 min-h-0">
      <!-- Linke Spalte: Kalender + Müll + Listen -->
      <div class="lg:col-span-3 sm:col-span-5 col-span-12 h-full flex flex-col gap-2 overflow-auto">
        <Calendar class="flex-1" />
        <Trash />
        <Lists />
      </div>

      <!-- Mittlere Spalte: IobrokerValues + Timer -->
      <div class="lg:col-span-5 sm:col-span-7 col-span-12 h-full flex flex-col gap-2 overflow-hidden">
        <IobrokerValues class="flex-1 min-h-0" />
        <Timer class="shrink-0 hidden sm:grid!" />
      </div>

      <!-- Rechte Spalte: Info + Caller + Fuel -->
      <div class="lg:col-span-4 col-span-12 h-full flex flex-col gap-2 overflow-auto">
        <Info class="flex-1" />
        <Caller />
        <Fuel />
      </div>
    </div>
  </div>
</template>
