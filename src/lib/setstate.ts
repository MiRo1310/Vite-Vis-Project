import { adminConnection } from "@/lib/connecter-to-iobroker.ts";


export const setstate = async (id: string | undefined, value: string | number | boolean, ack = false) => {
  if (adminConnection && id) {
    await adminConnection.setState(id, await transformValueToCorrectType(id, value), ack);
  }
};

const transformValueToCorrectType = async (id: string, value: string | number | boolean): Promise<string | number | boolean> => {
  if (adminConnection) {

    const iobrokerObject = await adminConnection.getObject(id);
    const type = iobrokerObject?.common?.type;

    if (type) {
      switch (type) {
        case "number":
          return parseFloat(value?.toString());
        case "boolean":
          return value === "true" || value === true;
        case "string":
          return value?.toString();
        default:
          return value;
      }
    }
  }
  return value;
};