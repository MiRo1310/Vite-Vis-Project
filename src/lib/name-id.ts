interface INameId {
  name?: string | null;
  id?: string | null;
}

/**
 * Sucht den Namen zu einer ID.
 *
 * @param id - Gesuchte ID.
 * @param array - Einträge mit `id` und `name`.
 * @returns Name oder `""`, wenn nichts gefunden wird.
 */
export const getNameById = <T extends INameId | null>(id?: string, array?: T[] | null): string => array?.find((item) => item?.id === id)?.name ?? "";

/**
 * Sucht die ID zu einem Namen (exakter Vergleich).
 *
 * @param name - Gesuchter Name.
 * @param array - Einträge mit `id` und `name`.
 * @returns ID oder `""`, wenn nichts gefunden wird.
 */
export const getIdByName = <T extends INameId | null>(name?: string, array?: T[] | null): string =>
  array?.find((item) => item?.name === name)?.id ?? "";
