import { dataSel } from "../utils.ts";
import { routes } from "@/router/routes.ts";

const add = (recipeName: string, productName: string, amount = "250", stepText = "Steptext") => {
  cy.visit(routes.newRecipe.path);
  cy.getBySel("recipe-name").type(recipeName);

  cy.getBySel("recipe-ingredient-product").first().click();
  cy.getBySel("recipe-ingredient-product").first().type(productName);
  cy.contains(dataSel("recipe-ingredient-option"), productName).click();
  cy.getBySel("recipe-ingredient-product").first().should("have.value", productName);

  cy.getBySel("recipe-ingredient-amount").first().type(amount);
  cy.getBySel("recipe-step-text").first().type(stepText);

  cy.getBySel("recipe-save-back").click();
  cy.wait("@addRecipe");
};

export const recipeHelper = { add };
