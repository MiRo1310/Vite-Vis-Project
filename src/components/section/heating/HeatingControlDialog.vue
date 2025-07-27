<script lang="ts" setup>
import HeatingControlConfig from "./HeatingControlConfig.vue";
import HeatingControlHeader from "./HeatingControlHeader.vue";
import HeatingControlPeriod from "./HeatingControlPeriod.vue";
import HeatingControlRoom from "./HeatingControlRoom.vue";
import HeatingControlRoomStatus from "./HeatingControlRoomStatus.vue";
import HeatingControlWindowStatus from "./HeatingControlWindowStatus.vue";
</script>

<template>
  <div class="heating-control">
    <HeatingControlHeader />
    <div class="heating-control__grid">
      <div class="heating-control__section1">
        <HeatingControlConfig />
        <HeatingControlWindowStatus />
        <HeatingControlRoomStatus />
      </div>
      <HeatingControlRoom class="heating-control__room" />
    </div>
    <HeatingControlPeriod />
  </div>
</template>

<style scoped lang="scss">
.heating-control {
  @apply bg-backgroundColor p-0 m-0 w-full px-1;

  &__grid {
    @apply grid grid-cols-12;
  }

  &__section1 {
    @apply col-span-8 mt-6 flex flex-wrap;
  }

  &__room {
    @apply mt-6 col-span-4 bg-color__default mb-1;
  }
}
</style>
