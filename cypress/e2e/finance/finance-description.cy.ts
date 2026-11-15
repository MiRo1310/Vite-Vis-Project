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

describe("Description Edit-Dialog", () => {
  let description = "";

  beforeEach(() => {
    aliasGraphqlOperations();
    description = `Description ${Date.now()}`;
  });

  it("shows the new text when reopening after save", () => {
    const newDescription = "New Description 123456";
    finance.description.addDescription(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    finance.description.openEdit(description).as("dialog");
    finance.description.updateDescription("@dialog", newDescription);
    finance.description.getDialogButtons("@dialog").clickUpdate();

    finance.description.openEdit(newDescription).as("reopenedDialog");

    finance.description.validateDescription("@reopenedDialog", newDescription);
  });

  it("shows the saved text when reopening after closing with the close button", () => {
    finance.description.addDescription(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    finance.description.openEdit(description).as("dialog");

    finance.description.getDialogButtons("@dialog").clickClose();

    finance.description.openEdit(description).as("reopenedDialog");

    finance.description.validateDescription("@reopenedDialog", description);
  });

  it("shows the saved text when reopening after closing with ESC", () => {
    finance.description.addDescription(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    finance.description.openEdit(description).as("dialog");

    clickESC("@dialog");

    finance.description.openEdit(description).as("reopenedDialog");

    finance.description.validateDescription("@reopenedDialog", description);
  });

  it("disables the update button when the text is empty", () => {
    finance.description.addDescription(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    finance.description.openEdit(description).as("dialog");
    finance.description.updateDescription("@dialog", "");

    finance.description.getDialogButtons("@dialog").updateBtn().should("be.disabled");
  });
});
