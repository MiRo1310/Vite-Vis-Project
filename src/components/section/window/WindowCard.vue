<script setup lang="ts">
import { computed, HTMLAttributes } from "vue";
import { Card, CardContent } from "@/components/shared/card";
import WindowShutterPositionBtns from "@/components/section/window/WindowShutterPositionBtns.vue";
import { Switch } from "@/components/ui/switch";
import WindowCardOpenCloseText from "@/components/section/window/WindowCardOpenCloseText.vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { blinds0, blinds10, blinds100, blinds20, blinds30, blinds40, blinds50, blinds60, blinds70, blinds80, blinds90 } from "@/public";
import { WindowObject } from "@/types/types.ts";
import ShutterLabel from "@/components/section/window/ShutterLabel.vue";
import WindowImage from "@/components/section/window/WindowImage.vue";
import { isDefined } from "@vueuse/core";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  window: WindowObject;
}>();

const getShutterImage = computed(() => {
  const position = props.window.shutterPosition;
  if (typeof position !== "number") return blinds0;

  if (position === 0) return blinds100;
  if (position <= 10) return blinds90;
  if (position <= 20) return blinds80;
  if (position <= 30) return blinds70;
  if (position <= 40) return blinds60;
  if (position <= 50) return blinds50;
  if (position <= 60) return blinds40;
  if (position <= 70) return blinds30;
  if (position <= 80) return blinds20;
  if (position <= 90) return blinds10;
  return blinds0;
});

const updateHandler = (value: number | string | boolean, id: string) => {
  if (adminConnection) {
    adminConnection.setState(id, value);
  }
};
</script>
<style lang="scss" scoped>
.input-shadcn {
  @apply w-[5.2rem] pr-8 border-none shadow-none;
}

.window__card {
  @apply min-w-[32.5%] flex-1 relative bg-white;
}

.window__card:first-child {
  @apply mt-1 ml-1;
}

.window--img {
  @apply w-8 h-12;
}

.window--img-openClose {
  @apply w-8 h-6 mt-1;
}

.text {
  @apply text-[0.68rem] mt-1 ml-1 font-bold;
}
</style>

<template>
  <Card class="window__card" :class="`${props.class}`" styling="light">
    <span class="text-lg text-muted-foreground line ml-2">{{ window.name }}</span>

    <CardContent class="px-2 pb-2">
      <div class="flex items-center">
        <div class="flex">
          <WindowImage :is-open="window.isOpenStatus" />
          <WindowImage v-if="isDefined(window.isOpenStatus2)" :is-open="window.isOpenStatus2" />
        </div>
        <WindowCardOpenCloseText
          :window-open="isDefined(window.isOpenStatus2) ? window.isOpenStatus || window.isOpenStatus2 : window.isOpenStatus"
          :door="window.door ?? false"
        />
      </div>
      <div v-if="window.shutter">
        <div class="flex items-center">
          <img class="window--img" :src="getShutterImage" alt="FensterRollade" />
          <div class="w-full">
            <ShutterLabel :get-shutter-position="window.shutterPosition ?? 'n/a'" />

            <div class="absolute top-2 right-2">
              <div class="flex items-center justify-between">
                <div class="w-11">
                  <Switch :checked="window.shutterAutoDown?.val ?? false" @update:checked="updateHandler($event, window.shutterAutoDown?.id ?? '')" />
                  <p class="text-[0.5rem]">Auto runter</p>
                </div>

                <InputIobroker :state="window.shutterAutoDownDelay" unit="min" :ack="true" />
              </div>
              <div class="flex items-center space-x-2 mt-2">
                <div class="w-11">
                  <Switch :checked="window.shutterAutoUp?.val ?? false" @update:checked="updateHandler($event, window.shutterAutoUp?.id ?? '')" />
                  <p class="text-[0.5rem]">Auto hoch</p>
                </div>
                <InputIobroker :state="window.shutterAutoUpTime" type="time" :ack="true" />
              </div>
            </div>
          </div>
        </div>

        <WindowShutterPositionBtns v-if="window.idShutterPosition" :idShutterPosition="window.idShutterPosition" />
      </div>
    </CardContent>
  </Card>
</template>
