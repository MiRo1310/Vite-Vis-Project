<script setup lang="ts">
import Trash from '@/components/Trash.vue';
import ShoppingList from '@/components/ShoppingList.vue';
import Header from '@/components/Header.vue';
import ButtonListRight from '@/components/ButtonListRight.vue';
import AlexaTimer from '@/components/AlexaTimer/AlexaTimer.vue';
import PvCard from '@/components/PvCard.vue';

</script>

<template>
  <div class="h-12">
    <Header />
  </div>
  <AlexaTimer />
  <div class="h-full w-full flex  items-start ">

    <div class="flex flex-1  w-[calc(100%-25rem)] flex-wrap  ">
      <ShoppingList class=" w-[25rem] card m-1 " />
      <div>
        <Trash class="card m-1 self-start" />
        <PvCard class="m-1 overflow-auto self-start" />

      </div>
    </div>

    <div class="w-52 flex-wrap  h-full mr-auto flex justify-end ">
      <ButtonListRight />
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.card {
  @apply bg-white bg-opacity-90;
}
</style>