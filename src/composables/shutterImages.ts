import { blinds0, blinds10, blinds100, blinds20, blinds30, blinds40, blinds50, blinds60, blinds70, blinds80, blinds90 } from "@/public";
import { computed } from "vue";
import { isDefined } from "@vueuse/core";

const images = [blinds100, blinds90, blinds80, blinds70, blinds60, blinds50, blinds40, blinds30, blinds20, blinds10, blinds0];

/**
 * Get the index of the shutter image based on the position.
 * @param position - The position of the shutter (0-100).
 * @returns The index of the corresponding shutter image.
 */
export const getShutterImageIndexByPosition = (position?: number): number => {
  if (!isDefined(position) || position <= 0) {
    return 0;
  }
  const index = Math.ceil(position / 10);
  return index >= images.length ? images.length - 1 : index;
};

/**
 * Get the shutter image based on the position.
 * @param position - The position of the shutter (0-100).
 * @returns The corresponding shutter image.
 */
export const getShutterImageByPosition = computed(() => (position: number | undefined) => images[getShutterImageIndexByPosition(position)]);
