<script setup lang="ts">
import { HTMLAttributes } from "vue";
import { Card, CardContent } from "@/components/shared/card";
import { Switch } from "@/components/ui/switch";
import WindowCardOpenCloseText from "@/components/section/window/WindowCardOpenCloseText.vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { RoomType } from "@/types/types.ts";
import ShutterLabel from "@/components/section/window/ShutterLabel.vue";
import WindowImage from "@/components/section/window/WindowImage.vue";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import HeatingControlPeriod from "@/components/section/heating/HeatingControlPeriod.vue";
import ShutterImage from "@/components/section/window/ShutterImage.vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  window: RoomType;
}>();

const updateHandler = (value: number | string | boolean, id: string) => {
  if (adminConnection) {
    adminConnection.setState(id, value);
  }
};
</script>

<template>
  <Card class="min-w-[32.5%] flex-1 relative first:mt-1 first:ml-1" :class="`${props.class}`" styling="info">
    <CardContent class="px-2 pb-2">
      <div class="flex items-center">
        <div v-for="(w, i) in window.windows" class="flex" :key="i">
          <WindowImage :is-open="w.isOpenStatus ?? false" />
        </div>
        <WindowCardOpenCloseText :window-open="window.windows.some((w) => w.isOpenStatus)" :door="false" />
      </div>
      <div v-if="window.shutter">
        <div v-for="(w, i2) in window.windows" class="flex items-center" :key="i2">
          <ShutterImage :position="w.shutterPosition" />
          <div class="w-full">
            <ShutterLabel :get-shutter-position="w.shutterPosition ?? 'n/a'" />

            <div class="absolute top-2 right-2">
              <div class="flex items-center justify-between">
                <div class="w-11">
                  <Switch :checked="w.shutterAutoDown?.val ?? false" @update:checked="updateHandler($event, w.shutterAutoDown?.id ?? '')" />
                  <p class="text-[0.5rem]">Auto runter</p>
                </div>

                <InputIobroker :state="w.shutterAutoDownDelay" unit="min" :ack="true" />
              </div>
              <div class="flex items-center space-x-2 mt-2">
                <div class="w-11">
                  <Switch :checked="w.shutterAutoUp?.val ?? false" @update:checked="updateHandler($event, w.shutterAutoUp?.id ?? '')" />
                  <p class="text-[0.5rem]">Auto hoch</p>
                </div>
                <InputIobroker :state="w.shutterAutoUpTime" type="time" :ack="true" />
              </div>
            </div>
          </div>
        </div>

        <!--        <WindowShutterPositionBtns v-if="window.idShutterPosition" :idShutterPosition="window.idShutterPosition" />-->
      </div>
      <HeatingControlPeriod />
    </CardContent>
  </Card>
</template>
