import type { Directive } from "vue";

declare module "@vue/runtime-core" {
  interface GlobalDirectives {
    e2e: Directive<HTMLElement, string>;
  }
}

export {};
