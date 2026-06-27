<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { routes } from "@/router/routes.ts";
import { DataCard } from "@/components/shared/card";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <RouterLink :to="routes.tanker_koenig.path">
    <DataCard title="Günstigster Sprit" class="cursor-pointer hover:bg-accent transition-colors" content-class="space-y-0.5">
      <div class="flex items-baseline gap-1">
        <span class="text-sm font-semibold">{{ iobroker.tankerKoenig.cheapestPrice.value }}</span>
        <span class="text-xs text-muted-foreground">€</span>
      </div>
      <p class="text-xs text-muted-foreground truncate">{{ iobroker.tankerKoenig.cheapestName.value }}</p>
      <p class="text-xs text-muted-foreground truncate">{{ iobroker.tankerKoenig.cheapestFullStreet.value }}</p>
      <p v-if="iobroker.tankerKoenig.cheapestPrice?.ts" class="text-xs text-muted-foreground">
        {{ new Date(iobroker.tankerKoenig.cheapestPrice?.ts).toLocaleString() }}
      </p>
    </DataCard>
  </RouterLink>
</template>
