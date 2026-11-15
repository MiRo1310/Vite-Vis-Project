import { faker } from "@faker-js/faker";

/**
 * Builds a CSS selector for elements tagged with a `data-e2e` attribute.
 *
 * @param sel - Value of the `data-e2e` attribute.
 * @returns Selector like `[data-e2e='listing-edit']`, usable with `cy.get()` or `.find()`.
 * @example cy.get("tr").find(dataSel("isValidated-checkbox"));
 */
export const dataSel = (sel: string) => `[data-e2e='${sel}']`;

/**
 * Sends an Escape keydown to the aliased element, e.g. to close a dialog.
 *
 * @param alias - Cypress alias including the `@`, e.g. `"@dialog"`.
 */
export const clickESC = (alias: string) => {
  cy.get(alias).trigger("keydown", { key: "Escape" });
};

/**
 * Generates a random street with house number.
 *
 * @returns Street like `"Hauptstraße 12"`.
 */
const getFakerStreet = () => `${faker.location.street()} ${faker.location.buildingNumber()}`;

/**
 * Generates a random zip code with city.
 *
 * @returns City like `"12345 Berlin"`.
 */
const getFakerCity = () => `${faker.location.zipCode()} ${faker.location.city()}`;

/**
 * Assigns an alias to each GraphQL request based on its `operationName`,
 * so tests can wait for it with `cy.wait("@<operationName>")`.
 *
 * @example
 * aliasGraphqlOperations();
 * cy.wait("@Addresses");
 */
const aliasGraphqlOperations = () => {
  cy.intercept("POST", "**", (req) => {
    const operationName = (req.body as { operationName?: string } | undefined)?.operationName;
    if (operationName) {
      req.alias = operationName;
    }
  });
};

/**
 * Stubs the response of a GraphQL operation with a GraphQL error, so the request never reaches the backend.
 * All other operations are passed through unchanged. Wait for it with `cy.wait("@<operationName>Failed")`.
 *
 * Must be called **after** `aliasGraphqlOperations()`: Cypress runs intercepts in reverse order and
 * `req.reply()` stops older handlers, so this one has to be registered last and sets its own alias.
 *
 * @param operationName - GraphQL operation name to fail, e.g. `"UpdateTravelCostCheckboxes"`.
 * @example
 * provokeGraphQlError("UpdateTravelCostCheckboxes");
 * cy.get("@checkbox").click();
 * cy.wait("@UpdateTravelCostCheckboxesFailed");
 */
const provokeGraphQlError = (operationName: string) => {
  cy.intercept("POST", "**", (req) => {
    if (req.body?.operationName === operationName) {
      req.alias = `${operationName}Failed`;
      req.reply({ errors: [{ message: "Cypress provozierter Fehler" }] });
      // Alternative: Netzwerkfehler statt GraphQL-Fehler
      // req.reply({ forceNetworkError: true });
    }
  });
};

export const gql = { provokeGraphQlError, aliasGraphqlOperations };
export const fake = { city: getFakerCity, street: getFakerStreet };
