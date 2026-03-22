export const vComponent = {
  mounted(el: HTMLElement, binding: any) {
    el.setAttribute("data-component", binding.value);
  },
};

export const vE2E = {
  mounted(el: HTMLElement, binding: any) {
    el.setAttribute("data-e2e", binding.value);
  },
};
