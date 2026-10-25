<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
import Trash from "@/components/section/home/Trash.vue";
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import HomeCenteredTabs from "@/components/section/home/HomeCenteredTabs.vue";
import Timer from "@/components/section/home/Timer.vue";
import Fuel from "@/components/section/home/Fuel.vue";
import Lists from "@/components/section/home/Lists.vue";
import NavigationRow from "@/components/section/home/NavigationRow.vue";
import MobileHome from "../../components/section/home/MobileHome.vue";
</script>

<template>
  <div class="h-full flex flex-col gap-2 pb-0">
    <NavigationRow />

    <!-- Hauptgrid -->
    <div class="flex-1 overflow-hidden max-[600px]:overflow-auto sm:grid grid-cols-12 gap-2 min-h-0 hidden">
      <!-- Linke Spalte: Kalender + Müll + Listen -->
      <div class="lg:col-span-3 sm:col-span-5 col-span-12 h-full flex flex-col gap-2 overflow-auto">
        <Calendar class="flex-1" />
        <Caller />
        <Trash />
        <Lists />
      </div>

      <!-- Mittlere Spalte: IobrokerValues + Timer (unter 600px volle Höhe ohne eigenes Scrollen) -->
      <div
        class="lg:col-span-5 sm:col-span-7 col-span-12 h-full flex flex-col gap-2 overflow-hidden max-[600px]:h-auto max-[600px]:overflow-visible max-sm:border-t-2 max-sm:border-primary/60 max-sm:pt-3"
      >
        <HomeCenteredTabs class="flex-1 min-h-0 max-[600px]:flex-none" />
        <Timer class="shrink-0 hidden sm:grid!" />
      </div>

      <!-- Rechte Spalte: Info + Caller + Fuel -->
      <div class="lg:col-span-4 col-span-12 h-full flex flex-col gap-2 overflow-auto max-lg:border-t-2 max-lg:border-primary/60 max-lg:pt-3">
        <Info class="flex-1" />
        <Fuel />
      </div>
    </div>

    <div class="sm:hidden block">
      <MobileHome />
    </div>
  </div>
</template>
