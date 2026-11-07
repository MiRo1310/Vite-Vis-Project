import { routes } from "@/router/routes.ts";
import { financeListTextColorMapping, descriptionUncheckedColor as unchecked } from "@/constants/finance.ts";

// Vergibt für GraphQL-Requests einen Alias nach operationName, damit die Tests mit cy.wait("@<operationName>") darauf warten können
const aliasGraphqlOperations = () => {
  cy.intercept("POST", "**", (req) => {
    const operationName = (req.body as { operationName?: string } | undefined)?.operationName;
    if (operationName) {
      req.alias = operationName;
    }
  });
};

// Klickt eine Checkbox der Zeile und wartet, bis die Mutation durch ist
const toggleCheckbox = (description: string, checkbox: "isValid" | "hasInvoice", state: "checked" | "unchecked") => {
  const operation = checkbox === "isValid" ? "UpdateTravelCostIsValidated" : "UpdateTravelCostHasInvoice";
  cy.contains("code", description).closest("tr").find(`.${checkbox}`).click();
  cy.wait(`@${operation}`);
  cy.contains("code", description).closest("tr").find(`.${checkbox}`).should("have.attr", "data-state", state);
};

// Legt eine Adresse und eine Position im Finance-Listing an (beide Checkboxen sind danach unchecked)
const createListing = (description: string, price: string) => {
  aliasGraphqlOperations();
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
    // createListing prüft auch den Toast "Wurde zur Liste hinzugefügt"
    createListing(description, "42.50");

    cy.contains("td", description).should("exist");
    cy.contains("td", "42,50").should("exist");
  });

  it("removes the red color only while both checkboxes are checked", () => {
    // Beschreibung ohne "Rechnung"/"Fahrtkosten", sonst greift das colorMapping
    const description = `Cypress Farbe Test ${Date.now()}`;
    createListing(description, "12.34");

    const cell = () => cy.contains("code", description);

    // Neu angelegt: beide unchecked -> rot
    cell().should("have.class", unchecked);

    // Nur eine Checkbox -> weiterhin rot
    toggleCheckbox(description, "isValid", "checked");
    cell().should("have.class", unchecked);

    // Beide Checkboxen -> nicht mehr rot
    toggleCheckbox(description, "hasInvoice", "checked");
    cell().should("not.have.class", unchecked);

    // Eine wieder unchecked -> wieder rot
    toggleCheckbox(description, "hasInvoice", "unchecked");
    cell().should("have.class", unchecked);
  });

  // Ein Test je Eintrag im Mapping, neue Keywords werden automatisch mitgetestet
  financeListTextColorMapping.forEach(([keyword, color]) => {
    it(`uses ${color} for "${keyword}" when both checkboxes are checked`, () => {
      // Großschreibung prüft gleichzeitig, dass das Keyword case-insensitive erkannt wird
      const description = `Cypress ${keyword.toUpperCase()} ${Date.now()}`;
      createListing(description, "5.00");

      const cell = () => cy.contains("code", description);

      // Unchecked -> rot, Mapping-Farbe noch nicht gesetzt
      cell().should("have.class", unchecked).and("not.have.class", color);

      // Beide Checkboxen -> Mapping-Farbe statt rot
      toggleCheckbox(description, "isValid", "checked");
      toggleCheckbox(description, "hasInvoice", "checked");
      cell().should("have.class", color).and("not.have.class", unchecked);

      // Eine wieder unchecked -> rot statt Mapping-Farbe
      toggleCheckbox(description, "isValid", "unchecked");
      cell().should("have.class", unchecked).and("not.have.class", color);
    });
  });
});
