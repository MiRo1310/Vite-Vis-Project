<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { months } from "@/defaultValues/defaultValues.ts";

const emit = defineEmits(["update:daysInMonth", "update:year", "update:month"]);

const monthModifikator = ref(0);
onMounted(() => {
  sendMonth();
});

const getCurrentMonthName = computed(() => {
  const { year, month } = getYearMonth();
  return months[month] + " " + year;
});

let yearAdder = 0;

function getYearMonth() {
  let month = new Date().getMonth() + monthModifikator.value;
  if (month > 0) {
    month = month % 12;
  }

  if (month <= -1) {
    if (month % 12 === 0) {
      month = month * -1;
    }
    month = (12 + (month % 12)) % 12;
  }
  let year = new Date().getFullYear() + yearAdder;

  return { month, year };
}

function changeMonth(add: number) {
  const { month } = getYearMonth();
  if (month === 0 && add === -1) {
    yearAdder -= 1;
  }
  if (month === 11 && add === 1) {
    yearAdder += 1;
  }
  monthModifikator.value += add;

  sendMonth();
}

function sendMonth() {
  emit("update:daysInMonth", getDaysInMonth());
  const { year, month } = getYearMonth();
  emit("update:year", year);
  emit("update:month", month);
}

function resetMonth() {
  monthModifikator.value = 0;
  yearAdder = 0;
}

const getDaysInMonth = (): number => {
  const { year, month } = getYearMonth();
  return new Date(year, month + 1, 0).getDate();
};
</script>
<template>
  <div class="flex-between">
    <div class="flex items-center space-x-2">
      <Button size="icon" @click="changeMonth(-1)">
        <ChevronLeft />
      </Button>
      <span class="w-36 text-center text-cardCustom-foreground">{{ getCurrentMonthName }}</span>
      <Button size="icon" @click="changeMonth(1)">
        <ChevronRight />
      </Button>
      <Button @click="resetMonth"> Heute</Button>
    </div>
    <slot />
  </div>
</template>
