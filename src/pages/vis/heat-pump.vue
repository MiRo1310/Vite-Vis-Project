<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Button } from "@/components/shared/button/button.variants";
import { toLocaleTime } from "@/lib/time.ts";
import { adminConnection } from "@/lib/iobroker-service.js";
import Page from "@/components/shared/page/Page.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import { Card, CardContent } from "@/components/shared/card";
import InfoCard from "@/components/shared/card/InfoCard.vue";
import { heatPumpValues } from "@/pages/vis/heat-pump.ts";

const { getParsedLogs } = useIobrokerStore();

function reset() {
  adminConnection?.setState("logparser.0.filters.Wärmepumpe.emptyJson", true, false);
}
</script>

<template>
  <Page title="Logs">
    <div class="flex justify-between items-center flex-wrap gap-2 relative">
      <p class="text-cardCustom-text">Wärmepumpe Logs</p>

      <Button variant="outline" size="sm" @click="reset"> Zurücksetzen </Button>
    </div>
    <Card styling="small" color="primary">
      <CardContent>
        <InfoCard v-for="(info, i) in [heatPumpValues]" :key="i" :infos="info" class="mt-2 first:mt-0" />
      </CardContent>
    </Card>
    <CardSubcard class="overflow-auto mt-2">
      <div v-if="!getParsedLogs.heatPump?.length">Es sind keine Logs vorhanden</div>
      <div v-for="(log, index) in getParsedLogs.heatPump" :key="index" class="text-2xs w-200">
        <span class="w-28 inline-block">{{ toLocaleTime(log.ts) }}</span>
        <span class="inline-block w-24">{{ log.from }}</span>
        {{ log.message }}
      </div>
    </CardSubcard>
  </Page>
</template>
