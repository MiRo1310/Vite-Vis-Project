import { AdminConnection } from "@iobroker/socket-client";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { IobrokerState } from "@/types/types.ts";
import { IOBROKER_HOST, IOBROKER_WS_PORT } from "@/config/config.ts";
import { Logger } from "@/lib/logger.ts";
import { invertBoolean } from "@/lib/boolean.ts";
import { IoBrokerStore } from "@/store";
import { iobrokerData, IobrokerSubscription } from "@/iobroker-states/states-subscribed/iobroker.iobroker.ts";

let iobrokerStore: IoBrokerStore | null;
document.addEventListener("DOMContentLoaded", () => {
  iobrokerStore = useIobrokerStore();
});

export let adminConnection: AdminConnection | undefined = undefined;

export function loadScript(src: string) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => init();
  document.body.appendChild(script);
}

export async function init() {
  adminConnection = new AdminConnection({
    protocol: "ws:",
    host: IOBROKER_HOST,
    port: IOBROKER_WS_PORT,
    admin5only: false,
    autoSubscribes: [],
  });

  if (adminConnection) {
    await adminConnection.startSocket();
    await adminConnection.waitForFirstConnection();
    useIobrokerStore().setAdminConnection(true);
    subscribeIobrokerStates();
  }
}

export function subscribeStates(states: IobrokerSubscription[]) {
  states.forEach((item) => subscribe(item));
}

export function unSubscribeStates(states: IobrokerSubscription[]) {
  states.forEach((listObjectOfIds) => {
    listObjectOfIds.value.forEach((idObjectEntry) => {
      if (adminConnection) {
        adminConnection.unsubscribeState(idObjectEntry.id);
      }
    });

    iobrokerStore?.removeIdFromSubscribedIds(listObjectOfIds.channel);
  });
}

export function subscribeIobrokerStates() {
  iobrokerData.forEach((item) => {
    subscribe(item);
  });
}

export const subscribe = (item: IobrokerSubscription) => {
  item.value.forEach(async (stateId) => {
    if (!adminConnection || iobrokerStore?.subscribedIds.includes(stateId.id)) {
      return;
    }

    iobrokerStore?.addIdToSubscribedIds(stateId.id);
    await adminConnection
      .subscribeStateAsync(stateId.id, (id: string, state: IobrokerState) => {
        const value = state.val ?? null;

        iobrokerStore?.setValues({
          state,
          val: "invertValue" in stateId && stateId.invertValue ? invertBoolean(!!value) : value,
          id,
          channel: String(item.channel),
          key: String(stateId.key),
          group: "group" in stateId ? String(stateId.group) : undefined,
        });
      })
      .catch((e) => {
        Logger(`Error subscribing to ${stateId.id}`, { e });
      });
  });
};
