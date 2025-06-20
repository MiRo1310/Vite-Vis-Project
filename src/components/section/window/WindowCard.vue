<script setup lang="ts">
import { computed, HTMLAttributes } from "vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import WindowCardButtons from "@/components/section/window/WindowCardButtons.vue";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import WindowCardOpenCloseText from "@/components/section/window/WindowCardOpenCloseText.vue";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import {
  blinds0,
  blinds10,
  blinds100,
  blinds20,
  blinds30,
  blinds40,
  blinds50,
  blinds60,
  blinds70,
  blinds80,
  blinds90,
} from "@/public";
import { WindowType } from "@/types/types.ts";
import ShutterLabel from "@/components/section/window/ShutterLabel.vue";
import WindowImage from "@/components/section/window/WindowImage.vue";
import { isDefined } from "@vueuse/core";

const iobrokerStore = useIobrokerStore();
const { fenster, rolladen, shutterAutoDownTime, shutterAutoUp } =
  storeToRefs(iobrokerStore);

const props = defineProps<{
  shutter: boolean;
  title: string;
  id: keyof WindowType;
  id2?: keyof WindowType;
  class?: HTMLAttributes["class"];
  door: boolean;
}>();

const getIsWindowOpen = computed(
  () => (id: keyof WindowType) => fenster.value[id]?.val ?? false,
);

const getShutterPosition = computed(() => {
  const value =
    rolladen.value[(props.id + "Position") as keyof typeof rolladen.value]?.val;

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
    <CardHeader class="pb-0 pt-2 px-2">
      <CardTitle class="flex bg-white">
        <p class="line px-2">{{ title }}</p>
      </CardTitle>
    </CardHeader>
    <CardContent class="px-2 pb-2">
      <div class="flex items-center">
        <div class="flex">
          <WindowImage :is-open="getIsWindowOpen(id)" />
          <WindowImage v-if="id2" :is-open="getIsWindowOpen(id2)" />
        </div>
        <WindowCardOpenCloseText
          :window-open="
            id2
              ? getIsWindowOpen(id) || getIsWindowOpen(id2)
              : getIsWindowOpen(id)
          "
          :door
        />
      </div>
      <div v-if="shutter">
        <div class="flex items-center">
          <img
            class="window--img"
            :src="getShutterImage"
            alt="FensterRollade"
          />
          <div class="w-full">
            <ShutterLabel :get-shutter-position="getShutterPosition" />

            <div class="absolute top-2 right-2">
              <div class="flex items-center justify-between">
                <div class="w-11">
                  <Switch
                    :checked="values<boolean>('Auto', shutterAutoDownTime)?.val"
                    @update:checked="
                      updateHandler(
                        $event,
                        values<boolean>('Auto', shutterAutoDownTime)?.id || '',
                      )
                    "
                  />
                  <p class="text-[0.5rem]">Auto runter</p>
                </div>
                <div class="relative line">
                  <Input
                    type="number"
                    step="1"
                    :model-value="
                      values<number>('Delay', shutterAutoDownTime)?.val
                    "
                    @update:model-value="
                      updateHandler(
                        $event,
                        values<number>('Delay', shutterAutoDownTime)?.id || '',
                      )
                    "
                  />
                  <div class="absolute text-sm top-2 right-2">min</div>
                </div>
              </div>
              <div class="flex items-center space-x-2 mt-2">
                <div class="w-11">
                  <Switch
                    :checked="values<boolean>('AutoUp', shutterAutoUp)?.val"
                    @update:checked="
                      updateHandler(
                        $event,
                        values<boolean>('AutoUp', shutterAutoUp)?.id || '',
                      )
                    "
                  />
                  <p class="text-[0.5rem]">Auto hoch</p>
                </div>
                <p class="line">
                  <Input
                    type="time"
                    :model-value="
                      values<number>('AutoUpTime', shutterAutoUp)?.val
                    "
                    @update:model-value="
                      updateHandler(
                        $event,
                        values<number>('AutoUpTime', shutterAutoUp)?.id || '',
                      )
                    "
                  />
                </p>
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
input {
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
