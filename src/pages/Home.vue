<script setup lang="ts">
import HomeTrash from "@/components/section/home/HomeTrash.vue";
import HomeCardInfo from "@/components/section/home/HomeCardInfo.vue";
import HomeActions from "@/components/section/home/HomeActions.vue";
import HomeAlexaTimer from "@/components/section/home/HomeAlexaTimer.vue";
import HomeCardPv from "@/components/section/home/HomeCardPv.vue";
import HomeCardPool from "@/components/section/home/HomeCardPool.vue";
import HomeLawnMover from "@/components/section/home/HomeCardLawnMover.vue";
import HomeCalendar from "@/components/section/home/HomeCalendar.vue";
</script>

<template>
  <HomeAlexaTimer />
  <div class="h-full w-full flex items-start">
    <div class="grid grid-cols-12 w-full gap-2">
      <HomeCardInfo class="col-span-3" />
      <HomeTrash class="col-span-4" />
      <HomeCardPv class="col-span-3" />
      <div class="col-span-2">
        <div class="flex flex-wrap space-x-2 space-y-2 -mt-2 -ml-2">
          <HomeActions />
        </div>
      </div>
      <HomeCardPool class="col-span-4" />
      <HomeLawnMover class="col-span-3" />
      <HomeCalendar class="col-span-5" />
    </div>
  </div>
</template>
