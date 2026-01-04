<script lang="ts" setup>
import HeatingControlConfig from "./HeatingControlConfig.vue";
import HeatingControlHeader from "./HeatingControlHeader.vue";
import HeatingControlPeriod from "./HeatingControlPeriod.vue";
import HeatingControlRoom from "./HeatingControlRoom.vue";
import HeatingControlRoomStatus from "./HeatingControlRoomStatus.vue";
import HeatingControlWindowStatus from "./HeatingControlWindowStatus.vue";
</script>

<template>
  <div class="w-full p-2">
    <HeatingControlHeader />
    <div class="grid grid-cols-12">
      <div class="col-span-8 mt-4 flex flex-wrap gap-2">
        <HeatingControlConfig />
        <HeatingControlWindowStatus />
        <HeatingControlRoomStatus />
      </div>
      <HeatingControlRoom class="mt-4 col-span-4 ml-2" />
    </div>
    <HeatingControlPeriod />
  </div>
</template>
