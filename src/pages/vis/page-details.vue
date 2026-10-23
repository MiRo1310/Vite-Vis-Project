<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import Button from "@/components/shared/button/Button.vue";
import { usePwaUpdateSingleton } from "@/composables/pwaUpdate.ts";
import VisVersion from "@/components/section/iobroker/VisVersion.vue";
import { ref } from "vue";
import { typedStorage } from "@/lib/local-storage.ts";

const { applyUpdate, updateAvailable, updateTime } = usePwaUpdateSingleton;

const autoUpdate = ref(typedStorage.getItem("autoUpdate"));

function toggleAutoUpdate() {
  autoUpdate.value = !autoUpdate.value;
  typedStorage.setItem("autoUpdate", autoUpdate.value);
}
</script>

<template>
  <Page title="IoBroker">
    <p class="text-xs text-muted-foreground mb-2">
      Um {{ updateTime.toLocaleTimeString() }} wird überprüft ob es ein neues Update für die Visualisierung gibt.
    </p>

    <Button v-if="updateAvailable" variant="blue" size="full" @click="applyUpdate" class="mb-2"
      >Update vorhanden !!! Klicke zum aktualisieren
    </Button>

    <div class="flex flex-row flex-wrap gap-2 w-full mb-2">
      <Button :class="['h-20 w-48', { 'border-red-400!': !autoUpdate }]" @click="toggleAutoUpdate">{{
        autoUpdate ? "Auto update ist aktiv" : "Auto update ist deaktiviert"
      }}</Button>
      <Button @click="applyUpdate()" class="h-20">Seite neu laden</Button>
      <VisVersion class="min-w-48" />
    </div>
  </Page>
</template>
