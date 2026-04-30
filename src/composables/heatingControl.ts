import { adminConnection } from "../lib/iobroker-service.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { RoomItems } from "@/types/types.ts";

const { heatingControl } = useIobrokerStore();

export function updateRoomInHeatingControl(val: RoomItems | null) {
  const id = heatingControl.room?.id;
  if (!id || val === null) {
    return;
  }
  adminConnection?.setState(id, val);
}
