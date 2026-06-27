<script setup lang="ts">
import { Switch } from "@/components/ui/switch";
import { type RoomType } from "@/types/types.ts";
import DataCard from "@/components/shared/card/DataCard.vue";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import WindowShutterPositionBtns from "@/components/section/window/WindowShutterPositionBtns.vue";
import { type IValueOf } from "@/store/valueClasses.ts";

defineProps<{ window: RoomType }>();

const updateHandler = async (value: number | string | boolean, iValue?: IValueOf<boolean>) => {
  iValue?.setState(value);
};
</script>

<template>
  <div class="space-y-3">
    <div>
      <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Fenster</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <DataCard v-for="(w, i) in window.windows" :key="i" :title="w.name || 'Fenster'" content-class="flex items-center gap-1.5">
          <span :class="['h-2 w-2 rounded-full shrink-0', w.isOpenStatus ? 'bg-red-400' : 'bg-green-400']" />
          <span class="text-sm font-semibold">{{ w.isOpenStatus ? "offen" : "geschlossen" }}</span>
        </DataCard>
      </div>
    </div>

    <div v-if="window.shutter">
      <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Rolladen</p>
      <div :class="['grid gap-3', window.windows.length > 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2']">
        <div v-for="(w, i) in window.windows" :key="i" class="space-y-2 border rounded-md p-2">
          <p v-if="w.name" class="text-xs font-medium text-muted-foreground">{{ w.name }}</p>
          <div class="grid grid-cols-2 gap-2">
            <DataCard title="Position">
              <span class="text-sm font-semibold">{{ w.shutterPosition ?? "n/a" }}%</span>
            </DataCard>
          </div>
          <WindowShutterPositionBtns v-if="w.idShutterPosition" :shutterPosition="w.idShutterPosition" />
          <p class="text-xs text-muted-foreground uppercase tracking-wide mt-1 mb-1">Einstellungen</p>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Switch :checked="w.shutterAutoDown?.val ?? false" @update:checked="updateHandler($event, w.shutterAutoDown)" />
                <span class="text-xs text-muted-foreground">Auto runter</span>
              </div>
              <InputIobroker :state="w.shutterAutoDownDelay" unit="min" :ack="true" />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Switch :checked="w.shutterAutoUp?.val ?? false" @update:checked="updateHandler($event, w.shutterAutoUp)" />
                <span class="text-xs text-muted-foreground">Auto hoch</span>
              </div>
              <InputIobroker :id="w.shutterAutoUpTime?.id" :state="w.shutterAutoUpTime" type="time" :ack="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
