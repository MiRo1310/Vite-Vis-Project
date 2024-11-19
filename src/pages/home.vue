<script setup lang="ts">
import HomeCardInfo from "@/components/section/home/HomeInfo.vue";
import HomeCardInfoTime from "@/components/section/home/HomeTime.vue";
import HomeTrash from "@/components/section/home/HomeTrash.vue";
import HomeCardPv from "@/components/section/home/HomePv.vue";
import HomeLawnMover from "@/components/section/home/HomeLawnMover.vue";
import HomeCardPool from "@/components/section/home/HomePool.vue";
import HomeCalendar from "@/components/section/home/HomeCalendar.vue";
import HomeCaller from "@/components/section/home/HomeCaller.vue";
import HomeDiagramm from "@/components/section/home/HomeDiagramm.vue";
</script>

<template>
  <div class="flex space-x-1 space-y-1 -mt-1 -ml-1 flex-wrap">
    <div class="min-w-36 w-auto mt-1 ml-1 flex flex-col">
      <HomeCardInfoTime />
      <HomeCaller class="bg-backgroundCards w-full flex-1 mt-1" />
    </div>
    <HomeCardInfo class="min-w-56" />
    <HomeTrash class="col-span-4 min-w-[350px]" />
    <HomeCardPv class="flex-1 min-w-48" />
    <HomeDiagramm />

    <HomeCardPool class="col-span-4 flex-1" />
    <HomeLawnMover class="col-span-3" />
    <HomeCalendar class="col-span-5" />
    <div class="flex-1 bg-backgroundCards w-[100px]" />
    <div class="flex-1 bg-backgroundCards min-w-[30vw]" />
  </div>
</template>
