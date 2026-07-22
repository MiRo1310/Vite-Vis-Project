<script setup lang="ts">
import IobrokerUpdates from "@/components/section/iobroker/IobrokerUpdates.vue";
import IobrokerNews from "@/components/section/iobroker/IobrokerNews.vue";
import Page from "@/components/shared/page/Page.vue";
import Button from "@/components/shared/button/Button.vue";
import { usePwaUpdateSingleton } from "@/composables/pwaUpdate.ts";
import VisVersion from "@/components/section/iobroker/VisVersion.vue";

const { applyUpdate, updateAvailable, updateTime } = usePwaUpdateSingleton;
</script>

<template>
  <Page title="IoBroker">
    <p class="text-xs text-muted-foreground mb-2">
      Um {{ updateTime.toLocaleTimeString() }} wird überprüft ob es ein neues Update für die Visualisierung gibt.
    </p>
    <Button v-if="updateAvailable" variant="blue" size="full" @click="applyUpdate" class="mb-2"
      >Update vorhanden !!! Klicke zum aktualisieren
    </Button>
    <Button v-else class="mb-2" variant="outline" @click="applyUpdate()">Seite neu laden</Button>

    <div class="flex flex-row flex-wrap gap-2 w-full mb-2">
      <Button @click="usePwaUpdateSingleton.applyUpdate()" class="h-20">Seite neu laden</Button>
      <VisVersion class="flex-1" />
    </div>
    <div class="flex flex-wrap gap-2">
      <IobrokerUpdates />
      <IobrokerNews />
    </div>
  </Page>
</template>
