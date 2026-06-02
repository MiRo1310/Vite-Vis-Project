import { subscribe, unSubscribeStates } from "../lib/iobroker-service.ts";
import { onUnmounted, watchEffect } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { IobrokerSubscription } from "@/iobroker-states/states-subscribed/iobroker.iobroker.ts";

export const useDynamicSubscribe = (states: IobrokerSubscription, unsubscribeState?: boolean) => {
  let subscribedStatesArray: IobrokerSubscription[] | null = null;

  watchEffect(() => {
    if (!useIobrokerStore().isAdminConnected) {
      return;
    }
    subscribe(states);
    subscribedStatesArray = [states];
  });

  /**
   * Unsubscribe states on unmount
   */
  onUnmounted(() => {
    if (subscribedStatesArray && unsubscribeState) {
      unSubscribeStates(subscribedStatesArray);
    }
  });
};
