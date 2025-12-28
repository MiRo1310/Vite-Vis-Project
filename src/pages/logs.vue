<script setup lang="ts">
import { IdToSubscribe, Level, Log, LogReset } from "@/types/types.ts";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe";
import { onMounted, ref } from "vue";
import { Button } from "@/components/shared/button";
import { firstLetterToUpperCase } from "../lib/string.ts";
import { toLocaleTime } from "../lib/time.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import Badge from "@/components/shared/badge/Badge.vue";
import { storeToRefs } from "pinia";
import Page from "@/components/shared/page/Page.vue";

const { getParsedLogs } = useIobrokerStore();
const { logReset } = storeToRefs(useIobrokerStore());

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
    <div class="flex-between flex-wrap gap-2 relative">
      <p class="text-cardCustom-text">{{ firstLetterToUpperCase(selected) }} Logs</p>
      <div>
        <Button variant="outlineDark" size="sm" class="mr-5" @click="reset"> Zurücksetzen </Button>
        <Button variant="outlineDark" size="sm" class="w-24 relative ml-2" @click="selected = 'info'">
          Info
          <Badge :value="getParsedLogs.info?.length ?? 0" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
        <Button variant="warning" size="sm" class="w-24 relative ml-2" @click="selected = 'warn'">
          Warning
          <Badge :value="getParsedLogs.warn?.length ?? 0" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
        <Button variant="destructive" size="sm" class="w-24 relative ml-2" @click="selected = 'error'">
          Error
          <Badge :value="getParsedLogs.error?.length ?? 0" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
      </div>
    </div>

    <div class="content">
      <div v-if="!getParsedLogs[selected]?.length">Es sind keine Logs vorhanden</div>
      <div v-for="(log, index) in getParsedLogs[selected] as Log[]" :key="index" class="text-2xs">
        <span class="w-28 inline-block">{{ toLocaleTime(log.ts) }}</span>
        <span class="inline-block w-24">{{ log.from }}</span>
        {{ log.message }}
      </div>
    </div>
  </Page>
</template>

<style scoped lang="scss">
.content {
  @apply bg-cardCustom-info p-2 shadow-lg overflow-auto mt-2 text-cardCustom-text/70;
}
</style>
