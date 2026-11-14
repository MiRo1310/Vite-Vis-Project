import { isDefined } from "@/lib/utilities.ts";
import { type DirectiveBinding } from "vue";

export const vE2E = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | undefined>) {
    if (!isDefined(binding.value)) {
      return;
    }
    el.setAttribute("data-e2e", binding.value);
  },
};
