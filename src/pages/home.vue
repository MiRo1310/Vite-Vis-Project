<script setup lang="ts">
import Info from "@/components/section/home/Info.vue";
import Time from "@/components/section/home/Time.vue";
import Trash from "@/components/section/home/Trash.vue";
import LawnMover from "@/components/section/home/LawnMover.vue";
import Pool from "@/components/section/home/Pool.vue";
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import Pv from "@/components/section/home/PV.vue";
import Timer from "@/components/section/home/Timer.vue";
import AirConditioners from "@/components/section/home/AirConditioners.vue";
</script>

<template>
  <div class="home">
    <div class="home__first">
      <Time />
      <Caller class="home__caller" />
    </div>
    <Info class="home__info" />
    <Trash class="home__trash" />
    <Pv />

    <Pool class="home__pool" />
    <AirConditioners />
    <LawnMover class="home__lawn-mover" />
    <Calendar class="home__calendar" />
    <Timer class="home__timer" />
  </div>
</template>

<style scoped lang="scss">
.home {
  @apply flex gap-1 flex-wrap;

  &__first {
    @apply min-w-36 w-auto flex flex-col gap-1;
  }

  &__caller {
    @apply w-full flex-1;
  }

  &__info {
    @apply min-w-56;
  }

  &__trash {
    @apply col-span-4 min-w-[350px];
  }

  &__pool {
    @apply col-span-4 flex-1;
  }

  &__lawn-mover {
    @apply col-span-3;
  }

  &__calendar {
    @apply col-span-5;
  }

  &__timer {
    @apply flex-1 max-w-[800px];
  }
}
</style>
