<script setup lang="ts">
import { adminConnection } from "@/lib/iobroker-service.js";
import { ref, watchEffect } from "vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { StoreValue } from "@/store";
import Page from "@/components/shared/page/Page.vue";
import AlexaDotCard from "@/components/section/alexa/AlexaDotCard.vue";
import { toJSON, toJsonString } from "@michaelroling/ts-library";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { IobrokerSubscription } from "@/iobroker-states/states-subscribed/iobroker.iobroker.ts";

const { iobroker } = useIobrokerStore();

export interface AlexaDotAction {
  name: string;
  speak: string;
  bell?: boolean;
  bellVolume?: number;
  washer?: boolean;
  washerVolume?: number;
  tel?: boolean;
  telVolume?: number;
}

export interface AlexaAction {
  alexaSpeak: StoreValue<string>;
}

const alexaAction = {
  channel: "alexaAction",
  value: [{ id: "0_userdata.0.Alexa.Ausgaben_auf_Geräten", key: "alexaSpeak" }],
} satisfies IobrokerSubscription;

useDynamicSubscribe(alexaAction);

const loading = ref(false);
const alexaData = ref<AlexaDotAction[]>([]);

async function getAlexaEnum(): Promise<any[]> {
  const res = await adminConnection?.getObject("enum.functions.alexa");
  return res ? (res.common.members as string[]) : [];
}

const getAlexInfos = async (id: string): Promise<{ name: string | undefined; speak: string }> => {
  const res = await adminConnection?.getObject(id);
  return { name: res?.common.name, speak: `${res._id}.Commands.speak` };
};

async function loadAlexaObject() {
  const ids = await getAlexaEnum();

  if (ids) {
    for (const id of ids) {
      const { name, speak } = await getAlexInfos(id);
      if (!name) {
        continue;
      }
      let obj = { name, speak };
      const data = getMoreInfos(name);
      if (typeof data === "object") {
        obj = { ...obj, ...(data as object) };
      }
      alexaData.value.push(obj);
    }
  }
  loading.value = false;
}

const actions = ref();

function getMoreInfos(name: string) {
  const jsonResponse = toJSON(iobroker.alexaAction?.alexaSpeak?.val ?? null);
  const json = jsonResponse.json;
  if (!jsonResponse.isValidJson || !json) {
    return;
  }
  actions.value = json;
  if (typeof json === "object" && json[name as keyof typeof json]) {
    return json[name as keyof typeof json];
  }
  return;
}

watchEffect(() => {
  if (adminConnection && alexaData.value.length === 0) {
    loading.value = true;
    loadAlexaObject();
  }
});

function updateDot(dot: AlexaDotAction, source: string, value: boolean | number) {
  if (!actions.value) {
    actions.value = {};
  }
  if (!actions.value[dot.name]) {
    actions.value[dot.name] = {};
  }
  if (!actions.value[dot.name].speak) {
    actions.value[dot.name].speak = dot.speak;
  }
  actions.value[dot.name][source] = value;
  const id = iobroker.alexaAction?.alexaSpeak?.id;
  if (!id) {
    return;
  }
  adminConnection?.setState(id, toJsonString(actions.value), true);
}
</script>

<template>
  <Page title="Alexa Dots">
    <div v-if="loading" class="text-xs text-muted-foreground">Lädt…</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <AlexaDotCard
        v-for="dot in alexaData"
        :key="dot.name"
        :dot="dot"
        @update="(source, value) => updateDot(dot, source, value)"
      />
    </div>
  </Page>
</template>
