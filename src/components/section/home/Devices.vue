<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import { computed } from "vue";
import { Button } from "@/components/shared/button/button.variants";
import { getValBoolean } from "@/lib/object.ts";

const { airConditioners, pool, landroid, heating } = useIobrokerStore();

const status = computed(() => {
  return [
    {
      name: "Heizung",
      online: getValBoolean(heating.active),
      power: getValBoolean(heating.automatic) && getValBoolean(heating.active),
    },
    {
      name: "Solar Pumpe",
      online: getValBoolean(heating.solarPump),
      textActive: "An",
      textInactive: "Aus",
    },
    {
      name: "Klima Schlafen",
      online: getValBoolean(airConditioners.schlafenOnline),
      power: getValBoolean(airConditioners.schlafenPowerStatus),
    },
    {
      name: "Klima Kind",
      online: getValBoolean(airConditioners.childOnline),
      power: getValBoolean(airConditioners.childPowerStatus),
    },
    {
      name: "Wärmepumpe",
      online: getValBoolean(pool.status),
      power: (pool.consumption?.val ?? 0) > 30,
    },
    {
      name: "Rasenmäher",
      online: getValBoolean(landroid.online),
      power: landroid.status?.val !== 1,
    },
  ];
});
</script>

<template>
  <Card styling="small" color="primary">
    <CardHeader>
      <CardTitle>Gerätestatus</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-2">
        <Button v-for="s in status" :key="s.name" variant="outline">
          <div class="flex justify-between w-full items-center">
            <span>{{ s.name }}</span>

            <OnlineOffline :status="s.online" :power="s.power" :text-inactive="s?.textInactive" :text-active="s?.textActive" />
          </div>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
