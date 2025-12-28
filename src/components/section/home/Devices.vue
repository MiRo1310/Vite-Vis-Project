<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import { computed } from "vue";
import { Button } from "@/components/shared/button";

const { airConditioners, pool, landroid } = storeToRefs(useIobrokerStore());

const status = computed(() => {
  return [
    {
      name: "Schlafzimmer",
      online: airConditioners?.value?.schlafenOnline?.val ?? false,
      power: airConditioners?.value?.schlafenPowerStatus?.val ?? false,
    },
    {
      name: "Kinderzimmer",
      online: airConditioners?.value?.childOnline?.val ?? false,
      power: airConditioners?.value?.childPowerStatus?.val ?? false,
    },
    {
      name: "Wärmepumpe",
      online: pool.value.status?.val,
      power: (pool.value.consumption?.val ?? 0) > 30,
    },
    {
      name: "Rasenmäher",
      online: landroid.value.online?.val,
      power: landroid.value.status?.val !== 1,
    },
  ];
});
</script>

<template>
  <Card styling="info">
    <CardHeader>
      <CardTitle>Geräte</CardTitle>

      <Button v-for="s in status" :key="s.name" variant="outlineDark">
        <div class="flex justify-between w-full items-center">
          <span class="text-sm">{{ s.name }}</span>

          <OnlineOffline :status="s.online" :power="s.power" />
        </div>
      </Button>
    </CardHeader>
  </Card>
</template>
