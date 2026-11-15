import { dataSel } from "../utils.ts";
import { routes } from "@/router/routes.ts";

const add = (description: string) => {
  cy.visit(routes.description.path);
  cy.getBySel("textarea-description").should("exist").type(description);
  cy.getBySel("button-add-description").should("exist").click();
};

const edit = (description: string) => {
  cy.get("table").contains("code", description).closest("tr").find(dataSel("button-edit-description")).click();
  return cy.get("[role='dialog']");
};

const remove = (description: string) => {
  cy.get("table").contains("code", description).closest("tr").find(dataSel("button-remove-description")).click();
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

const getDialogButtons = (alias: string) => {
  return {
    clickUpdate: () => cy.get(alias).find(dataSel("button-update-description")).click(),
    updateBtn: () => cy.get(alias).find(dataSel("button-update-description")),
    clickClose: () => cy.get(alias).find(dataSel("button-close-description")).click(),
  };
};

export const description = { getDialogButtons, validateDescription, updateDescription, edit, add, remove };
