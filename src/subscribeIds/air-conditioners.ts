import { StoreValue } from "@/store/ioBrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface AirConditioners {
  schlafenOnline: StoreValue<boolean>;
  schlafenPower: StoreValue<number>;
  schlafenPowerStatus: StoreValue<boolean>;
  schlafenIsTemp: StoreValue<number>;
  schlafenSetTemp: StoreValue<number>;

  childOnline: StoreValue<boolean>;
  childPowerStatus: StoreValue<boolean>;
  childPower: StoreValue<number>;
  childIsTemp: StoreValue<number>;
  childSetTemp: StoreValue<number>;
}

export const airConditioners: IdToSubscribe<AirConditioners> = {
  storeFolder: "airConditioners",
  value: [
    { id: "tuya.0.bf371cfe643bf102afauv6.online", key: "schlafenOnline" },
    { id: "tuya.0.bf371cfe643bf102afauv6.1", key: "schlafenPowerStatus" },
    { id: "shelly.0.SHPLG-S#4022D8894549#1.Relay0.Power", key: "schlafenPower" },
    { id: "tuya.0.bf371cfe643bf102afauv6.8", key: "schlafenIsTemp" },
    { id: "tuya.0.bf371cfe643bf102afauv6.5", key: "schlafenSetTemp" },

    { id: "tuya.0.bf57f6b83543b4f45dwh13.online", key: "childOnline" },
    { id: "tuya.0.bf57f6b83543b4f45dwh13.1", key: "childPowerStatus" },
    { id: "shelly.0.SHPLG-S#4022D8895174#1.Relay0.Power", key: "childPower" },
    { id: "tuya.0.bf57f6b83543b4f45dwh13.8", key: "childIsTemp" },
    { id: "tuya.0.bf57f6b83543b4f45dwh13.5", key: "childSetTemp" },
  ],
};
