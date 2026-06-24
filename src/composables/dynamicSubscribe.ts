import { subscribeStates, unSubscribeStates } from "../lib/iobroker-service.ts";
import { onUnmounted, watchEffect } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { IobrokerSubscription } from "@/iobroker-states/subscribed-states.iobroker.ts";

export const useDynamicSubscribe = (states: IobrokerSubscription | IobrokerSubscription[], unsubscribeState?: boolean) => {
  let subscribedStatesArray: IobrokerSubscription[] | null = null;

  watchEffect(() => {
    if (!useIobrokerStore().isAdminConnected) {
      return;
    }
    const statesArray = Array.isArray(states) ? states : [states];
    subscribeStates(statesArray);
    subscribedStatesArray = statesArray;
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
