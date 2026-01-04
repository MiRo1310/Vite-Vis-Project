<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { Button } from "@/components/ui/button";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { storeToRefs } from "pinia";

defineProps<{ class: string }>();

const { heatingControl } = storeToRefs(useIobrokerStore());

function resetStatus() {
  const id = `heatingcontrol.0.Rooms.${heatingControl.value.room?.val}.ResetManual`;
  if (id) {
    adminConnection?.setState(id, true, false);
  }
}
</script>
<template>
  <div :class="['bg-cardSubcard/30 border inline-block p-2 w-full relative', $props.class]">
    <div>
      <p>{{ heatingControl.room?.val }}</p>
      <p class="flex mt-2">
        <span class="w-36"> Temperatur am Regler </span>
        <span class="flex flex-1 justify-between ml-4">
          <span>{{ heatingControl.tempRegler1?.val }} °C</span>
          <span v-if="heatingControl.tempRegler2?.val !== -1"> {{ heatingControl.tempRegler2?.val }} °C</span>
        </span>
      </p>
      <p class="flex">
        <span class="inline-block w-36"> Ventilstellung </span>
        <span class="flex flex-1 justify-between ml-4">
          <span>{{ heatingControl.ventil1?.val }} %</span>
          <span v-if="heatingControl.ventil2?.val !== -1">{{ heatingControl.ventil2?.val }} %</span>
        </span>
      </p>
    </div>

    <p class="absolute border-2 border-blue-600 top-2 right-2 px-1">{{ heatingControl.sollTemp1?.val }}°C</p>

    <Button class="w-full my-2" @click="resetStatus"> Aktueller Status: {{ heatingControl.roomState?.val }} </Button>

    <div class="text-xs border-2 p-1 overflow-auto h-84" v-html="heatingControl.statusRoom?.val" />
  </div>
</template>
