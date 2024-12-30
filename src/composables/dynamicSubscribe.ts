import { subscribeStates, unSubscribeStates } from "@/lib/connecter-to-iobroker.ts";
import { onUnmounted, watchEffect } from "vue";
import { IdToSubscribe } from "@/types/types.ts";
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