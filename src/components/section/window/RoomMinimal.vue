<script setup lang="ts">
import { CardContent } from "@/components/shared/card";
import { RoomType } from "@/types/types.ts";
import WindowImage from "@/components/section/window/WindowImage.vue";
import { getShutterImageByPosition } from "@/composables/windows.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import Circle from "@/components/shared/badge/Circle.vue";

defineProps<{ room: RoomType }>();

const emits = defineEmits(["clickRoom"]);
</script>

<template>
  <CardSubcard
    :class="[
      'relative border border-transparent hover:bg-background/10 hover:border-cardSubcard/30 cursor-pointer',
      room.windows.some((w) => w.isOpenStatus) ? 'border--destructive' : 'border-cardCustom-border/70',
    ]"
    styling="info"
    @click="emits('clickRoom', room.name)"
  >
    <div class="flex justify-between items-center">
      <span class="text-lg text-muted-foreground">{{ room.name }}</span
      ><span>20°C</span>
    </div>
    <TextSeparator />
    <CardContent>
      <div class="flex items-start gap-4">
        <div class="flex gap-2">
          <div v-for="(window, i) in room.windows" :key="i">
            <p class="text-xs text-foreground">{{ window.name }}</p>
            <WindowImage :is-open="window.isOpenStatus" :class="window.isOpenStatus ? 'bg-red-200' : 'bg-green-200'" />
            <div v-if="room.shutter">
              <img class="w-8 h-12 img--white" :src="getShutterImageByPosition(window.shutterPosition ?? null)" alt="FensterRollade" />
            </div>
          </div>
        </div>
        <div>
          <p class="text-xs flex items-center gap-2">Fenster Sensor <Circle color="green" /></p>
        </div>
      </div>
    </CardContent>
  </CardSubcard>
</template>

<style scoped lang="scss">
.dark {
  .img--white {
    filter: brightness(0) invert(1);
    -webkit-filter: brightness(0) invert(1);
  }
}
</style>
