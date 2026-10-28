<script setup lang="ts">
import MetricValue from "@/components/shared/display/MetricValue.vue";
import SubscriptionProgress from "@/components/section/home/overview/SubscriptionProgress.vue";
import VisVersion from "@/components/section/iobroker/VisVersion.vue";
import OverviewTabContent from "@/components/section/home/overview/OverviewTabContent.vue";
import { DataCard } from "@/components/shared/card";
import { Progress } from "@/components/ui/progress";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { routes } from "@/router/routes.ts";
import { formatUptime, miBToGiB } from "@/lib/system.ts";

defineProps<{ value: string }>();
const { iobroker } = useIobrokerStore();

const system = computed(() => iobroker.system);
</script>

<template>
  <OverviewTabContent :value :to="routes.system.path" label="System">
    <div class="grid grid-cols-2 gap-2">
      <VisVersion />

      <DataCard title="Uptime">
        <MetricValue :val="formatUptime(system.iobrokerUptime.value)" />
      </DataCard>

      <DataCard title="RAM" content-class="space-y-1">
        <MetricValue v-bind="system.ramIobrokerLevel.valAndUnit" :decimal-places="0" />
        <p class="text-xs text-muted-foreground">{{ miBToGiB(system.ramIobrokerUsed.value) }} / {{ miBToGiB(system.ramIobrokerMax.value) }}</p>
        <Progress :model-value="system.ramIobrokerLevel.value" class="h-1.5" />
      </DataCard>

      <DataCard title="CPU" content-class="space-y-1">
        <MetricValue v-bind="system.cpuIobroker.valAndUnit" :decimal-places="0" />
        <Progress :model-value="system.cpuIobroker.value" class="h-1.5" />
      </DataCard>

      <DataCard title="Disk" content-class="space-y-1">
        <MetricValue v-bind="system.diskIobrokerUsage.valAndUnit" :decimal-places="0" />
        <Progress :model-value="system.diskIobrokerUsage.value" class="h-1.5" />
      </DataCard>
    </div>
    <div>
      <SubscriptionProgress />
    </div>
  </OverviewTabContent>
</template>
