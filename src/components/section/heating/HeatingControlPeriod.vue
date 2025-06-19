<script lang="ts" setup>
import HeatingControlPeriodFirst from "./HeatingControlPeriodFirst.vue";
import HeatingControlPeriodDay from "./HeatingControlPeriodDay.vue";

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
  <div class="flex justify-between w-full space-x-1">
    <HeatingControlPeriodFirst />
    <HeatingControlPeriodDay
      v-for="(day, index) in days"
      :key="index"
      :day="day"
    />
  </div>
</template>
