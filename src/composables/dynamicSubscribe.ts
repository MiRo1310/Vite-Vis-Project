import { subscribeStates, unSubscribeStates } from "@/lib/iobroker/connecter-to-iobroker";
import { onUnmounted, watchEffect } from "vue";
import { IdToSubscribe } from "@/types";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";

export const useDynamicSubscribe = (states: IdToSubscribe<any>[], unsubscribeState?: boolean) => {

  let subscribedStatesArray: IdToSubscribe<any>[] | null = null;

  watchEffect(() => {
    if (!useIobrokerStore().isAdminConnected) {
      return;
    }
    subscribeStates(states);
    subscribedStatesArray = states;
  });


  onUnmounted(() => {
    if (subscribedStatesArray && unsubscribeState) {
      unSubscribeStates(subscribedStatesArray);
    }
  });
};