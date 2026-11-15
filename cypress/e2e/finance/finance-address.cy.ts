import { routes } from "@/router/routes.ts";
import { aliasGraphqlOperations, clickESC, getFakerCity, getFakerStreet } from "../../support/utils.ts";
import { faker } from "@faker-js/faker";
import { finance } from "../../support/finance-helper";

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
    finance.address.add(user, "Street 1", "City");

    cy.get("table").should("exist");
    cy.contains("table tr", user).should("contain", "Street 1").and("contain", "City");

    cy.visit(routes.finance.path);

    cy.getBySel("input-with-options").parent().contains("option", user);
  });
});

describe("Address Edit-Dialog", () => {
  let name = "";
  let street = "";
  let city = "";

  beforeEach(() => {
    aliasGraphqlOperations();
    name = faker.person.fullName();
    street = getFakerStreet();
    city = getFakerCity();
    finance.address.add(name, street, city);
    cy.wait("@Addresses");
    finance.address.openDialog(street).as("dialog");
  });

  it("dialog should have update and close buttons", () => {
    const { close, update } = finance.address.getDialogButtons("@dialog");

    close().should("exist");
    update().should("exist");
  });

  it("shows the new values when reopening after save", () => {
    const newName = faker.person.fullName();
    let newStreet = "";
    const newCity = getFakerCity();

    while (newStreet === street || newStreet === "") {
      newStreet = getFakerStreet();
    }

    finance.address.setValues("@dialog", newName, newStreet, newCity);

    finance.address.getDialogButtons("@dialog").update().click();

    finance.address.openDialog(newStreet).as("reopenedDialog");

    finance.address.validateValuesInDialog("@reopenedDialog", newName, newStreet, newCity);
  });

  it("shows the saved values when reopening after closing with the close button", () => {
    finance.address.getDialogButtons("@dialog").close().click();

    finance.address.openDialog(street).as("reopenedDialog");

    finance.address.validateValuesInDialog("@reopenedDialog", name, street, city);
  });

  it("shows the saved values when reopening after closing with ESC", () => {
    clickESC("@dialog");
    finance.address.openDialog(street).as("reopenedDialog");

    finance.address.validateValuesInDialog("@reopenedDialog", name, street, city);
  });
});
