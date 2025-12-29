<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed, HTMLAttributes } from "vue";
import { useAppStore } from "@/store/appStore.ts";
import { Timer, Timers } from "@/types/types.ts";

defineProps<{ class: HTMLAttributes["class"] }>();

const iobrokerStore = useIobrokerStore();

const { timer } = storeToRefs(iobrokerStore);

const nameByIndex = computed(() => (index: number) => {
  const timerName = (timer.value[index as keyof Timers] as Timer)?.name?.val;
  return timerName != "Timer" ? timerName : null;
});
</script>

<template>
  <Card :class="$props.class" styling="blueDark" @click="useAppStore().toggleTimerVisibility()">
    <CardHeader>
      <CardTitle>
        <p>Alexa Timer</p>
      </CardTitle>
    </CardHeader>
    <CardContent class="timer__content">
      <div v-for="i in 4" :key="i" class="timer__section">
        <div class="timer__section-inner">
          <h1 class="timer__sub-title line">
            <span>{{ nameByIndex(i) || `Timer ${i}` }}</span>
            <span> {{ (timer[i as keyof Timers] as Timer).timeString?.val }}</span>
          </h1>
          <div class="timer__values">
            <div class="timer__label">
              <p>Gerät:</p>
              <p class="timer__value">
                {{ (timer[i as keyof Timers] as Timer).device?.val }}
              </p>
            </div>
            <div class="timer__label">
              <p>Länge:</p>
              <p class="timer__value">
                {{ (timer[i as keyof Timers] as Timer).initialTimer?.val }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.timer {
  &__content {
    @apply flex flex-wrap min-w-[400px] gap-2;
  }

  &__section {
    @apply min-w-[180px] flex-1 max-w-[50%] flex px-2;
    @apply bg-cardCustom-info p-2 shadow-lg;
  }

  &__section-inner {
    @apply w-full;
  }

  &__sub-title {
    @apply text-cardCustom-text text-xl;
    @apply flex justify-between;
  }

  &__label {
    @apply text-cardCustom-text/70 font-bold;
    @apply flex justify-between;
  }

  &__values {
    @apply w-full text-xs;
  }

  &__value {
    @apply flex-1 text-right;
  }
}
</style>
