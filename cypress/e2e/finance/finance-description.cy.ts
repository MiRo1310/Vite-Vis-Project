import { routes } from "@/router/routes.ts";
import { texts } from "@/text/de.ts";
import { aliasGraphqlOperations, clickESC } from "../../support/utils.ts";
import { finance } from "../../support/finance-helper";

describe("Finance Description (GraphQL Integration)", () => {
  it("loads descriptions from the real backend without a GraphQL error", () => {
    cy.visit(routes.description.path);

    // Kein GraphQL-Error-Toast (siehe apolloClient.ts errorLink)
    cy.contains("GraphQL Error").should("not.exist");

    // Tabelle wird gerendert (auch bei leerer DB ohne Seed-Daten)
    cy.get("table").should("exist");
  });
});

describe("Description add and remove", () => {
  beforeEach(() => {
    cy.visit(routes.description.path);
  });

  it("button is disabled if textarea is empty", () => {
    cy.getBySel("textarea-description").should("have.value", "");
    cy.getBySel("button-add-description").should("have.attr", "disabled");
    cy.getBySel("textarea-description").type("a");
    cy.getBySel("button-add-description").should("not.have.attr", "disabled");
  });

  it("click remove and after abort nothing is deleted", () => {
    const description = `Description to remove: ${Date.now()}`;
    finance.description.add("Test");
    finance.description.add(description);

    cy.get("table tbody").as("tbody");
    cy.get("table").contains("code", description).should("exist");
    cy.get("@tbody").find("tr").its("length").as("rowCount", { type: "static" });

    finance.description.remove(description).as("confirmDialog");

    finance.confirmDialog("@confirmDialog").close();

    cy.get<number>("@rowCount").then((count) => {
      cy.get("@tbody").find("tr").should("have.length", count);
    });
    finance.description.remove(description).as("confirmDialogReopen");
    finance.confirmDialog("@confirmDialogReopen").action();

    cy.get("table").contains("code", description).should("not.exist");
    cy.get<number>("@rowCount").then((count) => {
      cy.get("@tbody")
        .find("tr")
        .should("have.length", count - 1);
    });
  });

  it("new added description is available in listing", () => {
    const description = `Description available in listing: ${Date.now()}`;
    finance.description.add(description);

    cy.visit(routes.finance.path);

    cy.getBySel("description-select").parent().find("select").contains("option", description);
  });
});

describe("Description Edit-Dialog", () => {
  let description = "";

  beforeEach(() => {
    aliasGraphqlOperations();
    description = `Description ${Date.now()}`;
  });

  it("shows the new text when reopening after save", () => {
    const newDescription = "New Description 123456";
    finance.description.add(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    finance.description.edit(description).as("dialog");
    finance.description.updateDescription("@dialog", newDescription);
    finance.description.getDialogButtons("@dialog").clickUpdate();

    finance.description.edit(newDescription).as("reopenedDialog");

    finance.description.validateDescription("@reopenedDialog", newDescription);
  });

  it("shows the saved text when reopening after closing with the close button", () => {
    finance.description.add(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    finance.description.edit(description).as("dialog");

    finance.description.getDialogButtons("@dialog").clickClose();

    finance.description.edit(description).as("reopenedDialog");

    finance.description.validateDescription("@reopenedDialog", description);
  });

  it("shows the saved text when reopening after closing with ESC", () => {
    finance.description.add(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    finance.description.edit(description).as("dialog");

    clickESC("@dialog");

    finance.description.edit(description).as("reopenedDialog");

    finance.description.validateDescription("@reopenedDialog", description);
  });

  it("disables the update button when the text is empty", () => {
    finance.description.add(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    finance.description.edit(description).as("dialog");
    finance.description.updateDescription("@dialog", "");

    finance.description.getDialogButtons("@dialog").updateBtn().should("be.disabled");
  });
});
