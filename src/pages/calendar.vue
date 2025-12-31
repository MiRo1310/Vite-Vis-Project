<script setup lang="ts">
import CalendarAdjustDayOrder from "@/components/section/calendar/CalendarAdjustDayOrder.vue";
import CalendarMonthSelector from "@/components/section/calendar/CalendarMonthSelector.vue";
import CalenderMonthDay from "@/components/section/calendar/CalenderMonthDay.vue";
import { computed, ref } from "vue";
import ColorSettings from "@/components/section/calendar/ColorSettings.vue";
import DialogSettings from "@/components/section/calendar/DialogSettings.vue";
import PageContent from "@/components/shared/page/PageContent.vue";
import Page from "@/components/shared/page/Page.vue";
import { weekdays } from "@/defaultValues/defaultValues.ts";

const daysInMonth = ref(0);
const month = ref(0);
const year = ref(0);

const isToday = computed(() => (i: number) => {
  const today = new Date();
  return today.getDate() - 1 === i - 1 && today.getMonth() === month.value && today.getFullYear() === year.value;
});

const open = ref(false);
</script>

<template>
  <Page title="Familien Kalendar">
    <template #header>
      <CalendarMonthSelector v-model:days-in-month="daysInMonth" v-model:month="month" v-model:year="year">
        <ColorSettings v-model:open="open" />
      </CalendarMonthSelector>
    </template>

    <template #default>
      <PageContent>
        <div class="grid grid-cols-7 mt-2 -mx-1">
          <div v-for="i in 7" :key="i" class="h-6 text-xs m-[2px] flex items-center p-2 shadow-lg text-cardCustom-text">
            {{ weekdays[i - 1] }}
          </div>
          <CalendarAdjustDayOrder :month :year />

          <div
            v-for="i in daysInMonth"
            :key="i"
            :class="['col-span-1 pt-0 max-h-[7rem] m-[2px] flex p-2 shadow-lg bg-white', { 'border-cardCustom-border border-2': isToday(i) }]"
          >
            <CalenderMonthDay :day-index="i - 1" :month :year :is-today="isToday(i)" />
          </div>
        </div>
      </PageContent>
    </template>
  </Page>
  <DialogSettings v-model:open="open" />
</template>
