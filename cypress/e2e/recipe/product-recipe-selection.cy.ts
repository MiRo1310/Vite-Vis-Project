import { routes } from "@/router/routes.ts";
import { dataSel, gql } from "../../support/utils.ts";
import { recipe } from "../../support/recipeHelper";

describe("Product creation and recipe ingredient selection (GraphQL Integration)", () => {
  beforeEach(() => {
    gql.aliasGraphqlOperations();
  });

  it("creates a product, verifies it is listed, and uses it as ingredient in a new recipe", () => {
    const uniqueSuffix = Date.now();
    const categoryName = `Cypress Kategorie ${uniqueSuffix}`;
    const productName = `Cypress Produkt ${uniqueSuffix}`;
    const recipeName = `Cypress Rezept ${uniqueSuffix}`;
    const unit = "g";
    const amount = "250";
    const stepText = "Alles verrühren";

    recipe.category.add(categoryName);
    recipe.unit.add(unit);
    recipe.product.add(productName, categoryName, unit);
    recipe.add(recipeName, productName, amount, stepText);

    // Detailseite zeigt Zutat und Schritt
    cy.contains("h1", recipeName).should("exist");
    cy.contains(dataSel("recipe-ingredient"), productName).should("contain.text", amount);
    cy.contains(dataSel("recipe-step"), stepText).should("exist");
  });

  it("shows validation errors instead of saving an incomplete recipe", () => {
    cy.visit(routes.newRecipe.path);
    cy.getBySel("recipe-ingredient-amount").first().type("100");

    cy.getBySel("recipe-save").click();

    cy.contains("Gib dem Rezept einen Namen").should("exist");
    cy.contains("Wähle ein Produkt").should("exist");
    cy.location("pathname").should("eq", routes.newRecipe.path);
  });
});
