<script setup lang="ts">
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CardTitle from "@/components/shared/card/CardTitle.vue";
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { useRouter } from 'vue-router';
const router = useRouter();
const iobrokerStore = useIobrokerStore();
const { pv } = storeToRefs(iobrokerStore);

const values = [
  { title: "Batterieladung", value: pv.value.batteryCharging, unit: "%" },
  { title: "Batterie wird geladen", value: pv.value.activeCharging, unit: "W" },
  { title: pv.value.feedIn > 0 ? "Einspeisung" : "Bezug", value: pv.value.feedIn, unit: "W", class: pv.value.feedIn < 0 ? 'text-red-500' : 'text-green-500' },
  { title: "Erzeugnis kleine PV", value: pv.value.batteryCharging, unit: "W" },
  { title: "Berechneter Gewinn", value: pv.value.profit, unit: "€" },
];
</script>
<template>
  <Card class="w-auto cursor-pointer" @click="router.push('/pv')">
    <CardHeader>
      <CardTitle>PV Daten</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-for="(value, index) in values" class="flex justify-between items-center" :key="index">
        <span :class="{ 'text-accent-foreground/50 text-xs font-bold': true, 'mt-2': index > 0 }">{{ value.title
          }}</span>

        <span
          :class="{ [value?.class as string]: true, 'text-accent-foreground/50 text-xs font-bold': true, 'mt-2': index > 0 }">
          {{ value.value }} {{ value.unit }}
        </span>

      </div>

      <iframe class="mt-4" src="http://192.168.1.4:3000/d-solo/Biuksv-4k/strom?orgId=1&refresh=5s&panelId=13"
        width="350" height="120" frameborder="0" />
    </CardContent>
  </Card>
</template>
