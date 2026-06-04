<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();

function miBToGiB(val?: number): string {
  return val ? (val / 1024).toFixed(2) + " GB" : "0 GB";
}
</script>

<template>
  <Page title="System">
    <div class="text-muted-foreground">
      <p>Ram Iobroker</p>
      <span>
        {{ iobroker.system?.ramIobrokerLevel?.val }} % (
        {{ miBToGiB(iobroker.system?.ramIobrokerUsed?.val) }}
        von
        {{ miBToGiB(iobroker.system?.ramIobrokerMax?.val) }})
      </span>

      <p class="mt-6">Speicher Iobroker</p>
      <span> {{ iobroker.system?.diskIobrokerUsage?.val }} % </span>

      <p class="mt-6">Iobroker Uptime</p>
      <span> {{ iobroker.system?.iobrokerUptime?.val }} </span>
    </div>
  </Page>
</template>
