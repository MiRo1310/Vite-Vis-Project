<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { useRouter } from 'vue-router';
const router = useRouter();
const iobrokerStore = useIobrokerStore();
const { pv } = storeToRefs(iobrokerStore);
</script>
<template>
  <Card
    class="w-auto cursor-pointer"
    @click="router.push('/pv')"
  >
    <CardHeader>
      <CardTitle>PV Daten</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex justify-between space-x-6">
        <div>
          <p>Batterieladung</p>
          <p>{{ pv.activeCharging > 0 ? "Batterie wird geladen" : "Batterie wird entladen:" }}</p>
          <p>{{ pv.feedIn > 0 ? "Einspeisung" : "Bezug" }}</p>
          <p>Erzeugnis kleine PV</p>
          <p>Berechneter Gewinn</p>
        </div>
        <div class="text-right w-16">
          <p>{{ pv.batteryCharging }}%</p>
          <p>{{ pv.activeCharging }} W</p>
          <p :class="pv.feedIn < 0 ? 'text-red-500' : 'text-green-500'">
            {{ pv.feedIn }} W
          </p>
          <p>{{ pv.batteryCharging }} W</p>
          <p>{{ pv.profit }} €</p>
        </div>
      </div>
      <iframe
        src="http://192.168.1.4:3000/d-solo/Biuksv-4k/strom?orgId=1&refresh=5s&panelId=13"
        width="350"
        height="120"
        frameborder="0"
      />
    </CardContent>
  </Card>
</template>
