<script setup lang="ts">
import { routes } from "@/router/routes.ts";
import { computed, ref } from "vue";
import { useTime } from "@/composables/time.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getOpenWindows } from "@/composables/windows.ts";
import { DataCard, StatusCard } from "@/components/shared/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import Notifications from "@/components/section/home/Notifications.vue";
import { getActiveLights } from "@/composables/lights.ts";
import { Blinds, Flame, Plane } from "lucide-vue-next";
import DialogConfirm from "@/components/shared/dialog/DialogConfirm.vue";

const { time, date } = useTime();
const { iobroker } = useIobrokerStore();

const shutterOpen = computed(() => iobroker.windowGlobal.fensterOffen.value);
const heatingPeriodActive = computed(() => iobroker.heatingControl.periodActive.value);
const heatingPeriodDialogOpen = ref(false);

const navCardClass =
  "flex flex-col items-center gap-1 rounded-md border bg-card shadow-xs px-3 pt-2 pb-2 cursor-pointer hover:bg-accent transition-colors shrink-0 min-w-20 flex-auto";
</script>

<template>
  <!--    Statusleiste: mobile = column (nav oben, cards unten), desktop = row-->
  <div class="flex flex-col sm:flex-row sm:items-stretch gap-2 shrink-0">
    <!--      Navigations-Cards (oben auf mobile, rechts auf desktop)-->
    <div class="flex gap-2 overflow-x-auto sm:order-last sm:ml-auto shrink-0">
      <div :class="navCardClass" @click="heatingPeriodDialogOpen = true">
        <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Heizperiode</span>
        <Flame class="size-6 mt-2" :class="heatingPeriodActive ? 'text-orange-400' : 'text-muted-foreground/50'" />
      </div>
      <RouterLink :to="routes.navigation.path" :class="navCardClass">
        <span class="text-xs text-muted-foreground whitespace-nowrap w-full">Navigation</span>
        <Plane class="size-6 mt-2" />
      </RouterLink>
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
      <RouterLink :to="routes.window.path" class="shrink-0 min-w-28">
        <DataCard title="Fenster / Rolladen" nowrap-title clickable class="h-full" content-class="flex items-center gap-1.5">
          <StatusDot :active="(getOpenWindows ?? 0) === 0" inactive-color="yellow" />
          <span class="text-sm font-semibold">{{ getOpenWindows ?? 0 }}</span>
          <Blinds class="size-4 ml-auto" :class="shutterOpen ? 'text-yellow-500' : 'text-green-500'" />
        </DataCard>
      </RouterLink>

      <StatusCard
        title="Licht"
        :value="getActiveLights"
        :active="getActiveLights === 0"
        :route="routes.light.path"
        class="shrink-0 min-w-22 sm:block hidden"
      />
    </div>
  </div>

  <DialogConfirm
    v-model:dialog-open="heatingPeriodDialogOpen"
    :title="heatingPeriodActive ? 'Heizperiode deaktivieren' : 'Heizperiode aktivieren'"
    :description="`Möchtest du die Heizperiode wirklich ${heatingPeriodActive ? 'deaktivieren' : 'aktivieren'}?`"
    @update:confirm="iobroker.heatingControl.periodActive.toggle()"
  />
</template>
