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
    <Pv class="home__pv" />
    <AirConditioners class="home__air-conditioner" />
    <Pool class="home__pool" />
    <LawnMover class="home__lawn-mover" />
    <Calendar class="home__calendar" />
    <Timer class="home__timer" />
  </div>
</template>

<style scoped lang="scss">
.home {
  @apply grid grid-cols-11 gap-1 h-full;

  &__first {
    @apply col-span-2 flex flex-col;
  }

  &__caller {
    @apply flex-1;
  }

  &__info {
    @apply col-span-2;
  }

  &__trash {
    @apply col-span-3;
  }

  &__pv {
    @apply col-span-2;
  }

  &__air-conditioner {
    @apply col-span-2;
  }

  &__pool {
    @apply col-span-3;
  }

  &__lawn-mover {
    @apply col-span-2;
  }

  &__calendar {
    @apply col-span-6;
  }

  &__timer {
    @apply col-span-11;
  }
}
</style>
