<script setup lang="ts">
import Trash from '@/components/section/HomeTrash.vue';
import GlobalInfo from '@/components/section/HomeCardInfo.vue';
import SectionButtons from '@/components/section/HomeActions.vue';
import AlexaTimer from '@/components/section/HomeAlexaTimer.vue';
import HomeCardPv from '@/components/section/HomeCardPv.vue';
import HomeCardPool from '@/components/section/HomeCardPool.vue';
</script>

<template>
  <AlexaTimer />
  <div class="h-full w-full flex items-start ">
    <div class="flex flex-1 mt-1 w-[calc(100%-25rem)] flex-wrap">
      <GlobalInfo class="m-1" />
      <Trash class="bg-white bg-opacity-90 m-1 " />

      <HomeCardPv class="m-1 overflow-auto self-start" />
      <HomeCardPool class="m-1 overflow-auto self-start" />
    </div>

    <div class="w-52 mt-1 flex-wrap h-full mr-auto flex justify-end ">
      <SectionButtons />
    </div>
  </div>
</template>