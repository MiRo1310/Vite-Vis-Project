<script setup lang="ts">
import CalendarAdjustDayOrder from "@/components/section/CalendarAdjustDayOrder.vue";
import CalendarMonthSelector from "@/components/section/CalendarMonthSelector.vue";
import CalenderMonthDay from "@/components/section/CalenderMonthDay.vue";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ref } from 'vue';

const daysInMonth = ref(0);
const month = ref(0);
const year = ref(0);

const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

</script>
<template>
    <div class="py-2 pr-2 pl-1">
        <Card class="h-[calc(100vh-1rem)]">
            <CardHeader class="p-2 ">
                <CardTitle>Familien Kalendar</CardTitle>
            </CardHeader>
            <CardContent class="px-2">
                <CalendarMonthSelector v-model:days-in-month="daysInMonth" v-model:month="month" v-model:year="year" />
                <div class="grid grid-cols-7 mt-2 -mx-1">
                    <div v-for="(_, i) in 7" class="bg-accent h-6 text-xs m-[2px] flex items-center pl-2" :key="i">
                        {{ weekdays[i] }}
                    </div>
                    <CalendarAdjustDayOrder :month="month" :year="year" />

                    <div v-for="(_, i) in daysInMonth" class="col-span-1 bg-accent  h-[6.8rem] m-[2px]" :key="i">
                        <CalenderMonthDay :day-index="i" :month="month" :year="year" />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>

</template>