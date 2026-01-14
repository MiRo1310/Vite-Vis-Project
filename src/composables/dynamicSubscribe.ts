import { subscribeStates, unSubscribeStates } from "@/lib/connecter-to-iobroker.ts";
import { onUnmounted, watchEffect } from "vue";
import { IdToSubscribe } from "@/types/types.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

export const useDynamicSubscribe = (states: IdToSubscribe<any> | IdToSubscribe<any>[], unsubscribeState?: boolean) => {
  if (!Array.isArray(states)) {
    states = [states];
  }
  let subscribedStatesArray: IdToSubscribe<any>[] | null = null;

  watchEffect(() => {
    if (!useIobrokerStore().isAdminConnected) {
      return;
    }
    subscribeStates(states);
    subscribedStatesArray = states;
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
