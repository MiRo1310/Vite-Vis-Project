import type { Directive } from "vue";

declare module "@vue/runtime-core" {
  interface GlobalDirectives {
    component: Directive<HTMLElement, string>;
    e2e: Directive<HTMLElement, string>;
  }
}

export {};
