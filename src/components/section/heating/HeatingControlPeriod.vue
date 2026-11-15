<script lang="ts" setup>
import HeatingControlPeriodDay from "./HeatingControlPeriodDay.vue";
import { screen } from "@/composables/screen.ts";

const { isDesktop } = screen.value;

const days = [
  { val: "Mon", label: "Montag", index: 0 },
  { val: "Tue", label: "Dienstag", index: 1 },
  { val: "Wed", label: "Mittwoch", index: 2 },
  { val: "Thu", label: "Donnerstag", index: 3 },
  { val: "Fri", label: "Freitag", index: 4 },
  { val: "Sat", label: "Samstag", index: 5 },
  { val: "Sun", label: "Sonntag", index: 6 },
];
</script>
<template>
  <div class="grid xl:grid-cols-7 md:grid-cols-4 grid-cols-1 w-full gap-2">
    <HeatingControlPeriodDay v-for="(day, index) in days" :key="index" :day :showPeriod="isDesktop && index === 0 ? true : !isDesktop" />
  </div>
</template>
