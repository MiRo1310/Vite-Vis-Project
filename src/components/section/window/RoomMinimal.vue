<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoomType } from "@/types/types.ts";

defineProps<{ room: RoomType }>();

const emits = defineEmits(["clickRoom"]);
</script>

<template>
  <Card
    :class="[
      'py-0 gap-0 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground border',
      room.windows.some((w) => w.isOpenStatus) ? 'border-yellow-400' : 'border-border',
    ]"
    @click="emits('clickRoom', room.name)"
  >
    <CardHeader class="px-3 pt-2 pb-0">
      <div class="flex items-center justify-between">
        <CardTitle class="text-sm font-semibold">{{ room.name }}</CardTitle>
        <div class="flex items-center gap-3">
          <div v-if="room.bellStatus" class="flex items-center gap-1">
            <span class="text-xs text-muted-foreground">Klingel</span>
            <span :class="['h-1.5 w-1.5 rounded-full shrink-0', room.bellStatus.val ? 'bg-green-400' : 'bg-red-400']" />
          </div>
          <div v-if="room.batteryHeating" class="flex items-center gap-1">
            <span class="text-xs text-muted-foreground">Bat.</span>
            <span
              v-for="(h, i) in room.batteryHeating"
              :key="i"
              :class="['h-1.5 w-1.5 rounded-full shrink-0', h?.val ? 'bg-yellow-400' : 'bg-green-400']"
            />
          </div>
          <span v-if="room.temp?.some((t) => t != null)" class="text-xs font-semibold"> {{ room.temp.filter((t) => t != null).join(" / ") }}°C </span>
        </div>
      </div>
    </CardHeader>
    <CardContent class="px-3 pt-1 pb-2">
      <div class="flex flex-wrap gap-3">
        <div v-for="(w, i) in room.windows" :key="i" class="flex flex-col gap-0.5 text-xs min-w-15">
          <span v-if="w.name" class="text-muted-foreground font-medium">{{ w.name }}</span>
          <div class="flex items-center gap-1">
            <span :class="['h-1.5 w-1.5 rounded-full shrink-0', w.windowSensorReachable?.val ? 'bg-green-400' : 'bg-muted-foreground/30']" />
            <span class="text-muted-foreground">Sensor</span>
          </div>
          <div class="flex items-center gap-1">
            <span :class="['h-1.5 w-1.5 rounded-full shrink-0', w.isOpenStatus ? 'bg-yellow-400' : 'bg-green-400']" />
            <span :class="w.isOpenStatus ? 'text-yellow-400 font-medium' : ''">{{ w.isOpenStatus ? "offen" : "zu" }}</span>
          </div>
          <div v-if="room.shutter" class="flex items-center gap-1">
            <span class="text-muted-foreground">Rollade</span>
            <span class="font-medium">{{ w.shutterPosition ?? "–" }}%</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
