import { SubKeyAdditive, IdsToControl } from "@/types";
import { Ref } from "vue";

export const stringToObject = (str: string) => {
  if (str === "" || !str) return {};

  return JSON.parse(str);
};

export const getID = (entry: SubKeyAdditive, idEntry: string, idsToControl: Ref<any>) => {

  const arrayOfIds = idEntry.split(",").map((id) => id.trim());
  console.log(arrayOfIds);
  console.log(idsToControl.value?.[arrayOfIds[0] as keyof IdsToControl])
  console.log(arrayOfIds[1] + entry + "Id")
  return idsToControl.value?.[arrayOfIds[0] as keyof IdsToControl]?.[arrayOfIds[1] + entry + "Id"];
};
