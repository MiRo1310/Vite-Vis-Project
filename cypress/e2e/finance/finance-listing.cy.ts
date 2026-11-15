import { routes } from "@/router/routes.ts";
import { descriptionUncheckedColor as unchecked, financeListTextColorMapping } from "@/constants/finance.ts";
import { clickESC, dataSel, getFakerCity, getFakerStreet, provokeGraphQlError } from "../../support/utils.ts";
import { faker } from "@faker-js/faker";
import { texts } from "@/text/de.ts";
import { finance } from "../../support/finance-helper";

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
    finance.listing.createListing(description, "42.50");

    cy.contains("td", description).should("exist");
    cy.contains("td", "42,50").should("exist");
  });

  it("removes the red color only while both checkboxes are checked", () => {
    const description = `Cypress Farbe Rechnung ${Date.now()}`;
    expect(description).to.include("Rechnung");
    finance.listing.createListing(description, "12.34");

    const cell = () => cy.contains("code", description);

    // Neu angelegt: beide unchecked -> rot
    cell().should("have.class", unchecked);

    // Nur eine Checkbox -> weiterhin rot
    finance.listing.toggleCheckbox(description, "isValidated", "checked");
    cell().should("have.class", unchecked);

    // Beide Checkboxen -> nicht mehr rot
    finance.listing.toggleCheckbox(description, "hasInvoice", "checked");
    cell().should("not.have.class", unchecked);

    // Eine wieder unchecked -> wieder rot
    finance.listing.toggleCheckbox(description, "hasInvoice", "unchecked");
    cell().should("have.class", unchecked);
  });

  financeListTextColorMapping.forEach(([keyword, color]) => {
    it(`uses ${color} for "${keyword}" when both checkboxes are checked`, () => {
      // Großschreibung prüft gleichzeitig, dass das Keyword case-insensitive erkannt wird
      const description = `Cypress ${keyword.toUpperCase()} ${Date.now()}`;
      finance.listing.createListing(description, "5.00");

      const cell = () => cy.contains("code", description);

      // Unchecked -> rot, Mapping-Farbe noch nicht gesetzt
      cell().should("have.class", unchecked).and("not.have.class", color);

      // Beide Checkboxen -> Mapping-Farbe statt rot
      finance.listing.toggleCheckbox(description, "isValidated", "checked");
      finance.listing.toggleCheckbox(description, "hasInvoice", "checked");
      cell().should("have.class", color).and("not.have.class", unchecked);

      // Eine wieder unchecked -> rot statt Mapping-Farbe
      finance.listing.toggleCheckbox(description, "isValidated", "unchecked");
      cell().should("have.class", unchecked).and("not.have.class", color);
    });
  });
});

describe("Dialog", () => {
  const name = faker.person.fullName();
  before(() => {
    finance.address.add(name, getFakerStreet(), getFakerCity());
  });

  it("dialog should have footer buttons", () => {
    const description = `Cypress Test ${Date.now()}`;
    cy.visit(routes.finance.path);
    finance.listing.createListing(description, "12.34");

    finance.listing.edit(description).should("exist").should("be.visible").as("dialog");
    const { abort, submit } = finance.listing.getDialogButtons("@dialog");

    abort().should("exist");
    submit().should("exist").click();
    cy.get("@dialog").should("not.exist");

    finance.listing.edit(description).should("exist").should("be.visible").as("dialogReopen");
    const { abort: abortReopen } = finance.listing.getDialogButtons("@dialogReopen");
    abortReopen().should("exist").click();
    cy.get("@dialogReopen").should("not.exist");
  });

  it("shows the new values when reopening after save", () => {
    const description = `Cypress Test ${Date.now()}`;

    finance.listing.createListing(description, "12.34");

    finance.listing.edit(description).should("exist").should("be.visible").as("dialog");
    const newDate = "2026-11-07";
    const newDescription = `Cypress Rechange Description ${Date.now()}`;
    const newPrice = "1111";
    const newAddress = name;
    finance.listing.setValues("@dialog", newDate, newDescription, newPrice, newAddress);

    const { submit } = finance.listing.getDialogButtons("@dialog");

    submit().should("not.be.disabled").should("exist").click();

    cy.get("@dialog").should("not.exist");

    finance.listing.edit(newDescription).should("exist").should("be.visible").as("dialogReopen");
    cy.get("table").should("not.contain", description);
    finance.listing.validateValues("@dialogReopen", newDate, newDescription, newPrice, newAddress);
  });

  it("shows the saved values when reopening after closing with the abort button", () => {
    const description = `Cypress Test ${Date.now()}`;
    cy.visit(routes.finance.path);
    const { addressName, date, price } = finance.listing.createListing(description, "12.34");

    finance.listing.edit(description).should("exist").should("be.visible").as("dialog");

    const { abort } = finance.listing.getDialogButtons("@dialog");
    abort().should("exist").click();

    finance.listing.edit(description).should("exist").should("be.visible").as("dialogReopen");
    finance.listing.validateValues("@dialogReopen", date, description, price, addressName);
  });

  it("shows the saved values when reopening after closing with ESC", () => {
    const description = `Cypress Test ${Date.now()}`;
    cy.visit(routes.finance.path);
    const { addressName, date, price } = finance.listing.createListing(description, "12.34");

    finance.listing.edit(description).should("exist").should("be.visible").as("dialog");

    clickESC("@dialog");

    cy.get("@dialog").should("not.exist");
    finance.listing.edit(description).should("exist").should("be.visible").as("dialogReopen");
    finance.listing.validateValues("@dialogReopen", date, description, price, addressName);
  });
});

describe("Graphql Error", () => {
  it("resets the validated checkbox after graphql error", () => {
    const description = `Cypress Test GraphQl Error ${Date.now()}`;

    finance.listing.createListing(description, "100");

    cy.get("table").contains("code", description).closest("tr").find(dataSel("isValidated-checkbox")).as("validatedCheckbox");

    provokeGraphQlError("UpdateTravelCostCheckboxes");

    cy.get("@validatedCheckbox").should("have.attr", "data-state", "unchecked").click();
    cy.wait("@UpdateTravelCostCheckboxesFailed");

    cy.contains(texts.finance.listing.errorUpdateCheckbox).should("be.visible");
    cy.get("@validatedCheckbox").should("have.attr", "data-state", "unchecked");
  });

  it("resets the has Invoice checkbox after graphql error", () => {
    const description = `Cypress Test GraphQl Error ${Date.now()}`;

    finance.listing.createListing(description, "100");

    cy.get("table").contains("code", description).closest("tr").find(dataSel("hasInvoice-checkbox")).as("validatedCheckbox");

    provokeGraphQlError("UpdateTravelCostCheckboxes");
    cy.get("@validatedCheckbox").should("have.attr", "data-state", "unchecked").click();
    cy.wait("@UpdateTravelCostCheckboxesFailed");

    cy.contains(texts.finance.listing.errorUpdateCheckbox).should("be.visible");
    cy.get("@validatedCheckbox").should("have.attr", "data-state", "unchecked");
  });
});
