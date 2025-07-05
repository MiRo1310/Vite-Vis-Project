<script setup lang="ts">
import { computed, HTMLAttributes } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import WindowCardButtons from "@/components/section/window/WindowCardButtons.vue";
import { InputShadcn } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import WindowCardOpenCloseText from "@/components/section/window/WindowCardOpenCloseText.vue";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { blinds0, blinds10, blinds100, blinds20, blinds30, blinds40, blinds50, blinds60, blinds70, blinds80, blinds90 } from "@/public";
import { WindowType } from "@/types/types.ts";
import ShutterLabel from "@/components/section/window/ShutterLabel.vue";
import WindowImage from "@/components/section/window/WindowImage.vue";
import { isDefined } from "@vueuse/core";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";

const iobrokerStore = useIobrokerStore();
const { fenster, rolladen, shutterAutoDownTime, shutterAutoUp } = storeToRefs(iobrokerStore);

const props = defineProps<{
  shutter: boolean;
  title: string;
  id: keyof WindowType;
  id2?: keyof WindowType;
  class?: HTMLAttributes["class"];
  door: boolean;
}>();

const getIsWindowOpen = computed(() => (id: keyof WindowType) => fenster.value[id]?.val ?? false);

const getShutterPosition = computed(() => {
  const value = rolladen.value[(props.id + "Position") as keyof typeof rolladen.value]?.val;

  return isDefined(value) ? value : "n/a";
});

type SubKey = "Auto" | "AutoUp" | "AutoUpTime" | "Delay";

const values = computed(() => <T,>(subKey: SubKey, obj: any): StoreValue<T> => {
  const id = useDefaultLivingRoom(props.id);
  return obj[(id + subKey) as keyof typeof obj];
});

function useDefaultLivingRoom(param: string) {
  return param.includes("wohnzimmer") ? "wohnzimmerEcke" : param;
}

const getShutterImage = computed(() => {
  const position = getShutterPosition.value;
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
<template>
  <Card class="window__card" :class="`${props.class}`" styling="light">
    <span class="text-lg text-muted-foreground line ml-2">{{ title }}</span>

    <CardContent class="px-2 pb-2">
      <div class="flex items-center">
        <div class="flex">
          <WindowImage :is-open="getIsWindowOpen(id)" />
          <WindowImage v-if="id2" :is-open="getIsWindowOpen(id2)" />
        </div>
        <WindowCardOpenCloseText :window-open="id2 ? getIsWindowOpen(id) || getIsWindowOpen(id2) : getIsWindowOpen(id)" :door />
      </div>
      <div v-if="shutter">
        <div class="flex items-center">
          <img class="window--img" :src="getShutterImage" alt="FensterRollade" />
          <div class="w-full">
            <ShutterLabel :get-shutter-position="getShutterPosition" />

            <div class="absolute top-2 right-2">
              <div class="flex items-center justify-between">
                <div class="w-11">
                  <Switch
                    :checked="values<boolean>('Auto', shutterAutoDownTime)?.val"
                    @update:checked="updateHandler($event, values<boolean>('Auto', shutterAutoDownTime)?.id || '')"
                  />
                  <p class="text-[0.5rem]">Auto runter</p>
                </div>

                <InputIobroker :state="values<number>('Delay', shutterAutoDownTime)" unit="min" :ack="true" />
              </div>
              <div class="flex items-center space-x-2 mt-2">
                <div class="w-11">
                  <Switch
                    :checked="values<boolean>('AutoUp', shutterAutoUp)?.val"
                    @update:checked="updateHandler($event, values<boolean>('AutoUp', shutterAutoUp)?.id || '')"
                  />
                  <p class="text-[0.5rem]">Auto hoch</p>
                </div>
                <InputIobroker :state="values<number>('AutoUpTime', shutterAutoUp)" type="time" :ack="true" />
              </div>
            </div>
          </div>
        </div>
        <WindowCardButtons :id="id" />
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped>
input-shadcn {
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
