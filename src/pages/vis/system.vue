<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatUptime, miBToGiB } from "@/lib/system";

const { iobroker } = useIobrokerStore();
</script>

<template>
  <Page title="System">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <!-- RAM -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            RAM ioBroker
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="flex items-end justify-between">
            <span class="text-3xl font-bold">
              {{ iobroker.system?.ramIobrokerLevel?.val ?? 0 }}
              <span class="text-lg font-normal text-muted-foreground">%</span>
            </span>
            <span class="text-sm text-muted-foreground">
              {{ miBToGiB(iobroker.system?.ramIobrokerUsed?.val) }} /
              {{ miBToGiB(iobroker.system?.ramIobrokerMax?.val) }}
            </span>
          </div>
          <Progress :model-value="iobroker.system?.ramIobrokerLevel?.val ?? 0" />
        </CardContent>
      </Card>

      <!-- Disk -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            Speicher ioBroker
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="flex items-end justify-between">
            <span class="text-3xl font-bold">
              {{ iobroker.system?.diskIobrokerUsage?.val ?? 0 }}
              <span class="text-lg font-normal text-muted-foreground">%</span>
            </span>
          </div>
          <Progress :model-value="iobroker.system?.diskIobrokerUsage?.val ?? 0" />
        </CardContent>
      </Card>

      <!-- Uptime -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            ioBroker Uptime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span class="text-3xl font-bold">
            {{ formatUptime(iobroker.system?.iobrokerUptime?.val) }}
          </span>
        </CardContent>
      </Card>
    </div>
  </Page>
</template>