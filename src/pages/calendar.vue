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
import IndexButton from "@/components/layout/IndexButton.vue";

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
        <div class="calendar__grid">
          <div v-for="i in 7" :key="i" class="calendar__weekdays">
            {{ weekdays[i - 1] }}
          </div>
          <CalendarAdjustDayOrder :month :year />

          <div v-for="i in daysInMonth" :key="i" :class="['calendar__day', { 'calendar__day--active': isToday(i) }]">
            <CalenderMonthDay :day-index="i - 1" :month :year :is-today="isToday(i)" />
          </div>
        </div>
      </PageContent>
    </template>
  </Page>
  <DialogSettings v-model:open="open" />
</template>

<style scoped lang="scss">
.calendar {
  &__grid {
    @apply grid grid-cols-7 mt-2 -mx-1;
  }

  &__weekdays {
    @apply h-6 text-xs m-[2px] flex items-center p-2 shadow-lg;
  }

  &__day {
    @apply col-span-1 pt-0 max-h-[7rem] m-[2px] flex  p-2 shadow-lg;

    &--active {
      @apply border-cardCustom-border border-2;
    }
  }
}
</style>
