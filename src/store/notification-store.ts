import { defineStore } from "pinia";
import { type NotificationMessage } from "@/lib/notificationMessage.ts";
import { type TNotificationType } from "@/types/notification.ts";
import { type UnwrapRef } from "vue";

export interface NotificationStore {
  notifications: NotificationMessage[];
  currentIndex: number;
  tickerIntervalId: null | number;
}
function filterByType(notifications: Array<UnwrapRef<NotificationMessage>>, type: TNotificationType): Array<UnwrapRef<NotificationMessage>> {
  return notifications.filter((n) => n.type === type);
}

export const useNotificationStore = defineStore("notificationStore", {
  state: (): NotificationStore => ({
    notifications: [],
    currentIndex: 0,
    tickerIntervalId: null,
  }),

  getters: {
    getFirstNotification(state) {
      return state.notifications[0];
    },
    getNotificationsFromHighestType(state): Array<UnwrapRef<NotificationMessage>> {
      const error = filterByType(state.notifications, "error");
      const warnings = filterByType(state.notifications, "warning");
      const success = filterByType(state.notifications, "success");
      const info = filterByType(state.notifications, "info");
      return error.length ? error : warnings.length ? warnings : success.length ? success : info.length ? info : [];
    },
    getNotificationsByType() {
      return (type: TNotificationType) => this.notifications.filter((n) => n.type === type);
    },
  },
  actions: {
    sortByPriority() {
      this.notifications.sort((a, b) => b.priority - a.priority);
    },

    addNotification(notification: NotificationMessage) {
      if (this.notifications.some((n) => notification.id === n.id)) {
        return;
      }
      if (notification.hasDuration) {
        debouncedRemove(notification.durationMS as number, () => this.removeNotification(notification.id));
      }
      this.notifications.push(notification);
      this.sortByPriority();
      this.validateIndex();
    },
    removeNotification(id: string): void {
      this.notifications = this.notifications.filter((notification) => notification.id !== id);
      this.validateIndex();
    },
    nextTickerNotification(): UnwrapRef<NotificationMessage> | undefined {
      return this.getNotificationsFromHighestType[this.currentIndex];
    },
    validateIndex(): void {
      if (this.currentIndex >= this.getNotificationsFromHighestType.length) {
        this.currentIndex = 0;
      }
    },
    getTickerLabel(): string {
      return `${this.currentIndex + 1} / ${this.getNotificationsFromHighestType.length}`;
    },
    getNextIndex(): number {
      const length = this.getNotificationsFromHighestType.length;
      if (!length) {
        return 0;
      }
      const nextIndex = (this.currentIndex + 1) % length;

      this.currentIndex = nextIndex;
      return nextIndex;
    },
    startTicker(intervalMs = 5000): void {
      if (this.tickerIntervalId !== null) {
        return;
      }
      this.tickerIntervalId = setInterval(() => this.getNextIndex(), intervalMs);
    },
    stopTicker(): void {
      if (this.tickerIntervalId === null) {
        return;
      }
      clearInterval(this.tickerIntervalId);
      this.tickerIntervalId = null;
    },
  },
});

function debouncedRemove(ms: number, remove: () => void) {
  setTimeout(remove, ms);
}
