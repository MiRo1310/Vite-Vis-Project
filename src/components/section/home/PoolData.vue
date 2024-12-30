<script setup lang="ts">

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import InfoCard, { InfoTypes } from "@/components/shared/card/InfoCard.vue";

const { pool } = useIobrokerStore();

function convertUnixTimestampToDate(ts: number | undefined) {
  if (!ts) return "";
  return new Date(ts).toLocaleString();
}

// const getPhVal = () => `( min: ${pool.ph_min?.val} , max: ${pool.ph_max?.val} ) --- ${pool.ph?.val} `;
// const getChlorVal = () => `( min: ${pool.free_chlorine_min?.val} , max: ${pool.free_chlorine_max?.val} ) --- ${pool.free_chlorine?.val} `;
// const getElVal = () => `( min: ${pool.el_min?.val} , max: ${pool.el_max?.val} ) --- ${pool.el?.val} `;
// const getReduxVal = () => `( min: ${pool.orp_min?.val} , max: ${pool.orp_max?.val} ) --- ${pool.orp?.val} `;

const infos: InfoTypes[] = [
  { title: "", value: convertUnixTimestampToDate(pool.temperature?.ts), unit: "" },
  { title: "Batterie", value: pool.battery?.val, unit: "%" },
  { title: "Temperatur", value: pool.temperature?.val, unit: "°C" },
  { title: "PH", value: pool.ph?.val, unit: "ph" },
  { title: "Elektrische Leitfähigkeit", value: pool.el?.val, unit: "µS/cm" },
  { title: "Redux", value: pool.orp?.val, unit: "mV" },
  { title: "Chlor", value: pool.free_chlorine?.val, unit: "mg/L" },
  { title: "Salt", value: pool.salinity?.val, unit: "ppm" }
];


</script>

<template>
  <Card styling="light" :class="$props.class">
    <CardHeader>
      <CardTitle>
        <div class="flex justify-between items-center">
          <span>Poolwerte</span>
          <OnlineOffline :status="pool.available?.val" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="-mt-2">
        <InfoCard :infos="infos" />
      </div>
    </CardContent>
  </Card>
</template>