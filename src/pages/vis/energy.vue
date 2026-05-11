<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import EnergyFlow from "@/components/shared/energy-flow/EnergyFlow.vue";
import { computed } from "vue";
import { getValNumber } from "@/lib/object.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { ArrowLeft, ArrowRight, Battery, BatteryFull, BatteryLow, BatteryMedium, Car, House, SolarPanel } from "lucide-vue-next";
import { TEnergyFlowArray } from "@/components/shared/energy-flow";
import { HexColors } from "@/components/shared/energy-flow/color-enum.ts";

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

type Ids =
  | "pv"
  | "balconyPv"
  | "washer"
  | "car"
  | "server"
  | "house"
  | "battery"
  | "powerGrid"
  | "cellar"
  | "freezer"
  | "pool"
  | "heat_pump"
  | "pool_pump";

const data = computed(
  (): TEnergyFlowArray<Ids> => [
    {
      id: "pv",
      title: "PV Gross",
      type: "react",
      react: { height: 150 },
      icon: { svg: SolarPanel },
      position: { row: 2, col: 1 },
      lines: [
        {
          lineStart: { id: "pv", offsetY: 0, position: "right" },
          lineEnd: { id: "house", position: "left" },
          value: getValNumber(pv.pvGross),
          options: {
            groupCount: 1,
            autoSpeed: { max: 3000, min: 1000, active: true, maxSpeed: 75, minSpeed: 25 },
            reverse: "lessThan",
          },
        },
      ],
      values: [
        { value: getValNumber(pv.pvGross), unit: "W" },
        { value: "" },
        { value: (getValNumber(pv.energyDayGross) / 1000).toFixed(2), unit: "KWh" },
      ],
    },
    {
      id: "balconyPv",
      title: "PV Klein",
      type: "react",
      react: { height: 110 },
      icon: { svg: SolarPanel, width: 30, height: 30 },
      position: { row: 3, col: 1 },
      lines: [
        {
          lineStart: { id: "house", position: "bottom", offsetX: -12 },
          lineEnd: { id: "balconyPv", position: "top" },
          value: getValNumber(pv.smallPv),
          options: {
            reverse: "greaterThan",
            groupCount: 3,
            dotsPerGroup: 3,
            autoSpeed: { max: 600, min: 50, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: pv.smallPv?.val ?? 0, unit: "W" }, { value: "" }, { value: getValNumber(pv.energyDaySmall).toFixed(2), unit: "KWh" }],
    },
    {
      id: "battery",
      position: { row: 3, col: 2 },
      title: "Speicher",
      circle: { radius: 50 },
      icon: {
        svg: iconBattery.value,
      },
      lines: [
        {
          lineStart: { id: "house", position: "bottom" },
          lineEnd: { id: "battery", position: "top" },
          value: getValNumber(pv.activeCharging),
          options: {
            speed: 10,
            groupCount: 1,
            autoSpeed: { max: 5000, min: 50, maxSpeed: 75, minSpeed: 25 },
            reverse: "lessThan",
          },
        },
      ],
      values: [
        { value: getValNumber(pv.activeCharging), unit: "W" },
        { value: getValNumber(pv.batteryCharging), unit: "%" },
      ],
    },
    {
      id: "house",
      position: { row: 2, col: 2 },
      stroke: HexColors.GRAY,
      type: "react",

      icon: { svg: House },
      lines: [],
      values: [
        {
          value: getValNumber(energy.energyReceived).toFixed(2),
          unit: "KW",
          colorHex: HexColors.RED,
          icon: { svg: ArrowRight, offsetX: -40, offsetY: -13, width: 15, height: 15, class: "text-red-200" },
        },
        {
          value: getValNumber(energy.energyReturned).toFixed(2),
          unit: "KW",
          icon: { svg: ArrowLeft, offsetX: -40, offsetY: -13, width: 15, height: 15, class: "text-green-200" },
        },
      ],
    },
    {
      id: "powerGrid",
      position: { row: 1, col: 2 },
      title: "Netz",
      lines: [
        {
          lineStart: { id: "powerGrid", position: "bottom" },
          lineEnd: { id: "house", position: "top" },
          value: getValNumber(pv.feedIn),
          options: {
            groupCount: 1,
            reverse: "greaterThan",
            autoSpeed: { max: 5000, min: 50, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: getValNumber(pv.feedIn), unit: "W" }],
    },
    {
      id: "cellar",
      position: { row: 2.6, col: 2.75 },
      title: "Keller",
      type: "react",
      react: { height: 50, width: 50 },
      lines: [
        {
          lineStart: { id: "house", position: "right", offsetY: 30 },
          lineEnd: { id: "cellar", position: "top" },
          value: getValNumber(energy.Waschmaschine) + getValNumber(energy.Rack) + getValNumber(energy.Kuehltruhe),
          options: {
            flowColorHex: { positive: HexColors.YELLOW },
            groupCount: 1,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: [getValNumber(energy.Waschmaschine), getValNumber(energy.Rack), getValNumber(energy.Kuehltruhe)], unit: "W", offsetY: -25 }],
    },
    {
      id: "server",
      position: { row: 3.5, col: 2.5 },
      title: "Server",

      lines: [
        {
          lineStart: { id: "cellar", position: "bottom", offsetX: 12 },
          lineEnd: { id: "server", position: "top" },
          value: getValNumber(energy.Rack),
          options: {
            groupCount: 1,

            flowColorHex: { positive: HexColors.YELLOW },
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: getValNumber(energy.Rack), unit: "W" }],
    },
    {
      id: "washer",
      position: { row: 3.5, col: 3.5 },
      title: "Waschmaschine",
      type: "react",
      lines: [
        {
          lineStart: { id: "cellar", position: "right", offsetY: 12 },
          lineEnd: { id: "washer", position: "top" },
          value: getValNumber(energy.Waschmaschine),
          options: {
            groupCount: 1,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: getValNumber(energy.Waschmaschine), unit: "W" }],
    },
    {
      id: "freezer",
      position: { row: 3, col: 4 },
      title: "Kühltruhe",
      stroke: HexColors.BLUE,
      lines: [
        {
          lineStart: { id: "cellar", position: "right", offsetY: -12 },
          lineEnd: { id: "freezer", position: "top" },
          value: getValNumber(energy.Kuehltruhe),
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            flowColorHex: { positive: HexColors.YELLOW },
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 15 },
          },
        },
      ],
      values: [{ value: getValNumber(energy.Kuehltruhe), unit: "W" }],
    },
    {
      id: "pool",
      position: { row: 2, col: 4 },
      title: "Pool",
      type: "react",
      lines: [
        {
          lineStart: { id: "house", position: "right" },
          lineEnd: { id: "pool", position: "left" },
          value: getValNumber(pool.consumption),
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: getValNumber(pool.consumption), unit: "W" }],
    },
    {
      id: "heat_pump",
      position: { row: 1, col: 4 },
      title: "Wärmepumpe",
      type: "react",
      react: { width: 80, height: 80 },
      lines: [
        {
          lineStart: { id: "heat_pump", position: "bottom" },
          lineEnd: { id: "pool", position: "top" },
          value: getValNumber(pool.consumption),
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: getValNumber(pool.consumption), unit: "W" }],
    },
    {
      id: "pool_pump",
      position: { row: 1, col: 4.5 },
      title: "Poolpumpe",
      type: "react",
      react: { width: 80, height: 80 },
      lines: [
        {
          lineStart: { id: "pool", position: "right" },
          lineEnd: { id: "pool_pump", position: "bottom" },
          value: getValNumber(pool.consumption),
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: 0, unit: "W" }],
    },
    {
      id: "car",
      position: { row: 1, col: 3 },
      title: "Auto",
      icon: { svg: Car },
      lines: [
        {
          lineStart: { id: "house", position: "right", offsetY: -24 },
          lineEnd: { id: "car", position: "bottom" },
          value: getValNumber(pool.consumption),
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: getValNumber(pool.consumption), unit: "W" }],
    },
  ],
);
</script>
<template>
  <Page title="Energy">
    <EnergyFlow :data />
  </Page>
</template>
