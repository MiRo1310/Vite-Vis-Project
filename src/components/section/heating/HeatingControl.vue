<script lang="ts" setup>
import HeatingControlConfig from "./HeatingControlConfig.vue";
import HeatingControlHeader from "./HeatingControlHeader.vue";
import HeatingControlPeriod from "./HeatingControlPeriod.vue";
import HeatingControlRoom from "./HeatingControlRoom.vue";
import HeatingControlRoomStatus from "./HeatingControlRoomStatus.vue";
import HeatingControlWindowStatus from "./HeatingControlWindowStatus.vue";
</script>
<template>
  <div class="bg-backgroundColor p-0 m-0 w-full px-1">
    <HeatingControlHeader />
    <div class="grid grid-cols-12">
      <div class="col-span-8 mt-6 flex flex-wrap">
        <HeatingControlConfig />
        <HeatingControlWindowStatus />
        <HeatingControlRoomStatus />
      </div>
      <HeatingControlRoom class="mt-6 col-span-4 bg-backgroundCards mb-1" />
    </div>
    <HeatingControlPeriod />
  </div>
</template>
<style scoped lang="postcss"></style>
