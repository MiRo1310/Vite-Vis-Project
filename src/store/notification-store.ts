import { defineStore } from "pinia";
import { type NotificationMessage } from "@/lib/notificationMessage.ts";
import { type TNotificationType } from "@/types/notification.ts";
import { type UnwrapRef } from "vue";

export interface NotificationStore {
  notifications: NotificationMessage[];
}
function filterByType(notifications: Array<UnwrapRef<NotificationMessage>>, type: TNotificationType): Array<UnwrapRef<NotificationMessage>> {
  return notifications.filter((n) => n.type === type);
}

export const useNotificationStore = defineStore("notificationStore", {
  state: (): NotificationStore => ({
    notifications: [],
  }),

  getters: {
    getFirstNotification(state) {
      return state.notifications[0];
    },
    getNotificationsFromHighestType(state) {
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
      this.notifications.push(notification);
      this.sortByPriority();
    },
    removeNotification(id: string) {
      this.notifications = this.notifications.filter((notification) => notification.id !== id);
    },
  },
});
