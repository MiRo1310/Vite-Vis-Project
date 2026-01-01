<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
import Time from "@/components/section/home/Time.vue";
import Trash from "@/components/section/home/Trash.vue";
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import Pv from "@/components/section/home/PV.vue";
import Timer from "@/components/section/home/Timer.vue";
import Devices from "@/components/section/home/Devices.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
</script>

<template>
  <PageHeader />
  <div class="grid grid-cols-11 gap-1 mt-1 h-[calc(100%-74px)]">
    <div class="col-span-2 flex flex-col">
      <Time>
        <Caller class="flex-1" />
      </Time>
    </div>
    <Info class="col-span-2" />
    <Trash class="col-span-3" />
    <Pv class="col-span-2" />
    <Devices class="col-span-2" />
    <Calendar class="col-span-6" />
    <Timer class="col-span-11" />
  </div>
</template>
