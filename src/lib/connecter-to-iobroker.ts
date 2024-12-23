import { AdminConnection } from "@iobroker/socket-client";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { idToSubscribe } from "../subscribeIds/ids-to-subscribe.ts";
import { IdToSubscribe as IdsToSubscribe, IobrokerState, IobrokerStateValue, NullableState } from "@/types.ts";

// Konfigurationswerte
export const IOBROKER_HOST = "192.168.1.81";
export const IOBROKER_ADMIN_PORT = "8081";
const IOBROKER_WS_PORT = "8084";

let iobrokerStore: any;
document.addEventListener("DOMContentLoaded", () => {
  iobrokerStore = useIobrokerStore();
});

export let adminConnection: AdminConnection | undefined = undefined;

export function loadScript(src: string, callback: any) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => callback();
  document.body.appendChild(script);
}

export async function init() {
  adminConnection = new AdminConnection({
    protocol: "ws",
    host: IOBROKER_HOST,
    port: IOBROKER_WS_PORT,
    admin5only: false,
    autoSubscribes: []
  });

  if (adminConnection) {
    await adminConnection.startSocket();
    await adminConnection.waitForFirstConnection();
    // console.log(await adminConnection.value.getEnums());
    // console.log(await adminConnection.value.getStates());
    useIobrokerStore().setAdminConnection(true);
    subscribeStates(idToSubscribe);
  }
}

export function unSubscribeStates(states: IdsToSubscribe<any>[]) {

  states.forEach((listObjectOfIds) => {
    listObjectOfIds.value.forEach((idObjectEntry) => {
      if (adminConnection) {
        adminConnection.unsubscribeState(idObjectEntry.id);
      }
    });

    iobrokerStore.removeIdFromSubscribedIds(listObjectOfIds.objectNameInStore);
  });
}

export function subscribeStates(states: IdsToSubscribe<any>[]) {

  states.forEach((item) => {

    item.value.forEach((stateId) => {

      if (adminConnection && !iobrokerStore.subscribedIds.includes(stateId.id)) {
        adminConnection.subscribeStateAsync(stateId.id, (id: string, state: IobrokerState) => {

          let value: IobrokerStateValue | null = state?.val;
          const timestamp = state?.ts;
          if (!isPresentAndTruthy(value)) {
            value = null;
          }

          let subKey = null;
          if (stateId.secondKey) {
            subKey = stateId.secondKey;
          }

          if (stateId.subKeyAdditive) {
            subKey += stateId.subKeyAdditive;
          }

          value = checkAndRevert(value, stateId.revertValue);

          iobrokerStore.setValues(
            item.objectNameInStore || null,
            value,
            id,
            stateId.firstKey || stateId.room || null,
            subKey
          );

          if (stateId.timestamp) {
            iobrokerStore.setValues(
              item.objectNameInStore || null,
              timestamp,
              id,
              stateId.firstKey || stateId.room || null,
              "timestamp"
            );
          }
        }).catch((e) => {
          console.error(`Error subscribing to ${stateId.id}`);
          console.error(e);
        });

        iobrokerStore.addIdToSubscribedIds(stateId.id);
      }

    });


  });
}

function checkAndRevert(value: IobrokerStateValue | null, revertValue: boolean | undefined) {
  if (revertValue && typeof value === "boolean") {
    return !value;
  }
  return value;
}

const isPresentAndTruthy = (value: NullableState) => {
  return value || value === false || value === 0;
};
