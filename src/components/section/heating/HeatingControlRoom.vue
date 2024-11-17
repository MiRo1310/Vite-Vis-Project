<script lang="ts" setup>
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { Button } from "@/components/ui/button";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker.ts";
import { storeToRefs } from "pinia";

defineProps<{ class: string }>();

const { heating } = storeToRefs(useIobrokerStore());
</script>
<template>
  <div :class="['inline-block p-1 w-full relative', $props.class]">
    <div>
      <p>{{ heating.heatingControl.room?.val }}</p>
      <p class="flex mt-2">
        <span class="w-36"> Temperatur am Regler </span>
        <span class="flex flex-1 justify-between ml-4">
          <span>{{ heating.heatingControl.tempRegler1?.val }} °C</span>
          <span v-if="heating.heatingControl.tempRegler2?.val !== -1">
            {{ heating.heatingControl.tempRegler2?.val }} °C</span>
        </span>
      </p>
      <p class="flex">
        <span class="inline-block w-36"> Ventilstellung </span>
        <span class="flex flex-1 justify-between ml-4">
          <span>{{ heating.heatingControl.ventil1?.val }} %</span>
          <span v-if="heating.heatingControl.ventil2?.val !== -1">{{ heating.heatingControl.ventil2?.val }}
            %</span>
        </span>
      </p>
    </div>

    <p class="absolute border-2 border-blue-600 top-2 right-2 px-1">
      {{ heating.heatingControl.sollTemp1?.val }}°C
    </p>

    <Button
      class="w-full my-2"
      @click="heating.heatingControl.resetButton?.id?adminConnection?.setState(heating.heatingControl.resetButton.id, true):null"
    >
      Aktueller Status: {{
        heating.heatingControl.roomState?.val }}
    </Button>

    <div class="text-xs border-2 p-1 overflow-auto h-[21rem]" v-html="heating.heatingControl.statusRoom?.val" />
  </div>
</template>
