<script setup lang="ts">
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { CalendarDay } from '@/types';
import CalenderMonthDayDialog from '@/components/section/CalendarMonthDayDialog.vue';

const { calendar } = storeToRefs(useIobrokerStore());
const props = defineProps({
    dayIndex: Number,
    month: Number,
    year: Number
})

const getDayValue = computed(() => {
    if (!calendar.value.table) { return }
    const cal: CalendarDay[] = JSON.parse(calendar.value.table)
    return cal.filter((day) => isDateBetween(day)
    )

})

function isDateBetween(day: CalendarDay): boolean | undefined {
    const start = new Date(day._object.start)
    const end = new Date(day._object.end)
    if (!props.year || !props.month) { return }
    return isSameDay(start, end) && isNotStartAtMidNight(start, 2) && isNotStartAtMidNight(end, 1) && isSameMonth(start, end) && isSameYear(start, end);
}

function isSameDay(start: Date, end: Date): boolean {
    if (!props.dayIndex) {
        return false
    }
    return start.getDate() <= props.dayIndex + 1 && end.getDate() >= props.dayIndex + 1
}

function isSameMonth(start: Date, end: Date): boolean {
    if (!props.month) {
        return false
    }
    return start.getMonth() === props.month && end.getMonth() === props.month
}

function isSameYear(start: Date, end: Date): boolean {
    if (!props.year) {
        return false
    }
    return start.getFullYear() === props.year && end.getFullYear() === props.year
}

function isNotStartAtMidNight(date: Date, param: number): boolean {
    if (!props.dayIndex) {
        return false
    }
    return !(date.getDate() === props.dayIndex + param && date.toLocaleTimeString() === "00:00:00");
}

const isToday = computed(() => {
    const today = new Date()
    return today.getDate() - 1 === props.dayIndex && today.getMonth() === props.month && today.getFullYear() === props.year;
})

function getColor(event: CalendarDay): string {
    if (event.event.includes("Melanie")) {
        return "bg-green-200"
    }
    if (event.event.includes("Hannah")) {
        return "bg-yellow-200"
    }
    if (event.event.includes("Michael")) {
        return "bg-blue-400"
    }
    return ""
}

const open = ref(false)

</script>
<template>
    <div :class="{ 'h-full': true, 'border-blue-500 border-2': isToday }" @click="open = !open">

        <span :class="{ 'm-1 ml-1 pb-[1px] px-1 rounded-md': true, 'bg-blue-300': isToday }">
            {{ dayIndex || dayIndex === 0 ? dayIndex + 1 : "" }}
        </span>
        <p v-for="(event, index) in getDayValue" class="text-xs px-1 mr-1 whitespace-nowrap truncate" :key="index">
            <span :class="[[getColor(event)], 'mb-[2px] inline-block']">{{
                event.event }}</span>
        </p>
    </div>

    <CalenderMonthDayDialog :open="open" @update:open="open = $event" :events="getDayValue" v-bind="props" />

</template>
