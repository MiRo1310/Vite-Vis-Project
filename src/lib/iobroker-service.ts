import { AdminConnection } from "@iobroker/socket-client";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { idToSubscribeOnAppStart } from "../iobroker-states/index.iobroker.ts";
import { IdToSubscribe as IdsToSubscribe, IobrokerState, IobrokerStateValue } from "@/types/types.ts";
import { IOBROKER_HOST, IOBROKER_WS_PORT } from "@/config/config.ts";
import { isDefined } from "@vueuse/core";
import { Logger } from "@/lib/logger.ts";
import { invertBoolean } from "@/lib/boolean.ts";
import { IoBrokerStore } from "@/store";

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
    subscribeStates(idToSubscribeOnAppStart);
  }
}

export function unSubscribeStates(states: IdsToSubscribe<any>[]) {
  states.forEach((listObjectOfIds) => {
    listObjectOfIds.value.forEach((idObjectEntry) => {
      if (adminConnection) {
        adminConnection.unsubscribeState(idObjectEntry.id);
      }
    });

    iobrokerStore?.removeIdFromSubscribedIds(listObjectOfIds.storeFolder);
  });
}

export function subscribeStates(states: IdsToSubscribe<any>[]) {
  states.forEach((item) => {
    item.value.forEach((stateId) => {
      if (!adminConnection || iobrokerStore?.subscribedIds.includes(stateId.id)) {
        return;
      }
      try {
        adminConnection
          .subscribeStateAsync(stateId.id, (id: string, state: IobrokerState) => {
            let value: IobrokerStateValue | null = state.val;

            if (!isDefined(value)) {
              value = null;
            }

            iobrokerStore?.setValues({
              state,
              storeFolder: item.storeFolder,
              val: stateId.invertValue ? invertBoolean(!!value) : value,
              id,
              key: String(stateId.key),
              subKey: stateId.subKey,
            });
          })
          .catch((e) => {
            Logger(`Error subscribing to ${stateId.id}`, { e });
          });
        iobrokerStore?.addIdToSubscribedIds(stateId.id);
      } catch (e) {
        Logger("Error subscribing to", { value: stateId.id, e });
      }
    });
  });
}
