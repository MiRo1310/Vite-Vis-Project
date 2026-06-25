<script setup lang="ts">
import { Level } from "@/types/types.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { onMounted, ref } from "vue";
import { Button } from "@/components/shared/button/button.variants";
import Badge from "@/components/shared/badge/Badge.vue";
import Page from "@/components/shared/page/Page.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import LogTable from "@/components/shared/table/LogTable.vue";

const { getParsedLogs, iobroker } = useIobrokerStore();

const selected = ref<Level>("error");

onMounted(() => {
  const error = getParsedLogs.error.length;
  const warn = getParsedLogs.warn.length;
  if (error === 0 && warn > 0) {
    selected.value = "warn";
  }

  if (error === 0 && warn === 0) {
    selected.value = "info";
  }
});

function reset() {
  iobroker.logReset?.[selected.value].setState(true);
}
</script>

<template>
  <Page title="Logs">
    <div class="flex justify-between items-center flex-wrap gap-2 relative">
      <p class="text-cardCustom-text">{{ selected.mrFirstLetterToUpperCase() }} Logs</p>
      <div class="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" class="mr-5" @click="reset"> Zurücksetzen </Button>
        <Button variant="outline" size="sm" class="w-24 relative" @click="selected = 'info'">
          Info
          <Badge :value="getParsedLogs.info?.length ?? 0" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
        <Button variant="warning" size="sm" class="w-24 relative" @click="selected = 'warn'">
          Warning
          <Badge :value="getParsedLogs.warn?.length ?? 0" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
        <Button variant="destructive" size="sm" class="w-24 relative" @click="selected = 'error'">
          Error
          <Badge :value="getParsedLogs.error?.length ?? 0" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
      </div>
    </div>

    <CardSubcard class="overflow-auto mt-2">
      <LogTable :logs="getParsedLogs[selected]" />
    </CardSubcard>
  </Page>
</template>
