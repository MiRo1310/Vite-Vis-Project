<script setup lang="ts">
import { computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import WindowCardButtons from "@/components/section/window/WindowCardButtons.vue";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import WindowCardOpenClose from "@/components/section/window/WindowCardOpenClose.vue";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import windowOpen from "@/assets/window_open.png";
import windowClosed from "@/assets/window_closed.png";
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
  blinds90
} from "@/assets";
import { Shutter, WindowType } from "@/types";

const iobrokerStore = useIobrokerStore();
const { fenster, rolladen, shutterAutoDownTime, shutterAutoUp } = storeToRefs(
  iobrokerStore
);

const props = defineProps({
  shutter: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  id2: {
    type: String,
    required: false,
    default: null
  },
  cl: {
    type: String,
    required: false,
    default: null
  }
});

function getValue<T>(getVal: boolean, id: string, object: WindowType | Shutter | object, subKey?: string) {
  const arrayOfIds = id.split(",").map((id) => id.trim());
  const first = arrayOfIds[0];
  const second = arrayOfIds[1];
  const obj = object?.[first as keyof typeof object];
  console.log(obj);
  console.log(second, subKey);
  const subObj = obj?.[`${second}${subKey ? subKey : ""}` as keyof typeof obj];
  console.log(subObj);
  return getVal ? (subObj as StoreValue<T>)?.val : subObj as StoreValue<T>;
}

const getIsWindowOpen = computed(() => {
  const value = getValue<boolean>(true, props.id, fenster.value);
  if (!value && value != false) {
    return false;
  }
  return value as boolean;
});

const getIsSecondWindowOpen = computed(() => {
  if (!props.id2) return false;
  const value = getValue<boolean>(true, props.id2, fenster.value);
  if (!value && value != false) {
    return false;
  }
  return value as boolean;
});

const getShutterPosition = computed(() => {
  const value = getValue<number>(true, props.id, rolladen.value);

  if (!value && value != 0) {
    return "n/a ";
  }
  return value;
});

const getAutoCloseDelay = computed((): { id: string, val: number } => {
  return getValue<number>(false, props.id, shutterAutoDownTime.value, "Delay") as { id: string, val: number };
});

const getAutoClose = computed((): { id: string, val: boolean } => {
  return getValue<boolean>(true, props.id, shutterAutoDownTime.value, "Auto") as { id: string, val: boolean };
});

const getAutoOpen = computed((): { id: string, val: boolean } => {
  return getValue<boolean>(true, props.id, shutterAutoUp.value, "AutoUp") as { id: string, val: boolean };
});

const getAutoUpTime = computed((): { id: string, val: number } => {
  return getValue<number>(true, props.id, shutterAutoUp.value, "AutoUpTime") as { id: string, val: number };
});

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
  <Card class="window__card" :class="`${props.cl}`" styling="blue">
    <CardHeader class="pb-0 pt-2 px-2">
      <CardTitle class="flex">
        <p>{{ props.title }}</p>
      </CardTitle>
    </CardHeader>
    <CardContent class="px-2 pb-2">
      <div class="flex items-center justify-between">
        <div class="flex">
          <div>
            <img v-show="getIsWindowOpen" class="w-8 h-6 mt-1" :src="windowOpen" alt="FensterAufZu">
            <img v-show="!getIsWindowOpen" class="w-8 h-6 mt-1" :src="windowClosed" alt="FensterAufZu">
          </div>
          <div v-if="props.id2">
            <img v-show="getIsSecondWindowOpen" class="w-8 h-6 mt-1" :src="windowOpen" alt="FensterAufZu">
            <img v-show="!getIsSecondWindowOpen" class="w-8 h-6 mt-1" :src="windowClosed" alt="FensterAufZu">
          </div>
        </div>
        <WindowCardOpenClose
          v-if="!props.shutter" class="text" :window-open="props.id2 ? getIsWindowOpen || getIsSecondWindowOpen : getIsWindowOpen
          "
        />
      </div>
      <div v-if="props.shutter">
        <div class="flex">
          <img class="window--img" :src="getShutterImage" alt="FensterRollade">
          <div class="w-full">
            <WindowCardOpenClose
              :window-open="props.id2 ? getIsWindowOpen || getIsSecondWindowOpen : getIsWindowOpen
              " class="text"
            />
            <p class="text" :class="getShutterPosition === 'n/a ' ? 'text-red-500 animate-bounce' : ''">
              Rollade {{ getShutterPosition }}% offen
            </p>

            <div class="absolute top-2 right-2">
              <div class="flex items-center justify-between">
                <div class="w-11">
                  <Switch :checked="getAutoClose?.val" @update:checked="updateHandler($event, getAutoClose?.id)" />
                  <p class="text-[0.5rem]">
                    Auto runter
                  </p>
                </div>
                <div class="relative">
                  <Input
                    type="number" step="1" class="w-[5.8rem] pr-8" :model-value="getAutoCloseDelay?.val"
                    @update:model-value="updateHandler($event, getAutoCloseDelay?.id)"
                  />
                  <div class="absolute text-sm top-2 right-2">
                    min
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2 mt-2">
                <div class="w-11">
                  <Switch :checked="getAutoOpen?.val" @update:checked="updateHandler($event, getAutoOpen?.id)" />
                  <p class="text-[0.5rem]">
                    Auto hoch
                  </p>
                </div>
                <p>
                  <Input
                    type="time" :model-value="getAutoUpTime?.val"
                    @update:model-value="updateHandler($event, getAutoUpTime?.id)"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <WindowCardButtons :id="props.id" />
      </div>
    </CardContent>
  </Card>
</template>

<style lang="postcss" scoped>
.window__card {
  @apply min-w-[32.5%] flex-1 relative
}

.window__card:first-child {
  @apply mt-1 ml-1
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
