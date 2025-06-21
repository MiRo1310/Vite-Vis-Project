<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { ref, watchEffect } from "vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import TableAlexaName from "@/components/section/alexa/tableAlexaName.vue";
import TableSwitch from "@/components/shared/table-cell/TableSwitch.vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore.ts";
import { JSONToString, stringToJSON } from "@/lib/string.ts";
import TableNumberInput from "@/components/shared/table-cell/TableNumberInput.vue";

const { alexaAction: alexaActionStore } = useIobrokerStore();

export interface AlexaDotAction {
  name: string;
}

export interface AlexaAction {
  alexaSpeak: StoreValue<string>;
}

const alexaAction: IdToSubscribe<AlexaAction> = {
  storeFolder: "alexaAction",
  value: [{ id: "0_userdata.0.Alexa.Ausgaben_auf_Geräten", key: "alexaSpeak" }],
};

useDynamicSubscribe(alexaAction);

const loading = ref(false);
const alexaNames = ref<AlexaDotAction[]>([]);

async function getAlexaEnum(): Promise<any[]> {
  const res = await adminConnection?.getObject("enum.functions.alexa");
  return res ? (res.common.members as string[]) : [];
}

const getAlexInfos = async (id: string) => {
  const res = await adminConnection?.getObject(id);
  return { name: res?.common.name, speak: `${res._id}.Commands.speak` };
};

async function loadAlexaObject() {
  const ids = await getAlexaEnum();

  if (ids) {
    for (const id of ids) {
      const { name, speak } = await getAlexInfos(id);
      if (!name) continue;
      let obj = { name, speak };
      const data = getMoreInfos(name);
      if (typeof data === "object") {
        obj = { ...obj, ...(data as object) };
      }
      alexaNames.value.push(obj);
    }
  }
  loading.value = false;
}

const actions = ref();

function getMoreInfos(name: string) {
  const obj = stringToJSON(alexaActionStore.alexaSpeak?.val);
  if (!obj) return;
  actions.value = obj;
  if (typeof obj === "object" && obj[name as keyof typeof obj]) return obj[name as keyof typeof obj];
  return;
}

watchEffect(() => {
  if (adminConnection && alexaNames.value.length === 0) {
    loading.value = true;
    loadAlexaObject();
  }
});

function callback(params: Record<string, any>) {
  const name: keyof typeof actions.value = params.row.original.name;
  const speak: keyof typeof actions.value = params.row.original.speak;
  if (!actions.value?.[name]) {
    actions.value[name] = {};
  }
  if (!actions.value[name]?.speak) {
    actions.value[name].speak = speak;
  }
  actions.value[name][params.source] = params.checked || params.value;
  const id = alexaActionStore.alexaSpeak?.id;
  if (!id) return;
  adminConnection?.setState(id, JSONToString(actions.value), true);
}

const columns: DatatableColumns[] = [
  {
    source: "name",
    type: "component",
    component: TableAlexaName,
    accessorKey: "name",
    labelKey: "Echo Dot",
  },
  {
    source: "bell",
    type: "component",
    component: TableSwitch,
    accessorKey: "bell",
    labelKey: "Klingel",
    callback,
  },
  {
    source: "bellVolume",
    type: "component",
    component: TableNumberInput,
    accessorKey: "bellVolume",
    labelKey: "Klingel Lautstärke",
    customValue: { step: 10, min: 0, max: 100, defaultValue: 40 },
    callback,
  },
  {
    source: "washer",
    type: "component",
    component: TableSwitch,
    accessorKey: "washer",
    labelKey: "Waschmaschine",
    callback,
  },
  {
    source: "washerVolume",
    type: "component",
    component: TableNumberInput,
    accessorKey: "washerVolume",
    labelKey: "Waschmaschine Lautstärke",
    customValue: { step: 10, min: 0, max: 100, defaultValue: 40 },
    callback,
  },
  {
    source: "tel",
    type: "component",
    component: TableSwitch,
    accessorKey: "tel",
    labelKey: "Telefon",
    callback,
  },
  {
    source: "telVolume",
    type: "component",
    component: TableNumberInput,
    accessorKey: "telVolume",
    labelKey: "Telefon Laustärke",
    customValue: { step: 10, min: 0, max: 100, defaultValue: 40 },
    callback,
  },
];
</script>

<template>
  <Card styling="light" class="h-full">
    <CardHeader>
      <CardTitle>
        <p>Alexa Dots</p>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="default_card">
        <TableBasic v-if="!loading" :columns="getColumns(columns)" :data="alexaNames" />
      </div>
    </CardContent>
  </Card>
</template>
