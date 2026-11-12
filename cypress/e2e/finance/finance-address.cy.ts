import { routes } from "@/router/routes.ts";
import { addAddress, aliasGraphqlOperations, clickESC, dataSel, getFakerCity, getFakerStreet } from "../../support/utils.ts";
import { faker } from "@faker-js/faker";

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

describe("Address Edit-Dialog", () => {
  let name = "";
  let street = "";
  let city = "";

  beforeEach(() => {
    aliasGraphqlOperations();
    name = faker.person.fullName();
    street = getFakerStreet();
    city = getFakerCity();
    addAddress(name, street, city);
    cy.wait("@Addresses");
    openDialog(street).as("dialog");
  });

  it("dialog should have update and close buttons", () => {
    const { close, update } = dialogButtons("@dialog");

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

    setValues("@dialog", newName, newStreet, newCity);

    dialogButtons("@dialog").update().click();

    openDialog(newStreet).as("reopenedDialog");

    validateValues("@reopenedDialog", newName, newStreet, newCity);
  });

  it("shows the saved values when reopening after closing with the close button", () => {
    dialogButtons("@dialog").close().click();

    openDialog(street).as("reopenedDialog");

    validateValues("@reopenedDialog", name, street, city);
  });

  it("shows the saved values when reopening after closing with ESC", () => {
    clickESC("@dialog");
    openDialog(street).as("reopenedDialog");

    validateValues("@reopenedDialog", name, street, city);
  });
});

const setValues = (alias: string, name: string, street: string, city: string) => {
  cy.get(alias).find(dataSel("address-name")).should("exist").as("name");
  cy.get(alias).find(dataSel("address-street")).should("exist").as("street");
  cy.get(alias).find(dataSel("address-city")).should("exist").as("city");

  cy.get("@name").clear().type(name);
  cy.get("@street").clear().type(street);
  cy.get("@city").clear().type(city);
};

const validateValues = (alias: string, name: string, street: string, city: string) => {
  cy.get(alias).find(dataSel("address-name")).should("exist").should("have.value", name);
  cy.get(alias).find(dataSel("address-street")).should("exist").should("have.value", street);
  cy.get(alias).find(dataSel("address-city")).should("exist").should("have.value", city);
};

const openDialog = (search: string) => {
  cy.get("table").contains("p", search).closest("tr").find("[data-e2e='address-edit']").click();
  return cy.get("[role='dialog']");
};

const dialogButtons = (alias: string) => {
  return { update: () => cy.get(alias).getBySel("btn-submit"), close: () => cy.get(alias).getBySel("btn-close") };
};
