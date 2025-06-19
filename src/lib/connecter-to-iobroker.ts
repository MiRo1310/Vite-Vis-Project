import { AdminConnection } from "@iobroker/socket-client";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { idToSubscribe } from "../subscribeIds/ids-to-subscribe.ts";
import {
  IdToSubscribe as IdsToSubscribe,
  IobrokerState,
  IobrokerStateValue,
  NullableState,
} from "@/types/types.ts";
import { IOBROKER_HOST, IOBROKER_WS_PORT } from "@/config/config.ts";

let iobrokerStore: any;
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
    protocol: "ws",
    host: IOBROKER_HOST,
    port: IOBROKER_WS_PORT,
    admin5only: false,
    autoSubscribes: [],
  });

  if (adminConnection) {
    await adminConnection.startSocket();
    await adminConnection.waitForFirstConnection();
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
      if (
        adminConnection &&
        !iobrokerStore.subscribedIds.includes(stateId.id)
      ) {
        adminConnection
          .subscribeStateAsync(
            stateId.id,
            (id: string, state: IobrokerState) => {
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

              iobrokerStore.setValues({
                objectNameInStore: item.objectNameInStore || null,
                val: value,
                id,
                firstKey: stateId.firstKey || stateId.room || null,
                secondKey: subKey,
              });

              if (stateId.timestamp) {
                iobrokerStore.setValues({
                  objectNameInStore: item.objectNameInStore || null,
                  val: timestamp,
                  id,
                  firstKey: stateId.firstKey || stateId.room || null,
                  secondKey: "ts",
                  timestamp: true,
                });
              }
            },
          )
          .catch((e) => {
            console.error(`Error subscribing to ${stateId.id}`);
            console.error(e);
          });

        iobrokerStore.addIdToSubscribedIds(stateId.id);
      }
    });
  });
}

function checkAndRevert(
  value: IobrokerStateValue | null,
  revertValue: boolean | undefined,
) {
  if (revertValue && typeof value === "boolean") {
    return !value;
  }
  return value;
}

const isPresentAndTruthy = (value: NullableState) => {
  return value || value === false || value === 0;
};
