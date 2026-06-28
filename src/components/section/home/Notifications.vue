<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { useNotificationStore } from "@/store/notification-store.ts";
import { computed } from "vue";

const store = useNotificationStore();
const notification = computed(() => {
  return store.getFirstNotification;
});
</script>

<template>
  <Card :class="['py-0 gap-0 transition-colors flex-1 cursor-pointer hover:bg-accent', notification?.getNotificationClass]">
    <CardHeader class="px-3 pt-2 pb-0">
      <CardTitle class="text-xs text-muted-foreground">Benachrichtigungen</CardTitle>
    </CardHeader>
    <CardContent class="pt-1 pb-2 flex gap-1.5 px-0">
      <div v-if="notification" class="px-3 pt-1 pb-2 flex items-center gap-1.5">
        <StatusDot v-if="notification.hasStatus" :active="notification.status" />
        <span class="text-sm font-semibold">{{ notification.message }}</span>
      </div>
    </CardContent>
  </Card>
</template>
