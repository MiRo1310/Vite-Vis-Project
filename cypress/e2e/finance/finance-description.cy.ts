import { routes } from "@/router/routes.ts";
import { texts } from "@/text/de.ts";
import { aliasGraphqlOperations, clickESC, dataSel } from "../../support/utils.ts";

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
    addDescription(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    openEdit(description).as("dialog");
    updateDescription("@dialog", newDescription);
    dialogButtons("@dialog").clickUpdate();

    openEdit(newDescription).as("reopenedDialog");

    validateDescription("@reopenedDialog", newDescription);
  });

  it("shows the saved text when reopening after closing with the close button", () => {
    addDescription(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    openEdit(description).as("dialog");

    dialogButtons("@dialog").clickClose();

    openEdit(description).as("reopenedDialog");

    validateDescription("@reopenedDialog", description);
  });

  it("shows the saved text when reopening after closing with ESC", () => {
    addDescription(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    openEdit(description).as("dialog");

    clickESC("@dialog");

    openEdit(description).as("reopenedDialog");

    validateDescription("@reopenedDialog", description);
  });

  it("disables the update button when the text is empty", () => {
    addDescription(description);

    cy.closeToast(texts.finance.description.addNewDescriptionToastMessage);
    openEdit(description).as("dialog");
    updateDescription("@dialog", "");

    dialogButtons("@dialog").updateBtn().should("be.disabled");
  });
});

const addDescription = (description: string) => {
  cy.visit(routes.description.path);
  cy.getBySel("textarea-description").should("exist").type(description);
  cy.getBySel("button-add-description").should("exist").click();
};

const openEdit = (description: string) => {
  cy.get("table").contains("code", description).closest("tr").find(dataSel("button-edit-description")).click();
  return cy.get("[role='dialog']");
};

const updateDescription = (alias: string, description: string) => {
  cy.get(alias).find("textarea").should("exist").as("descriptionInput");
  cy.get("@descriptionInput").clear();
  if (description) {
    cy.get("@descriptionInput").type(description);
  }
};

const validateDescription = (alias: string, description: string) => {
  cy.get(alias).find("textarea").should("exist").as("descriptionInput").should("have.value", description);
};

const dialogButtons = (alias: string) => {
  return {
    clickUpdate: () => cy.get(alias).find(dataSel("button-update-description")).click(),
    updateBtn: () => cy.get(alias).find(dataSel("button-update-description")),
    clickClose: () => cy.get(alias).find(dataSel("button-close-description")).click(),
  };
};
