<script setup lang="ts">
import { IdToSubscribe } from "@/types";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toLocaleTime } from "@/lib/time";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import { computed, ref } from "vue";
import { Button } from "@/components/ui/button";

export interface LogStates {
  error: StoreValue<string>;
  warning: StoreValue<string>;
  info: StoreValue<string>;
}

interface Log {
  date: string;
  severity: string;
  message: string;
  from: string;
  ts: number;
}

const states: IdToSubscribe<LogStates>[] = [
  {
    objectNameInStore: "logs",
    value: [
      { id: "logparser.0.filters.Error.json", firstKey: "error" },
      { id: "logparser.0.filters.Info.json", firstKey: "info" },
      { id: "logparser.0.filters.Warn.json", firstKey: "warning" }
    ]
  }
];

useDynamicSubscribe(states);

const parsedLogs = computed(() => {
  try {
    return {
      error: JSON.parse(logs.error.val) as Log[],
      warning: JSON.parse(logs.warning.val) as Log[],
      info: JSON.parse(logs.info.val) as Log[]
    };
  } catch (e) {
    return {
      error: [],
      warning: [],
      info: []
    };
  }
});

const { logs } = useIobrokerStore();
const selected = ref<"info" | "warning" | "error">("info");
</script>
<template>
  <div class="pt-2 mr-2 relative">
    <Card>
      <CardHeader>
        <CardTitle>Logs</CardTitle>
        <CardDescription>{{ selected }} Logs</CardDescription>
        <div class="flex flex-wrap space-x-2 absolute right-6">
          <Button variant="outline" size="sm" @click="selected='info'">
            Info
          </Button>
          <Button variant="outline" size="sm" @click="selected='warning'">
            Warning
          </Button>
          <Button variant="outline" size="sm" @click="selected = 'error'">
            Error
          </Button>
        </div>
      </CardHeader>
      <CardContent class="max-h-[86vh] ">
        <div class="max-h-[86vh] overflow-auto  ">
          <div v-for="(log, index) in parsedLogs[selected] as Log[]" :key="index" class="text-2xs">
            {{ toLocaleTime(log.ts) }} {{ log.from }} {{ log.message }}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
