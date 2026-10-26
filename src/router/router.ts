import { createRouter, createWebHistory, isNavigationFailure, type RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { routing } from "@/router/routing.ts";
import { ref } from "vue";
import { useNotificationStore } from "@/store/notification-store.ts";
import { Logger } from "@/lib/logger.ts";
import { NotificationMessage } from "@/lib/notificationMessage.ts";
import { createId } from "@/lib/id.ts";
import { isChunkLoadError } from "@/lib/error.ts";
import { typedStorage } from "@/lib/local-storage.ts";

const MaximalRetries = 3;

export const router = createRouter({
  history: createWebHistory(),
  routes: routing,
});

export const previousRoute = ref<RouteLocationNormalizedLoadedGeneric | null>(null);

router.beforeEach((_, from) => {
  previousRoute.value = from;
});

function resetRetry() {
  return typedStorage.setItem("routerReload", { attempt: 0, to: null });
}

router.afterEach((_to, _from, failure) => {
  if (!isNavigationFailure(failure)) {
    resetRetry();
  }
});

router.onError((e, to, from) => {
  let retry = typedStorage.getItem("routerReload");
  if (retry.to !== to.fullPath) {
    retry = resetRetry();
  }

  if (isChunkLoadError(e?.message) && retry.attempt < MaximalRetries) {
    typedStorage.setItem("routerReload", { to: to.fullPath, attempt: retry.attempt + 1 });

    Logger(`Router error, try to reload, attempt: ${retry.attempt}`, { type: "error", e, enableDbLogging: true, to, from });
    window.location.assign(to.fullPath);
    return;
  }

  const notificationStore = useNotificationStore();
  Logger("Router error", { type: "error", e, enableDbLogging: true, to, from });

  const notificationMessage = new NotificationMessage(createId(), `Router error ${e}`, "error", 100, { durationMS: 5 * 60 * 1000 });
  notificationStore.addNotification(notificationMessage);
});
