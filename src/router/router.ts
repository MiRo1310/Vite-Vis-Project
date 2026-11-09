import { createRouter, createWebHistory, isNavigationFailure, type RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { routing } from "@/router/routing.ts";
import { ref } from "vue";
import { useNotificationStore } from "@/store/notification-store.ts";
import { Logger } from "@/lib/logger.ts";
import { NotificationMessage } from "@/lib/notificationMessage.ts";
import { createId } from "@/lib/id.ts";
import { isChunkLoadError } from "@/lib/error.ts";
import { typedStorage } from "@/lib/local-storage.ts";
import { routes } from "@/router/routes.ts";

const MaxRetries = 3;

export const router = createRouter({
  history: createWebHistory(),
  routes: routing,
});

export const previousRoute = ref<RouteLocationNormalizedLoadedGeneric | null>(null);

router.beforeEach((_, from) => {
  previousRoute.value = from;
});

function resetRetry() {
  return typedStorage.setItem("routerReload", { attempt: 0, to: null, triedNavigateToHome: false });
}

router.afterEach((to, _from, failure) => {
  if (isNavigationFailure(failure)) {
    return;
  }
  const retry = typedStorage.getItem("routerReload");
  if (retry.attempt > 0 && retry.to === to.fullPath && !retry.triedNavigateToHome) {
    Logger.log(`Router reload successful after ${retry.attempt} attempt(s)`, null, { enableDbLogging: true, to });
  }
  if (retry.triedNavigateToHome) {
    Logger.warn("Router has opened home successful after router error, please fix error", null, { enableDbLogging: true, to });
  }
  resetRetry();
});

router.onError(async (e, to, from) => {
  let retry = typedStorage.getItem("routerReload");
  if (retry.to !== to.fullPath) {
    retry = resetRetry();
  }

  if (isChunkLoadError(e?.message) && retry.attempt < MaxRetries) {
    const attempt = retry.attempt + 1;
    typedStorage.setItem("routerReload", { to: to.fullPath, attempt, triedNavigateToHome: false });

    Logger.error(`Router error, try to reload, attempt: ${attempt}/${MaxRetries}`, e, { enableDbLogging: true, to, from });
    window.location.assign(to.fullPath);
    return;
  }
  if (isChunkLoadError(e?.message) && retry.attempt >= MaxRetries && !retry.triedNavigateToHome) {
    Logger.error(`Router error, after ${MaxRetries} attempts , try redirect to home`, e, { enableDbLogging: true, to, from });
    typedStorage.setItem("routerReload", { to: to.fullPath, attempt: MaxRetries, triedNavigateToHome: true });
    await router.replace(routes.home.path).catch((error) => {
      Logger.error("Router error, after redirect to home", error, { enableDbLogging: true, to, from });
    });
  }

  const notificationStore = useNotificationStore();
  Logger.error("Router error", e, { enableDbLogging: true, to, from });

  const notificationMessage = new NotificationMessage(createId(), `Router error ${e}`, "error", 100, { durationMS: 5 * 60 * 1000 });
  notificationStore.addNotification(notificationMessage);
});
