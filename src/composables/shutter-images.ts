import blinds0 from "@/public/blinds2_double_0.png";
import blinds10 from "@/public/blinds2_double_10.png";
import blinds20 from "@/public/blinds2_double_20.png";
import blinds30 from "@/public/blinds2_double_30.png";
import blinds40 from "@/public/blinds2_double_40.png";
import blinds50 from "@/public/blinds2_double_50.png";
import blinds60 from "@/public/blinds2_double_60.png";
import blinds70 from "@/public/blinds2_double_70.png";
import blinds80 from "@/public/blinds2_double_80.png";
import blinds90 from "@/public/blinds2_double_90.png";
import blinds100 from "@/public/blinds2_double_100.png";
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
