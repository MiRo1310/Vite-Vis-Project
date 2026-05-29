<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { Card, CardContent } from "@/components/shared/card";
import { useTime } from "@/composables/time.ts";
import { computed } from "vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/iobroker-states/states-subscribed/info.iobroker";
import InfoUpdatesLogs from "@/components/section/home/InfoUpdatesLogs.vue";
import InfoCard, { InfoTypes } from "@/components/shared/card/InfoCard.vue";
import { useRouter } from "vue-router";
import { getOpenWindows } from "@/composables/windows.ts";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { getActiveLights } from "@/composables/lights.ts";
import { routes } from "@/router/routes.ts";
import { getStoreValBoolean, getStoreValNumber } from "@/lib/object.ts";
import { activeStatus } from "@/composables/status.ts";

const router = useRouter();

useDynamicSubscribe(infoStates);

const version = import.meta.env.VITE_APP_VERSION;

const ioBrokerStore = useIobrokerStore();
const { getParsedLogs, airConditioners, landroid } = ioBrokerStore;
const { infos: infoStore } = storeToRefs(ioBrokerStore);

const { hour } = useTime();
const isTimeToWarn = computed(() => {
  if (hour.value === null) {
    return false;
  }
  return hour.value >= 20 || hour.value <= 6;
});

const infos2 = computed((): InfoTypes[] => [
  {
    listing: [
      { title: "Klima Schlafen erreichbar", ...activeStatus.value(getStoreValBoolean(airConditioners.schlafenOnline)) },
      { title: "Klima Schlafen aktiv", ...activeStatus.value(getStoreValBoolean(airConditioners.schlafenPowerStatus)) },
      { title: "Klima Hannah erreichbar", ...activeStatus.value(getStoreValBoolean(airConditioners.childOnline)) },
      { title: "Klima Hannah aktiv", ...activeStatus.value(getStoreValBoolean(airConditioners.childPowerStatus)) },
    ],
  },
  {
    listing: [
      { title: "Rasenmäher erreichbar", ...activeStatus.value(getStoreValBoolean(landroid.online)) },
      { title: "Rasenmäher aktiv", ...activeStatus.value(getStoreValNumber(landroid.status) !== -1 && getStoreValBoolean(landroid.online)) },
    ],
  },
]);
</script>

<template>
  <Card styling="small" color="primary">
    <CardContent class="text-xs flex flex-col gap-2">
      <InfoCard :infos="{ listing: [{ title: 'Version', value: version }] }" />
      <InfoUpdatesLogs :info="infoStore" :get-parsed-logs="getParsedLogs" />

      <CardSubcard>
        <div
          :class="['flex justify-between cursor-pointer', { 'animate-bounce': isTimeToWarn && (getOpenWindows ?? 0) > 0 }]"
          @click="router.push({ name: routes.window.name })"
        >
          <p>{{ getOpenWindows ? "Fenster offen" : "Alle Fenster sind zu " }}</p>
          <div>
            <Badge :color="getOpenWindows === 0 ? 'green' : 'orange'" :value="getOpenWindows ?? ''" />
          </div>
        </div>
      </CardSubcard>
      <CardSubcard>
        <div :class="['flex justify-between cursor-pointer']" @click="router.push({ path: routes.light.path })">
          <p>{{ getActiveLights ? "Licht ist an" : "Licht ist aus" }}</p>
          <div>
            <Badge :color="getActiveLights === 0 ? 'green' : 'orange'" :value="getActiveLights ?? ''" />
          </div>
        </div>
      </CardSubcard>
      <InfoCard v-for="(info, i) in infos2" :key="i" :infos="info" />
    </CardContent>
  </Card>
</template>
