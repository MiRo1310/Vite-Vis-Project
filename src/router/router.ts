import { createRouter, createWebHistory, type RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { routing } from "@/router/routing.ts";
import { ref } from "vue";
import { useNotificationStore } from "@/store/notification-store.ts";
import { Logger } from "@/lib/logger.ts";
import { NotificationMessage } from "@/lib/notificationMessage.ts";
import { createId } from "@/lib/id.ts";

export const router = createRouter({
  history: createWebHistory(),
  routes: routing,
});

export const previousRoute = ref<RouteLocationNormalizedLoadedGeneric | null>(null);

router.beforeEach((_, from) => {
  previousRoute.value = from;
});

router.onError((e, to, from) => {
  const notificationStore = useNotificationStore();
  Logger("Router error", { type: "error", e, enableDbLogging: true, to, from });

  const notificationMessage = new NotificationMessage(createId(), `Router error ${e}`, "error", 100, { durationMS: 5 * 60 * 1000 });
  notificationStore.addNotification(notificationMessage);
});
