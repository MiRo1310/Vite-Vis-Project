<script setup lang="ts">
import { routes } from "@/router/routes.ts";
import { computed } from "vue";
import { useAppStore } from "@/store/app-store.ts";
import { useTime } from "@/composables/time.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { useColorMode } from "@vueuse/core";
import { getOpenWindows } from "@/composables/windows.ts";
import { DataCard, StatusCard } from "@/components/shared/card";
import Notifications from "@/components/section/home/Notifications.vue";
import { getActiveLights } from "@/composables/lights.ts";
import { Blinds, Hourglass, Moon, Plane, Sun } from "lucide-vue-next";

const appStore = useAppStore();
const { time, date } = useTime();
const { iobroker } = useIobrokerStore();
const colorMode = useColorMode();

const shutterOpen = computed(() => iobroker.windowGlobal.fensterOffen.value);

function toggleColorMode() {
  colorMode.value = colorMode.value === "light" ? "dark" : "light";
}

const navCardClass =
  "flex flex-col items-center gap-1 rounded-xl border bg-card shadow-xs px-3 pt-2 pb-2 cursor-pointer hover:bg-accent transition-colors shrink-0 min-w-20 flex-1";
</script>

<template>
  <!--    Statusleiste: mobile = column (nav oben, cards unten), desktop = row-->
  <div v-component="'Statusleiste'" class="flex flex-col sm:flex-row sm:items-stretch gap-2 shrink-0">
    <!--      Navigations-Cards (oben auf mobile, rechts auf desktop)-->
    <div class="flex gap-2 overflow-x-auto sm:order-last sm:ml-auto shrink-0">
      <div :class="navCardClass" @click="appStore.toggleTimerVisibility">
        <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Timer</span>
        <Hourglass class="size-6 mt-2" />
      </div>
      <RouterLink :to="routes.window.path" :class="navCardClass">
        <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Rolladen</span>
        <Blinds class="size-6 mt-2" :class="shutterOpen ? 'text-yellow-500' : 'text-green-500'" />
      </RouterLink>
      <RouterLink :to="routes.navigation.path" :class="navCardClass">
        <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Navigation</span>
        <Plane class="size-6 mt-2" />
      </RouterLink>

      <div :class="navCardClass" @click="toggleColorMode">
        <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Design</span>
        <Sun v-if="colorMode === 'dark'" class="size-6 mt-2" />
        <Moon v-else class="size-6 mt-2" />
      </div>
    </div>

    <!-- Datenkarten (unten auf mobile, links auf desktop) -->
    <div class="flex gap-2 overflow-x-auto flex-1 sm:order-first">
      <DataCard title="Zeit" class="shrink-0 min-w-30 flex-1 md:block hidden">
        <p class="text-sm font-semibold leading-tight">{{ time }}</p>
        <p class="text-xs text-muted-foreground leading-tight">{{ date }}</p>
      </DataCard>
      <RouterLink :to="routes.notifications.path" class="sm:flex-0 flex-1">
        <Notifications />
      </RouterLink>
      <StatusCard
        title="Fenster"
        :value="getOpenWindows ?? 0"
        :active="(getOpenWindows ?? 0) === 0"
        :route="routes.window.path"
        inactive-color="yellow"
        class="shrink-0 min-w-22 sm:block hidden"
      />

      <StatusCard
        title="Licht"
        :value="getActiveLights"
        :active="getActiveLights === 0"
        :route="routes.light.path"
        class="shrink-0 min-w-22 sm:block hidden"
      />
    </div>
  </div>
</template>
