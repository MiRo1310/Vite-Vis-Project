import { routes } from "@/router/routes.ts";

describe("Finance Listing (GraphQL Integration)", () => {
  it("loads addresses from the real backend without a GraphQL error", () => {
    cy.visit(routes.addresses.path);

    // Kein GraphQL-Error-Toast (siehe apolloClient.ts errorLink)
    cy.contains("GraphQL Error").should("not.exist");

    // Tabelle wird gerendert (auch bei leerer DB ohne Seed-Daten)
    cy.get("table").should("exist");
  });

  it("adds a new address and should be available in listing", () => {
    const user = "First User";
    cy.visit(routes.addresses.path);

    cy.getBySel("address-name").should("exist").type(user);
    cy.getBySel("address-street").should("exist").type("Street 1");
    cy.getBySel("address-city").should("exist").type("City");
    cy.getBySel("address-submit").should("exist").click();

    cy.get("table").should("exist");
    cy.contains("table tr", user).should("contain", "Street 1").and("contain", "City");

    cy.visit(routes.finance.path);

    cy.getBySel("input-with-options").parent().contains("option", user);
  });
});
