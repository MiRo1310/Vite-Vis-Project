<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import { computed } from "vue";
import { Button } from "@/components/shared/button";
import { getValBoolean } from "@/lib/object.ts";

const { airConditioners, pool, landroid } = storeToRefs(useIobrokerStore());

const status = computed(() => {
  return [
    {
      name: "Klima Schlafen",
      online: getValBoolean(airConditioners.value.schlafenOnline),
      power: getValBoolean(airConditioners.value.schlafenPowerStatus),
    },
    {
      name: "Klima Kind",
      online: getValBoolean(airConditioners.value.childOnline),
      power: getValBoolean(airConditioners.value.childPowerStatus),
    },
    {
      name: "Wärmepumpe",
      online: getValBoolean(pool.value.status),
      power: (pool.value.consumption?.val ?? 0) > 30,
    },
    {
      name: "Rasenmäher",
      online: getValBoolean(landroid.value.online),
      power: landroid.value.status?.val !== 1,
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

            <OnlineOffline :status="s.online" :power="s.power" />
          </div>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
