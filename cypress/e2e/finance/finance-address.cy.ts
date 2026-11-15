import { routes } from "@/router/routes.ts";
import { clickESC, fake, gql } from "../../support/utils.ts";
import { faker } from "@faker-js/faker";
import { finance } from "../../support/finance-helper";

describe("Finance Address (GraphQL Integration)", () => {
  it("loads addresses from the real backend without a GraphQL error", () => {
    cy.visit(routes.addresses.path);

    // Kein GraphQL-Error-Toast (siehe apolloClient.ts errorLink)
    cy.contains("GraphQL Error").should("not.exist");

    // Tabelle wird gerendert (auch bei leerer DB ohne Seed-Daten)
    cy.get("table").should("exist");
  });
});

describe("Adding and remove addresses", () => {
  it("adds a new address and should be available in listing", () => {
    const user = faker.person.fullName();
    cy.visit(routes.addresses.path);
    finance.address.add(user, "Street 1", "City");

    cy.get("table").should("exist");
    cy.contains("table tr", user).should("contain", "Street 1").and("contain", "City");

    cy.visit(routes.finance.path);

    cy.getBySel("input-with-options").parent().contains("option", user);
  });

  it("click remove and after abort nothing is deleted", () => {
    const user = `${faker.person.fullName()} ${Date.now()}`;
    finance.address.add(user, fake.street(), fake.city());

    cy.get("table tbody").as("tbody");
    cy.get("@tbody").contains("p", user).should("exist");
    cy.get("@tbody").find("tr").its("length").as("rowCount", { type: "static" });

    finance.address.remove(user).as("confirmDialog");

    finance.confirmDialog("@confirmDialog").close();

    cy.get<number>("@rowCount").then((count) => {
      cy.get("@tbody").find("tr").should("have.length", count);
    });
    finance.address.remove(user).as("confirmDialogReopen");
    finance.confirmDialog("@confirmDialogReopen").action();

    cy.get("table").contains("p", user).should("not.exist");
    cy.get<number>("@rowCount").then((count) => {
      cy.get("@tbody")
        .find("tr")
        .should("have.length", count - 1);
    });
  });

  it("button add is disabled if an input is empty", () => {
    cy.visit(routes.addresses.path);

    cy.getBySel("address-submit").as("submitBtn").should("have.attr", "disabled");
    cy.getBySel("address-name").should("exist").type("Test");
    cy.get("@submitBtn").should("have.attr", "disabled");
    cy.getBySel("address-street").should("exist").type("Street");
    cy.get("@submitBtn").should("have.attr", "disabled");
    cy.getBySel("address-city").should("exist").type("City");
    cy.get("@submitBtn").should("not.have.attr", "disabled");
  });

  it("sorts addresses by name", () => {
    const suffix = Date.now();
    const first = `Aaa Sort ${suffix}`;
    const last = `Zzz Sort ${suffix}`;

    finance.address.add(last, fake.street(), fake.city());
    finance.address.add(first, fake.street(), fake.city());

    cy.get("table tbody tr td:first-child").then(($cells) => {
      const names = [...$cells].map((cell) => cell.innerText.trim());
      expect(names.indexOf(first)).to.be.lessThan(names.indexOf(last));
    });
  });

  it("new added address is available in listing", () => {
    const user = `${faker.person.fullName()} ${Date.now()}`;
    finance.address.add(user, fake.street(), fake.city());

    cy.visit(routes.finance.path);

    cy.getBySel("input-with-options").parent().find("datalist").contains("option", user);
  });

  it("changed address name is available in listing", () => {
    gql.aliasGraphqlOperations();
    const user = `${faker.person.fullName()} ${Date.now()}`;
    const street = fake.street();
    const city = fake.city();
    finance.address.add(user, street, city);

    finance.address.openDialog(user).as("dialog");
    const newName = `${faker.person.fullName()} ${Date.now()}`;
    finance.address.setValues("@dialog", newName, street, city);
    finance.address.getDialogButtons("@dialog").clickUpdate();

    cy.visit(routes.finance.path);
    cy.wait("@TravelCost");
    cy.wait("@AddressListing");
    cy.getBySel("input-with-options").parent().find("datalist").should("exist");
    cy.getBySel("input-with-options").parent().find("datalist").contains("option", newName).should("exist");
    cy.getBySel("input-with-options").parent().find("datalist").contains("option", user).should("not.exist");
  });
});

describe("Address Edit-Dialog", () => {
  let name = "";
  let street = "";
  let city = "";

  beforeEach(() => {
    gql.aliasGraphqlOperations();
    name = faker.person.fullName();
    street = fake.street();
    city = fake.city();
    finance.address.add(name, street, city);
    cy.wait("@Addresses");
    finance.address.openDialog(street).as("dialog");
  });

  it("shows the new values when reopening after save", () => {
    const newName = faker.person.fullName();
    let newStreet = "";
    const newCity = fake.city();

    while (newStreet === street || newStreet === "") {
      newStreet = fake.street();
    }

    finance.address.setValues("@dialog", newName, newStreet, newCity);

    finance.address.getDialogButtons("@dialog").clickUpdate();

    finance.address.openDialog(newStreet).as("reopenedDialog");

    finance.address.validateValuesInDialog("@reopenedDialog", newName, newStreet, newCity);
  });

  it("shows the saved values when reopening after closing with the close button", () => {
    finance.address.getDialogButtons("@dialog").clickClose();

    finance.address.openDialog(street).as("reopenedDialog");

    finance.address.validateValuesInDialog("@reopenedDialog", name, street, city);
  });

  it("shows the saved values when reopening after closing with ESC", () => {
    clickESC("@dialog");
    finance.address.openDialog(street).as("reopenedDialog");

    finance.address.validateValuesInDialog("@reopenedDialog", name, street, city);
  });
});
