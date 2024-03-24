export const stringToObject = (str: string) => {
  if (str === "") return {};
  if (!str) return {};
  return JSON.parse(str);
};

export const getID = (entry: WindowEntryId, idEntry: string, idsToControl: IdsToControl) => {
  const arrayOfIds = idEntry.split(",").map((id) => id.trim());
  return idsToControl.value?.[arrayOfIds[0]]?.[arrayOfIds[1] + entry + "Id"];
};
