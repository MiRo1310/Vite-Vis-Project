<script setup lang="ts">
import { HTMLAttributes } from "vue";
import { Card, CardContent } from "@/components/shared/card";
import { WindowObject } from "@/types/types.ts";
import WindowImage from "@/components/section/window/WindowImage.vue";
import { getShutterImageByPosition } from "@/composables/windows.ts";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  room: WindowObject;
}>();

const emits = defineEmits(["clickRoom"]);
</script>

<template>
  <Card class="window" :class="`${props.class}`" styling="light" @click="emits('clickRoom', room.name)">
    <span class="text-lg text-muted-foreground line ml-2">{{ room.name }}</span>

    <CardContent class="px-2 pb-2">
      <div class="flex items-center">
        <div class="flex gap-2">
          <div v-for="(window, i) in room.windows" :key="i">
            <p>{{ window.name }}</p>
            <WindowImage :is-open="window.isOpenStatus" />
            <div v-if="room.shutter">
              <img class="window--img" :src="getShutterImageByPosition(window.shutterPosition ?? null)" alt="FensterRollade" />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped>
.input-shadcn {
  @apply w-[5.2rem] pr-8 border-none shadow-none;
}

.window {
  @apply relative border-gray-300;
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
