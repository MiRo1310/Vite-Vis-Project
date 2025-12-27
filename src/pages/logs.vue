<script setup lang="ts">
import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe";
import { CardContent, CardHeader } from "@/components/shared/card";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import { computed, HTMLAttributes, onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { firstLetterToUpperCase } from "../lib/string.ts";
import { toLocaleTime } from "../lib/time.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import Badge from "@/components/shared/badge/Badge.vue";
import { storeToRefs } from "pinia";
import Page from "@/components/shared/page/Page.vue";

const { getParsedLogs } = useIobrokerStore();
const { logReset } = storeToRefs(useIobrokerStore());

export interface Log {
  date: string;
  severity: string;
  message: string;
  from: string;
  ts: number;
}

export interface LogReset {
  error: StoreValue<boolean>;
  warn: StoreValue<boolean>;
  info: StoreValue<boolean>;
}

const statesReset: IdToSubscribe<LogReset> = {
  storeFolder: "logReset",
  value: [
    { id: "logparser.0.filters.Error.emptyJson", key: "error" },
    { id: "logparser.0.filters.Info.emptyJson", key: "info" },
    { id: "logparser.0.filters.Warn.emptyJson", key: "warn" },
  ],
};

onMounted(() => {
  useDynamicSubscribe(statesReset);
});

interface Buttons {
  val: Level;
  label: string;
  class?: HTMLAttributes["class"];
  count: number | undefined;
}

export type Level = "info" | "warn" | "error";

const selected = ref<Level>("error");

onMounted(() => {
  const error = getParsedLogs.value.error?.length;
  const warn = getParsedLogs.value.warn?.length;
  if (error === 0 && warn > 0) {
    selected.value = "warn";
  }

  if (error === 0 && warn === 0) {
    selected.value = "info";
  }
});

const buttons = computed((): Buttons[] => {
  return [
    { val: "info", label: "Info", count: getParsedLogs.value.info?.length },
    {
      val: "warn",
      label: "Warning",
      class: "bg-amber-300",
      count: getParsedLogs.value.warn?.length,
    },
    {
      val: "error",
      label: "Error",
      class: "bg-destructive",
      count: getParsedLogs.value.error?.length,
    },
  ];
});

function reset() {
  const id = logReset.value[selected.value]?.id;
  if (!id) {
    return;
  }
  adminConnection?.setState(id, true, false);
}
</script>

<template>
  <Page title="Logs">
    <div class="relative">
      <CardHeader>
        <div class="flex-between flex-wrap space-x-2">
          <CardDescription>{{ firstLetterToUpperCase(selected) }} Logs </CardDescription>
          <div>
            <Button variant="outline" size="sm" class="mr-5" @click="reset"> Reset </Button>
            <Button
              v-for="button in buttons"
              :key="button.val"
              variant="outline"
              size="sm"
              :class="[button.class, 'w-24 relative ml-2']"
              @click="selected = button.val"
            >
              {{ button.label }}
              <Badge :value="button.count as number" class="absolute -right-1 -top-1" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent class="h-[86vh]">
        <div class="max-h-[86vh] overflow-auto default_card">
          <div v-if="!getParsedLogs[selected]?.length">Es sind keine Logs vorhanden</div>
          <div v-for="(log, index) in getParsedLogs[selected] as Log[]" :key="index" class="text-2xs">
            <span class="w-28 inline-block">{{ toLocaleTime(log.ts) }}</span>
            <span class="inline-block w-24">{{ log.from }}</span>
            {{ log.message }}
          </div>
        </div>
      </CardContent>
    </div>
  </Page>
</template>
