import { faker } from "@faker-js/faker";
import { routes } from "@/router/routes.ts";

export const dataSel = (sel: string) => {
  return `[data-e2e='${sel}']`;
};

/**
 *  Assigns an alias to each GraphQL request based on its operationName, so tests can wait for it with cy.wait("@<operationName>")
 * use it like cy.wait("@Addresses");
 */
export const aliasGraphqlOperations = () => {
  cy.intercept("POST", "**", (req) => {
    const operationName = (req.body as { operationName?: string } | undefined)?.operationName;
    if (operationName) {
      req.alias = operationName;
    }
  });
};

export const clickESC = (alias: string) => {
  cy.get(alias).trigger("keydown", { key: "Escape" });
};

export const getFakerStreet = () => `${faker.location.street()} ${faker.location.buildingNumber()}`;
export const getFakerCity = () => `${faker.location.zipCode()} ${faker.location.city()}`;

export const addAddress = (name: string, street: string, city: string) => {
  cy.visit(routes.addresses.path);
  cy.getBySel("address-name").should("exist").type(name);
  cy.getBySel("address-street").should("exist").type(street);
  cy.getBySel("address-city").should("exist").type(city);
  cy.getBySel("address-submit").should("exist").click();
  cy.contains("td", name).should("exist");
};
