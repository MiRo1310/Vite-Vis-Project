<script setup lang="ts">
import CalendarPreview from "@/components/section/home/widget/CalendarPreview.vue";
import LastCall from "@/components/section/home/widget/LastCall.vue";
import CheapestFuel from "@/components/section/home/widget/CheapestFuel.vue";
import HomeOverviewTabs from "@/components/section/home/overview/HomeOverviewTabs.vue";
import HomeDeviceStatus from "@/components/section/home/widget/HomeDeviceStatus.vue";
import HomeQuickActions from "@/components/section/home/widget/HomeQuickActions.vue";
import TimerGrid from "@/components/section/home/widget/TimerGrid.vue";
import TrashPickup from "@/components/section/home/widget/TrashPickup.vue";
</script>

<template>
  <div class="flex-1 overflow-hidden max-[600px]:overflow-auto sm:grid grid-cols-12 gap-2 min-h-0 hidden">
    <!-- Linke Spalte: Kalender + Müll + Listen -->
    <div class="lg:col-span-3 sm:col-span-5 col-span-12 h-full flex flex-col gap-2 overflow-auto">
      <CalendarPreview class="flex-1" />
      <LastCall />
      <TrashPickup />
      <HomeQuickActions />
    </div>

    <!-- Mittlere Spalte: IobrokerValues + Timer (unter 600px volle Höhe ohne eigenes Scrollen) -->
    <div
      class="lg:col-span-5 sm:col-span-7 col-span-12 h-full flex flex-col gap-2 overflow-hidden max-[600px]:h-auto max-[600px]:overflow-visible max-sm:border-t-2 max-sm:border-primary/60 max-sm:pt-3"
    >
      <HomeOverviewTabs class="flex-1 min-h-0 max-[600px]:flex-none" />
      <TimerGrid class="shrink-0 hidden sm:grid!" />
    </div>

    <!-- Rechte Spalte: Info + Caller + Fuel -->
    <div class="lg:col-span-4 col-span-12 h-full flex flex-col gap-2 overflow-auto max-lg:border-t-2 max-lg:border-primary/60 max-lg:pt-3">
      <HomeDeviceStatus class="flex-1" />
      <CheapestFuel />
    </div>
  </div>
</template>
