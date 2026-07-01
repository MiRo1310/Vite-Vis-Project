<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { useNotificationStore } from "@/store/notification-store.ts";
import { computed, onMounted, onUnmounted, ref } from "vue";

const store = useNotificationStore();

const currentIndex = ref(0);
const notification = computed(() => {
  return store.getNotificationsFromHighestType[currentIndex.value];
});

let interval: null | number = null;

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % store.getNotificationsFromHighestType.length;
  }, 5000);
});

onUnmounted(() => {
  if (!interval) {
    return;
  }
  clearInterval(interval);
});
</script>

<template>
  <Card :class="['py-0 gap-0 transition-colors cursor-pointer h-full hover:bg-accent relative overflow-hidden', notification?.getNotificationClass]">
    <CardHeader class="px-3 pt-2 pb-0">
      <CardTitle class="text-xs text-muted-foreground flex items-center justify-between w-full">
        <span>Benachrichtigungen</span>
        <div v-if="store.getNotificationsFromHighestType.length" class="flex items-center gap-1.5">
          <span class="tabular-nums">{{ currentIndex + 1 }}/{{ store.getNotificationsFromHighestType.length }}</span>
        </div>
      </CardTitle>
    </CardHeader>
    <div class="relative overflow-hidden">
      <Transition name="slide">
        <div :key="currentIndex">
          <CardContent class="pt-1 pb-2 flex gap-1.5 px-0">
            <div v-if="notification" class="px-3 pt-1 pb-2 flex items-center gap-1.5">
              <StatusDot v-if="notification.hasStatus" :active="notification.status" />
              <span class="text-sm font-semibold">{{ notification.message }}</span>
            </div>
          </CardContent>
        </div>
      </Transition>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-active {
  transition: all 0.4s ease;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
