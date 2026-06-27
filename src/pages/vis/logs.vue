<script setup lang="ts">
import { type Level } from "@/types/types.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed, onMounted, ref } from "vue";
import { Button } from "@/components/shared/button/button.variants";
import Badge from "@/components/shared/badge/Badge.vue";
import Page from "@/components/shared/page/Page.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import LogTable from "@/components/shared/table/LogTable.vue";

const { iobroker } = useIobrokerStore();

const selected = ref<Level>("error");
const errorLogs = computed(() => iobroker.logs.error.parsed([]));
const warningLogs = computed(() => iobroker.logs.warning.parsed([]));
const infoLogs = computed(() => iobroker.logs.info.parsed([]));
onMounted(() => {
  const error = errorLogs.value.length;
  const warn = warningLogs.value.length;
  if (error === 0 && warn > 0) {
    selected.value = "warn";
  }

  if (error === 0 && warn === 0) {
    selected.value = "info";
  }
});

async function reset() {
  await iobroker.logReset[selected.value].setState(true);
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
          <Badge :value="infoLogs.length" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
        <Button variant="warning" size="sm" class="w-24 relative" @click="selected = 'warn'">
          Warning
          <Badge :value="warningLogs.length" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
        <Button variant="destructive" size="sm" class="w-24 relative" @click="selected = 'error'">
          Error
          <Badge :value="errorLogs.length" class="absolute right-[0.1rem] top-[0.1rem]" />
        </Button>
      </div>
    </div>

    <CardSubcard class="overflow-auto mt-2">
      <LogTable :logs="selected === 'error' ? errorLogs : selected === 'warn' ? warningLogs : infoLogs" />
    </CardSubcard>
  </Page>
</template>
