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

import { vE2E } from "../../src/directives/directives";

export interface IComponentOptions {
  global?: { directives: Record<string, any> };
}

Cypress.Commands.add("mountE2E", (component, options?: IComponentOptions) => {
  options = options || {};
  return cy.mount(component, {
    global: {
      directives: {
        e2e: vE2E,
        ...(options.global?.directives || {}),
      },
      ...options.global,
    },
    ...options,
  });
});

Cypress.Commands.add("getBySel", (sel: string) => {
  return cy.get(`[data-e2e="${sel}"]`);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mountE2E(component: any, options: IComponentOptions): Chainable<void>;
      getBySel(sel: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
