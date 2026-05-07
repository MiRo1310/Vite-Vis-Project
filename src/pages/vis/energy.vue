<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import EnergyFlow from "@/components/shared/energy-flow/EnergyFlow.vue";

import { computed } from "vue";
import { getValNumber } from "@/lib/object.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Battery, BatteryFull, BatteryLow, BatteryMedium, Car, House, SolarPanel } from "lucide-vue-next";
import { IEnergyFlow } from "@/components/shared/energy-flow";
import { Line } from "@/components/shared/energy-flow/utils.ts";

const { pv, energy, pool } = useIobrokerStore();

const iconBattery = computed(() => {
  const value = getValNumber(pv.batteryCharging);
  if (value === 100) {
    return BatteryFull;
  }
  if (value > 40) {
    return BatteryMedium;
  }

  if (value > 10) {
    return BatteryLow;
  }
  return Battery;
});

const data = computed((): IEnergyFlow[] => [
  {
    id: "pv",
    title: "PV Gross",
    type: "react",
    react: { height: 150 },
    icon: { svg: SolarPanel },
    position: { row: 2, col: 1 },
    lines: [
      new Line({ id: "pv", offsetY: 0, position: "right" }, { id: "verteiler", position: "left" }, getValNumber(pv.pvGross), {
        groupCount: 1,
        spacing: 0.15,
        autoSpeed: { max: 3000, min: 1000, active: true, maxSpeed: 75, minSpeed: 25 },
        reverse: "lessThan",
      }),
    ],
    values: [
      { value: getValNumber(pv.pvGross), unit: "W", class: "text-green-600" },
      { value: "" },
      { value: getValNumber(pv.energyDayGross) / 1000, unit: "KWh", class: "text-green-600" },
    ],
  },
  {
    id: "pvSmall",
    title: "PV Klein",
    type: "react",
    react: { height: 110 },
    icon: { svg: SolarPanel, width: 30, height: 30 },
    position: { row: 3, col: 1 },
    lines: [
      new Line({ id: "verteiler", position: "bottom", offsetX: -12 }, { id: "pvSmall", position: "top" }, getValNumber(pv.smallPv), {
        reverse: "greaterThan",
        groupCount: 3,
        dotsPerGroup: 3,
        spacing: 0.05,
        autoSpeed: { max: 600, min: 50, maxSpeed: 75, minSpeed: 25 },
      }),
    ],
    values: [
      { value: pv.smallPv?.val ?? 0, unit: "W", class: "text-green-600" },
      { value: "" },
      { value: getValNumber(pv.energyDaySmall), unit: "KWh", class: "text-green-600" },
    ],
  },
  {
    id: "battery",
    position: { row: 3, col: 2 },
    title: "Speicher",
    icon: {
      svg: iconBattery.value,
    },
    lines: [
      new Line({ id: "verteiler", position: "bottom" }, { id: "battery", position: "top" }, getValNumber(pv.activeCharging), {
        speed: 10,
        groupCount: 1,
        autoSpeed: { max: 5000, min: 50, maxSpeed: 75, minSpeed: 25 },
        reverse: "lessThan",
      }),
    ],
    values: [
      { value: getValNumber(pv.activeCharging), unit: "W", class: "text-green-400" },
      { value: getValNumber(pv.batteryCharging), unit: "%" },
    ],
  },
  {
    id: "verteiler",
    position: { row: 2, col: 2 },
    stroke: "#999",
    type: "react",

    icon: { svg: House },
    lines: [],
    values: [],
  },
  {
    id: "netz",
    position: { row: 1, col: 2 },
    title: "Netz",
    lines: [
      new Line({ id: "netz", position: "bottom" }, { id: "verteiler", position: "top" }, getValNumber(pv.feedIn), {
        groupCount: 1,
        reverse: "greaterThan",
        autoSpeed: { max: 5000, min: 50, maxSpeed: 75, minSpeed: 25 },
      }),
    ],
    values: [{ value: getValNumber(pv.feedIn), unit: "W", class: "text-green-400" }],
  },
  {
    id: "rack",
    position: { row: 3, col: 3 },
    title: "Server",

    lines: [
      new Line({ id: "verteiler", position: "bottom", offsetX: 12 }, { id: "rack", position: "top" }, getValNumber(energy.Rack), {
        groupCount: 1,
        flowColorHex: { positive: "#dce652" },
        reverse: "lessThan",
        autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
      }),
    ],
    values: [{ value: getValNumber(energy.Rack), unit: "W", class: "text-green-400" }],
  },
  {
    id: "waschmaschine",
    position: { row: 3, col: 3.5 },
    title: "Waschmaschine",
    type: "react",
    lines: [
      new Line({ id: "verteiler", position: "right", offsetY: 40 }, { id: "waschmaschine", position: "top" }, getValNumber(energy.Waschmaschine), {
        groupCount: 1,
        reverse: "lessThan",
        autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
      }),
    ],
    values: [{ value: getValNumber(energy.Waschmaschine), unit: "W", class: "text-green-400" }],
  },
  {
    id: "kuehltruhe",
    position: { row: 3, col: 4 },
    title: "Kühltruhe",
    stroke: "#0f148e",
    lines: [
      new Line({ id: "verteiler", position: "right", offsetY: 12 }, { id: "kuehltruhe", position: "top" }, getValNumber(energy.Kuehltruhe), {
        groupCount: 3,
        dotsPerGroup: 3,
        spacing: 0.04,
        flowColorHex: { positive: "#dce652" },
        reverse: "lessThan",
        autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 15 },
      }),
    ],
    values: [{ value: getValNumber(energy.Kuehltruhe), unit: "W", class: "text-green-400" }],
  },
  {
    id: "pool",
    position: { row: 1, col: 3 },
    title: "Wärmepumpe",
    type: "react",
    lines: [
      new Line({ id: "verteiler", position: "right", offsetY: -40 }, { id: "pool", position: "bottom" }, getValNumber(pool.consumption), {
        groupCount: 3,
        dotsPerGroup: 3,
        spacing: 0.04,
        reverse: "lessThan",
        autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
      }),
    ],
    values: [{ value: getValNumber(pool.consumption), unit: "W", class: "text-green-400" }],
  },
  {
    id: "auto",
    position: { row: 1, col: 4 },
    title: "Auto",
    icon: { svg: Car },
    lines: [
      new Line({ id: "verteiler", position: "right", offsetY: -12 }, { id: "auto", position: "bottom" }, getValNumber(pool.consumption), {
        groupCount: 3,
        dotsPerGroup: 3,
        spacing: 0.04,
        reverse: "lessThan",
        autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
      }),
    ],
    values: [{ value: getValNumber(pool.consumption), unit: "W", class: "text-green-400" }],
  },
]);
</script>
<template>
  <Page title="Energy">
    <EnergyFlow :data />
  </Page>
</template>
