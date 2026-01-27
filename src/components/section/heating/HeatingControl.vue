<script lang="ts" setup>
import HeatingControlConfig from "./HeatingControlConfig.vue";
import HeatingControlPeriod from "./HeatingControlPeriod.vue";
import HeatingControlRoom from "./HeatingControlRoom.vue";
import HeatingControlRoomStatus from "./HeatingControlRoomStatus.vue";
import HeatingControlWindowStatus from "./HeatingControlWindowStatus.vue";
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-8 flex flex-wrap gap-2">
      <HeatingControlConfig />
      <HeatingControlWindowStatus />
      <HeatingControlRoomStatus />
    </div>
    <HeatingControlRoom class="col-span-4 ml-2" />
  </div>
  <HeatingControlPeriod />
</template>
