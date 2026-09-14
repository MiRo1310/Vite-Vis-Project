<script setup lang="ts">
import MetricValue from "@/components/shared/display/MetricValue.vue";
import { chargingTime } from "@/composables/battery.ts";
import { type WattPilotJson } from "@/types/types.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();

defineProps<{ data: WattPilotJson }>();

const CHARGING_CAPACITY = 81; // kWh
</script>

<template>
  <MetricValue
    :val="
      chargingTime({
        chargingLimit: iobroker.car.batteryStandardTarget.value,
        batteryCapacity: CHARGING_CAPACITY,
        currentBatteryPercent: iobroker.car.battery.value,
        currentPowerW: data?.chargingPowerW ?? 0,
      })
    "
    unit="Std"
  />
</template>
