import { routes } from "@/router/routes.ts";

import { addressHelper } from "./address.ts";
import { faker } from "@faker-js/faker";
import { fake, gql } from "../utils.ts";

const edit = (description: string) => {
  cy.get("table").contains("code", description).closest("tr").find("[data-e2e='listing-edit']").click();
  return cy.get("[role='dialog']");
};

const getDialogButtons = (alias: string) => {
  return { clickSubmit: () => cy.get(alias).getBySel("btn-submit").click(), clickAbort: () => cy.get(alias).getBySel("btn-close").click() };
};

// Klickt eine Checkbox der Zeile und wartet, bis die Mutation durch ist
const toggleCheckbox = (description: string, checkbox: "isValidated" | "hasInvoice", state: "checked" | "unchecked") => {
  cy.contains("code", description).closest("tr").find(`.${checkbox}`).click();
  cy.wait("@UpdateTravelCostCheckboxes");
  cy.contains("code", description).closest("tr").find(`.${checkbox}`).should("have.attr", "data-state", state);
};

// Legt eine Adresse und eine Position im Finance-Listing an (beide Checkboxen sind danach unchecked)
const createListing = (description: string, price: string) => {
  gql.aliasGraphqlOperations();
  const addressName = faker.person.fullName();

  addressHelper.add(addressName, fake.street(), fake.city());

  const today = new Date().toISOString().slice(0, 10);

  // Adresse anlegen, wird für die Auswahl im Listing-Formular benötigt
  cy.visit(routes.addresses.path);
  cy.getBySel("address-name").type(addressName);
  cy.getBySel("address-street").type("Teststraße 1");
  cy.getBySel("address-city").type("Teststadt");
  cy.getBySel("address-submit").click();
  cy.contains("td", addressName).should("exist");

  // Neue Position im Finance-Listing anlegen
  cy.visit(routes.finance.path);
  cy.wait("@TravelCost");
  cy.getBySel("listing-date").type(today);
  cy.getBySel("listing-price").type(price);
  cy.getBySel("input-with-options").type(addressName);
  cy.get("textarea").type(description);
  cy.getBySel("listing-submit").click();

  // Erst weiter, wenn die Tabelle nach dem Anlegen neu geladen ist, sonst wird die Zeile während der Klicks neu gerendert
  cy.wait("@AddTravelCost");
  cy.wait("@TravelCost");
  cy.contains("code", description).should("exist");

  // Toast schließen, er liegt sonst über den unteren Zeilen und blockiert die Checkbox-Klicks
  cy.contains("li", "Wurde zur Liste hinzugefügt").find("button").click();
  cy.contains("Wurde zur Liste hinzugefügt").should("not.exist");
  return { description, price, date: today, addressName };
};

const setValues = (alias: string, date: string, description: string, price: string, address: string) => {
  cy.get(alias).find("input[type='date']").should("exist").as("dateInput");
  cy.get(alias).find("textarea").should("exist").as("descriptionInput");
  cy.get(alias).find("input[type='number']").should("exist").as("amountInput");
  cy.get(alias).find("input[list='address']").should("exist").as("addressInput");
  cy.get("@dateInput").clear().type(date);
  cy.get("@descriptionInput").clear().type(description);
  cy.get("@amountInput").clear().type(price);
  cy.get("@addressInput").clear().type(address);
};

const validateValues = (alias: string, date: string, description: string, price: string, address: string) => {
  cy.get(alias).find("input[type='date']").should("exist").should("have.value", date);
  cy.get(alias).find("textarea").should("exist").as("descriptionInput").should("have.value", description);
  cy.get(alias).find("input[type='number']").should("exist").as("amountInput").should("have.value", price);
  cy.get(alias).find("input[list='address']").should("exist").as("addressInput").should("have.value", address);
};

export const listingHelper = { validateValues, setValues, createListing, toggleCheckbox, edit, getDialogButtons };
