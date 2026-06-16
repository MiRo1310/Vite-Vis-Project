<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import { DataCard, ToggleCard } from "@/components/shared/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { toJSON } from "@michaelroling/ts-library";
import { computed } from "vue";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { adminConnection } from "@/lib/iobroker-service.ts";
import Date from "@/components/shared/date-time/Date.vue";

const { iobroker } = useIobrokerStore();

interface WattPilotJson {
  charging: boolean;
  carConnected: boolean;
  allowCharging: boolean;
  aktuellerIndex: number;
  ampere: number | null;
  einphasig: boolean | null;
  phasen: number | null;
  ladeleistungW: number | null;
  gridPower: number | null;
  ueberschuss: number | null;
  updatedAt: string;
}

const data = computed(() => toJSON<WattPilotJson>(iobroker.wattPilot?.jsonScriptChargeLevel?.val ?? "").json);

const modeLabel: Record<number, string> = {
  0: "Aus",
  1: "Eco",
  2: "Min+Eco",
  3: "Max",
};

const toggleAutoCharging = () => {
  const autoCharging = iobroker.wattPilot?.autoCharging;
  if (!autoCharging) {
    return;
  }
  adminConnection?.setState(autoCharging.id, !autoCharging.val, true);
};

const setPhase = (onePhase: boolean) => {
  adminConnection?.setState("fronius-wattpilot.0.set_state", onePhase ? "psm;1" : "psm;2", true);
};
</script>

<template>
  <Page title="Wallbox">
    <div class="space-y-3 mt-4">
      <div class="flex items-center flex-wrap gap-2">
        <ToggleCard
          title="Wallbox Überschussladen"
          class="flex-1"
          :active="getStoreValBoolean(iobroker.wattPilot?.autoCharging)"
          @click="toggleAutoCharging"
        />
        <ToggleCard title="Einphasig laden" class="flex-1" :active="!!data?.einphasig" @click="setPhase(true)" />
        <ToggleCard title="Mehrphasig laden" class="flex-1" :active="!data?.einphasig" @click="setPhase(false)" />
      </div>
      <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Status</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <DataCard title="Laden" content-class="flex items-center gap-1.5">
          <StatusDot :active="data?.charging ?? false" />
          <span class="text-sm font-semibold">{{ data?.charging ? "Aktiv" : "Inaktiv" }}</span>
        </DataCard>
        <DataCard title="Auto verbunden" content-class="flex items-center gap-1.5">
          <StatusDot :active="data?.carConnected ?? false" />
          <span class="text-sm font-semibold">{{ data?.carConnected ? "Verbunden" : "Nicht verbunden" }}</span>
        </DataCard>
        <DataCard title="Laden freigegeben" content-class="flex items-center gap-1.5">
          <StatusDot :active="data?.allowCharging ?? false" />
          <span class="text-sm font-semibold">{{ data?.allowCharging ? "Freigegeben" : "Nicht freigegeben" }}</span>
        </DataCard>
        <DataCard title="Modus">
          <span class="text-sm font-semibold">{{ data != null ? (modeLabel[data.aktuellerIndex] ?? `Index ${data.aktuellerIndex}`) : "–" }}</span>
        </DataCard>
        <DataCard title="Phasen">
          <span class="text-sm font-semibold">{{ data?.phasen ?? "–" }}</span>
        </DataCard>
        <DataCard title="Einphasig" content-class="flex items-center gap-1.5">
          <StatusDot :active="data?.einphasig ?? false" />
          <span class="text-sm font-semibold">{{ data?.einphasig ? "Ja" : "Nein" }}</span>
        </DataCard>
      </div>

      <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Leistung</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <DataCard title="Ladeleistung">
          <span class="text-sm font-semibold text-green-400">{{ data?.ladeleistungW ?? 0 }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
        <DataCard title="Strom">
          <span class="text-sm font-semibold">{{ data?.ampere ?? "–" }}</span>
          <span class="text-xs text-muted-foreground ml-1">A</span>
        </DataCard>
        <DataCard title="Netzbezug">
          <span class="text-sm font-semibold" :class="(data?.gridPower ?? 0) > 0 ? 'text-destructive' : 'text-green-400'">
            {{ data?.gridPower ?? 0 }}
          </span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
        <DataCard title="Überschuss">
          <span class="text-sm font-semibold text-orange-300">{{ data?.ueberschuss ?? 0 }}</span>
          <span class="text-xs text-muted-foreground ml-1">W</span>
        </DataCard>
      </div>
      <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Werte</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <DataCard title="Ladeleistung">
          <span class="text-sm font-semibold">{{ getStoreValNumber(iobroker.wattPilot?.totalCharging) / 1000 }}</span>
          <span class="text-xs text-muted-foreground ml-1">KW</span>
        </DataCard>
        <DataCard title="Ladeleistung">
          <span class="text-sm font-semibold">{{ (getStoreValNumber(iobroker.wattPilot?.totalCharging) / 1000) * 0.32 }}</span>
          <span class="text-xs text-muted-foreground ml-1">€</span>
        </DataCard>
      </div>

      <p v-if="data?.updatedAt" class="text-xs text-muted-foreground">Aktualisiert: <Date :date="data.updatedAt" /></p>
    </div>
  </Page>
</template>
