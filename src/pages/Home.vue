<script setup lang="ts">
import HomeTrash from '@/components/section/HomeTrash.vue';
import HomeCardInfo from '@/components/section/HomeCardInfo.vue';
import HomeActions from '@/components/section/HomeActions.vue';
import HomeAlexaTimer from '@/components/section/HomeAlexaTimer.vue';
import HomeCardPv from '@/components/section/HomeCardPv.vue';
import HomeCardPool from '@/components/section/HomeCardPool.vue';
import HomeLawnMover from '@/components/section/HomeLawnMover.vue';
import HomeCalendar from '@/components/section/HomeCalendar.vue';

</script>

<template>
  <HomeAlexaTimer />
  <div class="h-full w-full flex items-start ">
    <div class="grid grid-cols-12 mt-1 w-full">
      <HomeCardInfo class="m-1 col-span-3" />
      <HomeTrash class="m-1 col-span-4" />
      <HomeCardPv class="m-1 col-span-3" />
      <div class="col-span-2">
        <div class="flex flex-wrap">
          <HomeActions />
        </div>
      </div>
      <HomeCardPool class="m-1 col-span-4" />
      <HomeLawnMover class="m-1 col-span-3" />
      <HomeCalendar class="m-1 col-span-5" />


    </div>

    <!-- <div class="w-52 mt-1 flex-wrap h-full mr-auto flex justify-end ">

    </div> -->
  </div>
</template>