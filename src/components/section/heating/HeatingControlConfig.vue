<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import HeatingControlConfigRow, { RowHeatingConfig } from "./HeatingControlConfigRow.vue";
import { getStoreValBoolean, getStoreValId, getStoreValNumber, tempArray } from "@/lib/object.ts";

const { heatingControl } = useIobrokerStore();

const rows = computed((): RowHeatingConfig[] => [
  {
    checkbox: {
      id: getStoreValId(heatingControl.periodActive),
      val: getStoreValBoolean(heatingControl.periodActive),
    },
    titleCheckbox: "Heizperiode aktiv",
    titleSelect: "Gäste Anhebung",
    select: {
      items: tempArray(),
      selected: getStoreValNumber(heatingControl.guestIncrease).toString(),
      placeholder: "",
      id: getStoreValId(heatingControl.guestIncrease),
    },
  },
  {
    checkbox: {
      id: getStoreValId(heatingControl.publicHoliday),
      val: getStoreValBoolean(heatingControl.publicHoliday),
    },
    titleCheckbox: "Feiertag heute",
    titleSelect: "Party Absenkung",
    select: {
      items: tempArray(),
      selected: getStoreValNumber(heatingControl.partyDecrease).toString(),
      placeholder: "",
      id: getStoreValId(heatingControl.partyDecrease),
    },
  },
  {
    checkbox: {
      id: getStoreValId(heatingControl.present),
      val: getStoreValBoolean(heatingControl.present),
    },
    titleCheckbox: "Anwesend",
    titleSelect: "Abwesenheits Absenkung",
    select: {
      items: tempArray(),
      selected: getStoreValNumber(heatingControl.absentDecrease).toString(),
      placeholder: "",
      id: getStoreValId(heatingControl.absentDecrease),
    },
  },
  {
    checkbox: {
      id: getStoreValId(heatingControl.partyNow),
      val: getStoreValBoolean(heatingControl.partyNow),
    },
    titleCheckbox: "Party jetzt",
    titleSelect: "Urlaub abwesend Absenkung",
    select: {
      items: tempArray(),
      selected: getStoreValNumber(heatingControl.vacationAbsentDecrease).toString(),
      placeholder: "",
      id: getStoreValId(heatingControl.vacationAbsentDecrease),
    },
  },
  {
    checkbox: {
      id: getStoreValId(heatingControl.guestsPresent),
      val: getStoreValBoolean(heatingControl.guestsPresent),
    },
    titleCheckbox: "Gäste",
    titleSelect: "Fenster offen Absenkung",
    select: {
      items: tempArray(),
      selected: getStoreValNumber(heatingControl.windowOpenDecrease).toString(),
      placeholder: "",
      id: getStoreValId(heatingControl.windowOpenDecrease),
    },
  },
  {
    checkbox: {
      id: getStoreValId(heatingControl.holidayPresent),
      val: getStoreValBoolean(heatingControl.holidayPresent),
    },
    titleCheckbox: "Urlaub anwesend",
    titleSelect: "Override für",
    input: {
      id: getStoreValId(heatingControl.temperatureOverrideTime),
      val: getStoreValNumber(heatingControl.temperatureOverrideTime).toString(),
      textBehind: "um",
    },
    select: {
      items: tempArray(),
      selected: getStoreValNumber(heatingControl.temperatureOverrideTemp).toString(),
      placeholder: "",
      id: getStoreValId(heatingControl.temperatureOverrideTemp),
    },
  },
  {
    checkbox: {
      id: getStoreValId(heatingControl.vacationAbsent),
      val: getStoreValBoolean(heatingControl.vacationAbsent),
    },
    titleCheckbox: "Urlaub abwesend",
    titleSelect: "Minimal Temperatur",
    select: {
      items: tempArray(),
      selected: getStoreValNumber(heatingControl.minimumTemperature).toString(),
      placeholder: "",
      id: getStoreValId(heatingControl.minimumTemperature),
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
