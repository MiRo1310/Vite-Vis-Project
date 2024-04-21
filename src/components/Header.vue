<script setup lang='ts'>
import Time from '@/components/Time.vue';
import { storeToRefs } from 'pinia';
import { useIobrokerStore } from "@/store/iobrokerStore";
const iobrokerStore = useIobrokerStore();
const { iobrokerValues: io } = storeToRefs<any>(iobrokerStore);
</script>
<template>
  <div class="flex w-full justify-between ">
    <h1 class="text-4xl ml-2 mt-1 text-white">
      Aussentemperatur {{ io.Aussentemperatur }}°C
    </h1>

    <Time />


  </div>
</template>
<style lang='postcss' scoped></style>