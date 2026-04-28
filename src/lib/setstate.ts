import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { AdminConnection } from "@iobroker/socket-client";
import { Logger } from "@/lib/logger.ts";

export const setstate = async (id: string | undefined, value: string | number | boolean, ack = false) => {
  if (adminConnection && id) {
    await adminConnection.setState(id, await transformValueToCorrectType(adminConnection, id, value), ack);
  }
  if (!id) {
    Logger("Cannot set state because id is undefined", { type: "warn" });
  }
  if (!adminConnection) {
    Logger("No admin connection available to set state", { type: "error" });
  }
};

const transformValueToCorrectType = async (
  connection: AdminConnection,
  id: string,
  value: string | number | boolean,
): Promise<string | number | boolean> => {
  const iobrokerObject = await connection.getObject(id);
  const type = iobrokerObject?.common?.type;

  if (!type) {
    return value;
  }
  switch (type) {
    case "number":
      return parseFloat(value.toString());
    case "boolean":
      return value === "true" || value === true;
    case "string":
      return value?.toString();
    default:
      return value;
  }
};
