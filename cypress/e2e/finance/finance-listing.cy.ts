import { routes } from "@/router/routes.ts";

const unchecked = "text-red-300!";

// Legt eine Adresse und eine Position im Finance-Listing an (beide Checkboxen sind danach unchecked)
const createListing = (description: string, price: string) => {
  const addressName = `Cypress Adresse ${Date.now()}`;
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
  cy.getBySel("listing-date").type(today);
  cy.getBySel("listing-price").type(price);
  cy.getBySel("input-with-options").type(addressName);
  cy.get("textarea").type(description);
  cy.getBySel("listing-submit").click();
};

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
    createListing(description, "42.50");

    cy.contains("Wurde zur Liste hinzugefügt").should("exist");
    cy.contains("td", description).should("exist");
    cy.contains("td", "42,50").should("exist");
  });

  it("removes the red color only while both checkboxes are checked", () => {
    // Beschreibung ohne "Rechnung"/"Fahrtkosten", sonst greift das colorMapping
    const description = `Cypress Farbe Test ${Date.now()}`;
    createListing(description, "12.34");

    const row = () => cy.contains("code", description).closest("tr");
    const cell = () => cy.contains("code", description);

    // Neu angelegt: beide unchecked -> rot
    cell().should("have.class", unchecked);

    // Nur eine Checkbox -> weiterhin rot
    row().find(".isValid").click().should("have.attr", "data-state", "checked");
    cell().should("have.class", unchecked);

    // Beide Checkboxen -> nicht mehr rot
    row().find(".hasInvoice").click().should("have.attr", "data-state", "checked");
    cell().should("not.have.class", unchecked);

    // Eine wieder unchecked -> wieder rot
    row().find(".hasInvoice").click().should("have.attr", "data-state", "unchecked");
    cell().should("have.class", unchecked);
  });
});
