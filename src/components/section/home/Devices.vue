<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import { computed } from "vue";
import { Button } from "@/components/shared/button/button.variants";
import { getStoreValBoolean } from "@/lib/object.ts";

const { airConditioners, pool, landroid, heating } = useIobrokerStore();

const status = computed(() => {
  return [
    {
      name: "Heizung",
      online: getStoreValBoolean(heating.active),
      power: getStoreValBoolean(heating.automatic) && getStoreValBoolean(heating.active),
    },
    {
      name: "Solar Pumpe",
      online: getStoreValBoolean(heating.solarPump),
      textActive: "An",
      textInactive: "Aus",
    },
    {
      name: "Klima Schlafen",
      online: getStoreValBoolean(airConditioners.schlafenOnline),
      power: getStoreValBoolean(airConditioners.schlafenPowerStatus),
    },
    {
      name: "Klima Kind",
      online: getStoreValBoolean(airConditioners.childOnline),
      power: getStoreValBoolean(airConditioners.childPowerStatus),
    },
    {
      name: "Wärmepumpe",
      online: getStoreValBoolean(pool.status),
      power: (pool.consumption?.val ?? 0) > 30,
    },
    {
      name: "Rasenmäher",
      online: getStoreValBoolean(landroid.online),
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
