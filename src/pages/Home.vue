<script setup lang="ts">
import Trash from '@/components/section/HomeTrash.vue';
import GlobalInfo from '@/components/section/HomeGlobalInfo.vue';
import SectionButtons from '@/components/section/HomeSectionButtons.vue';
import AlexaTimer from '@/components/section/AlexaTimer.vue';
import PvCard from '@/components/section/HomePvCard.vue';
import HomePool from '@/components/section/HomePool.vue';
</script>

<template>

  <AlexaTimer />
  <div class="h-full w-full flex items-start ">
    <div class="flex flex-1 mt-1 w-[calc(100%-25rem)] flex-wrap">
      <GlobalInfo class="m-1" />
      <Trash class="bg-white bg-opacity-90 m-1 " />

      <PvCard class="m-1 overflow-auto self-start" />
      <HomePool class="m-1 overflow-auto self-start" />
    </div>

    <div class="w-52 mt-1 flex-wrap h-full mr-auto flex justify-end ">
      <SectionButtons />
    </div>
  </div>
</template>