<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { computed } from "vue";
import HeatingControlConfigRow, { RowHeatingConfig } from "./HeatingControlConfigRow.vue";
import { tempArray } from "@/lib/object.ts";

const { heating } = useIobrokerStore();

const rows = computed((): RowHeatingConfig[] => [
  {
    checkbox: {
      id: heating.heatingControl.periodActive?.id,
      val: heating.heatingControl.periodActive?.val
    },
    titleCheckbox: "Heizperiode aktiv",
    titleSelect: "Gäste Anhebung",
    select: {
      items: tempArray(),
      selected: heating.heatingControl.guestIncrease?.val?.toString(),
      placeholder: "",
      id: heating.heatingControl.guestIncrease?.id
    }
  },
  {
    checkbox: {
      id: heating.heatingControl.publicHoliday?.id,
      val: heating.heatingControl.publicHoliday?.val
    },
    titleCheckbox: "Feiertag heute",
    titleSelect: "Party Absenkung",
    select: {
      items: tempArray(),
      selected: heating.heatingControl.partyDecrease?.val?.toString(),
      placeholder: "",
      id: heating.heatingControl.partyDecrease?.id
    }
  },
  {
    checkbox: {
      id: heating.heatingControl.present?.id,
      val: heating.heatingControl.present?.val
    },
    titleCheckbox: "Anwesend",
    titleSelect: "Abwesenheits Absenkung",
    select: {
      items: tempArray(),
      selected: heating.heatingControl.absentDecrease?.val?.toString(),
      placeholder: "",
      id: heating.heatingControl.absentDecrease?.id
    }
  },
  {
    checkbox: {
      id: heating.heatingControl.partyNow?.id,
      val: heating.heatingControl.partyNow?.val
    },
    titleCheckbox: "Party jetzt",
    titleSelect: "Urlaub abwesend Absenkung",
    select: {
      items: tempArray(),
      selected: heating.heatingControl.vacationAbsentDecrease?.val?.toString(),
      placeholder: "",
      id: heating.heatingControl.vacationAbsentDecrease?.id
    }
  },
  {
    checkbox: {
      id: heating.heatingControl.guestsPresent?.id,
      val: heating.heatingControl.guestsPresent?.val
    },
    titleCheckbox: "Gäste",
    titleSelect: "Fenster offen Absenkung",
    select: {
      items: tempArray(),
      selected: heating.heatingControl.windowOpenDecrease?.val?.toString(),
      placeholder: "",
      id: heating.heatingControl.windowOpenDecrease?.id
    }
  },
  {
    checkbox: {
      id: heating.heatingControl.holidayPresent?.id,
      val: heating.heatingControl.holidayPresent?.val
    },
    titleCheckbox: "Urlaub anwesend",
    titleSelect: "Override für",
    input: {
      id: heating.heatingControl.temperatureOverrideTime?.id,
      val: heating.heatingControl.temperatureOverrideTime?.val?.toString(),
      textBehind: "um"
    },
    select: {
      items: tempArray(),
      selected: heating.heatingControl.temperatureOverrideTemp?.val?.toString(),
      placeholder: "",
      id: heating.heatingControl.temperatureOverrideTemp?.id
    }
  },
  {
    checkbox: {
      id: heating.heatingControl.vacationAbsent?.id,
      val: heating.heatingControl.vacationAbsent?.val
    },
    titleCheckbox: "Urlaub abwesend",
    titleSelect: "Minimal Temperatur",
    select: {
      items: tempArray(),
      selected: heating.heatingControl.minimumTemperature?.val?.toString(),
      placeholder: "",
      id: heating.heatingControl.minimumTemperature?.id
    }
  }
]);
</script>
<template>
  <div class="bg-color__default p-1">
    <div v-for="(row, index) in rows" :key="index" class="flex items-center space-x-4">
      <HeatingControlConfigRow :row="row" />
    </div>
  </div>
</template>
