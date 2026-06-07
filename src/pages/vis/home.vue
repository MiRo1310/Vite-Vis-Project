<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
import Trash from "@/components/section/home/Trash.vue";
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import IobrokerValues from "@/components/section/home/IobrokerValues.vue";
import Timer from "@/components/section/home/Timer.vue";
import { Blinds, Hourglass, Moon, Plane, Sun } from "lucide-vue-next";
import { useAppStore } from "@/store/app-store.js";
import { useColorMode } from "@vueuse/core";
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
const colorMode = useColorMode();

const fuelPrice = computed(() => getStoreValNumber(iobroker.tankerKoenig?.cheapestPrice));
const shutterOpen = computed(() => getStoreValBoolean(iobroker.windowGlobal?.fensterOffen));

function toggleColorMode() {
  colorMode.value = colorMode.value === "light" ? "dark" : "light";
}

const navCardClass =
  "flex flex-col items-center gap-1 rounded-xl border bg-card shadow-xs px-3 pt-2 pb-2 cursor-pointer hover:bg-accent transition-colors shrink-0 min-w-25 flex-1";
</script>

<template>
  <div class="h-full flex flex-col gap-2 pb-0">
    <!-- Statusleiste: mobile = column (nav oben, cards unten), desktop = row -->
    <div class="flex flex-col sm:flex-row sm:items-stretch gap-2 shrink-0">
      <!-- Navigations-Cards (oben auf mobile, rechts auf desktop) -->
      <div class="flex gap-2 overflow-x-auto sm:order-last sm:ml-auto shrink-0">
        <RouterLink :to="routes.navigation.path" :class="navCardClass">
          <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Navigation</span>
          <Plane class="size-6 mt-2" />
        </RouterLink>
        <div :class="navCardClass" @click="appStore.toggleTimerVisibility">
          <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Timer</span>
          <Hourglass class="size-6 mt-2" />
        </div>
        <RouterLink :to="routes.window.path" :class="navCardClass">
          <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Rolladen</span>
          <Blinds class="size-6 mt-2" :class="shutterOpen ? 'text-yellow-500' : 'text-green-500'" />
        </RouterLink>
        <div :class="navCardClass" @click="toggleColorMode">
          <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Design</span>
          <Sun v-if="colorMode === 'dark'" class="size-6 mt-2" />
          <Moon v-else class="size-6 mt-2" />
        </div>
      </div>

      <!-- Datenkarten (unten auf mobile, links auf desktop) -->
      <div class="flex gap-2 overflow-x-auto sm:order-first flex-1">
        <DataCard title="Zeit" class="shrink-0 min-w-30 flex-1">
          <p class="text-sm font-semibold leading-tight">{{ time }}</p>
          <p class="text-xs text-muted-foreground leading-tight">{{ date }}</p>
        </DataCard>

        <StatusCard
          title="Fenster"
          :value="getOpenWindows ?? 0"
          :active="(getOpenWindows ?? 0) === 0"
          :route="routes.window.path"
          class="shrink-0 min-w-22"
        />

        <StatusCard title="Licht" :value="getActiveLights" :active="getActiveLights === 0" :route="routes.light.path" class="shrink-0 min-w-22" />

        <DataCard title="Sprit" class="shrink-0 min-w-22">
          <span class="text-sm font-semibold">{{ fuelPrice.toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground ml-1">€</span>
        </DataCard>
      </div>
    </div>

    <!-- Hauptgrid -->
    <div class="flex-1 overflow-hidden grid grid-cols-12 gap-2 min-h-0">
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
