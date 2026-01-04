<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { computed } from "vue";
import InfoCard, { InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";

const { pv } = useIobrokerStore();

const infos = computed((): InfoTypes[][] => [
  [
    { title: "Grosse PV", value: pv?.pvGross?.val, unit: "Wh" },
    { title: "Kleine PV", value: pv?.smallPv?.val, unit: "Wh" },
  ],
  [
    {
      title: (pv?.feedIn?.val || 0) < 0 ? "Bezug" : "Einspeisung",
      value: (pv?.feedIn?.val || 0) < 0 ? (pv?.feedIn?.val || 0) * -1 : pv?.feedIn?.val,
      unit: "W",
      valueClass: (pv?.feedIn?.val || 0) < 0 ? "text-destructive" : "text-successas",
    },
    { title: "Aktives Laden", value: pv?.activeCharging?.val, unit: "W" },
    { title: "Ladezustand", value: pv?.batteryCharging?.val, unit: "%" },
  ],
  [
    { title: "Verkauft", value: pv?.profit?.val, unit: "€" },
    {
      title: "Genutzt",
      value: ((pv?.savedMoney?.val || 0) - (pv?.profit?.val || 0)).toFixed(2),
      unit: "€",
    },
    { title: "Ersparnis", value: pv?.savedMoney?.val, unit: "€" },
  ],
]);
</script>

<template>
  <Card styling="small" color="primary">
    <CardHeader>
      <CardTitle> PV</CardTitle>
    </CardHeader>
    <CardContent>
      <InfoCard v-for="(info, i) in infos" :key="i" :infos="info" class="mt-2 first:mt-0" />
    </CardContent>
  </Card>
</template>
