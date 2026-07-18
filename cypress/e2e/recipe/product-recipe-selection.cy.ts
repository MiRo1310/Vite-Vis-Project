import { routes } from "@/router/routes.ts";

describe("Product creation and recipe ingredient selection (GraphQL Integration)", () => {
  it("creates a product, verifies it is listed, and confirms it is selectable while creating a new recipe", () => {
    const uniqueSuffix = Date.now();
    const categoryName = `Cypress Kategorie ${uniqueSuffix}`;
    const productName = `Cypress Produkt ${uniqueSuffix}`;
    const recipeName = `Cypress Rezept ${uniqueSuffix}`;

    // Kategorie anlegen, wird für das Produkt benötigt
    cy.visit(routes.productCategories.path);
    cy.getBySel("add-category-input").find("input").type(categoryName);
    cy.getBySel("add-category-submit").click();
    cy.contains("td", categoryName).should("exist");

    // Produkt anlegen
    cy.visit(routes.products.path);
    cy.getBySel("products-add").click();

    cy.getBySel("product-name").should("exist").type(productName);
    cy.getBySel("product-category").should("exist").click();
    cy.getBySel(`product-category-${categoryName}`).click();
    cy.getBySel("product-submit").click();

    cy.contains("Das Produkt wurde erfolgreich erstellt").should("exist");
    cy.contains("td", productName).should("exist");

    // Neues Rezept anlegen und prüfen, ob das Produkt bei den Zutaten auswählbar ist
    cy.visit(routes.newRecipe.path);
    cy.getBySel("recipe-name").type(recipeName);

    cy.getBySel("recipe-step-ingredients").click();
    cy.getBySel("recipe-add-product-group").click();
    cy.getBySel("recipe-product-trigger").click();

    cy.getBySel("input-with-options").parent().contains("option", productName);
  });
});
