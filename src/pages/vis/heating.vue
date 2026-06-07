<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import HeatingCharts from "@/components/section/heating/HeatingCharts.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataCard } from "@/components/shared/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { Button } from "@/components/shared/button/button.variants";
import { routes } from "@/router/routes.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();
const heating = computed(() => iobroker.heating);
</script>

<template>
  <Page title="Heizung">
    <template #header>
      <RouterLink :to="routes.heatingControl.path">
        <Button variant="outline" size="sm">Steuerung</Button>
      </RouterLink>
    </template>

    <Tabs default-value="daten">
      <TabsList class="mb-3">
        <TabsTrigger value="daten">Daten</TabsTrigger>
        <TabsTrigger value="diagramme">Diagramme</TabsTrigger>
      </TabsList>

      <!-- Tab: Daten -->
      <TabsContent value="daten" class="space-y-3">

        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Status</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard title="Automatik" content-class="flex items-center gap-1.5">
            <StatusDot :active="getStoreValBoolean(heating?.automatic)" />
            <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.automatic) ? "An" : "Aus" }}</span>
          </DataCard>
          <DataCard title="Heizung aktiv" content-class="flex items-center gap-1.5">
            <StatusDot :active="getStoreValBoolean(heating?.active)" />
            <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.active) ? "An" : "Aus" }}</span>
          </DataCard>
          <DataCard title="Brennstoff" content-class="flex items-center gap-1.5">
            <StatusDot :active="getStoreValBoolean(heating?.level)" />
            <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.level) ? "Ok" : "Leer" }}</span>
          </DataCard>
          <DataCard title="Solar Auto" content-class="flex items-center gap-1.5">
            <StatusDot :active="getStoreValBoolean(heating?.autoSolar)" />
            <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.autoSolar) ? "An" : "Aus" }}</span>
          </DataCard>
        </div>

        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Temperaturen</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard title="Heizung">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.heatingTemperature).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Solar">
            <span class="text-sm font-semibold text-orange-300">{{ getStoreValNumber(heating?.heatingSolar).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Puffer oben">
            <span class="text-sm font-semibold text-orange-300">{{ getStoreValNumber(heating?.heatingBufferTop).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Puffer mitte">
            <span class="text-sm font-semibold text-orange-300">{{ getStoreValNumber(heating?.heatingBufferMiddle).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Puffer unten">
            <span class="text-sm font-semibold text-blue-300">{{ getStoreValNumber(heating?.heatingBuffer).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Solar Max heute">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.solarMaxToday).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Solar Max">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.solarMax).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
        </div>

        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Motoren / Pumpen</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard title="Schnecke" content-class="flex items-center gap-1.5">
            <StatusDot :active="getStoreValBoolean(heating?.snail)" />
            <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.snail) ? "An" : "Aus" }}</span>
          </DataCard>
          <DataCard title="Förderspirale" content-class="flex items-center gap-1.5">
            <StatusDot :active="getStoreValBoolean(heating?.spiral)" />
            <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.spiral) ? "An" : "Aus" }}</span>
          </DataCard>
          <DataCard title="Pumpe Solar" content-class="flex items-center gap-1.5">
            <StatusDot :active="getStoreValBoolean(heating?.solarPump)" />
            <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.solarPump) ? "An" : "Aus" }}</span>
          </DataCard>
          <DataCard title="Heizung Zusatz" content-class="flex items-center gap-1.5">
            <StatusDot :active="getStoreValBoolean(heating?.heatingPump)" />
            <span class="text-sm font-semibold">{{ getStoreValBoolean(heating?.heatingPump) ? "An" : "Aus" }}</span>
          </DataCard>
        </div>

        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Warnungen</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard title="Brennstoff" content-class="flex items-center gap-1.5">
            <StatusDot :active="!getStoreValBoolean(heating?.pelletExist)" />
            <span class="text-sm font-semibold">{{ !getStoreValBoolean(heating?.pelletExist) ? "Ok" : "Fehler" }}</span>
          </DataCard>
          <DataCard title="Zugeber" content-class="flex items-center gap-1.5">
            <StatusDot :active="!getStoreValBoolean(heating?.watcherAdmitter)" />
            <span class="text-sm font-semibold">{{ !getStoreValBoolean(heating?.watcherAdmitter) ? "Ok" : "Fehler" }}</span>
          </DataCard>
          <DataCard title="Behälter" content-class="flex items-center gap-1.5">
            <StatusDot :active="!getStoreValBoolean(heating?.tempPelletBuffer)" />
            <span class="text-sm font-semibold">{{ !getStoreValBoolean(heating?.tempPelletBuffer) ? "Ok" : "Fehler" }}</span>
          </DataCard>
          <DataCard title="Meldung quit." content-class="flex items-center gap-1.5">
            <StatusDot :active="!getStoreValBoolean(heating?.confirmMessage)" />
            <span class="text-sm font-semibold">{{ !getStoreValBoolean(heating?.confirmMessage) ? "Ok" : "Offen" }}</span>
          </DataCard>
        </div>

        <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Einstellungen</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <DataCard title="Max. Befüllzeit">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.maxTimeToFill) }}</span>
            <span class="text-xs text-muted-foreground ml-1">s</span>
          </DataCard>
          <DataCard title="Nachlauf Spirale">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.offsetFilling) }}</span>
            <span class="text-xs text-muted-foreground ml-1">s</span>
          </DataCard>
          <DataCard title="Pumpe an ab">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.tempPumpOn).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Pumpe aus ab">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.tempPumpOff).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Diff. Solar/Puffer">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.diffSolarBuffer).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Min. Solar temp.">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.minFillTemp).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
          <DataCard title="Max. Puffer temp.">
            <span class="text-sm font-semibold">{{ getStoreValNumber(heating?.maxFillTemp).toFixed(1) }}</span>
            <span class="text-xs text-muted-foreground ml-1">°C</span>
          </DataCard>
        </div>

      </TabsContent>

      <!-- Tab: Diagramme -->
      <TabsContent value="diagramme" class="space-y-3">
        <iframe
          src="http://192.168.1.4:3000/d-solo/feobdyuntkhs0d/temperaturen?orgId=1&refresh=30s&panelId=1"
          width="100%"
          height="400"
          class="rounded-xl border"
        />
        <HeatingCharts />
      </TabsContent>
    </Tabs>
  </Page>
</template>
