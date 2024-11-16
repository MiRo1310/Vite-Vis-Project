<script setup lang="ts">
import HomeCardInfo from "@/components/section/home/HomeCardInfo.vue";
import HomeAlexaTimer from "@/components/section/home/HomeAlexaTimer.vue";
import HomeCardInfoTime from "@/components/section/home/Time.vue";
import HomeTrash from "@/components/section/home/HomeTrash.vue";
import HomeCardPv from "@/components/section/home/HomeCardPv.vue";
import HomeLawnMover from "@/components/section/home/HomeCardLawnMover.vue";
import HomeCardPool from "@/components/section/home/HomeCardPool.vue";
import HomeCalendar from "@/components/section/home/HomeCalendar.vue";
</script>

<template>
  <HomeAlexaTimer />

  <div class="flex space-x-1 space-y-1 -mt-1 -ml-1 flex-wrap">
    <div class="min-w-36 w-auto mt-1 ml-1 flex flex-col">
      <HomeCardInfoTime />
      <div class="bg-backgroundCards w-full flex-1 mt-1" />
    </div>
    <HomeCardInfo class="min-w-56" />
    <HomeTrash class="col-span-4 min-w-[350px]" />
    <HomeCardPv class="col-span-3" />
    <HomeCardPool class="col-span-4 flex-1" />
    <HomeLawnMover class="col-span-3" />
    <HomeCalendar class="col-span-5" />
  </div>
</template>
