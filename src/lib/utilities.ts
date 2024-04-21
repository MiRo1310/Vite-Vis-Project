export const stringToObject = (str: string) => {
  if (str === "" || !str) return {};

  return JSON.parse(str);
};

export const getID = (entry: SubKeyAdditive, idEntry: string, idsToControl: IdsToControl) => {
  console.log("getID", entry, idEntry, idsToControl);
  const arrayOfIds = idEntry.split(",").map((id) => id.trim());
  console.log(arrayOfIds);
  console.log(idsToControl.value?.[arrayOfIds[0]]?.[arrayOfIds[1] + entry + "Id"]);
  return idsToControl.value?.[arrayOfIds[0]]?.[arrayOfIds[1] + entry + "Id"];
};
