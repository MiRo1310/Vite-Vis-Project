<script setup lang="ts">
import { adminConnection } from "@/lib/iobroker-service.js";
import { ref, watchEffect } from "vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import Page from "@/components/shared/page/Page.vue";
import { toJSON, toJsonString } from "@michaelroling/ts-library";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { IobrokerSubscription } from "@/iobroker-states/subscribed-states.iobroker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { InputShadcn } from "@/components/ui/input";

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

function updateDot(dot: AlexaDotAction, source: keyof AlexaDotAction, value: boolean | number) {
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
  const dotInData = alexaData.value.find((d) => d.name === dot.name);
  if (dotInData) {
    (dotInData as Record<string, any>)[source] = value;
  }
  const id = iobroker.alexaAction?.alexaSpeak?.id;
  if (!id) {
    return;
  }
  adminConnection?.setState(id, toJsonString(actions.value), true);
}
</script>

<template>
  <Page title="Alexa Dots">
    <p v-if="loading" class="text-sm text-muted-foreground">Lade...</p>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-2">
      <Card v-for="dot in alexaData" :key="dot.name" class="py-0 gap-0">
        <CardHeader class="px-3 pt-2 pb-0">
          <div class="flex items-center gap-2">
            <img src="@/public/echo_dot3.png" alt="Echo Dot" class="w-8" />
            <CardTitle class="text-sm font-semibold">{{ dot.name }}</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="px-3 pt-2 pb-2 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted-foreground">Klingel</span>
            <div class="flex items-center gap-2">
              <Switch :checked="dot.bell ?? false" @update:checked="updateDot(dot, 'bell', $event)" />
              <InputShadcn
                type="number"
                :model-value="dot.bellVolume ?? 40"
                class="w-16 h-7 text-xs"
                :step="10"
                :min="0"
                :max="100"
                @update:model-value="updateDot(dot, 'bellVolume', Number($event))"
              />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted-foreground">Waschmaschine</span>
            <div class="flex items-center gap-2">
              <Switch :checked="dot.washer ?? false" @update:checked="updateDot(dot, 'washer', $event)" />
              <InputShadcn
                type="number"
                :model-value="dot.washerVolume ?? 40"
                class="w-16 h-7 text-xs"
                :step="10"
                :min="0"
                :max="100"
                @update:model-value="updateDot(dot, 'washerVolume', Number($event))"
              />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted-foreground">Telefon</span>
            <div class="flex items-center gap-2">
              <Switch :checked="dot.tel ?? false" @update:checked="updateDot(dot, 'tel', $event)" />
              <InputShadcn
                type="number"
                :model-value="dot.telVolume ?? 40"
                class="w-16 h-7! text-xs"
                :step="10"
                :min="0"
                :max="100"
                @update:model-value="updateDot(dot, 'telVolume', Number($event))"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </Page>
</template>
