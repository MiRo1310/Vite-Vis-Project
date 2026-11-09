/// <reference types="cypress" />
// ***********************************************
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
      getBySel(sel: string): Chainable<JQuery<HTMLElement>>;
      closeToast(text: string): Chainable<void>;
    }
  }
}

export {};
