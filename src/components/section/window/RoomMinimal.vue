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
      <span class="text-lg text-muted-foreground">{{ room.name }}</span>
      <div v-if="room.bellStatus" class="text-xs flex items-center gap-2">
        <span>Klingel</span>
        <Circle :color="room.bellStatus.val ? 'green' : 'red'" />
      </div>
      <div class="text-xs flex items-center gap-2">
        <span>Battriestatus</span>
        <Circle v-for="(h, index) in room.batteryHeating" :color="h?.val ? 'yellow' : 'green'" :key="index" />
      </div>
      20°C
    </div>
    <TextSeparator />
    <CardContent>
      <div class="flex items-start gap-4">
        <div class="flex gap-2">
          <div v-for="(w, i) in room.windows" :key="i">
            <p class="text-xs text-foreground"><Circle :color="w.windowSensorReachable?.val ? 'green' : 'red'" /> {{ w.name }}</p>

            <WindowImage :is-open="w.isOpenStatus" :class="w.isOpenStatus ? 'bg-red-200' : 'bg-green-200'" />
            <div v-if="room.shutter">
              <img class="w-8 h-12 img--white" :src="getShutterImageByPosition(w.shutterPosition ?? null)" alt="FensterRollade" />
            </div>
          </div>
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
