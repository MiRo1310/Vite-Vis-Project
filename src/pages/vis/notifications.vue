<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import { useNotificationStore } from "@/store/notification-store.ts";
import { Card, CardContent } from "@/components/ui/card";
import StatusDot from "@/components/shared/display/StatusDot.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { type TNotificationType } from "@/types/notification.ts";

const notificationStore = useNotificationStore();

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(date);
}

const type = computed(() => (t: TNotificationType) => {
  switch (t) {
    case "success":
      return "Erfolgreich";
    case "warning":
      return "Erfolgreich";
    case "error":
      return "Fehler";
    case "info":
      return "Info";
  }
});

const router = useRouter();
</script>

<template>
  <Page title="Benachrichtigungen">
    <div v-if="notificationStore.notifications.length === 0" class="flex items-center justify-center h-32 text-sm text-muted-foreground">
      Keine Benachrichtigungen
    </div>

    <div v-else class="space-y-2">
      <Card
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        :class="['py-0 gap-0', notification.getNotificationClass, { 'cursor-pointer h-full hover:bg-accent': notification.route }]"
        @click="notification.route ? router.push(notification.route.path) : null"
      >
        <CardContent class="px-3 py-2.5 flex items-start gap-3">
          <StatusDot v-if="notification.hasStatus" :active="notification.status" class="mt-1 shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium leading-snug">{{ notification.message }}</p>
            <p class="text-xs text-muted-foreground mt-0.5">{{ formatDate(notification.date) }}</p>
          </div>
          <span
            class="text-xs font-medium px-1.5 py-0.5 rounded shrink-0"
            :class="{
              'bg-destructive/10 text-destructive': notification.type === 'error',
              'bg-yellow-400/10 text-yellow-500': notification.type === 'warning',
              'bg-blue-400/10 text-blue-400': notification.type === 'info',
              'bg-green-400/10 text-green-400': notification.type === 'success',
            }"
          >
            {{ type(notification.type) }}
          </span>
        </CardContent>
      </Card>
    </div>
  </Page>
</template>
