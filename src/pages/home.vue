<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
import Time from "@/components/section/home/Time.vue";
import Trash from "@/components/section/home/Trash.vue";
import LawnMover from "@/components/section/home/LawnMover.vue";
import Pool from "@/components/section/home/Pool.vue";
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import Diagramm from "@/components/section/home/Diagramm.vue";
import Timer from "@/components/section/home/Timer.vue";
</script>

<template>
  <div class="flex space-x-1 space-y-1 -mt-1 -ml-1 flex-wrap">
    <div class="min-w-36 w-auto mt-1 ml-1 flex flex-col">
      <Time />
      <Caller class="bg-backgroundCards w-full flex-1 mt-1" />
    </div>
    <Info class="min-w-56" />
    <Trash class="col-span-4 min-w-[350px]" />
    <Diagramm />

    <Pool class="col-span-4 flex-1" />
    <LawnMover class="col-span-3" />
    <Calendar class="col-span-5" />
    <Timer class="flex-1 max-w-[800px]" />
    <div class="flex-1 bg-backgroundCards" />
  </div>
</template>
