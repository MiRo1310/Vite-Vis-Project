import "./commands";
import { vE2E } from "@/directives/directives.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mount } from "cypress/vue";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountE2E: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("mountE2E", (component, options?: Parameters<typeof mount>[1]) => {
  options = options ?? {};
  return cy.mount(component, {
    global: {
      directives: {
        e2e: vE2E,
        ...(options.global?.directives ?? {}),
      },
      ...options.global,
    },
    ...options,
  });
});
