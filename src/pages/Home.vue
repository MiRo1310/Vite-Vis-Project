<script setup lang="ts">
import Trash from '@/components/section/HomeTrash.vue';
import HomeCardInfo from '@/components/section/HomeCardInfo.vue';
import SectionActions from '@/components/section/HomeActions.vue';
import HomeAlexaTimer from '@/components/section/HomeAlexaTimer.vue';
import HomeCardPv from '@/components/section/HomeCardPv.vue';
import HomeCardPool from '@/components/section/HomeCardPool.vue';
</script>

<template>
  <HomeAlexaTimer />
  <div class="h-full w-full flex items-start ">
    <div class="flex flex-1 mt-1 w-[calc(100%-25rem)] flex-wrap">
      <HomeCardInfo class="m-1" />
      <Trash class="bg-white bg-opacity-90 m-1 " />

      <HomeCardPv class="m-1" />
      <HomeCardPool class="m-1" />
    </div>

    <div class="w-52 mt-1 flex-wrap h-full mr-auto flex justify-end ">
      <SectionActions />
    </div>
  </div>
</template>