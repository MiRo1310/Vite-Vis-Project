<script setup lang="ts">
import { Card } from "@/components/ui/card";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import CardContent from "../ui/card/CardContent.vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { storeToRefs } from "pinia";
import { computed, Ref } from "vue";
import { CalendarDay } from "@/types";
import { useRouter } from "vue-router";

const { calendar } = storeToRefs(useIobrokerStore());
const router = useRouter();

const data: Ref<CalendarDay[]> = computed(() => {
    if (calendar.value.table) {
        try {
            return JSON.parse(calendar.value.table.val);
        } catch (error) {
            console.error(error);
        }
    }
});

const today = computed(() => {
    if (data.value) {
        return data.value.filter((day) => {
            return (
                new Date(day._date).getTime() <= new Date().getTime() &&
                new Date(day._end).getTime() >= new Date().getTime()
            );
        });
    }
    return;
});

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const tomorrow = computed(() => {
    if (data.value) {
        return data.value.filter((day) => {
            const tomorrowDate = addDays(new Date(), 1).getTime();

            return (
                new Date(day._date).getTime() <= tomorrowDate &&
                new Date(day._end).getTime() >= tomorrowDate
            );
        });
    }
    return;
});

function getLocalTimeString(event: string) {
    return new Date(event).toLocaleTimeString();
}

function isNotAllDayEvent(event: CalendarDay) {
    return (
        getLocalTimeString(event._object.start) !== "00:00:00" &&
        getLocalTimeString(event._object.end) !== "00:00:00"
    );
}
</script>
<template>
    <Card @click="router.push({ name: 'calendar' })">
        <CardHeader>
            <CardTitle>Familien Kalendar</CardTitle>
        </CardHeader>
        <CardContent>
            <p class="text-accent-foreground/70 text-xs font-bold underline mb-2">Heute</p>
            <p v-for="(event, index) in today" class="text-accent-foreground/50 text-xs font-bold flex justify-between"
                :key="index">
                <span>{{ event._object.summary }}</span>
                <span v-if="isNotAllDayEvent(event)" class="ml-2">{{ getLocalTimeString(event._object.start) }} bis
                    {{ getLocalTimeString(event._object.end) }}</span>
            </p>
            <p class="text-accent-foreground/70 text-xs font-bold underline my-2">Morgen</p>
            <p v-for="(event, index) in tomorrow"
                class="text-accent-foreground/50 text-xs font-bold flex justify-between" :key="index">
                <span>{{ event._object.summary }}</span>
                <span v-if="isNotAllDayEvent(event)">{{ getLocalTimeString(event._object.start) }} bis
                    {{ getLocalTimeString(event._object.end) }}</span>
            </p>
        </CardContent>
    </Card>
</template>
