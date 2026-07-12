import { routes } from "@/router/routes.ts";

describe("Finance Listing (GraphQL Integration)", () => {
  it("loads travel costs from the real backend without a GraphQL error", () => {
    cy.visit(routes.finance.path);

    // Kein GraphQL-Error-Toast (siehe apolloClient.ts errorLink)
    cy.contains("GraphQL Error").should("not.exist");

    // Tabelle wird gerendert (auch bei leerer DB ohne Seed-Daten)
    cy.get("table").should("exist");
  });

  it("adds a new travel cost row via the form", () => {
    const uniqueSuffix = Date.now();
    const addressName = `Cypress Adresse ${uniqueSuffix}`;
    const description = `Cypress Mutation Test ${uniqueSuffix}`;
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
    cy.getBySel("listing-price").type("42.50");
    cy.getBySel("input-with-options").type(addressName);
    cy.get("textarea").type(description);
    cy.getBySel("listing-submit").click();

    cy.contains("Wurde zur Liste hinzugefügt").should("exist");
    cy.contains("td", description).should("exist");
    cy.contains("td", "42,50").should("exist");
  });
});
