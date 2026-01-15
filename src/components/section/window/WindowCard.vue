<script setup lang="ts">
import { Switch } from "@/components/ui/switch";
import WindowCardOpenCloseText from "@/components/section/window/WindowCardOpenCloseText.vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { RoomType } from "@/types/types.ts";
import ShutterLabel from "@/components/section/window/ShutterLabel.vue";
import WindowImage from "@/components/section/window/WindowImage.vue";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import HeatingControlPeriod from "@/components/section/heating/HeatingControlPeriod.vue";
import ShutterImage from "@/components/section/window/ShutterImage.vue";
import WindowShutterPositionBtns from "@/components/section/window/WindowShutterPositionBtns.vue";

defineProps<{ window: RoomType }>();

const updateHandler = (value: number | string | boolean, id: string) => {
  if (adminConnection) {
    adminConnection.setState(id, value);
  }
};
</script>

<template>
  <div class="">
    <div class="flex items-center">
      <div v-for="(w, i) in window.windows" class="flex" :key="i">
        <WindowImage :is-open="w.isOpenStatus ?? false" />
      </div>
      <WindowCardOpenCloseText :window-open="window.windows.some((w) => w.isOpenStatus)" :door="false" />
    </div>
    <div v-if="window.shutter">
      <div v-for="(w, i2) in window.windows" class="flex items-center gap-4" :key="i2">
        <div>
          <ShutterImage :position="w.shutterPosition" />
          <WindowShutterPositionBtns v-if="w.idShutterPosition" :idShutterPosition="w.idShutterPosition" />
        </div>
        <div class="">
          <ShutterLabel :get-shutter-position="w.shutterPosition ?? 'n/a'" />

          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center justify-between w-full">
              <div class="w-11">
                <Switch :checked="w.shutterAutoDown?.val ?? false" @update:checked="updateHandler($event, w.shutterAutoDown?.id ?? '')" />
                <p class="text-[0.5rem]">Auto runter</p>
              </div>

              <InputIobroker :state="w.shutterAutoDownDelay" unit="min" :ack="true" />
            </div>
            <div class="flex items-center justify-between w-full">
              <div class="w-11">
                <Switch :checked="w.shutterAutoUp?.val ?? false" @update:checked="updateHandler($event, w.shutterAutoUp?.id ?? '')" />
                <p class="text-[0.5rem]">Auto hoch</p>
              </div>
              <InputIobroker :state="w.shutterAutoUpTime" type="time" :ack="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <HeatingControlPeriod />
  </div>
</template>
