import { type MaybeRefOrGetter, ref } from "vue";
import { insertNodeAt, removeNode, useSortable } from "@vueuse/integrations/useSortable";

/**
 * Drag & Drop für eine Liste, deren Reihenfolge im eigenen State liegt.
 * Sortable verschiebt das DOM-Element; wir setzen es zurück und melden nur `from`/`to`,
 * damit Vue anhand der `key`s neu rendert (gleiches Vorgehen wie `moveArrayElement` aus VueUse).
 *
 * Der Container darf nur die Listeneinträge als Kinder haben. Gezogen wird am Element mit `data-drag-handle`.
 *
 * @param el - Container-Element der Liste.
 * @param onMove - Wird mit altem und neuem Index aufgerufen.
 */
export const useSortableList = (el: MaybeRefOrGetter<HTMLElement | null | undefined>, onMove: (from: number, to: number) => void) => {
  useSortable(el, ref([]), {
    handle: "[data-drag-handle]",
    animation: 150,
    ghostClass: "opacity-40",
    watchElement: true,
    onUpdate: (e) => {
      if (e.oldIndex === undefined || e.newIndex === undefined) {
        return;
      }
      removeNode(e.item);
      insertNodeAt(e.from, e.item, e.oldIndex);
      onMove(e.oldIndex, e.newIndex);
    },
  });
};
