describe("Finance Listing (GraphQL Integration)", () => {
  it("loads travel costs from the real backend without a GraphQL error", () => {
    cy.visit("/finance");

    // Kein GraphQL-Error-Toast (siehe apolloClient.ts errorLink)
    cy.contains("GraphQL Error").should("not.exist");

    // Tabelle wird gerendert (auch bei leerer DB ohne Seed-Daten)
    cy.get("table").should("exist");
  });
});
