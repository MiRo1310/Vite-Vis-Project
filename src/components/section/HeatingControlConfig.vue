<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore";
import HeatingControlConfigRow, { RowHeatingConfig } from "./HeatingControlConfigRow.vue";
import { SelectItem } from "../shared/select/select.vue";
import { computed } from "vue";

const { heating } = useIobrokerStore();

function tempArray() {
    const array: SelectItem[] = [];
    for (let i = 0; i < 30; i++) {
        array.push({
            label: i.toString(),
            val: i.toString(),
        });
    }
    return array;
}

const rows = computed((): RowHeatingConfig[] => [
    {
        checkbox: {
            id: heating.heatingControl.periodActive.id,
            val: heating.heatingControl.periodActive.val,
        },
        titleCheckbox: "Heizperiode aktiv",
        titleSelect: "Gäste Anhebung",
        select: {
            items: tempArray(),
            selected: heating.heatingControl.guestIncrease.val.toString(),
            placeholder: "",
            id: heating.heatingControl.guestIncrease.id,
        },
    },
    {
        checkbox: {
            id: heating.heatingControl.periodActive.id,
            val: heating.heatingControl.periodActive.val,
        },
        titleCheckbox: "Heizperiode aktiv",
        titleSelect: "Gäste Anhebung",
        select: {
            items: tempArray(),
            selected: heating.heatingControl.guestIncrease.val.toString(),
            placeholder: "",
            id: heating.heatingControl.guestIncrease.id,
        },
    },
]);
</script>
<template>
    <div v-for="(row, index) in rows" class="flex items-center space-x-4" :key="index">
        <HeatingControlConfigRow :row="row" />
    </div>
</template>
