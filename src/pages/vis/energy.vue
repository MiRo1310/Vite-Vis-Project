<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import EnergyFlow from "@/components/shared/energy-flow/EnergyFlow.vue";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Car,
  Check,
  Heater,
  House,
  SolarPanel,
  Torus,
  X,
} from "lucide-vue-next";
import { type TEnergyFlowArray } from "@/components/shared/energy-flow";
import { HexColors } from "@/components/shared/energy-flow/color-enum.ts";

const { iobroker } = useIobrokerStore();

const iconBattery = computed(() => {
  const value = iobroker.pv.batteryCharging.value;
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

const data = computed((): TEnergyFlowArray<Ids> => {
  const { energy, pool, pv } = iobroker;
  return [
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
          value: pv.pvGross.value,
          options: {
            groupCount: 1,
            autoSpeed: { max: 3000, min: 1000, active: true, maxSpeed: 75, minSpeed: 25 },
            reverse: "lessThan",
          },
        },
      ],
      values: [{ value: pv.pvGross.value, unit: "W" }, { value: "" }, { value: (pv.energyDayGross.value / 1000).toFixed(2), unit: "KWh" }],
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
          value: pv.smallPv.value,
          options: {
            reverse: "greaterThan",
            groupCount: 3,
            dotsPerGroup: 3,
            autoSpeed: { max: 600, min: 50, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: pv.smallPv.val ?? 0, unit: "W" }, { value: "" }, { value: pv.energyDaySmall.value.toFixed(2), unit: "KWh" }],
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
          value: pv.activeCharging.value,
          options: {
            speed: 10,
            groupCount: 1,
            autoSpeed: { max: 5000, min: 50, maxSpeed: 75, minSpeed: 25 },
            reverse: "lessThan",
          },
        },
      ],
      values: [
        { value: pv.activeCharging.value, unit: "W" },
        { value: pv.batteryCharging.value, unit: "%" },
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
          value: iobroker.energy.energyReceived.value.toFixed(2),
          unit: "KW",
          colorHex: HexColors.RED,
          icon: { svg: ArrowRight, offsetX: -40, offsetY: -13, width: 15, height: 15, class: "text-red-200" },
        },
        {
          value: iobroker.energy.energyReturned.value.toFixed(2),
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
          value: pv.feedIn.value,
          options: {
            groupCount: 1,
            reverse: "greaterThan",
            autoSpeed: { max: 5000, min: 50, maxSpeed: 75, minSpeed: 5 },
          },
        },
      ],
      values: [{ value: pv.feedIn.value, unit: "W" }],
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
          value: [energy.Waschmaschine.value, energy.Rack.value, energy.Kuehltruhe.value],
          options: {
            flowColorHex: { positive: HexColors.YELLOW },
            groupCount: 1,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 5 },
          },
        },
      ],
      values: [
        {
          value: [energy.Waschmaschine.value, energy.Rack.value, energy.Kuehltruhe.value],
          unit: "W",
          offsetY: -25,
        },
      ],
    },
    {
      id: "server",
      position: { row: 3.5, col: 2.5 },
      title: "Server",

      lines: [
        {
          lineStart: { id: "cellar", position: "bottom", offsetX: 12 },
          lineEnd: { id: "server", position: "top" },
          value: energy.Rack.value,
          options: {
            groupCount: 1,
            flowColorHex: { positive: HexColors.YELLOW },
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 5 },
          },
        },
      ],
      values: [{ value: energy.Rack.value, unit: "W" }],
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
          value: energy.Waschmaschine.value,
          options: {
            groupCount: 2,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 5 },
          },
        },
      ],
      values: [{ value: energy.Waschmaschine.value, unit: "W" }],
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
          value: energy.Kuehltruhe.value,
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            flowColorHex: { positive: HexColors.YELLOW },
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 5 },
          },
        },
      ],
      values: [{ value: energy.Kuehltruhe.value, unit: "W" }],
    },
    {
      id: "pool",
      position: { row: 2, col: 4 },
      title: "Pool",
      type: "react",
      react: { height: 70, width: 70 },
      icon: { svg: Torus },
      lines: [
        {
          lineStart: { id: "house", position: "right" },
          lineEnd: { id: "pool", position: "left" },
          value: [pool.consumption.value, pool.poolPumpPower.value],
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [{ value: [pool.consumption.value, pool.poolPumpPower.value], unit: "W" }],
    },
    {
      id: "heat_pump",
      position: { row: 1, col: 4 },
      title: "Wärmepumpe",
      type: "react",
      react: { width: 80, height: 120 },
      icon: { svg: Heater },
      lines: [
        {
          lineStart: { id: "heat_pump", position: "bottom" },
          lineEnd: { id: "pool", position: "top" },
          value: pool.consumption.value,
          options: {
            groupCount: 2,
            flowColorHex: { positive: HexColors.YELLOW },
            dotsPerGroup: 3,
            reverse: "greaterThan",
            autoSpeed: { max: 3000, min: 0, maxSpeed: 75, minSpeed: 25 },
          },
        },
      ],
      values: [
        { value: pool.consumption.value, unit: "W" },
        {
          value: pool.tempIn.value,
          unit: "°C",
          colorHex: HexColors.BLUE_LIGHT,
          icon: { svg: ArrowRight, offsetX: -35, offsetY: -12, width: 15, height: 15, class: "text-blue-200" },
        },
        {
          value: pool.tempOut.value,
          unit: "°C",
          colorHex: HexColors.RED,
          icon: { svg: ArrowLeft, offsetX: -35, offsetY: -12, width: 15, height: 15, class: "text-red-200" },
        },
        {
          value: "Silent",
          offsetY: 5,
          icon: pool.silent.value
            ? { svg: Check, offsetX: 18, offsetY: -12, width: 15, height: 15, class: "text-green-200" }
            : { svg: X, offsetX: 18, offsetY: -12, width: 15, height: 15, class: "text-red-200" },
        },
      ],
    },
    {
      id: "pool_pump",
      position: { row: 1, col: 5 },
      title: "Poolpumpe",
      type: "react",
      react: { width: 80, height: 85 },
      stroke: pool.poolPumpSwitch.value ? HexColors.GREEN : HexColors.GRAY,
      clickHandler: () => {
        pool.poolPumpSwitch.toggle();
      },
      lines: [
        {
          lineStart: { id: "pool", position: "right" },
          lineEnd: { id: "pool_pump", position: "bottom" },
          value: pool.poolPumpPower.value,
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 500, min: 0, maxSpeed: 75, minSpeed: 5 },
          },
        },
      ],
      values: [{ value: pool.poolPumpPower.value, unit: "W" }],
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
          value: 0,
          options: {
            groupCount: 3,
            dotsPerGroup: 3,
            reverse: "lessThan",
            autoSpeed: { max: 11000, min: 0, maxSpeed: 75, minSpeed: 5 },
          },
        },
      ],
      values: [{ value: 0, unit: "W" }],
    },
  ];
});
</script>

<template>
  <Page title="Energy">
    <EnergyFlow :data :width="1200" :height="700" />
  </Page>
</template>
