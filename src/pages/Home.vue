<script setup lang="ts">
import HomeTrash from '@/components/section/HomeTrash.vue';
import HomeCardInfo from '@/components/section/HomeCardInfo.vue';
import HomeActions from '@/components/section/HomeActions.vue';
import HomeAlexaTimer from '@/components/section/HomeAlexaTimer.vue';
import HomeCardPv from '@/components/section/HomeCardPv.vue';
import HomeCardPool from '@/components/section/HomeCardPool.vue';
import HomeLawnMover from '@/components/section/HomeLawnMover.vue';

</script>

<template>
  <HomeAlexaTimer />
  <div class="h-full w-full flex items-start ">
    <div class="grid grid-cols-12 mt-1 w-[calc(100%-13rem)]">
      <HomeCardInfo class="m-1 col-span-3" />
      <HomeTrash class="bg-white bg-opacity-90 m-1 col-span-5" />

      <HomeCardPv class="m-1 col-span-4" />
      <HomeCardPool class="m-1 col-span-5" />
      <HomeLawnMover class="m-1 col-span-4" />
    </div>

    <div class="w-52 mt-1 flex-wrap h-full mr-auto flex justify-end ">
      <HomeActions />
    </div>
  </div>
</template>