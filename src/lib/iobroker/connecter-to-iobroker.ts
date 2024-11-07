import { AdminConnection } from "@iobroker/socket-client";
import { ref } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { idToSubscribe } from "./ids-to-subscribe";
import { IobrokerState, IobrokerStateValue, NullableState } from "@/types";

// Konfigurationswerte
export const IOBROKER_HOST = "192.168.1.81";
export const IOBROKER_ADMIN_PORT = "8081";
const IOBROKER_WS_PORT = "8084";

let iobrokerStore: any
document.addEventListener("DOMContentLoaded", () => {
  iobrokerStore = useIobrokerStore();
});

export const adminConnection = ref<AdminConnection>();

export function loadScript(src: string, callback: any) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => callback();
  document.body.appendChild(script);
}

export async function init() {
  //
  adminConnection.value = new AdminConnection({
    protocol: "ws",
    host: IOBROKER_HOST,
    port: IOBROKER_WS_PORT,
    admin5only: false,
    autoSubscribes: [],
  });
  console.log(idToSubscribe);
  if (adminConnection.value) {
    await adminConnection.value.startSocket();
    await adminConnection.value.waitForFirstConnection();
    // console.log(await adminConnection.value.getEnums());
    // console.log(await adminConnection.value.getStates());
    idToSubscribe.forEach((listObjectOfIds) => {
      listObjectOfIds.value.forEach((idObjectEntry) => {
        if (adminConnection.value) {
          adminConnection.value.subscribeStateAsync(idObjectEntry.id, (id: string, state: IobrokerState) => {
            let value: IobrokerStateValue | null = state?.val;
            if (!isPresentAndTruthy(value)) {
              value = null;
            }

            let subKey = null;
            if (idObjectEntry.secondKey) {
              subKey = idObjectEntry.secondKey;
            }

            if (idObjectEntry.subKeyAdditive) {

              subKey += idObjectEntry.subKeyAdditive;
            }

            iobrokerStore.setValues(
              listObjectOfIds.objectNameInStore || null,
              value,
              id,
              idObjectEntry.firstKey || idObjectEntry.room || null,
              subKey,
            );
          });
        }
      });
    });
  }
}

const isPresentAndTruthy = (value: NullableState) => {
  return value || value === false || value === 0;
}
