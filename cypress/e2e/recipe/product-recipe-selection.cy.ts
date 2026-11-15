import { routes } from "@/router/routes.ts";
import { dataSel, gql } from "../../support/utils.ts";

describe("Product creation and recipe ingredient selection (GraphQL Integration)", () => {
  beforeEach(() => {
    gql.aliasGraphqlOperations();
  });

  it("creates a product, verifies it is listed, and uses it as ingredient in a new recipe", () => {
    const uniqueSuffix = Date.now();
    const categoryName = `Cypress Kategorie ${uniqueSuffix}`;
    const productName = `Cypress Produkt ${uniqueSuffix}`;
    const recipeName = `Cypress Rezept ${uniqueSuffix}`;

    // Kategorie anlegen, wird für das Produkt benötigt
    cy.visit(routes.productCategories.path);
    cy.wait("@ProductCategories");
    cy.getBySel("product-categories-input").type(categoryName);
    cy.getBySel("product-categories-add").click();
    cy.contains(dataSel("product-categories-item"), categoryName).should("exist");

    // Produkt anlegen
    cy.visit(routes.products.path);
    cy.getBySel("products-add").click();

    cy.getBySel("product-name").should("exist").type(productName);
    cy.getBySel("product-category").should("exist").click();
    cy.getBySel(`product-category-${categoryName}`).click();
    cy.getBySel("btn-submit").click();

    cy.contains("Das Produkt wurde erfolgreich erstellt").should("exist");
    cy.contains(dataSel("product-card"), productName).should("exist");

    // Rezept anlegen: Produkt über die Suche wählen, Menge eintragen (Einheit wird vorbelegt)
    cy.visit(routes.newRecipe.path);
    cy.getBySel("recipe-name").type(recipeName);

    cy.getBySel("recipe-ingredient-product").first().click();
    cy.getBySel("recipe-ingredient-product").first().type(productName);
    cy.contains(dataSel("recipe-ingredient-option"), productName).click();
    cy.getBySel("recipe-ingredient-product").first().should("have.value", productName);

    cy.getBySel("recipe-ingredient-amount").first().type("250");
    cy.getBySel("recipe-step-text").first().type("Alles verrühren");

    cy.getBySel("recipe-save-back").click();
    cy.wait("@addRecipe");

    // Detailseite zeigt Zutat und Schritt
    cy.contains("h1", recipeName).should("exist");
    cy.contains(dataSel("recipe-ingredient"), productName).should("contain.text", "250");
    cy.contains(dataSel("recipe-step"), "Alles verrühren").should("exist");
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
