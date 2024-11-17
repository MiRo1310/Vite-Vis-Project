<script lang="ts" setup>
import HeatingControlPeriodFirst from "./HeatingControlPeriodFirst.vue";
import HeatingControlPeriodDay from "./HeatingControlPeriodDay.vue";

const days = [
  { val: "Mon", label: "Montag" },
  { val: "Tue", label: "Dienstag" },
  { val: "Wed", label: "Mittwoch" },
  { val: "Thu", label: "Donnerstag" },
  { val: "Fri", label: "Freitag" },
  { val: "Sat", label: "Samstag" },
  { val: "Sun", label: "Sonntag" }
];
</script>
<template>
  <div class="flex justify-between w-full space-x-1">
    <HeatingControlPeriodFirst />
    <HeatingControlPeriodDay v-for="(day, index) in days" :key="index" :day="day" />
  </div>
</template>
