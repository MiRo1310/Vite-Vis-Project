<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import HeatingControlConfigRow, { RowHeatingConfig } from "./HeatingControlConfigRow.vue";
import { getValBoolean, getValId, getValNumber, tempArray } from "@/lib/object.ts";

const { heatingControl } = useIobrokerStore();

const rows = computed((): RowHeatingConfig[] => [
  {
    checkbox: {
      id: getValId(heatingControl.periodActive),
      val: getValBoolean(heatingControl.periodActive),
    },
    titleCheckbox: "Heizperiode aktiv",
    titleSelect: "Gäste Anhebung",
    select: {
      items: tempArray(),
      selected: getValNumber(heatingControl.guestIncrease).toString(),
      placeholder: "",
      id: getValId(heatingControl.guestIncrease),
    },
  },
  {
    checkbox: {
      id: getValId(heatingControl.publicHoliday),
      val: getValBoolean(heatingControl.publicHoliday),
    },
    titleCheckbox: "Feiertag heute",
    titleSelect: "Party Absenkung",
    select: {
      items: tempArray(),
      selected: getValNumber(heatingControl.partyDecrease).toString(),
      placeholder: "",
      id: getValId(heatingControl.partyDecrease),
    },
  },
  {
    checkbox: {
      id: getValId(heatingControl.present),
      val: getValBoolean(heatingControl.present),
    },
    titleCheckbox: "Anwesend",
    titleSelect: "Abwesenheits Absenkung",
    select: {
      items: tempArray(),
      selected: getValNumber(heatingControl.absentDecrease).toString(),
      placeholder: "",
      id: getValId(heatingControl.absentDecrease),
    },
  },
  {
    checkbox: {
      id: getValId(heatingControl.partyNow),
      val: getValBoolean(heatingControl.partyNow),
    },
    titleCheckbox: "Party jetzt",
    titleSelect: "Urlaub abwesend Absenkung",
    select: {
      items: tempArray(),
      selected: getValNumber(heatingControl.vacationAbsentDecrease).toString(),
      placeholder: "",
      id: getValId(heatingControl.vacationAbsentDecrease),
    },
  },
  {
    checkbox: {
      id: getValId(heatingControl.guestsPresent),
      val: getValBoolean(heatingControl.guestsPresent),
    },
    titleCheckbox: "Gäste",
    titleSelect: "Fenster offen Absenkung",
    select: {
      items: tempArray(),
      selected: getValNumber(heatingControl.windowOpenDecrease).toString(),
      placeholder: "",
      id: getValId(heatingControl.windowOpenDecrease),
    },
  },
  {
    checkbox: {
      id: getValId(heatingControl.holidayPresent),
      val: getValBoolean(heatingControl.holidayPresent),
    },
    titleCheckbox: "Urlaub anwesend",
    titleSelect: "Override für",
    input: {
      id: getValId(heatingControl.temperatureOverrideTime),
      val: getValNumber(heatingControl.temperatureOverrideTime).toString(),
      textBehind: "um",
    },
    select: {
      items: tempArray(),
      selected: getValNumber(heatingControl.temperatureOverrideTemp).toString(),
      placeholder: "",
      id: getValId(heatingControl.temperatureOverrideTemp),
    },
  },
  {
    checkbox: {
      id: getValId(heatingControl.vacationAbsent),
      val: getValBoolean(heatingControl.vacationAbsent),
    },
    titleCheckbox: "Urlaub abwesend",
    titleSelect: "Minimal Temperatur",
    select: {
      items: tempArray(),
      selected: getValNumber(heatingControl.minimumTemperature).toString(),
      placeholder: "",
      id: getValId(heatingControl.minimumTemperature),
    },
  },
]);
</script>
<template>
  <div class="bg-cardSubcard/30 border p-2">
    <div v-for="(row, index) in rows" :key="index" class="flex items-center space-x-4">
      <HeatingControlConfigRow :row="row" />
    </div>
  </div>
</template>
