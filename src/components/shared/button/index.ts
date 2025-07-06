import { ButtonVariants } from "@/components/shared/button/Button.vue";
import { Power, PowerOff } from "lucide-vue-next";
import type { FunctionalComponent } from "vue";

export { default as Button } from "./Button.vue";

export const buttonDefaults: ButtonVariantProps = {
  variant: "outline",
  size: "default",
  action: "default",
  text: "default",
  icon: "default",
};

export interface ButtonVariantProps {
  variant?: keyof ButtonVariants["variant"];
  size?: keyof ButtonVariants["size"];
  action?: keyof ButtonVariants["action"];
  text?: keyof ButtonVariants["text"];
  icon?: keyof ButtonVariants["icons"];
}

export const buttonIcons: ButtonIcons = {
  default: () => null,
  power: Power,
  powerOff: PowerOff,
};

export type ButtonIcons = Record<keyof ButtonVariants["icons"], FunctionalComponent>;
