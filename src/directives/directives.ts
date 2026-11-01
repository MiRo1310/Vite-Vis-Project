import { isDefined } from "@/lib/utilities.ts";

export const vE2E = {
  mounted(el: HTMLElement, binding: any) {
    if (!isDefined(binding.value)) {
      return;
    }
    el.setAttribute("data-e2e", binding.value);
  },
};
