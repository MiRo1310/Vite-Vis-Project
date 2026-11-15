import { dataSel } from "../utils.ts";
import { routes } from "@/router/routes.ts";

/**
 * Creates a new address via the address form and waits until it appears in the table.
 * Navigates to the addresses page, so call `cy.visit()` afterwards to return to the page under test.
 *
 * @param name - Name of the address entry (should be unique, e.g. via faker).
 * @param street - Street with house number.
 * @param city - Zip code with city.
 */
const add = (name: string, street: string, city: string) => {
  cy.visit(routes.addresses.path);
  cy.getBySel("address-name").should("exist").type(name);
  cy.getBySel("address-street").should("exist").type(street);
  cy.getBySel("address-city").should("exist").type(city);
  cy.getBySel("address-submit").should("exist").click();
  cy.contains("td", name).should("exist");
};

const getDialogButtons = (alias: string) => {
  return { update: () => cy.get(alias).getBySel("btn-submit"), close: () => cy.get(alias).getBySel("btn-close") };
};

const openDialog = (search: string) => {
  cy.get("table").contains("p", search).closest("tr").find("[data-e2e='address-edit']").click();
  return cy.get("[role='dialog']");
};

const validateValuesInDialog = (alias: string, name: string, street: string, city: string) => {
  cy.get(alias).find(dataSel("address-name")).should("exist").should("have.value", name);
  cy.get(alias).find(dataSel("address-street")).should("exist").should("have.value", street);
  cy.get(alias).find(dataSel("address-city")).should("exist").should("have.value", city);
};

const setValues = (alias: string, name: string, street: string, city: string) => {
  cy.get(alias).find(dataSel("address-name")).should("exist").as("name");
  cy.get(alias).find(dataSel("address-street")).should("exist").as("street");
  cy.get(alias).find(dataSel("address-city")).should("exist").as("city");

  cy.get("@name").clear().type(name);
  cy.get("@street").clear().type(street);
  cy.get("@city").clear().type(city);
};

export const addressHelper = { add, getDialogButtons, openDialog, validateValuesInDialog, setValues };
