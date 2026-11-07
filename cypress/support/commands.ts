/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { vE2E } from "@/directives/directives.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { type mount } from "cypress/vue";

export interface IComponentOptions {
  global?: { directives: Record<string, any> };
}

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

Cypress.Commands.add("getBySel", { prevSubject: "optional" }, (subject: any, sel: string) => {
  const selector = `[data-e2e="${sel}"]`;
  if (subject) {
    return cy.wrap(subject).find(selector);
  }
  return cy.get(selector);
});

Cypress.Commands.add("closeToast", (text: string) => {
  cy.contains("li", text).find("button").click();
  cy.contains(text).should("not.exist");
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mountE2E: typeof mount;
      getBySel(sel: string): Chainable<JQuery<HTMLElement>>;
      closeToast(text: string): Chainable<void>;
    }
  }
}
