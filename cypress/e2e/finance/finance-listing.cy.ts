import { routes } from "@/router/routes.ts";
import { descriptionUncheckedColor as unchecked, financeListTextColorMapping } from "@/constants/finance.ts";
import { addAddress, aliasGraphqlOperations, clickESC, getFakerCity, getFakerStreet } from "../../support/utils.ts";
import { faker } from "@faker-js/faker";

describe("Finance Listing (GraphQL Integration)", () => {
  it("loads travel costs from the real backend without a GraphQL error", () => {
    cy.visit(routes.finance.path);

    // Kein GraphQL-Error-Toast (siehe apolloClient.ts errorLink)
    cy.contains("GraphQL Error").should("not.exist");

    // Tabelle wird gerendert (auch bei leerer DB ohne Seed-Daten)
    cy.get("table").should("exist");
  });

  it("adds a new travel cost row via the form", () => {
    const description = `Cypress Mutation Test ${Date.now()}`;
    // createListing prüft auch den Toast "Wurde zur Liste hinzugefügt"
    createListing(description, "42.50");

    cy.contains("td", description).should("exist");
    cy.contains("td", "42,50").should("exist");
  });

  it("removes the red color only while both checkboxes are checked", () => {
    const description = `Cypress Farbe Rechnung ${Date.now()}`;
    expect(description).to.include("Rechnung");
    createListing(description, "12.34");

    const cell = () => cy.contains("code", description);

    // Neu angelegt: beide unchecked -> rot
    cell().should("have.class", unchecked);

    // Nur eine Checkbox -> weiterhin rot
    toggleCheckbox(description, "isValidated", "checked");
    cell().should("have.class", unchecked);

    // Beide Checkboxen -> nicht mehr rot
    toggleCheckbox(description, "hasInvoice", "checked");
    cell().should("not.have.class", unchecked);

    // Eine wieder unchecked -> wieder rot
    toggleCheckbox(description, "hasInvoice", "unchecked");
    cell().should("have.class", unchecked);
  });

  financeListTextColorMapping.forEach(([keyword, color]) => {
    it(`uses ${color} for "${keyword}" when both checkboxes are checked`, () => {
      // Großschreibung prüft gleichzeitig, dass das Keyword case-insensitive erkannt wird
      const description = `Cypress ${keyword.toUpperCase()} ${Date.now()}`;
      createListing(description, "5.00");

      const cell = () => cy.contains("code", description);

      // Unchecked -> rot, Mapping-Farbe noch nicht gesetzt
      cell().should("have.class", unchecked).and("not.have.class", color);

      // Beide Checkboxen -> Mapping-Farbe statt rot
      toggleCheckbox(description, "isValidated", "checked");
      toggleCheckbox(description, "hasInvoice", "checked");
      cell().should("have.class", color).and("not.have.class", unchecked);

      // Eine wieder unchecked -> rot statt Mapping-Farbe
      toggleCheckbox(description, "isValidated", "unchecked");
      cell().should("have.class", unchecked).and("not.have.class", color);
    });
  });
});

describe("Dialog", () => {
  const name = faker.person.fullName();
  before(() => {
    addAddress(name, getFakerStreet(), getFakerCity());
  });

  it("dialog should have footer buttons", () => {
    const description = `Cypress Test ${Date.now()}`;
    cy.visit(routes.finance.path);
    createListing(description, "12.34");

    openEdit(description).should("exist").should("be.visible").as("dialog");
    const { abort, submit } = footerButtons("@dialog");

    abort().should("exist");
    submit().should("exist").click();
    cy.get("@dialog").should("not.exist");

    openEdit(description).should("exist").should("be.visible").as("dialogReopen");
    const { abort: abortReopen } = footerButtons("@dialogReopen");
    abortReopen().should("exist").click();
    cy.get("@dialogReopen").should("not.exist");
  });

  it("shows the new values when reopening after save", () => {
    const description = `Cypress Test ${Date.now()}`;

    createListing(description, "12.34");

    openEdit(description).should("exist").should("be.visible").as("dialog");
    const newDate = "2026-11-07";
    const newDescription = `Cypress Rechange Description ${Date.now()}`;
    const newPrice = "1111";
    const newAddress = name;
    setValues("@dialog", newDate, newDescription, newPrice, newAddress);

    const { submit } = footerButtons("@dialog");

    submit().should("not.be.disabled").should("exist").click();

    cy.get("@dialog").should("not.exist");

    openEdit(newDescription).should("exist").should("be.visible").as("dialogReopen");
    cy.get("table").should("not.contain", description);
    validateValues("@dialogReopen", newDate, newDescription, newPrice, newAddress);
  });

  it("shows the saved values when reopening after closing with the abort button", () => {
    const description = `Cypress Test ${Date.now()}`;
    cy.visit(routes.finance.path);
    const { addressName, date, price } = createListing(description, "12.34");

    openEdit(description).should("exist").should("be.visible").as("dialog");

    const { abort } = footerButtons("@dialog");
    abort().should("exist").click();

    openEdit(description).should("exist").should("be.visible").as("dialogReopen");
    validateValues("@dialogReopen", date, description, price, addressName);
  });

  it("shows the saved values when reopening after closing with ESC", () => {
    const description = `Cypress Test ${Date.now()}`;
    cy.visit(routes.finance.path);
    const { addressName, date, price } = createListing(description, "12.34");

    openEdit(description).should("exist").should("be.visible").as("dialog");

    clickESC("@dialog");

    cy.get("@dialog").should("not.exist");
    openEdit(description).should("exist").should("be.visible").as("dialogReopen");
    validateValues("@dialogReopen", date, description, price, addressName);
  });
});

const openEdit = (description: string) => {
  cy.get("table").contains("code", description).closest("tr").find("[data-e2e='listing-edit']").click();
  return cy.get("[role='dialog']");
};

const footerButtons = (alias: string) => {
  return { submit: () => cy.get(alias).getBySel("btn-submit"), abort: () => cy.get(alias).getBySel("btn-abort") };
};

// Klickt eine Checkbox der Zeile und wartet, bis die Mutation durch ist
const toggleCheckbox = (description: string, checkbox: "isValidated" | "hasInvoice", state: "checked" | "unchecked") => {
  cy.contains("code", description).closest("tr").find(`.${checkbox}`).click();
  cy.wait("@UpdateTravelCostCheckboxes");
  cy.contains("code", description).closest("tr").find(`.${checkbox}`).should("have.attr", "data-state", state);
};

// Legt eine Adresse und eine Position im Finance-Listing an (beide Checkboxen sind danach unchecked)
const createListing = (description: string, price: string) => {
  aliasGraphqlOperations();
  const addressName = faker.person.fullName();

  addAddress(addressName, getFakerStreet(), getFakerCity());

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
