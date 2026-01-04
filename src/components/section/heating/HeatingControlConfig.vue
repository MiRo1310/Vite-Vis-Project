<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { computed } from "vue";
import HeatingControlConfigRow, { RowHeatingConfig } from "./HeatingControlConfigRow.vue";
import { tempArray } from "@/lib/object.ts";

const { heatingControl } = useIobrokerStore();

const rows = computed((): RowHeatingConfig[] => [
  {
    checkbox: {
      id: heatingControl.periodActive?.id,
      val: heatingControl.periodActive?.val,
    },
    titleCheckbox: "Heizperiode aktiv",
    titleSelect: "Gäste Anhebung",
    select: {
      items: tempArray(),
      selected: heatingControl.guestIncrease?.val?.toString(),
      placeholder: "",
      id: heatingControl.guestIncrease?.id,
    },
  },
  {
    checkbox: {
      id: heatingControl.publicHoliday?.id,
      val: heatingControl.publicHoliday?.val,
    },
    titleCheckbox: "Feiertag heute",
    titleSelect: "Party Absenkung",
    select: {
      items: tempArray(),
      selected: heatingControl.partyDecrease?.val?.toString(),
      placeholder: "",
      id: heatingControl.partyDecrease?.id,
    },
  },
  {
    checkbox: {
      id: heatingControl.present?.id,
      val: heatingControl.present?.val,
    },
    titleCheckbox: "Anwesend",
    titleSelect: "Abwesenheits Absenkung",
    select: {
      items: tempArray(),
      selected: heatingControl.absentDecrease?.val?.toString(),
      placeholder: "",
      id: heatingControl.absentDecrease?.id,
    },
  },
  {
    checkbox: {
      id: heatingControl.partyNow?.id,
      val: heatingControl.partyNow?.val,
    },
    titleCheckbox: "Party jetzt",
    titleSelect: "Urlaub abwesend Absenkung",
    select: {
      items: tempArray(),
      selected: heatingControl.vacationAbsentDecrease?.val?.toString(),
      placeholder: "",
      id: heatingControl.vacationAbsentDecrease?.id,
    },
  },
  {
    checkbox: {
      id: heatingControl.guestsPresent?.id,
      val: heatingControl.guestsPresent?.val,
    },
    titleCheckbox: "Gäste",
    titleSelect: "Fenster offen Absenkung",
    select: {
      items: tempArray(),
      selected: heatingControl.windowOpenDecrease?.val?.toString(),
      placeholder: "",
      id: heatingControl.windowOpenDecrease?.id,
    },
  },
  {
    checkbox: {
      id: heatingControl.holidayPresent?.id,
      val: heatingControl.holidayPresent?.val,
    },
    titleCheckbox: "Urlaub anwesend",
    titleSelect: "Override für",
    input: {
      id: heatingControl.temperatureOverrideTime?.id,
      val: heatingControl.temperatureOverrideTime?.val?.toString(),
      textBehind: "um",
    },
    select: {
      items: tempArray(),
      selected: heatingControl.temperatureOverrideTemp?.val?.toString(),
      placeholder: "",
      id: heatingControl.temperatureOverrideTemp?.id,
    },
  },
  {
    checkbox: {
      id: heatingControl.vacationAbsent?.id,
      val: heatingControl.vacationAbsent?.val,
    },
    titleCheckbox: "Urlaub abwesend",
    titleSelect: "Minimal Temperatur",
    select: {
      items: tempArray(),
      selected: heatingControl.minimumTemperature?.val?.toString(),
      placeholder: "",
      id: heatingControl.minimumTemperature?.id,
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
