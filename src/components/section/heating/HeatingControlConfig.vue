<script lang="ts" setup>
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import HeatingControlConfigRow, { type RowHeatingConfig } from "./HeatingControlConfigRow.vue";
import { tempArray } from "@/lib/object.ts";

const { iobroker } = useIobrokerStore();

const rows = computed((): RowHeatingConfig[] => {
  const heatingControl = iobroker.heatingControl;
  return [
    {
      checkbox: {
        id: heatingControl.periodActive.id,
        val: heatingControl.periodActive.value,
      },
      titleCheckbox: "Heizperiode aktiv",
      titleSelect: "Gäste Anhebung",
      select: {
        items: tempArray(),
        selected: heatingControl.guestIncrease.value.toString(),
        placeholder: "",
        id: heatingControl.guestIncrease.id,
      },
    },
    {
      checkbox: {
        id: heatingControl.publicHoliday.id,
        val: heatingControl.publicHoliday.value,
      },
      titleCheckbox: "Feiertag heute",
      titleSelect: "Party Absenkung",
      select: {
        items: tempArray(),
        selected: heatingControl.partyDecrease.value.toString(),
        placeholder: "",
        id: heatingControl.partyDecrease.id,
      },
    },
    {
      checkbox: {
        id: heatingControl.present.id,
        val: heatingControl.present.value,
      },
      titleCheckbox: "Anwesend",
      titleSelect: "Abwesenheits Absenkung",
      select: {
        items: tempArray(),
        selected: heatingControl.absentDecrease.value.toString(),
        placeholder: "",
        id: heatingControl.absentDecrease.id,
      },
    },
    {
      checkbox: {
        id: heatingControl.partyNow.id,
        val: heatingControl.partyNow.value,
      },
      titleCheckbox: "Party jetzt",
      titleSelect: "Urlaub abwesend Absenkung",
      select: {
        items: tempArray(),
        selected: heatingControl.vacationAbsentDecrease.value.toString(),
        placeholder: "",
        id: heatingControl.vacationAbsentDecrease.id,
      },
    },
    {
      checkbox: {
        id: heatingControl.guestsPresent.id,
        val: heatingControl.guestsPresent.value,
      },
      titleCheckbox: "Gäste",
      titleSelect: "Fenster offen Absenkung",
      select: {
        items: tempArray(),
        selected: heatingControl.windowOpenDecrease.value.toString(),
        placeholder: "",
        id: heatingControl.windowOpenDecrease.id,
      },
    },
    {
      checkbox: {
        id: heatingControl.holidayPresent.id,
        val: heatingControl.holidayPresent.value,
      },
      titleCheckbox: "Urlaub anwesend",
      titleSelect: "Override für",
      input: {
        id: heatingControl.temperatureOverrideTime.id,
        val: heatingControl.temperatureOverrideTime.value.toString(),
        textBehind: "um",
      },
      select: {
        items: tempArray(),
        selected: heatingControl.temperatureOverrideTemp.value.toString(),
        placeholder: "",
        id: heatingControl.temperatureOverrideTemp.id,
      },
    },
    {
      checkbox: {
        id: heatingControl.vacationAbsent.id,
        val: heatingControl.vacationAbsent.value,
      },
      titleCheckbox: "Urlaub abwesend",
      titleSelect: "Minimal Temperatur",
      select: {
        items: tempArray(),
        selected: heatingControl.minimumTemperature.value.toString(),
        placeholder: "",
        id: heatingControl.minimumTemperature.id,
      },
    },
  ];
});
</script>
<template>
  <div class="bg-cardSubcard/30 border p-2">
    <div v-for="(row, index) in rows" :key="index" class="flex items-center space-x-4">
      <HeatingControlConfigRow :row="row" />
    </div>
  </div>
</template>
