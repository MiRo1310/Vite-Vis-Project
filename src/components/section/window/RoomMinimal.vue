<script setup lang="ts">
import { Card, CardContent } from "@/components/shared/card";
import { RoomType } from "@/types/types.ts";
import WindowImage from "@/components/section/window/WindowImage.vue";
import { getShutterImageByPosition } from "@/composables/windows.ts";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";

defineProps<{ room: RoomType }>();

const emits = defineEmits(["clickRoom"]);
</script>

<template>
  <Card
    :class="[
      'relative hover:bg-cardCustom-info/70 hover:border-cardCustom-border cursor-pointer',
      room.windows.some((w) => w.isOpenStatus) ? 'border--destructive' : 'border-cardCustom-border/70',
    ]"
    styling="info"
    @click="emits('clickRoom', room.name)"
  >
    <span class="text-lg text-muted-foreground ml-2">{{ room.name }}</span>
    <TextSeparator />
    <CardContent class="px-2 pb-2">
      <div class="flex items-center">
        <div class="flex gap-2">
          <div v-for="(window, i) in room.windows" :key="i">
            <p>{{ window.name }}</p>
            <WindowImage :is-open="window.isOpenStatus" />
            <div v-if="room.shutter">
              <img class="w-8 h-12" :src="getShutterImageByPosition(window.shutterPosition ?? null)" alt="FensterRollade" />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
