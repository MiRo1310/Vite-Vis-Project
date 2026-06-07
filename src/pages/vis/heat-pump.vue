<script setup lang="ts">
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Button } from "@/components/shared/button/button.variants";
import { adminConnection } from "@/lib/iobroker-service.js";
import Page from "@/components/shared/page/Page.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import { Card, CardContent } from "@/components/shared/card";
import InfoCard from "@/components/shared/card/InfoCard.vue";
import { heatPumpValues } from "@/pages/vis/heat-pump.ts";
import { useToast } from "@/components/ui/toast";
import { getStoreValBoolean } from "@/lib/object.ts";
import LogTable from "@/components/shared/table/LogTable.vue";
import { toJSON } from "@michaelroling/ts-library";
import { computed } from "vue";

const { getParsedLogs, iobroker } = useIobrokerStore();
const { toast } = useToast();
function reset() {
  adminConnection?.setState("logparser.0.filters.Wärmepumpe.emptyJson", true, false);
}

async function toggleHeater() {
  checkAdminConnection();
  const id = iobroker.pool?.heaterState?.id;
  if (!id) {
    return;
  }
  await adminConnection?.setState(id, !getStoreValBoolean(iobroker.pool?.heaterState), false);
}

async function togglePump() {
  const id = iobroker.pool?.poolPumpSwitch?.id;
  if (!id) {
    return;
  }
  await adminConnection?.setState(id, !getStoreValBoolean(iobroker.pool?.poolPumpSwitch), false);
}

function checkAdminConnection() {
  if (!adminConnection) {
    toast({ title: "AdminConnection ist nicht vorhanden", variant: "destructive" });
    throw new Error("AdminConnection is nicht vorhanden");
  }
}
interface HeatingPumpScriptJson {
  carChargingRequest: boolean;
  surplus: number;
  heaterActive: boolean;
  surplusAboveThreshold: boolean;
  surplusBelowThreshold: boolean;
  delayOnRunning: boolean;
  delayOffRunning: boolean;
  delayOnRemainingSeconds: number;
  delayOffRemainingSeconds: number;
  cooldownRemainingSeconds: number;
  lastDeactivatedAt: string;
  nextActivationAllowedAt: string;
  scheduleEnabled: boolean;
  scheduleOnCron: string;
  scheduleOffCron: string;
  updatedAt: string;
}

const jsonData = computed(() => toJSON<HeatingPumpScriptJson>(iobroker.pool?.heaterScriptActivateJSON?.val ?? ""));
</script>

<template>
  <Page title="Logs">
    <div class="flex justify-between items-center flex-wrap gap-2 relative mb-2 mt-2">
      <p class="text-cardCustom-text">Wärmepumpe Logs</p>
    </div>
    <div class="flex gap-2">
      <Button class="mb-4" :class="iobroker.pool?.heaterState?.val ? 'border-green-400!' : 'border-destructive!'" @click="toggleHeater"
        >Wärmepumpe {{ iobroker.pool?.heaterState?.val ? "ausschalten" : "einschalten" }}</Button
      >

      <Button class="mb-4" :class="iobroker.pool?.poolPumpSwitch?.val ? 'border-green-400!' : 'border-destructive!'" @click="togglePump"
        >Poolpumpe {{ iobroker.pool?.poolPumpSwitch?.val ? "ausschalten" : "einschalten" }}</Button
      >
    </div>
    <Card styling="small" color="primary">
      <CardContent>
        <InfoCard v-for="(info, i) in [heatPumpValues]" :key="i" :infos="info" class="mt-2 first:mt-0" />
      </CardContent>
    </Card>
    <Button variant="outline" size="sm" class="mt-6" @click="reset"> Zurücksetzen </Button>
    <CardSubcard class="overflow-auto mt-2">
      <LogTable :logs="getParsedLogs.heatPump" />
    </CardSubcard>
  </Page>
</template>
