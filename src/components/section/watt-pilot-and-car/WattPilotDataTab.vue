<script setup lang="ts">
import { DataCard } from "@/components/shared/card";
import { TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { wpPricePerHundredKm } from "@/composables/wpElectricityPrices.ts";
import { type WattPilotJson } from "@/types/types.ts";
import MetricValue from "@/components/shared/display/MetricValue.vue";
import Surplus from "@/components/section/pv/Surplus.vue";
import { ChargingStatusEnum } from "@/enum/enum.ts";
import ButtonStringIobroker from "@/components/shared/button/ButtonStringIobroker.vue";
import { chargingModeOptions } from "@/lib/wattPilot.ts";
import SelectComponent from "@/components/shared/select/SelectComponent.vue";
import CarCharging from "@/components/section/watt-pilot-and-car/CarCharging.vue";
import WattPillotGridDrawAllowance from "@/components/section/watt-pilot-and-car/WattPillotGridDrawAllowance.vue";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import IobrokerSwitch from "@/components/shared/switch/IobrokerSwitch.vue";

const props = defineProps<{ value: string; data: WattPilotJson }>();

const { iobroker } = useIobrokerStore();

const modeLabel: Record<number, string> = {
  0: "Aus",
  1: "Eco",
  2: "Min+Eco",
  3: "Max",
};

const isAutoCharging = computed(() => iobroker.wattPilot.chargingMode.value === ChargingStatusEnum.AUTO);

const statusCards = computed((): Array<{ title: string; active?: boolean; text: string }> => {
  return [
    { title: "Laden", active: props.data.charging, text: props.data.charging ? "Aktiv" : "Inaktiv" },
    { title: "Überschussladen", active: isAutoCharging.value, text: isAutoCharging.value ? "Aktiv" : "Inaktiv" },
    { title: "Auto verbunden", active: props.data.carConnected, text: props.data.carConnected ? "Verbunden" : "Nicht verbunden" },
    {
      title: "Laden freigegeben",
      active: props.data.allowCharging,
      text: props.data.allowCharging ? "Freigegeben" : "Nicht freigegeben",
    },
    { title: "Modus", text: modeLabel[props.data.currentIndex] ?? `Index ${props.data.currentIndex}` },
    { title: "Phasen", text: `${props.data.phases ?? "–"}` },
    { title: "Stop-Gründe", text: props.data.stopReasons.length ? props.data.stopReasons.join(", ") : "–" },
    { title: "Preis pro 100 km", text: `${wpPricePerHundredKm.value} €/100km` },
  ];
});

const powerCards = computed((): Array<{ title: string; value: number | string; unit: string; valueClass?: string }> => {
  return [
    { title: "Ladeleistung", value: props.data.chargingPowerW ?? 0, unit: "W", valueClass: "text-green-400" },
    { title: "Strom", value: props.data.ampere ?? "–", unit: "A" },
    {
      title: "Netzbezug",
      value: props.data.gridPower > 0 ? 0 : -props.data.gridPower,
      unit: "W",
      valueClass: props.data.gridPower > 0 ? "" : "text-orange-300",
    },
  ];
});

const CHARGE_CURVE = {
  [ChargingStatusEnum["1P6A"]]: 1380,
  [ChargingStatusEnum["1P7A"]]: 1610,
  [ChargingStatusEnum["1P8A"]]: 1840,
  [ChargingStatusEnum["1P9A"]]: 2070,
  [ChargingStatusEnum["1P10A"]]: 2300,
  [ChargingStatusEnum["1P11A"]]: 2530,
  [ChargingStatusEnum["1P12A"]]: 2760,
  [ChargingStatusEnum["1P13A"]]: 2990,
  [ChargingStatusEnum["1P14A"]]: 3220,
  [ChargingStatusEnum["1P15A"]]: 3450,
  [ChargingStatusEnum["1P16A"]]: 3680,
  [ChargingStatusEnum["3P6A"]]: 4140,
  [ChargingStatusEnum["3P7A"]]: 4830,
  [ChargingStatusEnum["3P8A"]]: 5520,
  [ChargingStatusEnum["3P9A"]]: 6210,
  [ChargingStatusEnum["3P10A"]]: 6900,
  [ChargingStatusEnum["3P11A"]]: 7590,
  [ChargingStatusEnum["3P12A"]]: 8280,
  [ChargingStatusEnum["3P13A"]]: 8970,
  [ChargingStatusEnum["3P14A"]]: 9660,
  [ChargingStatusEnum["3P15A"]]: 10350,
  [ChargingStatusEnum["3P16A"]]: 11040,
};

const chargingModeItems = chargingModeOptions(ChargingStatusEnum, ["1P", "3P"], CHARGE_CURVE);

const selectedChargingMode = computed((): string => {
  const current = iobroker.wattPilot.chargingMode.value;
  if (chargingModeItems.some((item) => item.value === current)) {
    return current;
  }
  return "";
});

const setChargingMode = (value: string | undefined): void => {
  if (value) {
    iobroker.wattPilot.chargingMode.setState(value);
  }
};
</script>

<template>
  <TabsContent :value class="space-y-3">
    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Schalten</p>
    <div class="flex items-center flex-wrap gap-2">
      <ButtonStringIobroker
        class="capitalize min-w-17.5"
        active-border="success"
        :state="iobroker.wattPilot.chargingMode"
        :value="ChargingStatusEnum.AUTO"
        use-active
        >{{ ChargingStatusEnum.AUTO }}</ButtonStringIobroker
      >
      <ButtonStringIobroker
        class="capitalize min-w-17.5"
        active-border="success"
        :state="iobroker.wattPilot.chargingMode"
        :value="ChargingStatusEnum['3P16A']"
        use-active
        >Max ({{ CHARGE_CURVE[ChargingStatusEnum["3P16A"]] }} W)</ButtonStringIobroker
      >
      <ButtonStringIobroker
        class="capitalize min-w-17.5"
        active-border="danger"
        :state="iobroker.wattPilot.chargingMode"
        :value="ChargingStatusEnum.DISABLED"
        use-active
        >{{ ChargingStatusEnum.DISABLED }}</ButtonStringIobroker
      >

      <ButtonStringIobroker class="capitalize min-w-17.5" :state="iobroker.car.priority" :value="!iobroker.car.priority.value">
        {{ iobroker.car.priority.value ? "Hausbatterie als erstes laden" : "Autobatterie als erstes laden" }}
      </ButtonStringIobroker>
    </div>
    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Status</p>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <DataCard
        v-for="status in statusCards"
        :title="status.title"
        :key="status.title"
        :content-class="status.active !== undefined ? 'flex items-center gap-1.5' : undefined"
      >
        <StatusDot v-if="status.active !== undefined" :active="status.active" />
        <span class="text-sm font-semibold">{{ status.text }}</span>
      </DataCard>
    </div>

    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Leistung</p>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <DataCard v-for="power in powerCards" :title="power.title" :key="power.title">
        <span class="text-sm font-semibold" :class="power.valueClass">{{ power.value }}</span>
        <span class="text-xs text-muted-foreground ml-1">{{ power.unit }}</span>
      </DataCard>
      <DataCard title="Netzbezug-Freigabe genutzt" content-class="space-y-1.5">
        <div>
          <span class="text-sm font-semibold">{{ data.gridDrawAllowanceUsedPercent }} </span>
          <span class="text-xs text-muted-foreground ml-1">% / </span>
          <span class="text-sm font-semibold"> {{ iobroker.wattPilot.gridDrawAllowanceWatt.value }} </span>
          <span class="text-xs text-muted-foreground ml-1"> {{ iobroker.wattPilot.gridDrawAllowanceWatt.unit }} </span>
        </div>
        <Progress :model-value="Math.min(Math.max(data.gridDrawAllowanceUsedPercent ?? 0, 0), 100)" class="h-1.5" />
      </DataCard>
      <Surplus />
    </div>
    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Auto</p>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <DataCard title="Batterie Ladestatus">
        <MetricValue :number-value="iobroker.car.battery" />
      </DataCard>
      <DataCard title="Geschätzte Restladedauer">
        <CarCharging :data />
      </DataCard>
      <DataCard title="Batterie Ladeziel Standard">
        <MetricValue :number-value="iobroker.car.batteryStandardTarget" />
      </DataCard>
      <DataCard title="Batterie Ladeziel schnell">
        <MetricValue :number-value="iobroker.car.batteryQuickTarget" />
      </DataCard>
    </div>
    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Einstellungen</p>

    <WattPillotGridDrawAllowance />

    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Laden mit Stromstärke</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <DataCard title="Stromstärke" content-class="pt-1.5">
        <SelectComponent
          :model-value="selectedChargingMode"
          :items="chargingModeItems"
          placeholder="Stromstärke wählen"
          :class="['w-full', !iobroker.wattPilot.chargingMode.ack ? 'border-red-500!' : selectedChargingMode ? 'border-orange-500!' : '']"
          @update:model-value="setChargingMode($event)"
        />
      </DataCard>
      <DataCard title="Ladegrenze mit Netzbezug" content-class="pt-1.5 space-y-2">
        <div class="flex items-center gap-2">
          <InputIobroker :state="iobroker.wattPilot.targetChargeSoc" unit="%" class="w-24 shrink-0" />
          <span class="text-xs text-muted-foreground">Bis zu dieser Grenze laden, danach auf Auto wechseln</span>
        </div>
        <div class="flex items-center gap-2">
          <IobrokerSwitch :state="iobroker.wattPilot.targetChargeActive" :label="`Grenzladung ${iobroker.wattPilot.targetChargeActive.mapped}`" />
        </div>
      </DataCard>
    </div>
  </TabsContent>
</template>
