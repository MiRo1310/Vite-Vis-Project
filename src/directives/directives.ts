import { isDefined } from "@vueuse/core";

export const vComponent = {
  mounted(el: HTMLElement, binding: any) {
    if (!isDefined(binding.value)) {
      return;
    }
    el.setAttribute("data-component", binding.value);
  },
};

export const vE2E = {
  mounted(el: HTMLElement, binding: any) {
    if (!isDefined(binding.value)) {
      return;
    }
    el.setAttribute("data-e2e", binding.value);
  },
};
