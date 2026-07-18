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
</script>

<template>
  <div class="h-full flex flex-col gap-2 pb-0">
    <NavigationRow />

    <!-- Hauptgrid -->
    <div class="flex-1 overflow-hidden grid grid-cols-12 gap-2 min-h-0">
      <!-- Linke Spalte: Kalender + Müll + Listen -->
      <div class="lg:col-span-3 sm:col-span-5 col-span-12 h-full flex flex-col gap-2 overflow-auto">
        <Calendar class="flex-1" />
        <Caller />
        <Trash />
        <Lists />
      </div>

      <!-- Mittlere Spalte: IobrokerValues + Timer -->
      <div class="lg:col-span-5 sm:col-span-7 col-span-12 h-full flex flex-col gap-2 overflow-hidden">
        <HomeCenteredTabs class="flex-1 min-h-0" />
        <Timer class="shrink-0 hidden sm:grid!" />
      </div>

      <!-- Rechte Spalte: Info + Caller + Fuel -->
      <div class="lg:col-span-4 col-span-12 h-full flex flex-col gap-2 overflow-auto">
        <Info class="flex-1" />
        <Fuel />
      </div>
    </div>
  </div>
</template>
